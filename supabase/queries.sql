-- =============================================================================
-- PROFESSIONAL HOME — FEATURE QUERIES BY DASHBOARD SECTION
-- =============================================================================
--
-- HOW TO RUN IN SUPABASE SQL EDITOR:
--   1. Run schema.sql
--   2. Run seed-data.sql
--   3. Create user: Authentication → Users → student@test.profhome.com / Test@123456
--   4. Run setup-demo-user.sql  ← REQUIRED (creates profile + fixes _query_user_id)
--   5. Run ONE section from this file at a time (not the whole file)
--
-- If you see "null value in column user_id" → you skipped step 4.
-- =============================================================================

-- Helper is created in setup-demo-user.sql — re-run that file if this fails:
--   SELECT public._query_user_id();  -- must return a UUID, not NULL


-- ═══════════════════════════════════════════════════════════════════════════════
-- STUDENT OS — HOME (/app/student)
-- ═══════════════════════════════════════════════════════════════════════════════

-- Get student home dashboard summary
SELECT
  p.full_name,
  p.avatar_url,
  sp.level,
  sp.xp,
  sp.xp_to_next,
  sp.success_score,
  sp.career_goal,
  sp.degree,
  sp.year_of_study,
  sp.streak_count,
  sp.coins,
  sp.arena_rank,
  sp.cohort_percentile
FROM public.profiles p
JOIN public.student_profiles sp ON sp.user_id = p.id
WHERE p.id = public._query_user_id();

-- Get active missions for home widget
SELECT id, title, description, difficulty, reward_xp, progress, deadline, tag, status
FROM public.student_missions
WHERE user_id = public._query_user_id() AND status = 'active'
ORDER BY deadline ASC NULLS LAST
LIMIT 10;

-- Add XP after completing a mission (fixed: single xp assignment)
UPDATE public.student_profiles sp
SET
  level = CASE
    WHEN sp.xp + 250 >= sp.xp_to_next THEN sp.level + 1
    ELSE sp.level
  END,
  xp = CASE
    WHEN sp.xp + 250 >= sp.xp_to_next THEN sp.xp + 250 - sp.xp_to_next
    ELSE sp.xp + 250
  END
WHERE sp.user_id = public._query_user_id()
RETURNING level, xp, coins;

-- Claim daily streak
UPDATE public.student_profiles
SET streak_count = streak_count + 1,
    streak_claimed_today = TRUE,
    coins = coins + 50,
    xp = xp + 100
WHERE user_id = public._query_user_id() AND streak_claimed_today = FALSE
RETURNING streak_count, coins, xp;


-- ═══════════════════════════════════════════════════════════════════════════════
-- STUDENT OS — CAREER ARENA (/app/student/arena)
-- ═══════════════════════════════════════════════════════════════════════════════

SELECT rank_title, rank_number, win_rate, total_battles, research_score, startup_score
FROM public.arena_stats
WHERE user_id = public._query_user_id();

-- Save arena path decision (Research vs Startup)
INSERT INTO public.arena_path_decisions (user_id, path_chosen, ai_result)
VALUES (
  public._query_user_id(),
  'research',
  'Your profile aligns 78% with research track...'
)
RETURNING *;

-- Update arena rank after battle
UPDATE public.arena_stats
SET total_battles = total_battles + 1,
    win_rate = ROUND(((win_rate * total_battles) + 100.0) / (total_battles + 1), 2),
    rank_number = rank_number + 1,
    rank_title = CASE
      WHEN rank_number + 1 >= 20 THEN 'Grandmaster'
      WHEN rank_number + 1 >= 10 THEN 'Expert'
      ELSE 'Specialist'
    END
WHERE user_id = public._query_user_id();


-- ═══════════════════════════════════════════════════════════════════════════════
-- STUDENT OS — CHALLENGES (/app/student/challenges)
-- ═══════════════════════════════════════════════════════════════════════════════

SELECT id, title, description, category, difficulty, reward_xp, reward_coins, progress, deadline, completed
FROM public.student_challenges
WHERE user_id = public._query_user_id()
ORDER BY completed ASC, deadline ASC;

INSERT INTO public.student_challenges (user_id, title, description, category, difficulty, reward_xp, reward_coins, deadline)
VALUES (
  public._query_user_id(),
  'Complete Portfolio',
  'Upload 3 verified projects',
  'Project',
  'medium',
  250,
  50,
  NOW() + INTERVAL '7 days'
);

-- Complete the user's most recent challenge
UPDATE public.student_challenges
SET progress = 100, completed = TRUE, completed_at = NOW()
WHERE id = (
  SELECT id FROM public.student_challenges
  WHERE user_id = public._query_user_id()
  ORDER BY created_at DESC
  LIMIT 1
)
AND user_id = public._query_user_id();


