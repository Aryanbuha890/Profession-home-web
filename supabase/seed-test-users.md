# Supabase Setup & Test Login Credentials

## Step 1 — Create Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **New Project**
3. Copy your **Project URL** and **anon public key** from **Settings → API**

## Step 2 — Add Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Step 3 — Run SQL (in order)

In **Supabase → SQL Editor**, run these files **one full file at a time**:

| Order | File | Purpose |
|-------|------|---------|
| 1 | `supabase/schema.sql` | All tables, RLS, triggers |
| 2 | `supabase/seed-data.sql` | Mentors, jobs, achievements, events |
| 3 | `supabase/setup-demo-user.sql` | **Creates 4 test users + profiles automatically** |
| 4 | `supabase/queries.sql` | Feature queries (one section at a time) |

> You do **not** need to manually create users in the Dashboard — `setup-demo-user.sql` creates them.

## Step 4 — (Optional) Manual users

Only needed if SQL seed fails. Go to **Authentication → Users → Add User**:

| Dashboard | Email | Password | User Metadata (optional) |
|-----------|-------|----------|--------------------------|
| **Student OS** | `student@test.profhome.com` | `Test@123456` | `{"role":"student","full_name":"Test Student"}` |
| **Researcher OS** | `researcher@test.profhome.com` | `Test@123456` | `{"role":"researcher","full_name":"Test Researcher"}` |
| **Founder OS** | `founder@test.profhome.com` | `Test@123456` | `{"role":"founder","full_name":"Test Founder"}` |
| **Admin** | `admin@test.profhome.com` | `Test@123456` | `{"role":"admin","full_name":"Test Admin"}` |

> ✅ Check **Auto Confirm User** when creating each account.

The `handle_new_user` trigger automatically creates the matching profile row and role-specific tables.

---

## Login Credentials (After Supabase Setup)

Use these on the **Login page** (`/login`):

### Student OS
- **Email:** `student@test.profhome.com`
- **Password:** `Test@123456`
- **Routes to:** `/app/student`

### Researcher OS
- **Email:** `researcher@test.profhome.com`
- **Password:** `Test@123456`
- **Routes to:** `/dashboard?tab=home`

### Founder OS
- **Email:** `founder@test.profhome.com`
- **Password:** `Test@123456`
- **Routes to:** `/app/startup`

### Admin Control Tower
- **Email:** `admin@test.profhome.com`
- **Password:** `Test@123456`
- **Routes to:** `/app/admin`

---

## Without Supabase (Mock Mode)

If `.env.local` is not configured, the same credentials above still work via mock auth — no database required.

---

## Fix CSS / Unstyled Page

If you see a white unstyled page:

1. **Stop** the dev server (`Ctrl+C`)
2. **Delete** the `.next` folder
3. Run `npm run dev` again
4. Visit `/app/student` (not `/dashboard?tab=home`)

The CSS fix updates Tailwind `@source` paths so all component styles are compiled correctly.
