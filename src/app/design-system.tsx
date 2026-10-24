import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Text, Button, IconButton, Icon, TextField, Chip, Badge, Alert, SegmentedControl, Stepper, Toggle } from "../components/ui";
import { cn } from "../lib/cn";

const iconSet = [
  { name: "house", label: "Home" },
  { name: "magnifyingglass", label: "Search" },
  { name: "heart", label: "Favorites" },
  { name: "calendar", label: "Calendar" },
  { name: "person", label: "Profile" },
  { name: "gearshape", label: "Settings" },
  { name: "mappin", label: "Location" },
  { name: "slider.horizontal.3", label: "Filters" },
];

const chipsRow1 = [
  { label: "All", icon: { ios: "list.bullet", android: "view_list", web: "list" } },
  { label: "Strength", icon: { ios: "dumbbell", android: "fitness_center", web: "fitness_center" } },
  { label: "Running", icon: { ios: "figure.run", android: "directions_run", web: "directions_run" } },
  { label: "Mobility", icon: { ios: "figure.mixed.cardio", android: "accessibility", web: "accessibility" } },
];

const chipsRow2 = [
  { label: "Guest favorite", icon: { ios: "star.fill", android: "star", web: "star" } },
  { label: "New", icon: { ios: "sparkles", android: "auto_awesome", web: "auto_awesome" } },
  { label: "20% off", icon: { ios: "tag.fill", android: "local_offer", web: "local_offer" } },
];

const segmentedOptions = [
  { value: "week", label: "1W", icon: { ios: "calendar", android: "calendar_month", web: "calendar_month" } },
  { value: "month", label: "4W", icon: { ios: "calendar.badge.plus", android: "date_range", web: "date_range" } },
  { value: "quarter", label: "12W", icon: { ios: "calendar.badge.clock", android: "event", web: "event" } },
];

