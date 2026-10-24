-- Fitly Database Schema
-- Initial migration with all core tables

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================================================
-- PROFILES TABLE (extends auth.users)
-- ============================================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  level text check (level in ('Beginner', 'Intermediate', 'Advanced')) default 'Beginner',
  units text check (units in ('metric', 'imperial')) default 'metric',
  theme text check (theme in ('light', 'dark', 'system')) default 'system',
  week_starts_on integer check (week_starts_on between 0 and 6) default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS Policies for profiles
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Trigger to auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Updated at trigger
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- ============================================================
-- EXERCISES TABLE (Exercise library)
-- ============================================================
create table public.exercises (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  muscle_group text not null,
  secondary_muscles text[] default '{}',
  equipment text[] default '{}',
  difficulty text check (difficulty in ('Beginner', 'Intermediate', 'Advanced')) default 'Beginner',
  instructions text[] default '{}',
  video_url text,
  is_custom boolean default false,
  user_id uuid references auth.users on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Indexes
create index exercises_muscle_group_idx on public.exercises (muscle_group);
create index exercises_user_id_idx on public.exercises (user_id);
create index exercises_is_custom_idx on public.exercises (is_custom);

-- RLS Policies for exercises
alter table public.exercises enable row level security;

create policy "Anyone can view non-custom exercises"
  on public.exercises for select
  using (not is_custom);

create policy "Users can view own custom exercises"
  on public.exercises for select
  using (is_custom and user_id = auth.uid());

create policy "Users can create custom exercises"
  on public.exercises for insert
  with check (is_custom = true and user_id = auth.uid());

create policy "Users can update own custom exercises"
  on public.exercises for update
  using (is_custom = true and user_id = auth.uid());

create policy "Users can delete own custom exercises"
  on public.exercises for delete
  using (is_custom = true and user_id = auth.uid());

-- ============================================================
-- WORKOUTS TABLE (Workout plans/templates)
-- ============================================================
create table public.workouts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  name text not null,
  description text,
  type text check (type in ('Strength', 'Cardio', 'HIIT', 'Yoga', 'Mobility', 'Custom')) default 'Custom',
  level text check (level in ('Beginner', 'Intermediate', 'Advanced', 'All Levels')) default 'All Levels',
  duration_minutes integer,
  sessions_per_week integer,
  total_sessions integer,
  is_public boolean default false,
  is_template boolean default true,
  tags text[] default '{}',
  color text default '#FFC629',
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Indexes
create index workouts_user_id_idx on public.workouts (user_id);
create index workouts_is_template_idx on public.workouts (is_template);
create index workouts_type_idx on public.workouts (type);

-- RLS Policies for workouts
alter table public.workouts enable row level security;

create policy "Users can view public templates and own workouts"
  on public.workouts for select
  using (is_template = true or user_id = auth.uid());

create policy "Users can manage own workouts"
  on public.workouts for all
  using (user_id = auth.uid());

create trigger workouts_updated_at
  before update on public.workouts
  for each row execute procedure public.handle_updated_at();

-- ============================================================
-- WORKOUT_EXERCISES TABLE (Exercises in a workout plan)
-- ============================================================
create table public.workout_exercises (
  id uuid default gen_random_uuid() primary key,
  workout_id uuid references public.workouts on delete cascade,
  exercise_id uuid references public.exercises on delete cascade,
  order_index integer not null,
  sets integer not null default 3,
  reps_target text default '8-12',
  rest_seconds integer default 90,
  notes text,
  superset_group integer,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Indexes
create index workout_exercises_workout_id_idx on public.workout_exercises (workout_id);
create index workout_exercises_exercise_id_idx on public.workout_exercises (exercise_id);

-- RLS Policies
alter table public.workout_exercises enable row level security;

create policy "Users can view workout exercises for accessible workouts"
  on public.workout_exercises for select
  using (
    workout_id in (
      select id from public.workouts where is_template = true or user_id = auth.uid()
    )
  );

create policy "Users can manage workout exercises for own workouts"
  on public.workout_exercises for all
  using (
    workout_id in (select id from public.workouts where user_id = auth.uid())
  );

-- ============================================================
-- WORKOUT_SESSIONS TABLE (User's actual workout instances)
-- ============================================================
create table public.workout_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  workout_id uuid references public.workouts on delete set null,
  name text,
  status text check (status in ('in_progress', 'completed', 'paused', 'cancelled')) default 'in_progress',
  started_at timestamp with time zone default timezone('utc'::text, now()),
  completed_at timestamp with time zone,
  duration_seconds integer,
  total_volume_lbs numeric,
  total_volume_kg numeric,
  calories_burned integer,
  avg_heart_rate integer,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Indexes
create index workout_sessions_user_id_idx on public.workout_sessions (user_id);
create index workout_sessions_workout_id_idx on public.workout_sessions (workout_id);
create index workout_sessions_status_idx on public.workout_sessions (status);
create index workout_sessions_started_at_idx on public.workout_sessions (started_at desc);

-- RLS Policies
alter table public.workout_sessions enable row level security;

create policy "Users can manage own sessions"
  on public.workout_sessions for all
  using (user_id = auth.uid());

create trigger workout_sessions_updated_at
  before update on public.workout_sessions
  for each row execute procedure public.handle_updated_at();

-- ============================================================
-- SETS TABLE (Individual set data)
-- ============================================================
create table public.sets (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references public.workout_sessions on delete cascade not null,
  workout_exercise_id uuid references public.workout_exercises on delete cascade,
  exercise_id uuid references public.exercises on delete cascade not null,
  set_number integer not null,
  weight_lbs numeric,
  weight_kg numeric,
  reps integer,
  rpe numeric check (rpe between 1 and 10),
  rest_seconds integer,
  completed boolean default false,
  completed_at timestamp with time zone,
  is_warmup boolean default false,
  is_dropset boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Indexes
create index sets_session_id_idx on public.sets (session_id);
create index sets_exercise_id_idx on public.sets (exercise_id);
create index sets_workout_exercise_id_idx on public.sets (workout_exercise_id);

-- RLS Policies
alter table public.sets enable row level security;

create policy "Users can manage own sets"
  on public.sets for all
  using (
    session_id in (
      select id from public.workout_sessions where user_id = auth.uid()
    )
  );

-- ============================================================
-- ACHIEVEMENTS TABLE (System achievements)
-- ============================================================
create table public.achievements (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  name text not null,
  description text,
  icon text,
  color text,
  target_value integer not null,
  target_type text check (target_type in ('count', 'streak', 'volume', 'weight', 'duration')) not null,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS - Public read access
alter table public.achievements enable row level security;

create policy "Anyone can view achievements"
  on public.achievements for select
  using (true);

-- ============================================================
-- USER_ACHIEVEMENTS TABLE (User progress on achievements)
-- ============================================================
create table public.user_achievements (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  achievement_id uuid references public.achievements on delete cascade not null,
  progress integer default 0,
  unlocked_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, achievement_id)
);

-- Indexes
create index user_achievements_user_id_idx on public.user_achievements (user_id);
create index user_achievements_achievement_id_idx on public.user_achievements (achievement_id);

-- RLS Policies
alter table public.user_achievements enable row level security;

create policy "Users can view own achievements"
  on public.user_achievements for select
  using (user_id = auth.uid());

create policy "Users can update own achievements"
  on public.user_achievements for update
  using (user_id = auth.uid());

create policy "Users can insert own achievements"
  on public.user_achievements for insert
  with check (user_id = auth.uid());

create trigger user_achievements_updated_at
  before update on public.user_achievements
  for each row execute procedure public.handle_updated_at();

-- ============================================================
-- USER_SETTINGS TABLE
-- ============================================================
create table public.user_settings (
  user_id uuid references auth.users on delete cascade primary key,
  -- Notifications
  workout_reminders boolean default true,
  progress_updates boolean default true,
  achievement_alerts boolean default true,
  social_activity boolean default false,
  marketing_emails boolean default false,
  -- Workout
  auto_rest_timer boolean default true,
  haptic_feedback boolean default true,
  voice_cues boolean default false,
  auto_progress_tracking boolean default true,
  rest_day_reminders boolean default true,
  -- Privacy
  profile_visibility text check (profile_visibility in ('public', 'friends', 'private')) default 'friends',
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS Policies
alter table public.user_settings enable row level security;

create policy "Users can manage own settings"
  on public.user_settings for all
  using (user_id = auth.uid());

create trigger user_settings_updated_at
  before update on public.user_settings
  for each row execute procedure public.handle_updated_at();

-- Auto-create settings on profile creation
create or replace function public.handle_new_user_settings()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.user_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

create trigger on_profile_created
  after insert on public.profiles
  for each row execute procedure public.handle_new_user_settings();

-- ============================================================
-- BODY_METRICS TABLE
-- ============================================================
create table public.body_metrics (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  date date not null,
  weight_lbs numeric,
  weight_kg numeric,
  body_fat_pct numeric,
  muscle_mass_lbs numeric,
  muscle_mass_kg numeric,
  chest_cm numeric,
  waist_cm numeric,
  hips_cm numeric,
  bicep_cm numeric,
  thigh_cm numeric,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, date)
);

-- Indexes
create index body_metrics_user_id_idx on public.body_metrics (user_id);
create index body_metrics_date_idx on public.body_metrics (date desc);

-- RLS Policies
alter table public.body_metrics enable row level security;

create policy "Users can manage own metrics"
  on public.body_metrics for all
  using (user_id = auth.uid());

-- ============================================================
-- SEED DATA: Default Exercises
-- ============================================================
insert into public.exercises (name, muscle_group, secondary_muscles, equipment, difficulty, instructions) values
  ('Bench Press', 'Chest', '{"Triceps", "Front Delts"}', '{"Barbell", "Bench"}', 'Intermediate', '{"Lie on bench, grip bar slightly wider than shoulders", "Lower bar to mid-chest with control", "Press bar back up to starting position"}'),
  ('Push-Ups', 'Chest', '{"Triceps", "Front Delts", "Core"}', '{}', 'Beginner', '{"Start in plank position, hands slightly wider than shoulders", "Lower body until chest nearly touches floor", "Push back up to starting position"}'),
  ('Pull-Ups', 'Back', '{"Biceps", "Rear Delts"}', '{"Pull-up Bar"}', 'Intermediate', '{"Hang from bar with palms facing away", "Pull body up until chin clears bar", "Lower with control"}'),
  ('Barbell Rows', 'Back', '{"Biceps", "Rear Delts"}', '{"Barbell"}', 'Intermediate', '{"Hinge at hips, torso ~45 degrees", "Pull bar to lower chest/upper abs", "Lower with control"}'),
  ('Overhead Press', 'Shoulders', '{"Triceps", "Upper Chest"}', '{"Barbell"}', 'Intermediate', '{"Stand with bar at shoulder level", "Press overhead until arms locked out", "Lower to starting position"}'),
  ('Squat', 'Legs', '{"Glutes", "Core"}', '{"Barbell", "Squat Rack"}', 'Intermediate', '{"Bar on upper traps, feet shoulder-width", "Descend until thighs parallel", "Drive through heels to stand"}'),
  ('Deadlift', 'Back', '{"Legs", "Glutes", "Traps"}', '{"Barbell"}', 'Advanced', '{"Feet hip-width, grip bar outside legs", "Keep back flat, drive through heels", "Stand tall, lower with control"}'),
  ('Lunges', 'Legs', '{"Glutes"}', '{}', 'Beginner', '{"Step forward, lower back knee toward floor", "Keep front knee over ankle", "Push back to start"}'),
  ('Plank', 'Core', '{}', '{}', 'Beginner', '{"Forearms on floor, body in straight line", "Engage core and glutes", "Hold position"}'),
  ('Running', 'Cardio', '{}', '{}', 'Beginner', '{"Start with walk/jog intervals", "Maintain conversational pace", "Gradually increase duration"}'),
  ('Cycling', 'Cardio', '{}', '{"Bike"}', 'Beginner', '{"Adjust seat height", "Maintain steady cadence", "Vary resistance"}'),
  ('Yoga Flow', 'Mobility', '{}', '{"Yoga Mat"}', 'Beginner', '{"Move through poses with breath", "Hold each pose 5-10 breaths", "Focus on alignment"}');

-- ============================================================
-- SEED DATA: Default Achievements
-- ============================================================
insert into public.achievements (key, name, description, icon, color, target_value, target_type, category) values
  ('first_workout', 'First Workout', 'Complete your first workout', 'checkmark.circle.fill', '#FFC629', 1, 'count', 'Getting Started'),
  ('week_warrior', 'Week Warrior', 'Workout 5 days in a week', 'calendar.badge.checkmark', '#1A7F50', 5, 'count', 'Consistency'),
  ('century_club', 'Century Club', 'Complete 100 workouts', '100.circle.fill', '#5B3DF5', 100, 'count', 'Milestones'),
  ('iron_will', 'Iron Will', '30 day workout streak', 'flame.fill', '#E03A45', 30, 'streak', 'Consistency'),
  ('heavy_lifter', 'Heavy Lifter', 'Lift 100,000 lbs total volume', 'scalemass.fill', '#C9B4FF', 100000, 'volume', 'Strength'),
  ('early_bird', 'Early Bird', '10 workouts before 7 AM', 'sunrise.fill', '#FFC629', 10, 'count', 'Consistency'),
  ('marathoner', 'Marathoner', 'Run 100km total', 'figure.run', '#1A7F50', 100, 'distance', 'Cardio'),
  ('perfect_week', 'Perfect Week', 'Complete all scheduled workouts in a week', 'star.fill', '#FFC629', 7, 'count', 'Consistency'),
  ('pr_hunter', 'PR Hunter', 'Set 10 personal records', 'trophy.fill', '#5B3DF5', 10, 'count', 'Strength'),
  ('night_owl', 'Night Owl', '10 workouts after 9 PM', 'moon.fill', '#C9B4FF', 10, 'count', 'Consistency');