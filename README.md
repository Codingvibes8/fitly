# Fitly — Fitness Tracking App

A premium, mobile-first fitness tracking application built with **Expo 58**, **React Native 0.88**, **Expo Router**, **NativeWind (Tailwind CSS v4)**, and **Supabase**. Features a polished design system, tab-based navigation, workout tracking, progress analytics, and a comprehensive component library.

---

## 📱 Screenshots

| Home | Workout Detail | Progress | Profile |
|------|----------------|----------|---------|
| ![Home](assets/screenshots/home.png) | ![Workout](assets/screenshots/workout.png) | ![Progress](assets/screenshots/progress.png) | ![Profile](assets/screenshots/profile.png) |

> Add screenshots to `assets/screenshots/` to populate this section.

---

## ✨ Features

### Core Functionality
- **Home Dashboard** — Today's workout, quick stats, quick actions, recent workouts, achievements
- **Workout Library** — Browse programs with detailed exercise lists, schedules, and stats
- **Workout Detail** — Tabbed interface (Overview, Exercises, Schedule, Stats) with interactive exercise tracking
- **Progress Tracking** — Weekly/monthly analytics, volume tracking, completion rates
- **Profile & Settings** — User preferences, achievements, notifications

### Design System (NativeWind + Custom Components)
- **Typography Scale** — Display, Heading, Title, Subtitle, Body, Label, Button, Caption, Footnote
- **Color Tokens** — Semantic colors (primary, success, danger, info, lavender, accent) with soft variants
- **12 UI Primitives** — Button, Text, Icon, IconButton, TextField, Chip, Badge, Alert, Card, SegmentedControl, Stepper, Toggle
- **Shadows & Radius** — Pre-defined elevation tokens (card, raised, overlay) and border radius scale
- **Icons** — SF Symbols (iOS) / Material Symbols (Android/Web) via unified `Icon` component
- **Custom Font** — Plus Jakarta Sans (Regular, Medium, SemiBold, Bold)

### Technical Highlights
- **Expo Router v58** — File-based routing with tabs and dynamic routes (`workouts/[id]`)
- **NativeWind v4** — Tailwind CSS utility classes in React Native
- **React Native Reanimated** — Smooth animations and gestures
- **TypeScript** — Strict mode, path aliases (`@/`)
- **Supabase Ready** — Auth, database, realtime configured
- **Stripe Integration** — `@stripe/stripe-react-native` for subscriptions/payments
- **Expo Glass Effect** — Frosted glass UI components

---

## 🏗 Project Structure

```
fitly/
├── app.json                    # Expo config (name, icons, orientation, etc.)
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript config (strict, path aliases)
├── tailwind.config.js          # NativeWind/Tailwind config
├── babel.config.js             # Babel config (NativeWind, Reanimated)
├── eslint.config.js            # ESLint (Expo + TypeScript)
├── global.d.ts                 # Global type declarations
├── AGENTS.md                   # AI agent instructions
├── assets/
│   ├── fonts/                  # Plus Jakarta Sans (4 weights)
│   ├── icon.png                # App icon (1024x1024)
│   ├── splash-icon.png         # Splash screen icon
│   ├── favicon.png             # Web favicon
│   └── android-icon-*.png      # Android adaptive icons
└── src/
    ├── app/                    # Expo Router screens (file-based routing)
    │   ├── _layout.tsx         # Root layout (Stack, fonts, splash)
    │   ├── design-system.tsx   # Design system preview screen
    │   ├── (tabs)/             # Tab navigator group
    │   │   ├── _layout.tsx     # Tab bar config (4 tabs)
    │   │   ├── index.tsx       # Home screen
    │   │   ├── workouts.tsx    # Workouts list
    │   │   ├── progress.tsx    # Progress analytics
    │   │   └── profile.tsx     # Profile & settings
    │   └── workouts/
    │       └── [id].tsx        # Dynamic workout detail route
    ├── components/
    │   └── ui/                 # Design system primitives (12 components)
    │       ├── index.ts        # Barrel export
    │       ├── Text.tsx        # Typography component
    │       ├── Button.tsx      # Button variants & sizes
    │       ├── Icon.tsx        # Cross-platform icon wrapper
    │       ├── IconButton.tsx  # Icon-only buttons
    │       ├── TextField.tsx   # Input fields (search, email, password)
    │       ├── Chip.tsx        # Selectable filter chips
    │       ├── Badge.tsx       # Status/label badges
    │       ├── Alert.tsx       # Toast/inline alerts
    │       ├── Card.tsx        # Card containers (Header/Content/Footer)
    │       ├── SegmentedControl.tsx
    │       ├── Stepper.tsx
    │       └── Toggle.tsx
    ├── lib/
    │   └── cn.ts               # classNames utility (clsx + tailwind-merge)
    ├── theme/
    │   ├── index.ts            # Color tokens, type exports
    │   └── motion.ts           # Reanimated motion presets
    └── global.css              # Tailwind directives + custom utilities
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** (or **Bun 1.0+**)
- **Expo CLI**: `npm install -g @expo/cli` (or use `npx expo`)
- **iOS Simulator** (Mac) / **Android Emulator** / **Physical device** with Expo Go

### Installation

```bash
# Clone & install
cd fitly
npm install          # or: bun install