-- ═══════════════════════════════════════════════════════════════════════════════
-- STUDENT OS — AI ASSESSMENT (/app/student/assessment)
-- ═══════════════════════════════════════════════════════════════════════════════

-- Get latest assessment
SELECT *
FROM public.student_assessments
WHERE user_id = public._query_user_id()
ORDER BY created_at DESC
LIMIT 1;

-- Save new assessment result
INSERT INTO public.student_assessments (
  user_id, overall_score, academic, technical, communication,
  research, career_ready, leadership, networking, diagnosis, recommendations, completed_at
) VALUES (
  public._query_user_id(),
  86, 85, 78, 65, 72, 60, 55, 50,
  'Strong technical foundation. Improve networking and career readiness.',
  '["Attend 2 networking events","Complete mock interviews"]'::jsonb,
  NOW()
)
RETURNING *;

-- Sync success score to profile
UPDATE public.student_profiles
SET success_score = (
  SELECT overall_score FROM public.student_assessments
  WHERE user_id = public._query_user_id()
  ORDER BY created_at DESC
  LIMIT 1
)
WHERE user_id = public._query_user_id();


-- ═══════════════════════════════════════════════════════════════════════════════
-- STUDENT OS — CAREER ROADMAP (/app/student/roadmap)
-- ═══════════════════════════════════════════════════════════════════════════════

SELECT
  p.id AS phase_id,
  p.phase_number,
  p.title,
  p.description,
  p.target_weeks,
  p.progress,
  p.is_active,
  json_agg(
    json_build_object(
      'id', m.id,
      'title', m.title,
      'description', m.description,
      'completed', m.completed,
      'locked', m.locked,
      'sort_order', m.sort_order
    ) ORDER BY m.sort_order
  ) AS milestones
FROM public.career_roadmap_phases p
LEFT JOIN public.career_roadmap_milestones m ON m.phase_id = p.id
WHERE p.user_id = public._query_user_id()
GROUP BY p.id
ORDER BY p.phase_number;

-- Toggle first unlocked milestone for current user
UPDATE public.career_roadmap_milestones m
SET completed = NOT m.completed
FROM public.career_roadmap_phases p
WHERE m.phase_id = p.id
  AND p.user_id = public._query_user_id()
  AND m.id = (
    SELECT m2.id
    FROM public.career_roadmap_milestones m2
    JOIN public.career_roadmap_phases p2 ON p2.id = m2.phase_id
    WHERE p2.user_id = public._query_user_id() AND m2.locked = FALSE
    ORDER BY p2.phase_number, m2.sort_order
    LIMIT 1
  );


-- ═══════════════════════════════════════════════════════════════════════════════
-- STUDENT OS — SKILL BUILDER (/app/student/skills)
-- ═══════════════════════════════════════════════════════════════════════════════

-- Skill gaps
SELECT skill_name, category, level, target_level, is_gap
FROM public.student_skills
WHERE user_id = public._query_user_id()
ORDER BY is_gap DESC, level ASC;

INSERT INTO public.student_skills (user_id, skill_name, category, level, target_level, is_gap)
VALUES (public._query_user_id(), 'System Design', 'Technical', 36, 100, TRUE)
ON CONFLICT (user_id, skill_name)
DO UPDATE SET level = EXCLUDED.level, updated_at = NOW();

-- Enrolled courses
SELECT skill_name, course_title, provider, url, progress
FROM public.skill_courses
WHERE user_id = public._query_user_id();


-- ═══════════════════════════════════════════════════════════════════════════════
-- STUDENT OS — PROJECTS (/app/student/projects)
-- ═══════════════════════════════════════════════════════════════════════════════

SELECT id, name, description, tech_stack, category, github_url, live_url, image_url,
       progress, status, commits, tests_passing, is_published, created_at
FROM public.student_projects
WHERE user_id = public._query_user_id()
ORDER BY updated_at DESC;

INSERT INTO public.student_projects (user_id, name, description, tech_stack, category, github_url, progress, status)
VALUES (
  public._query_user_id(),
  'Nexus OS',
  'Microkernel OS in Rust',
  ARRAY['Rust','C'],
  'Systems',
  'https://github.com/user/nexus-os',
  95,
  'Active Dev'
);


-- ═══════════════════════════════════════════════════════════════════════════════
-- STUDENT OS — INTERNSHIPS (/app/student/internships)
-- ═══════════════════════════════════════════════════════════════════════════════

SELECT l.id, l.company, l.role_title, l.location, l.type, l.description,
       COALESCE(a.match_score, l.match_min) AS match_score,
       COALESCE(a.status::text, 'saved') AS application_status
FROM public.internship_listings l
LEFT JOIN public.internship_applications a
  ON a.listing_id = l.id AND a.user_id = public._query_user_id()
WHERE l.is_active = TRUE
ORDER BY match_score DESC;

