# Fitly - Functional App Implementation Plan

## Current State Analysis

**What's Working:**
- ✅ Expo Router navigation with 4 tabs (Home, Workouts, Progress, Profile)
- ✅ Complete design system (colors, typography, spacing, shadows, radius)
- ✅ 15+ reusable UI components (Button, Card, Text, TextField, Icon, Badge, Chip, Toggle, SegmentedControl, Stepper, Alert, Card, IconButton)
- ✅ Custom Plus Jakarta Sans font loading
- ✅ Well-structured screens with mock data
- ✅ Workout detail screen with 4 tabs (Overview, Exercises, Schedule, Stats)
- ✅ TypeScript types for data models

**What's Missing (Critical for Functionality):**
- ❌ **No backend/data layer** - All data is hardcoded mock data
- ❌ **No authentication** - No login/signup, user session management
- ❌ **No data persistence** - Workout progress, settings, achievements don't save
- ❌ **No real workout tracking** - "Start Workout" buttons are non-functional
- ❌ **Supabase installed but not configured** - No client, no database schema
- ❌ **Missing screens** - 15+ routes referenced don't exist
- ❌ **No state management** - No global state (auth, user data, workout state)
- ❌ **No API layer** - No services for data fetching/mutations

---

## Implementation Phases

### Phase 1: Foundation & Backend Setup (Week 1)

#### 1.1 Supabase Configuration
- [ ] Create Supabase project
- [ ] Configure `app.config.js` / `app.json` with Supabase URL and anon key
- [ ] Create `src/lib/supabase.ts` - Supabase client singleton
- [ ] Set up TypeScript types for database (`src/types/database.ts`)

#### 1.2 Database Schema (PostgreSQL via Supabase)
```sql
-- Core tables needed:
-- profiles (extends auth.users)
-- workouts (workout plans/templates)
-- workout_sessions (user's workout instances)
-- exercises (exercise library)
-- workout_exercises (junction: session + exercise + sets)
-- sets (individual set data: weight, reps, rpe, completed)
-- achievements (system achievements)
-- user_achievements (user progress)
-- user_settings (preferences)
-- body_metrics (weight, body fat, measurements)
```

#### 1.3 Authentication System
- [ ] Auth context provider (`src/context/AuthContext.tsx`)
- [ ] Login screen (`src/app/(auth)/login.tsx`)
- [ ] Signup screen (`src/app/(auth)/signup.tsx`)
- [ ] Password reset flow
- [ ] Session persistence with `expo-secure-store`
- [ ] Protected route wrapper

#### 1.4 State Management
- [ ] Choose approach: React Context + useReducer OR Zustand
- [ ] Global stores: AuthStore, UserProfileStore, WorkoutStore, SettingsStore
- [ ] Persist critical state to AsyncStorage/SecureStore

---

### Phase 2: Core Data Layer (Week 1-2)

#### 2.1 API Service Layer (`src/services/`)
- [ ] `api/workouts.ts` - CRUD for workout plans, sessions
- [ ] `api/exercises.ts` - Exercise library search/filter
- [ ] `api/profile.ts` - User profile, stats, settings
- [ ] `api/progress.ts` - Analytics, charts data
- [ ] `api/achievements.ts` - Achievement tracking
- [ ] Error handling, loading states, retry logic

#### 2.2 Custom Hooks (`src/hooks/`)
- [ ] `useWorkouts()` - Fetch/filter workout plans
- [ ] `useWorkoutSession(id)` - Active workout session management
- [ ] `useExercises()` - Exercise library
- [ ] `useProfile()` - User profile & stats
- [ ] `useProgress(range)` - Progress analytics
- [ ] `useAchievements()` - Achievement state
- [ ] `useSettings()` - User preferences

#### 2.3 Replace Mock Data
- [ ] Home screen: Real today's workout, stats, recent workouts, achievements
- [ ] Workouts screen: Real workout plans from DB with search/filter
- [ ] Progress screen: Real analytics from workout sessions
- [ ] Profile screen: Real user data, functional settings toggles

---

### Phase 3: Workout Tracking Feature (Week 2-3)

#### 3.1 Active Workout Session
- [ ] Create workout session on "Start Workout"
- [ ] Live workout screen (`src/app/workouts/active/[sessionId].tsx`)
- [ ] Exercise list with set tracking (weight, reps, RPE, rest timer)
- [ ] Set completion with haptic feedback
- [ ] Rest timer with notifications
- [ ] Auto-save progress to Supabase (realtime or periodic)
- [ ] Previous session data for progressive overload suggestions