# Start development server
npx expo start
```

### Platform-Specific Commands

```bash
# iOS Simulator
npx expo start --ios

# Android Emulator
npx expo start --android

# Web browser
npx expo start --web

# Development build (required for native modules like Stripe)
npx expo run:ios
npx expo run:android
```

### Environment Variables

Create `.env.local` (not committed) for Supabase & Stripe keys:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

> **Note:** Prefix with `EXPO_PUBLIC_` for client-side access in Expo.

---

## 📦 Key Dependencies

| Category | Packages |
|----------|----------|
| **Framework** | `expo@58`, `expo-router@58`, `react@19`, `react-native@0.88` |
| **Styling** | `nativewind@4`, `tailwindcss@3.4`, `expo-glass-effect` |
| **Animation** | `react-native-reanimated@4.7`, `react-native-gesture-handler@3.3` |
| **Fonts** | `expo-font@58`, `expo-symbols@58` |
| **Backend** | `@supabase/supabase-js@2.49` |
| **Payments** | `@stripe/stripe-react-native@0.81` |
| **Dev Tools** | `typescript@6`, `eslint@9`, `typescript-eslint@8` |

---

## 🎨 Design System

### Color Tokens (`src/theme/index.ts`)

```typescript
colors = {
  primary: "#FFC629",       // Gold/Yellow - primary actions
  lavender: "#C9B4FF",      // Purple - secondary actions
  accent: "#5B3DF5",        // Deep purple - accent
  success: "#1A7F50",       // Green - success states
  danger: "#E03A45",        // Red - errors/destructive
  info: "#1D3FBF",          // Blue - info states
  ink: "#0B0B1A",           // Near-black - primary text
  "ink-muted": "#6B7280",   // Gray - secondary text
  "ink-subtle": "#9AA1B4",  // Lighter gray - tertiary text
  surface: "#FFFFFF",       // White - card backgrounds
  "surface-muted": "#F4F5F7", // Light gray - screen background
  border: "#E5E7EB",        // Border color
  glass: "rgba(255,255,255,0.7)", // Frosted glass
  // Soft variants for backgrounds
  "primary-soft": "#FEF6DC",
  "lavender-soft": "#F3F0FF",
  "success-soft": "#E3F4EC",
  "danger-soft": "#FDE4EA",
  "promo-soft": "#FEE9F0",
  "info-soft": "#EAF0FD",
}
```

### Typography Variants (`src/components/ui/Text.tsx`)

| Variant | Size/Line Height | Weight | Use Case |
|---------|------------------|--------|----------|
| `display` | 56/56 | Bold | Hero headlines |
| `heading` | 28/34 | Bold | Screen titles |
| `title` | 20/26 | Bold | Section headers |
| `subtitle` | 16/22 | SemiBold | Sub-sections |
| `body` | 16/24 | Regular | Body text |
| `label` | 15/20 | Medium | Form labels, list items |
| `button` | 17/22 | SemiBold | Primary buttons |
| `buttonSecondary` | 17/22 | Medium | Secondary buttons |
| `caption` | 14/20 | Medium | Captions, metadata |
| `footnote` | 12/16 | Medium | Fine print |

### Using Components

```tsx
import { Text, Button, Icon, Badge, Card, TextField } from "@/components/ui";

// Text with variant + tone
<Text variant="heading" tone="ink">Welcome</Text>
<Text variant="body" tone="ink-muted">Description here</Text>

// Buttons
<Button variant="primary" size="md" onPress={handlePress}>
  <Icon name={{ios: "plus", android: "add", web: "add"}} size={20} tone="ink" className="mr-2" />
  Add Workout
</Button>

// Badges with tones
<Badge label="New" tone="success" icon={{ios: "sparkles", android: "auto_awesome", web: "auto_awesome"}} />

// Cards
<Card variant="outlined" padding="md">
  <CardContent>Content here</CardContent>
</Card>
```

### NativeWind Utilities

```tsx
// Spacing, sizing, flex
<View className="flex-1 p-4 gap-4 bg-surface-muted" />

// Colors from theme
<View className="bg-primary text-ink border-border" />

// Shadows & radius
<View className="shadow-card rounded-xl" />
<View className="shadow-raised rounded-lg" />
<View className="shadow-overlay rounded-full" />