-- Apply to first active internship listing
INSERT INTO public.internship_applications (user_id, listing_id, match_score, status)
SELECT public._query_user_id(), l.id, 98, 'applied'::public.application_status
FROM public.internship_listings l
WHERE l.is_active = TRUE
ORDER BY l.posted_at DESC
LIMIT 1
ON CONFLICT (user_id, listing_id) DO NOTHING;


-- ═══════════════════════════════════════════════════════════════════════════════
-- STUDENT OS — JOBS (/app/student/jobs)
-- ═══════════════════════════════════════════════════════════════════════════════

SELECT l.id, l.company, l.role_title, l.location, l.salary_range,
       COALESCE(a.match_score, l.match_min) AS match_score,
       COALESCE(a.status::text, 'saved') AS application_status
FROM public.job_listings l
LEFT JOIN public.job_applications a
  ON a.listing_id = l.id AND a.user_id = public._query_user_id()
WHERE l.is_active = TRUE
ORDER BY match_score DESC;

-- Apply to first active job listing
INSERT INTO public.job_applications (user_id, listing_id, match_score, status)
SELECT public._query_user_id(), l.id, 94, 'applied'::public.application_status
FROM public.job_listings l
WHERE l.is_active = TRUE
ORDER BY l.posted_at DESC
LIMIT 1
ON CONFLICT (user_id, listing_id) DO NOTHING;


-- ═══════════════════════════════════════════════════════════════════════════════
-- STUDENT OS — MENTORS (/app/student/mentors)
-- ═══════════════════════════════════════════════════════════════════════════════

SELECT id, full_name, domain, bio, experience, rating, success_rate, hourly_rate, tags
FROM public.mentors
WHERE is_available = TRUE
ORDER BY rating DESC;

SELECT b.id, b.slot_time, b.status, m.full_name, m.domain
FROM public.mentor_bookings b
JOIN public.mentors m ON m.id = b.mentor_id
WHERE b.user_id = public._query_user_id()
ORDER BY b.slot_time DESC;

-- Book first available mentor for tomorrow
INSERT INTO public.mentor_bookings (user_id, mentor_id, slot_time, status, notes)
SELECT
  public._query_user_id(),
  m.id,
  NOW() + INTERVAL '1 day',
  'pending'::public.booking_status,
  'Career guidance session'
FROM public.mentors m
WHERE m.is_available = TRUE
ORDER BY m.rating DESC
LIMIT 1;


-- ═══════════════════════════════════════════════════════════════════════════════
-- STUDENT OS — AI COPILOT (/app/student/copilot)
-- ═══════════════════════════════════════════════════════════════════════════════

-- Create session (run this first, then message queries below)
INSERT INTO public.copilot_sessions (user_id, dashboard, title)
VALUES (public._query_user_id(), 'student', 'Career Planning')
RETURNING id;

-- Read messages from latest session
SELECT cm.sender, cm.content, cm.created_at
FROM public.copilot_messages cm
WHERE cm.session_id = (
  SELECT id FROM public.copilot_sessions
  WHERE user_id = public._query_user_id()
  ORDER BY created_at DESC
  LIMIT 1
)
ORDER BY cm.created_at ASC;

-- Add user message to latest session
INSERT INTO public.copilot_messages (session_id, sender, content)
SELECT
  cs.id,
  'user',
  'Help me improve my resume for ML roles'
FROM public.copilot_sessions cs
WHERE cs.user_id = public._query_user_id()
ORDER BY cs.created_at DESC
LIMIT 1;


-- ═══════════════════════════════════════════════════════════════════════════════
-- STUDENT OS — ACHIEVEMENT VAULT (/app/student/achievements)
-- ═══════════════════════════════════════════════════════════════════════════════

SELECT a.code, a.title, a.description, a.icon, a.points, a.category,
       (ua.id IS NOT NULL) AS earned, ua.earned_at
FROM public.achievements a
LEFT JOIN public.user_achievements ua
  ON ua.achievement_id = a.id AND ua.user_id = public._query_user_id()
WHERE a.dashboard = 'student'
ORDER BY earned DESC, a.points DESC;

INSERT INTO public.user_achievements (user_id, achievement_id)
SELECT public._query_user_id(), a.id
FROM public.achievements a
WHERE a.code = 'first_commit'
ON CONFLICT (user_id, achievement_id) DO NOTHING;


-- ═══════════════════════════════════════════════════════════════════════════════
-- STUDENT OS — REWARD CENTER (/app/student/rewards)
-- ═══════════════════════════════════════════════════════════════════════════════

SELECT r.id, r.code, r.title, r.description, r.coin_cost, r.reward_type,
       (ur.id IS NOT NULL) AS redeemed