#### 3.2 Exercise Execution UI
- [ ] Set grid component (sets × reps × weight)
- [ ] Quick weight/reps adjustment (+/- buttons)
- [ ] RPE selector
- [ ] Rest timer with circular progress
- [ ] Superset/circuit grouping support
- [ ] Exercise notes

#### 3.3 Workout Completion
- [ ] Session summary screen
- [ ] Volume/calories calculation
- [ ] Achievement checking
- [ ] Share workout functionality
- [ ] Return to home with updated stats

---

### Phase 4: Missing Screens & Navigation (Week 3)

#### 4.1 Profile Section Screens
- [ ] `/profile/edit` - Edit profile (name, avatar, level)
- [ ] `/profile/subscription` - Subscription management (Stripe)
- [ ] `/profile/connected-apps` - Apple Health, Google Fit, Strava
- [ ] `/profile/data-privacy` - Data export, deletion
- [ ] `/profile/units` - Metric/Imperial toggle
- [ ] `/profile/theme` - Light/Dark/System
- [ ] `/profile/help` - Help center
- [ ] `/profile/feedback` - Feedback form
- [ ] `/profile/terms` - Terms of Service
- [ ] `/profile/privacy` - Privacy Policy
- [ ] `/profile/licenses` - Open source licenses

#### 4.2 Workout Section Screens
- [ ] `/workouts/start` - Quick start workout builder
- [ ] `/workouts/history` - Full workout history with filters
- [ ] `/workouts/create` - Custom workout creator
- [ ] `/log` - Quick activity logging

#### 4.3 Progress Section Screens
- [ ] `/progress/records` - All personal records
- [ ] `/progress/achievements` - Full achievement list
- [ ] `/progress/body-metrics` - Weight, measurements tracking

#### 4.4 Other Screens
- [ ] `/plans/create` - Workout plan builder
- [ ] `/gyms` - Gym finder (map integration)

---

### Phase 5: Advanced Features (Week 3-4)

#### 5.1 Real-time Features
- [ ] Live workout sync across devices
- [ ] Social features (follow, leaderboards) - optional
- [ ] Push notifications for reminders

#### 5.2 Health Integration
- [ ] Apple HealthKit (`expo-health`)
- [ ] Google Health Connect
- [ ] Sync workouts, heart rate, calories

#### 5.3 Subscription & Payments
- [ ] Stripe integration (already installed)
- [ ] Pro features gating
- [ ] Restore purchases

#### 5.4 Offline Support
- [ ] Local-first database (WatermelonDB or SQLite)
- [ ] Sync when online
- [ ] Conflict resolution

---

### Phase 6: Polish & Production (Week 4)

#### 6.1 Testing
- [ ] Unit tests for hooks/services
- [ ] Integration tests for auth flow
- [ ] E2E tests for critical paths (Maestro/Detox)

#### 6.2 Performance
- [ ] Lazy load screens
- [ ] Optimize images (expo-image)
- [ ] FlatList virtualization for long lists
- [ ] Memoization for expensive computations

#### 6.3 Accessibility
- [ ] Screen reader labels
- [ ] Dynamic type support
- [ ] Contrast ratios
- [ ] Haptic feedback consistency

#### 6.4 App Store Preparation
- [ ] App icons, splash screens (all sizes)
- [ ] Store listings, screenshots
- [ ] Privacy policy URL
- [ ] EAS Build configuration
- [ ] TestFlight / Internal testing

---

## File Structure Target