// Typography (via Text component)
<Text variant="title" tone="ink" className="font-jakarta-semibold" />
```

---

## 🧭 Navigation

### Tab Navigator (`src/app/(tabs)/_layout.tsx`)
4 tabs with custom icons and active/inactive states:
- **Home** (`index`) — Dashboard
- **Workouts** (`workouts`) — Program library
- **Progress** (`progress`) — Analytics
- **Profile** (`profile`) — Settings

### Stack Navigator (`src/app/_layout.tsx`)
- Root stack with hidden header
- Font loading (Plus Jakarta Sans)
- Splash screen control
- Dynamic route: `workouts/[id]`

### Navigation Usage

```tsx
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";

// Push to screen
router.push("/workouts/1");
router.push("/profile");

// Replace (no back history)
router.replace("/login");

// Back
router.back();

// Dynamic route params
const params = useLocalSearchParams<{ id: string }>();
const workoutId = params.id;
```

---

## 🛠 Development Workflow

### Code Quality

```bash
# Lint (Expo + TypeScript rules)
npx expo lint

# Typecheck
npx tsc --noEmit

# Doctor (diagnose config/dependency issues)
npx expo-doctor

# Fix incompatible packages
npx expo install --fix
```

### Adding Dependencies

```bash
# ALWAYS use expo install for SDK-compatible versions
npx expo install <package-name>

# Dev dependencies
npx expo install -D <package-name>
```

### Git Hooks (Optional)

```bash
# Install husky for pre-commit checks
npx husky install
npx husky add .husky/pre-commit "npx expo lint && npx tsc --noEmit"
```

---

## 📱 Building & Deployment

### EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure project (first time)
eas build:configure

# Build for platforms
eas build --platform ios --profile production
eas build --platform android --profile production

# Development build (for testing native modules)
eas build --profile development
```

### Build Profiles (`eas.json`)

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

### Over-the-Air Updates

```bash
# Publish update
eas update --branch production --message "Bug fixes"

# Rollback
eas update:rollback --branch production
```

---

## 🗄 Supabase Integration

### Setup

1. Create project at [supabase.com](https://supabase.com)
2. Get URL & anon key from Project Settings → API
3. Add to `.env.local` (see Environment Variables)

### Database Schema (Suggested)

```sql
-- Users (extends auth.users)
create table profiles (
  id uuid references auth.users primary key,
  username text unique,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default now()
);

-- Workouts
create table workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  name text,
  type text, -- 'Strength', 'Cardio', 'HIIT', 'Mobility'
  duration_minutes int,
  exercises jsonb,
  completed_exercises int default 0,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Exercise Logs
create table exercise_logs (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid references workouts(id),
  exercise_name text,
  sets int,
  reps text,
  weight text,
  rest_seconds int,
  completed boolean default false,
  created_at timestamp with time zone default now()
);

-- RLS Policies
alter table profiles enable row level security;
alter table workouts enable row level security;
alter table exercise_logs enable row level security;

create policy "Users can view own data" on profiles
  for select using (auth.uid() = id);

create policy "Users can manage own workouts" on workouts
  for all using (auth.uid() = user_id);
```

### Client Usage

```tsx
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

// Auth
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
});

// Query
const { data: workouts } = await supabase
  .from("workouts")
  .select("*")
  .eq("user_id", user.id)
  .order("created_at", { ascending: false });
```

---

## 💳 Stripe Integration

### Setup

1. Create account at [stripe.com](https://stripe.com)
2. Get publishable key from Developers → API Keys
3. Add to `.env.local`

### Usage

```tsx
import { StripeProvider, useStripe, PaymentSheet } from "@stripe/stripe-react-native";

// Wrap app in _layout.tsx
<StripeProvider
  publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
  merchantIdentifier="merchant.com.yourcompany.fitly"
>
  <Stack>...</Stack>
</StripeProvider>

// In component
const stripe = useStripe();
const [paymentSheet, setPaymentSheet] = useState<PaymentSheet>();

const initializePayment = async () => {
  // 1. Create PaymentIntent on your backend
  const { data: { paymentIntent } } = await supabase.functions.invoke("create-payment-intent");
  
  // 2. Initialize PaymentSheet
  const sheet = await stripe.initPaymentSheet({
    paymentIntentClientSecret: paymentIntent.client_secret,
    merchantDisplayName: "Fitly",
  });
  setPaymentSheet(sheet);
};

const presentPayment = async () => {
  const { error } = await paymentSheet.present();
  if (error) console.error(error);
};
```

---

## 🧪 Testing

```bash
# Unit tests (Jest + React Native Testing Library)
npm test

# E2E tests (Detox)
npx detox build -c ios
npx detox test -c ios
```

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m "Add amazing feature"`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style
- Follow existing patterns in `src/components/ui/`
- Use TypeScript strict mode
- Prefer NativeWind utilities over inline styles
- Write components as functional with hooks
- Export types alongside components

---

## 🔗 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe React Native](https://github.com/stripe/stripe-react-native)
- [Plus Jakarta Sans Font](https://fonts.google.com/specimen/Plus+Jakarta+Sans)

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/fitly/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/fitly/discussions)
- **Email**: support@fitly.app

---

Built with ❤️ using Expo, React Native, and a passion for great mobile UX.