FROM public.rewards r
LEFT JOIN public.user_rewards ur
  ON ur.reward_id = r.id AND ur.user_id = public._query_user_id()
WHERE r.is_active = TRUE;

-- Redeem cheapest active reward (if user has enough coins)
WITH target_reward AS (
  SELECT id, coin_cost FROM public.rewards
  WHERE is_active = TRUE
  ORDER BY coin_cost ASC
  LIMIT 1
),
redeem AS (
  UPDATE public.student_profiles sp
  SET coins = sp.coins - tr.coin_cost
  FROM target_reward tr
  WHERE sp.user_id = public._query_user_id()
    AND sp.coins >= tr.coin_cost
  RETURNING sp.coins, tr.id AS reward_id
)
INSERT INTO public.user_rewards (user_id, reward_id, ticket_code)
SELECT public._query_user_id(), r.reward_id, 'PH-' || upper(substr(md5(random()::text), 1, 8))
FROM redeem r;


-- ═══════════════════════════════════════════════════════════════════════════════
-- STUDENT OS — COMMUNITY (/app/student/community)
-- ═══════════════════════════════════════════════════════════════════════════════

SELECT e.id, e.title, e.description, e.event_date, e.tag, e.is_live,
       (SELECT COUNT(*) FROM public.community_registrations r WHERE r.event_id = e.id) AS attendees,
       (cr.id IS NOT NULL) AS is_registered
FROM public.community_events e
LEFT JOIN public.community_registrations cr
  ON cr.event_id = e.id AND cr.user_id = public._query_user_id()
ORDER BY e.event_date ASC;

-- Register for next upcoming event
INSERT INTO public.community_registrations (user_id, event_id)
SELECT public._query_user_id(), e.id
FROM public.community_events e
WHERE e.event_date >= NOW()
ORDER BY e.event_date ASC
LIMIT 1
ON CONFLICT (user_id, event_id) DO NOTHING;


-- ═══════════════════════════════════════════════════════════════════════════════
-- STUDENT OS — PROFILE (/profile)
-- ═══════════════════════════════════════════════════════════════════════════════

SELECT p.*, sp.level, sp.xp, sp.success_score, sp.career_goal, sp.degree, sp.year_of_study
FROM public.profiles p
LEFT JOIN public.student_profiles sp ON sp.user_id = p.id
WHERE p.id = public._query_user_id();

UPDATE public.profiles
SET
  full_name = 'Aryan Buha',
  bio = 'B.Tech CS student · AI & systems enthusiast',
  location = 'Bangalore, India',
  linkedin_url = 'https://linkedin.com/in/aryanbuha',
  github_url = 'https://github.com/aryanbuha'
WHERE id = public._query_user_id();


-- ═══════════════════════════════════════════════════════════════════════════════
-- FOUNDER OS QUERIES
-- ═══════════════════════════════════════════════════════════════════════════════

SELECT * FROM public.startup_profiles WHERE user_id = public._query_user_id();
SELECT * FROM public.startup_assessments WHERE user_id = public._query_user_id() ORDER BY created_at DESC LIMIT 1;
SELECT * FROM public.startup_tasks WHERE user_id = public._query_user_id() ORDER BY deadline ASC;
SELECT * FROM public.startup_documents WHERE user_id = public._query_user_id();


-- ═══════════════════════════════════════════════════════════════════════════════
-- RESEARCHER OS QUERIES
-- ═══════════════════════════════════════════════════════════════════════════════

SELECT * FROM public.researcher_profiles WHERE user_id = public._query_user_id();
SELECT * FROM public.research_projects WHERE user_id = public._query_user_id();
SELECT * FROM public.research_publications WHERE user_id = public._query_user_id() ORDER BY citations DESC;


-- ═══════════════════════════════════════════════════════════════════════════════
-- ADMIN OS QUERIES
-- ═══════════════════════════════════════════════════════════════════════════════

SELECT id, email, full_name, role, created_at
FROM public.profiles
ORDER BY created_at DESC
LIMIT 50;

SELECT
  COUNT(*) FILTER (WHERE role = 'student') AS students,
  COUNT(*) FILTER (WHERE role = 'founder') AS founders,
  COUNT(*) FILTER (WHERE role = 'researcher') AS researchers
FROM public.profiles;

-- Log admin action against first student profile
INSERT INTO public.admin_audit_logs (admin_id, action, target_type, target_id, metadata)
SELECT
  public._query_user_id(),
  'user_verified',
  'profile',
  p.id::text,
  '{"note":"Manual verification"}'::jsonb
FROM public.profiles p
WHERE p.role = 'student'
ORDER BY p.created_at
LIMIT 1;

SELECT * FROM public.support_tickets WHERE status = 'open' ORDER BY created_at ASC;
SELECT COALESCE(SUM(amount), 0) AS total_revenue FROM public.payments WHERE status = 'completed';