```
src/
├── app/
│   ├── _layout.tsx                 # Root layout (exists)
│   ├── (auth)/                     # Auth stack
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── (tabs)/                     # Main tabs (exists)
│   │   ├── _layout.tsx
│   │   ├── index.tsx               # Home
│   │   ├── workouts.tsx
│   │   ├── progress.tsx
│   │   └── profile.tsx
│   ├── workouts/
│   │   ├── [id].tsx                # Workout detail (exists)
│   │   ├── active/[sessionId].tsx  # Live workout (NEW)
│   │   ├── start.tsx               # Quick start (NEW)
│   │   ├── history.tsx             # History (NEW)
│   │   └── create.tsx              # Custom workout (NEW)
│   ├── progress/
│   │   ├── records.tsx             # PRs (NEW)
│   │   ├── achievements.tsx        # All achievements (NEW)
│   │   └── body-metrics.tsx        # Body tracking (NEW)
│   ├── profile/
│   │   ├── edit.tsx                # Edit profile (NEW)
│   │   ├── subscription.tsx        # Subscription (NEW)
│   │   ├── connected-apps.tsx      # Health integrations (NEW)
│   │   ├── data-privacy.tsx        # Privacy (NEW)
│   │   ├── units.tsx               # Units (NEW)
│   │   ├── theme.tsx               # Theme (NEW)
│   │   ├── help.tsx                # Help (NEW)
│   │   ├── feedback.tsx            # Feedback (NEW)
│   │   ├── terms.tsx               # Terms (NEW)
│   │   ├── privacy.tsx             # Privacy (NEW)
│   │   └── licenses.tsx            # Licenses (NEW)
│   └── log.tsx                     # Quick log (NEW)
│
├── components/
│   ├── ui/                         # Design system (exists)
│   ├── workout/                    # Workout-specific components
│   │   ├── ExerciseCard.tsx
│   │   ├── SetGrid.tsx
│   │   ├── RestTimer.tsx
│   │   ├── WorkoutHeader.tsx
│   │   └── SessionSummary.tsx
│   ├── progress/                   # Progress-specific
│   │   ├── StatCard.tsx
│   │   ├── ChartBar.tsx
│   │   ├── MuscleDistribution.tsx
│   │   └── AchievementCard.tsx
│   └── common/                     # Shared
│       ├── LoadingSkeleton.tsx
│       ├── EmptyState.tsx
│       └── ErrorBoundary.tsx
│
├── context/
│   ├── AuthContext.tsx
│   ├── WorkoutContext.tsx
│   └── SettingsContext.tsx
│
├── hooks/
│   ├── useAuth.ts
│   ├── useWorkouts.ts
│   ├── useWorkoutSession.ts
│   ├── useExercises.ts
│   ├── useProfile.ts
│   ├── useProgress.ts
│   ├── useAchievements.ts
│   └── useSettings.ts
│
├── services/
│   ├── api/
│   │   ├── workouts.ts
│   │   ├── exercises.ts
│   │   ├── profile.ts
│   │   ├── progress.ts
│   │   └── achievements.ts
│   ├── supabase.ts                 # Client config
│   ├── storage.ts                  # AsyncStorage wrapper
│   └── notifications.ts            # Push notifications
│
├── lib/
│   ├── cn.ts                       # Exists
│   ├── supabase.ts                 # Supabase client
│   ├── date.ts                     # Date helpers
│   ├── calculations.ts             # Volume, 1RM, calories
│   └── validation.ts               # Form validation
│
├── types/
│   ├── database.ts                 # Supabase types
│   ├── workout.ts
│   ├── exercise.ts
│   ├── profile.ts
│   └── progress.ts
│
├── theme/                          # Exists
│   ├── index.ts
│   └── motion.ts
│
└── constants/
    ├── exercises.ts                # Exercise library
    ├── muscles.ts
    └── achievements.ts
```

---

## Priority Order (What to Build First)

### Must Have (MVP - 2 weeks)
1. Supabase setup + Auth
2. Database schema + types
3. Auth screens + context
4. Replace mock data with real API calls on 4 main tabs
5. Basic workout session tracking (start → log sets → complete)

### Should Have (2-3 weeks)
6. All missing profile screens
7. Workout history & custom workout creation
8. Progress details (records, achievements, body metrics)
9. Settings persistence

### Nice to Have (3-4 weeks)
10. HealthKit/Google Fit integration
11. Stripe subscriptions
12. Push notifications
13. Offline support
14. Social features

---

## Dependencies to Add

```bash
# Auth & Storage
npx expo install expo-secure-store @react-native-async-storage/async-storage

# Forms & Validation
npx expo install react-hook-form @hookform/resolvers zod

# State Management (choose one)
npx expo install zustand
# OR use React Context (no install needed)

# Date handling
npx expo install date-fns

# Health (Phase 5)
npx expo install expo-health

# Notifications (Phase 5)
npx expo install expo-notifications expo-device expo-constants

# Charts (if not custom)
npx expo install react-native-gifted-charts
# OR victory-native

# Image handling
npx expo install expo-image expo-image-picker

# Haptics
npx expo install expo-haptics
```

---

## Database Schema Detail (Supabase)

### `profiles` table
```sql
create table profiles (
  id uuid references auth.users primary key,
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

-- RLS: users can only see/edit their own profile
alter table profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
```

