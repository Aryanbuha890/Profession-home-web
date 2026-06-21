-- =============================================================================
-- PROFESSIONAL HOME — SEED DATA (catalog + demo content)
-- Run AFTER schema.sql
-- Does NOT create auth users — create those in Supabase Dashboard (see seed-test-users.md)
-- =============================================================================

-- ─── ACHIEVEMENTS (Student OS) ───────────────────────────────────────────────
INSERT INTO public.achievements (code, title, description, icon, points, category, dashboard) VALUES
  ('first_commit',   'First Commit',        'Pushed first GitHub repo',              '🚀', 100, 'Projects',    'student'),
  ('streak_warrior', 'Streak Warrior',      '7-day active learning streak',        '🔥', 100, 'Engagement',  'student'),
  ('algo_master',    'Algo Master',         'Solved 50 coding challenges',         '🧠', 150, 'Challenges',  'student'),
  ('team_player',    'Team Player',         'Collaborated on 3 projects',          '🤝', 100, 'Community',   'student'),
  ('ai_pioneer',     'AI Pioneer',          'Completed AI Assessment',             '🤖', 100, 'Assessment',  'student'),
  ('pitch_perfect',  'Pitch Perfect',       'Delivered first mock pitch',          '🎯', 150, 'Arena',       'student'),
  ('published',      'Published',           'Submit a research paper',             '📄', 200, 'Research',    'student'),
  ('grand_finale',   'Grand Finale',        'Land your target internship',         '🎓', 500, 'Career',      'student')
ON CONFLICT (code) DO NOTHING;

-- ─── REWARDS (Reward Center) ─────────────────────────────────────────────────
INSERT INTO public.rewards (code, title, description, coin_cost, reward_type) VALUES
  ('mentor_voucher',  'Mentor Session Voucher',  '1-on-1 mentor session (30 min)',     200, 'voucher'),
  ('resume_audit',    'Resume Deep Audit',       'AI + expert resume review',          150, 'service'),
  ('arena_pass',      'Arena VIP Pass',          'Priority arena demo slot',           300, 'pass'),
  ('course_unlock',   'Premium Course Unlock',   'Unlock 1 premium skill course',    100, 'digital'),
  ('summit_ticket',   'Career Summit Ticket',    'VIP entry to annual summit',         500, 'ticket')
ON CONFLICT (code) DO NOTHING;

-- ─── MENTORS ─────────────────────────────────────────────────────────────────
INSERT INTO public.mentors (full_name, domain, bio, experience, rating, success_rate, hourly_rate, tags) VALUES
  ('Dr. Helena Chen', 'ML Research',    'Neural architecture & model compression specialist.', '12 yrs · MIT PhD', 5.0, 97, '₹2,400/hr', ARRAY['Deep Learning','NLP','Research']),
  ('Marco Rossi',     'SDE Placements', 'Ex-Meta senior engineer. System design expert.',      '8 yrs · ex-Meta',  4.9, 94, '₹1,800/hr', ARRAY['DSA','System Design','FAANG']),
  ('Priya Raghavan',  'Product Strategy','Growth loops & PM placement coach.',                 '9 yrs · ex-Razorpay',4.9, 96, '₹1,800/hr', ARRAY['PM','Growth','Strategy']),
  ('Rohan Iyer',      'Startup Funding','2 exits. Pitch deck & investor outreach.',            '6 yrs · 2 exits',  4.8, 90, '₹2,000/hr', ARRAY['Fundraising','Pitch','Startup']);

-- ─── INTERNSHIP LISTINGS ─────────────────────────────────────────────────────
INSERT INTO public.internship_listings (company, role_title, location, type, match_min, description) VALUES
  ('OpenAI',    'ML Engineering Intern',  'San Francisco', 'Summer 2026', 90, 'Work on frontier model training infrastructure.'),
  ('Anthropic', 'Research Intern',        'Remote',        'Fall 2026',   88, 'Alignment and safety research assistant role.'),
  ('Stripe',    'Backend Intern',         'Bangalore',     'Summer 2026', 85, 'Payments API and distributed systems.'),
  ('Google',    'Data Science Intern',    'Hyderabad',     'Summer 2026', 87, 'Analytics and ML pipeline development.');

-- ─── JOB LISTINGS ────────────────────────────────────────────────────────────
INSERT INTO public.job_listings (company, role_title, location, salary_range, match_min, description) VALUES
  ('Microsoft',  'SDE I',            'Noida',     '₹28–32 LPA', 90, 'Full-time new grad software engineer.'),
  ('NVIDIA',     'ML Engineer',      'Pune',      '₹35–40 LPA', 88, 'GPU-accelerated ML systems role.'),
  ('Razorpay',   'Product Analyst',  'Bangalore', '₹18–22 LPA', 85, 'Growth and payments analytics.'),
  ('Jane Street', 'Systems Engineer', 'Mumbai',    '₹45+ LPA',   92, 'Low-latency trading systems.');

-- ─── COMMUNITY EVENTS ────────────────────────────────────────────────────────
INSERT INTO public.community_events (title, description, event_date, tag, is_live) VALUES
  ('Resume Roast Workshop',      'Live resume feedback with industry mentors.',     NOW() + INTERVAL '2 hours',  'Live',       TRUE),
  ('System Design Study Group',  'Peer-led system design case discussions.',        NOW() + INTERVAL '2 days',   'Registered', FALSE),
  ('Mock Interview Arena',       'Simulated technical + behavioral interviews.',    NOW() + INTERVAL '4 days',   'Open',       FALSE),
  ('Open Source Sprint',         'Contribute to community OSS projects together.',  NOW() + INTERVAL '5 days',   'Open',       FALSE);