export default function DesignSystemPreview() {
  const [chipSelected1, setChipSelected1] = React.useState<string[]>(["All"]);
  const [chipSelected2, setChipSelected2] = React.useState<string[]>([]);
  const [segmentedValue, setSegmentedValue] = React.useState("week");
  const [stepperValue, setStepperValue] = React.useState(3);
  const [toggleValue, setToggleValue] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [emailText, setEmailText] = React.useState("");
  const [passwordText, setPasswordText] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Palette Section */}
        <Section title="Palette">
          <View style={styles.paletteGrid}>
            {[
              { name: "Primary", color: "#FFC629", token: "primary" },
              { name: "Lavender", color: "#C9B4FF", token: "lavender" },
              { name: "Ink", color: "#0B0B1A", token: "ink" },
              { name: "Ink Muted", color: "#6B7280", token: "ink-muted" },
              { name: "Surface", color: "#FFFFFF", token: "surface", border: true },
              { name: "Surface Muted", color: "#F4F5F7", token: "surface-muted" },
              { name: "Border", color: "#E5E7EB", token: "border" },
              { name: "Glass", color: "rgba(255,255,255,0.7)", token: "glass", border: true },
              { name: "Ink Subtle", color: "#9AA1B4", token: "ink-subtle" },
              { name: "Lavender Soft", color: "#F3F0FF", token: "lavender-soft" },
              { name: "Accent", color: "#5B3DF5", token: "accent" },
              { name: "Primary Soft", color: "#FEF6DC", token: "primary-soft" },
              { name: "Success", color: "#1A7F50", token: "success" },
              { name: "Success Soft", color: "#E3F4EC", token: "success-soft" },
              { name: "Danger", color: "#E03A45", token: "danger" },
              { name: "Danger Soft", color: "#FDE4EA", token: "danger-soft" },
              { name: "Promo Soft", color: "#FEE9F0", token: "promo-soft" },
              { name: "Info", color: "#1D3FBF", token: "info" },
              { name: "Info Soft", color: "#EAF0FD", token: "info-soft" },
            ].map((swatch) => (
              <View key={swatch.token} style={styles.swatch}>
                <View
                  style={[
                    styles.swatchColor,
                    { backgroundColor: swatch.color },
                    swatch.border && { borderWidth: 1, borderColor: "#E5E7EB" },
                  ]}
                />
                <Text variant="footnote" tone="ink-muted" className="text-center mt-2" style={styles.swatchLabel}>
                  {swatch.name}
                </Text>
                <Text variant="footnote" tone="ink-subtle" className="text-center" style={styles.swatchToken}>
                  {swatch.token}
                </Text>
              </View>
            ))}
          </View>
        </Section>

        {/* Type Ramp */}
        <Section title="Type Ramp">
          <View style={styles.typeRamp}>
            <Text variant="display" tone="ink">Display 56/56 Bold</Text>
            <Text variant="heading" tone="ink">Heading 28/34 Bold</Text>
            <Text variant="title" tone="ink">Title 20/26 Bold</Text>
            <Text variant="subtitle" tone="ink">Subtitle 16/22 SemiBold</Text>
            <Text variant="body" tone="ink">Body 16/24 Regular</Text>
            <Text variant="label" tone="ink">Label 15/20 Medium</Text>
            <Text variant="button" tone="ink">Button 17/22 SemiBold</Text>
            <Text variant="buttonSecondary" tone="ink">Button Secondary 17/22 Medium</Text>
            <Text variant="caption" tone="ink">Caption 14/20 Medium</Text>
            <Text variant="footnote" tone="ink">Footnote 12/16 Medium</Text>
          </View>
        </Section>

        {/* Buttons */}
        <Section title="Buttons">
          <View style={styles.buttonRow}>
            <Button variant="primary" size="md">Primary MD</Button>
            <Button variant="primary" size="sm">Primary SM</Button>
          </View>
          <View style={styles.buttonRow}>
            <Button variant="secondary" size="md">Secondary MD</Button>
            <Button variant="secondary" size="sm">Secondary SM</Button>
          </View>
          <View style={styles.buttonRow}>
            <Button variant="primary" size="md" icon={<Icon name={{ ios: "plus", android: "add", web: "add" }} size={20} tone="ink" />}>
              With Icon
            </Button>
            <Button variant="primary" size="md" trailingIcon={<Icon name={{ ios: "chevron.right", android: "chevron_right", web: "chevron_right" }} size={20} tone="ink" />}>
              Trailing
            </Button>
          </View>
          <View style={styles.buttonRow}>
            <Button variant="primary" size="md" loading>Loading</Button>
            <Button variant="primary" size="md" disabled>Disabled</Button>
          </View>
        </Section>

        {/* Icon Buttons */}
        <Section title="Icon Buttons">
          <View style={styles.iconButtonRow}>
            <IconButton
              name={{ ios: "heart", android: "favorite", web: "favorite" }}
              size="md"
              variant="default"
              accessibilityLabel="Favorite"
            />
            <IconButton
              name={{ ios: "heart.fill", android: "favorite", web: "favorite" }}
              size="md"
              variant="default"
              accessibilityLabel="Favorited"
            />
            <IconButton
              name={{ ios: "square.and.arrow.up", android: "share", web: "share" }}
              size="sm"
              variant="default"
              accessibilityLabel="Share"
            />
            <IconButton
              name={{ ios: "ellipsis", android: "more_vert", web: "more_vert" }}
              size="sm"
              variant="ghost"
              accessibilityLabel="More options"
            />
          </View>
        </Section>

        {/* Text Fields */}
        <Section title="Text Fields">
          <View style={styles.fieldStack}>
            <TextField
              label="Search"
              placeholder="Search workouts..."
              type="search"
              leadingIcon={{ ios: "magnifyingglass", android: "search", web: "search" }}
              value={searchText}
              onChangeText={setSearchText}
            />
            <TextField
              label="Email"
              placeholder="you@example.com"
              type="email"
              leadingIcon={{ ios: "envelope", android: "email", web: "email" }}
              value={emailText}
              onChangeText={setEmailText}
            />
            <TextField
              label="Password"
              placeholder="••••••••"
              type="password"
              leadingIcon={{ ios: "lock", android: "lock", web: "lock" }}
              value={passwordText}
              onChangeText={setPasswordText}
            />
            <TextField
              label="With Error"
              placeholder="This field has an error"
              error="Please enter a valid value"
            />
            <TextField
              label="Disabled"
              placeholder="Cannot edit"
              disabled={true}
            />
          </View>
        </Section>

        {/* Chips */}
        <Section title="Chips">
          <Text variant="label" tone="ink-muted" className="mb-2">Row 1 — Lavender tone (MD)</Text>
          <View style={styles.chipRow}>
            {chipsRow1.map((chip) => (
              <Chip
                key={chip.label}
                label={chip.label}
                icon={chip.icon}
                size="md"
                tone="lavender"
                selected={chipSelected1.includes(chip.label)}
                onPress={() => setChipSelected1((prev) =>
                  prev.includes(chip.label) ? prev.filter((l) => l !== chip.label) : [...prev, chip.label]
                )}
              />
            ))}
          </View>
          <Text variant="label" tone="ink-muted" className="mt-4 mb-2">Row 2 — Primary tone (SM)</Text>
          <View style={styles.chipRow}>
            {chipsRow2.map((chip) => (
              <Chip
                key={chip.label}
                label={chip.label}
                icon={chip.icon}
                size="sm"
                tone="primary"
                selected={chipSelected2.includes(chip.label)}
                onPress={() => setChipSelected2((prev) =>
                  prev.includes(chip.label) ? prev.filter((l) => l !== chip.label) : [...prev, chip.label]
                )}
              />
            ))}
          </View>
        </Section>

        {/* Badges */}
        <Section title="Badges">
          <View style={styles.badgeRow}>
            <Badge label="Guest favorite" tone="primary" icon={{ ios: "star.fill", android: "star", web: "star" }} />
            <Badge label="New" tone="success" icon={{ ios: "sparkles", android: "auto_awesome", web: "auto_awesome" }} />
            <Badge label="20% off" tone="promo" icon={{ ios: "tag.fill", android: "local_offer", web: "local_offer" }} />
            <Badge label="Superhost" tone="info" icon={{ ios: "crown.fill", android: "workspace_premium", web: "workspace_premium" }} />
            <Badge label="Primary" tone="primary" />
            <Badge label="Success" tone="success" />
            <Badge label="Promo" tone="promo" />
            <Badge label="Info" tone="info" />
          </View>
        </Section>

        {/* Alerts */}
        <Section title="Alerts">
          <View style={styles.alertStack}>
            <Alert
              title="Workout saved"
              message="Your strength session has been logged successfully."
              tone="success"
              onDismiss={() => {}}
            />
            <Alert
              title="Something went wrong"
              message="We couldn't save your workout. Please try again."
              tone="danger"
              onDismiss={() => {}}
            />
            <Alert title="Simple success (no dismiss)" tone="success" />
            <Alert title="Simple danger (no dismiss)" tone="danger" />
          </View>
        </Section>

        {/* Segmented Control */}
        <Section title="Segmented Control">
          <SegmentedControl
            options={segmentedOptions}
            value={segmentedValue}
            onValueChange={setSegmentedValue}
          />
        </Section>

        {/* Stepper + Toggle */}
        <Section title="Stepper & Toggle">
          <View style={styles.controlRow}>
            <View style={styles.controlItem}>
              <Text variant="label" tone="ink-muted" className="mb-2">Stepper (0–10)</Text>
              <Stepper
                value={stepperValue}
                min={0}
                max={10}
                onValueChange={setStepperValue}
              />
            </View>
            <View style={styles.controlItem}>
              <Text variant="label" tone="ink-muted" className="mb-2">Toggle</Text>
              <View style={styles.toggleWrapper}>
                <Toggle value={toggleValue} onValueChange={setToggleValue} />
              </View>
            </View>
          </View>
        </Section>

        {/* Icons */}
        <Section title="Icon Set (SF Symbols / Material Symbols)">
          <View style={styles.iconGrid}>
            {iconSet.map(({ name, label }) => (
              <View key={name} style={styles.iconItem}>
                <View style={styles.iconBox}>
                  <Icon
                    name={{
                      ios: name,
                      android: name.replace(/\./g, "_"),
                      web: name.replace(/\./g, "_"),
                    }}
                    size={28}
                    tone="ink"
                  />
                </View>
                <Text variant="footnote" tone="ink-muted" className="text-center mt-2" style={styles.iconLabel}>
                  {label}
                </Text>
                <Text variant="footnote" tone="ink-subtle" className="text-center" style={styles.iconToken}>
                  {name}
                </Text>
              </View>
            ))}
          </View>
        </Section>

        {/* Radius & Shadow samples */}
        <Section title="Radius & Shadows">
          <View style={styles.radiusGrid}>
            {[
              { label: "rounded-sm (8)", className: "rounded-sm" },
              { label: "rounded-md (12)", className: "rounded-md" },
              { label: "rounded-lg (16)", className: "rounded-lg" },
              { label: "rounded-xl (24)", className: "rounded-xl" },
              { label: "rounded-full", className: "rounded-full" },
            ].map((r) => (
              <View key={r.label} style={styles.radiusCard}>
                <View className={cn("bg-surface border border-border/60 h-20 w-full", r.className, "shadow-card")} />
                <Text variant="footnote" tone="ink-muted" className="text-center mt-2">{r.label}</Text>
              </View>
            ))}
          </View>
          <View style={styles.shadowGrid}>
            {[
              { label: "shadow-card", className: "shadow-card" },
              { label: "shadow-raised", className: "shadow-raised" },
              { label: "shadow-overlay", className: "shadow-overlay" },
            ].map((s) => (
              <View key={s.label} style={styles.radiusCard}>
                <View className={cn("bg-surface border border-border/60 h-20 w-full rounded-lg", s.className)} />
                <Text variant="footnote" tone="ink-muted" className="text-center mt-2">{s.label}</Text>
              </View>
            ))}
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="title" tone="ink" className="mb-4">{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 32,
  },
  section: {
    gap: 12,
  },
  paletteGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "flex-start",
  },
  swatch: {
    width: 72,
    alignItems: "center",
  },
  swatchColor: {
    width: 72,
    height: 72,
    borderRadius: 12,
  },
  swatchLabel: {
    fontSize: 10,
  },
  swatchToken: {
    fontSize: 9,
  },
  typeRamp: {
    gap: 8,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  iconButtonRow: {
    flexDirection: "row",
    gap: 12,
  },
  fieldStack: {
    gap: 16,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  alertStack: {
    gap: 12,
  },
  controlRow: {
    flexDirection: "row",
    gap: 16,
  },
  controlItem: {
    flex: 1,
  },
  toggleWrapper: {
    marginTop: 4,
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "center",
  },
  iconItem: {
    width: 80,
    alignItems: "center",
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#F4F5F7",
    alignItems: "center",
    justifyContent: "center",
  },
  iconLabel: {
    fontSize: 10,
  },
  iconToken: {
    fontSize: 9,
  },
  radiusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  shadowGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 16,
  },
  radiusCard: {
    width: 90,
    alignItems: "center",
  },
});