### `workouts` table (workout plans/templates)
```sql
create table workouts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  name text not null,
  description text,
  type text check (type in ('Strength', 'Cardio', 'HIIT', 'Yoga', 'Mobility', 'Custom')),
  level text check (level in ('Beginner', 'Intermediate', 'Advanced', 'All Levels')),
  duration_minutes integer,
  sessions_per_week integer,
  total_sessions integer,
  is_public boolean default false,
  is_template boolean default true,
  tags text[],
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS
alter table workouts enable row level security;
create policy "Users can view public templates and own workouts" on workouts for select using (is_template = true or user_id = auth.uid());
create policy "Users can manage own workouts" on workouts for all using (user_id = auth.uid());
```

### `exercises` table (exercise library)
```sql
create table exercises (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  muscle_group text not null,
  secondary_muscles text[],
  equipment text[],
  difficulty text check (difficulty in ('Beginner', 'Intermediate', 'Advanced')),
  instructions text[],
  video_url text,
  is_custom boolean default false,
  user_id uuid references auth.users on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

### `workout_exercises` table (exercises in a workout plan)
```sql
create table workout_exercises (
  id uuid default gen_random_uuid() primary key,
  workout_id uuid references workouts on delete cascade,
  exercise_id uuid references exercises on delete cascade,
  order_index integer not null,
  sets integer not null,
  reps_target text, -- e.g., "8-10", "12-15"
  rest_seconds integer default 90,
  notes text,
  superset_group integer, -- for supersets/circuits
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

### `workout_sessions` table (user's actual workout instances)
```sql
create table workout_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  workout_id uuid references workouts on delete set null,
  name text, -- for custom/quick workouts
  status text check (status in ('in_progress', 'completed', 'paused', 'cancelled')) default 'in_progress',
  started_at timestamp with time zone default timezone('utc'::text, now()),
  completed_at timestamp with time zone,
  duration_seconds integer,
  total_volume_lbs numeric,
  calories_burned integer,
  avg_heart_rate integer,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table workout_sessions enable row level security;
create policy "Users can manage own sessions" on workout_sessions for all using (user_id = auth.uid());
```

### `sets` table (individual set data)
```sql
create table sets (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references workout_sessions on delete cascade,
  workout_exercise_id uuid references workout_exercises on delete cascade,
  exercise_id uuid references exercises on delete cascade,
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

alter table sets enable row level security;
create policy "Users can manage own sets" on sets for all using (
  session_id in (select id from workout_sessions where user_id = auth.uid())
);
```

### `achievements` & `user_achievements`
```sql
create table achievements (
  id uuid default gen_random_uuid() primary key,
  key text unique not null, -- e.g., 'first_workout', 'week_warrior'
  name text not null,
  description text,
  icon text,
  color text,
  target_value integer,
  target_type text, -- 'count', 'streak', 'volume', 'weight'
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table user_achievements (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  achievement_id uuid references achievements on delete cascade,
  progress integer default 0,
  unlocked_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, achievement_id)
);

alter table user_achievements enable row level security;
create policy "Users can view own achievements" on user_achievements for select using (user_id = auth.uid());
```

### `user_settings`
```sql
create table user_settings (
  user_id uuid references auth.users primary key,
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

alter table user_settings enable row level security;
create policy "Users can manage own settings" on user_settings for all using (user_id = auth.uid());
```

### `body_metrics`
```sql
create table body_metrics (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
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

alter table body_metrics enable row level security;
create policy "Users can manage own metrics" on body_metrics for all using (user_id = auth.uid());
```

---

## Quick Start Commands

```bash
# 1. Initialize Supabase (run once)
npx supabase init
npx supabase start  # local dev
# OR use cloud: npx supabase link --project-ref <ref>

# 2. Generate types from schema
npx supabase gen types typescript --local > src/types/database.ts

# 3. Run migrations
npx supabase db push

# 4. Start development
npx expo start
```

---

## Notes

- **Expo SDK 58** - Use `npx expo install` for all packages
- **NativeWind v4** - Tailwind classes work via `className` prop
- **expo-symbols** - Used for icons (SF Symbols on iOS, Material on Android)
- **React 19** - Use new hooks (use, useOptimistic, etc.) where applicable
- **TypeScript strict mode** - All new code must pass `npx tsc --noEmit`
- **Lint before commit** - Run `npx expo lint` before declaring tasks done

---

## Next Steps

1. **Confirm this plan** - Review and adjust priorities
2. **Set up Supabase project** - Get URL and anon key
3. **Start Phase 1** - Auth + Database foundation
4. **Iterate weekly** - Ship working features incrementally