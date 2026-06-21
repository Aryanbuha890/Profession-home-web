-- =============================================================================
-- SETUP DEMO USERS — Run AFTER schema.sql (creates auth users + profiles automatically)
-- Password for ALL accounts: Test@123456
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- ─── Create auth user + identity (Supabase-compatible) ─────────────────────────
CREATE OR REPLACE FUNCTION public._seed_auth_user(
  p_id UUID,
  p_email TEXT,
  p_password TEXT,
  p_full_name TEXT,
  p_role TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, extensions
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  SELECT id INTO v_user_id FROM auth.users WHERE email = p_email LIMIT 1;
  IF v_user_id IS NOT NULL THEN
    RETURN v_user_id;
  END IF;

  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    p_id,
    'authenticated',
    'authenticated',
    p_email,
    extensions.crypt(p_password, extensions.gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    jsonb_build_object('full_name', p_full_name, 'role', p_role),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  );

  INSERT INTO auth.identities (
    id,
    user_id,
    provider_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    gen_random_uuid(),
    p_id,
    p_email,
    jsonb_build_object(
      'sub', p_id::text,
      'email', p_email,
      'email_verified', true,
      'phone_verified', false
    ),
    'email',
    NOW(),
    NOW(),
    NOW()
  );

  RETURN p_id;
END;
$$;

-- ─── Seed 4 test accounts ──────────────────────────────────────────────────────
SELECT public._seed_auth_user(
  '11111111-1111-1111-1111-111111111111'::uuid,
  'student@test.profhome.com',
  'Test@123456',
  'Test Student',
  'student'
);

SELECT public._seed_auth_user(
  '22222222-2222-2222-2222-222222222222'::uuid,
  'researcher@test.profhome.com',
  'Test@123456',
  'Test Researcher',
  'researcher'
);

SELECT public._seed_auth_user(
  '33333333-3333-3333-3333-333333333333'::uuid,
  'founder@test.profhome.com',
  'Test@123456',
  'Test Founder',
  'founder'
);

SELECT public._seed_auth_user(
  '44444444-4444-4444-4444-444444444444'::uuid,
  'admin@test.profhome.com',
  'Test@123456',
  'Test Admin',
  'admin'
);

-- ─── Backfill profiles (if trigger did not run) ──────────────────────────────
INSERT INTO public.profiles (id, email, full_name, role, onboarding_completed)
SELECT
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1)),
  COALESCE(
    NULLIF(u.raw_user_meta_data->>'role', '')::public.user_role,
    'student'::public.user_role
  ),
  TRUE
FROM auth.users u
WHERE NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = u.id)
ON CONFLICT (id) DO NOTHING;

-- ─── Role-specific profile rows ────────────────────────────────────────────────
INSERT INTO public.student_profiles (user_id)
SELECT p.id FROM public.profiles p
WHERE p.role = 'student'
  AND NOT EXISTS (SELECT 1 FROM public.student_profiles sp WHERE sp.user_id = p.id)
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO public.arena_stats (user_id)
SELECT p.id FROM public.profiles p
WHERE p.role = 'student'
  AND NOT EXISTS (SELECT 1 FROM public.arena_stats a WHERE a.user_id = p.id)
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO public.startup_profiles (user_id)
SELECT p.id FROM public.profiles p
WHERE p.role = 'founder'
  AND NOT EXISTS (SELECT 1 FROM public.startup_profiles s WHERE s.user_id = p.id)
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO public.researcher_profiles (user_id)
SELECT p.id FROM public.profiles p
WHERE p.role = 'researcher'
  AND NOT EXISTS (SELECT 1 FROM public.researcher_profiles r WHERE r.user_id = p.id)
ON CONFLICT (user_id) DO NOTHING;

-- ─── Query helper for SQL Editor ───────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public._query_user_id()
RETURNS UUID
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid UUID;
BEGIN
  uid := auth.uid();
  IF uid IS NOT NULL THEN
    RETURN uid;
  END IF;

  SELECT id INTO uid FROM public.profiles
  WHERE email = 'student@test.profhome.com' LIMIT 1;
  IF uid IS NOT NULL THEN RETURN uid; END IF;

  SELECT id INTO uid FROM public.profiles
  WHERE role = 'student' ORDER BY created_at LIMIT 1;
  IF uid IS NOT NULL THEN RETURN uid; END IF;

  SELECT id INTO uid FROM public.profiles ORDER BY created_at LIMIT 1;
  IF uid IS NOT NULL THEN RETURN uid; END IF;

  RAISE EXCEPTION 'Setup failed: no profiles found. Re-run setup-demo-user.sql from the top.';
END;
$$;

-- ─── VERIFY (safe — run whole script including this) ───────────────────────────
SELECT
  (SELECT COUNT(*) FROM auth.users) AS auth_users,
  (SELECT COUNT(*) FROM public.profiles) AS profiles,
  (SELECT COUNT(*) FROM public.student_profiles) AS student_profiles;

SELECT id, email, full_name, role
FROM public.profiles
ORDER BY email;

SELECT public._query_user_id() AS demo_user_id;

-- ─── Test insert (arena) ───────────────────────────────────────────────────────
INSERT INTO public.arena_path_decisions (user_id, path_chosen, ai_result)
VALUES (
  public._query_user_id(),
  'research',
  'Your profile aligns 78% with research track...'
)
RETURNING id, user_id, path_chosen, ai_result, decided_at;

-- =============================================================================
-- LOGIN CREDENTIALS (use on /login)
-- =============================================================================
-- Student:    student@test.profhome.com    / Test@123456
-- Researcher: researcher@test.profhome.com / Test@123456
-- Founder:    founder@test.profhome.com    / Test@123456
-- Admin:      admin@test.profhome.com      / Test@123456
-- =============================================================================
