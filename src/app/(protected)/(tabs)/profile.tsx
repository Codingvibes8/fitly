import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Text,
  Badge,
  type BadgeTone,
  IconButton,
  Icon,
  Toggle,
  Card,
  CardContent,
} from "@/components/ui";
import { router } from "expo-router";

interface SettingsItem {
  id: string;
  label: string;
  icon: string;
  action?: string;
  value?: string;
  badge?: string;
  badgeColor?: string;
  type?: "toggle";
  defaultValue?: boolean;
}

interface SettingsSection {
  title: string;
  items: SettingsItem[];
}

const userProfile = {
  name: "Alex Morgan",
  email: "alex.morgan@fitly.app",
  avatar: null,
  joinDate: "January 2024",
  level: "Intermediate",
  workoutsCompleted: 142,
  totalHours: 187,
  currentStreak: 12,
  longestStreak: 28,
};

const settingsSections: SettingsSection[] = [
  {
    title: "Account",
    items: [
      { id: "edit-profile", label: "Edit Profile", icon: "person", action: "edit-profile" },
      { id: "subscription", label: "Subscription", icon: "crown", badge: "Pro", badgeColor: "#FFC629", action: "subscription" },
      { id: "connected-apps", label: "Connected Apps", icon: "link", action: "connected-apps" },
      { id: "data-privacy", label: "Data & Privacy", icon: "shield", action: "data-privacy" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { id: "units", label: "Units", icon: "scalemass", value: "Metric (kg/cm)", action: "units" },
      { id: "language", label: "Language", icon: "globe", value: "English", action: "language" },
      { id: "theme", label: "Theme", icon: "moon", value: "System", action: "theme" },
      { id: "start-week", label: "Week Starts On", icon: "calendar", value: "Monday", action: "start-week" },
    ],
  },
  {
    title: "Notifications",
    items: [
      { id: "workout-reminders", label: "Workout Reminders", icon: "bell", type: "toggle", defaultValue: true },
      { id: "progress-updates", label: "Progress Updates", icon: "chart.bar", type: "toggle", defaultValue: true },
      { id: "achievements", label: "Achievement Alerts", icon: "trophy", type: "toggle", defaultValue: true },
      { id: "social", label: "Social Activity", icon: "person.2", type: "toggle", defaultValue: false },
      { id: "marketing", label: "Marketing Emails", icon: "envelope", type: "toggle", defaultValue: false },
    ],
  },
  {
    title: "Workout",
    items: [
      { id: "auto-rest", label: "Auto Rest Timer", icon: "timer", type: "toggle", defaultValue: true },
      { id: "haptic-feedback", label: "Haptic Feedback", icon: "iphone.gen3.radiowaves.left.and.right", type: "toggle", defaultValue: true },
      { id: "voice-cues", label: "Voice Cues", icon: "speaker.wave.2", type: "toggle", defaultValue: false },
      { id: "auto-progress", label: "Auto Progress Tracking", icon: "chart.line.uptrend.xyaxis", type: "toggle", defaultValue: true },
      { id: "rest-day-reminders", label: "Rest Day Reminders", icon: "moon.zzz", type: "toggle", defaultValue: true },
    ],
  },
  {
    title: "Support",
    items: [
      { id: "help-center", label: "Help Center", icon: "questionmark.circle", action: "help-center" },
      { id: "contact-support", label: "Contact Support", icon: "envelope.open", action: "contact-support" },
      { id: "feedback", label: "Send Feedback", icon: "bubble.left.and.exclamationmark", action: "feedback" },
      { id: "rate-app", label: "Rate Fitly", icon: "star", action: "rate-app" },
    ],
  },
  {
    title: "Legal",
    items: [
      { id: "terms", label: "Terms of Service", icon: "doc.text", action: "terms" },
      { id: "privacy", label: "Privacy Policy", icon: "hand.raised", action: "privacy" },
      { id: "licenses", label: "Open Source Licenses", icon: "list.bullet.rectangle", action: "licenses" },
    ],
  },
];

const dangerZoneItems: SettingsItem[] = [
  { id: "export-data", label: "Export My Data", icon: "square.and.arrow.up", action: "export-data" },
  { id: "delete-account", label: "Delete Account", icon: "trash", action: "delete-account" },
];

export default function ProfileScreen() {
  type NotificationKey = "workout-reminders" | "progress-updates" | "achievements" | "social" | "marketing";
  type WorkoutSettingKey = "auto-rest" | "haptic-feedback" | "voice-cues" | "auto-progress" | "rest-day-reminders";

  const [notifications, setNotifications] = React.useState<Record<NotificationKey, boolean>>({
    "workout-reminders": true,
    "progress-updates": true,
    "achievements": true,
    "social": false,
    "marketing": false,
  });
  
  const [workoutSettings, setWorkoutSettings] = React.useState<Record<WorkoutSettingKey, boolean>>({
    "auto-rest": true,
    "haptic-feedback": true,
    "voice-cues": false,
    "auto-progress": true,
    "rest-day-reminders": true,
  });

  const handleNotificationToggle = (key: NotificationKey) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleWorkoutToggle = (key: WorkoutSettingKey) => {
    setWorkoutSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleItemPress = (action: string) => {
    switch (action) {
      case "edit-profile":
        router.push("/profile/edit");
        break;
      case "subscription":
        router.push("/profile/subscription");
        break;
      case "help-center":
        router.push("/profile/help");
        break;
      case "contact-support":
        Alert.alert("Contact Support", "Email us at support@fitly.app");
        break;
      case "feedback":
        router.push("/profile/feedback");
        break;
      case "rate-app":
        Alert.alert("Rate Fitly", "Thanks for using Fitly! Would you like to rate us on the App Store?");
        break;
      case "terms":
        router.push("/profile/terms");
        break;
      case "privacy":
        router.push("/profile/privacy");
        break;
      case "delete-account":
        Alert.alert(
          "Delete Account",
          "This action is irreversible. All your data will be permanently deleted.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => Alert.alert("Account Deleted", "Your account has been deleted.") },
          ]
        );
        break;
      case "export-data":
        Alert.alert("Export Data", "Your data export will be sent to your email.");
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text variant="display" tone="ink" className="font-jakarta-bold">{userProfile.name.charAt(0)}</Text>
            </View>
            <View style={styles.badgeWrapper}>
              <Badge label="Pro" tone="primary" size="sm" />
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text variant="heading" tone="ink">{userProfile.name}</Text>
            <Text variant="body" tone="ink-muted">{userProfile.email}</Text>
            <View style={styles.profileMeta}>
              <View style={styles.metaItem}>
                <Icon name={{ ios: "calendar", android: "calendar_month", web: "calendar_month" }} size={14} tone="ink-subtle" />
                <Text variant="footnote" tone="ink-muted" className="ml-1">Member since {userProfile.joinDate}</Text>
              </View>
              <View style={styles.metaItem}>
                <Badge label={userProfile.level} tone="lavender" size="sm" />
              </View>
            </View>
          </View>
          <IconButton
            name={{ ios: "pencil", android: "edit", web: "edit" }}
            size="md"
            variant="default"
            accessibilityLabel="Edit profile"
            onPress={() => router.push("/profile/edit")}
            style={styles.editButton}
          />
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          {[
            { label: "Workouts", value: userProfile.workoutsCompleted.toString(), icon: "checkmark.circle.fill", color: "#1A7F50" },
            { label: "Hours", value: userProfile.totalHours.toString(), icon: "clock.fill", color: "#FFC629" },
            { label: "Streak", value: userProfile.currentStreak.toString(), icon: "flame.fill", color: "#E03A45" },
            { label: "Best", value: userProfile.longestStreak.toString(), icon: "trophy.fill", color: "#5B3DF5" },
          ].map((stat) => (
            <View key={stat.label} style={styles.quickStatItem}>
              <View style={[styles.quickStatIcon, { backgroundColor: `${stat.color}20` }]}>
                <Icon name={{ ios: stat.icon, android: stat.icon.replace(/\.fill$/, ""), web: stat.icon.replace(/\.fill$/, "") }} size={20} tone={stat.color} />
              </View>
              <Text variant="heading" tone="ink" className="mt-2 font-jakarta-bold">{stat.value}</Text>
              <Text variant="footnote" tone="ink-muted">{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <View key={section.title} style={styles.settingsSection}>
            <Text variant="label" tone="ink-muted" className="mb-3 text-uppercase tracking-wider">{section.title}</Text>
            <Card variant="outlined" padding="none">
              <CardContent>
                {section.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.settingsItem,
                      itemIndex === section.items.length - 1 ? styles.settingsItemLast : {},
                    ]}
                    onPress={() => item.action && handleItemPress(item.action)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.settingsItemLeft}>
                      <View style={[styles.settingsIcon, { backgroundColor: "#F4F5F7" }]}>
                        <Icon
                          name={{
                            ios: item.icon,
                            android: item.icon.replace(/\./g, "_"),
                            web: item.icon.replace(/\./g, "_"),
                          }}
                          size={22}
                          tone="ink"
                        />
                      </View>
                      <View style={styles.settingsItemText}>
                        <Text variant="label" tone="ink" className="font-jakarta-medium">{item.label}</Text>
                        {item.value && <Text variant="footnote" tone="ink-muted">{item.value}</Text>}
                      </View>
                    </View>
                    <View style={styles.settingsItemRight}>
                      {item.type === "toggle" && (
                        <Toggle
                          value={["auto-rest", "haptic-feedback", "voice-cues", "auto-progress", "rest-day-reminders"].includes(item.id) ? workoutSettings[item.id as WorkoutSettingKey] : notifications[item.id as NotificationKey]}
                          onValueChange={() => {
                            if (["auto-rest", "haptic-feedback", "voice-cues", "auto-progress", "rest-day-reminders"].includes(item.id)) {
                              handleWorkoutToggle(item.id as WorkoutSettingKey);
                            } else {
                              handleNotificationToggle(item.id as NotificationKey);
                            }
                          }}
                        />
                      )}
                      {item.badge && (
                        <Badge label={item.badge} tone={item.badgeColor as BadgeTone} size="sm" style={styles.itemBadge} />
                      )}
                      {!item.type && !item.badge && (
                        <Icon name={{ ios: "chevron.right", android: "chevron_right", web: "chevron_right" }} size={20} tone="ink-subtle" />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </CardContent>
            </Card>
          </View>
        ))}

        {/* Danger Zone */}
        <View style={styles.dangerZone}>
          <Text variant="label" tone="ink-muted" className="mb-3 text-uppercase tracking-wider">Danger Zone</Text>
          <Card variant="outlined" padding="none" style={{ borderColor: "#FDE4EA" }}>
            <CardContent>
              {dangerZoneItems.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.settingsItem,
                    styles.dangerItem,
                    index === dangerZoneItems.length - 1 ? styles.settingsItemLast : {},
                  ]}
                  onPress={() => handleItemPress(item.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.settingsItemLeft}>
                    <View style={[styles.settingsIcon, { backgroundColor: "#FDE4EA" }]}>
                      <Icon
                        name={{
                          ios: item.icon,
                          android: item.icon.replace(/\./g, "_"),
                          web: item.icon.replace(/\./g, "_"),
                        }}
                        size={22}
                        tone="danger"
                      />
                    </View>
                    <View style={styles.settingsItemText}>
                      <Text variant="label" tone="danger" className="font-jakarta-medium">{item.label}</Text>
                    </View>
                  </View>
                  <Icon name={{ ios: "chevron.right", android: "chevron_right", web: "chevron_right" }} size={20} tone="ink-subtle" />
                </TouchableOpacity>
              ))}
            </CardContent>
          </Card>
        </View>

        {/* App Version */}
        <View style={styles.versionInfo}>
          <Text variant="footnote" tone="ink-subtle" className="text-center">Fitly v1.0.0 (Build 100)</Text>
          <Text variant="footnote" tone="ink-subtle" className="text-center mt-1">© 2024 Fitly. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 40,
    gap: 24,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    paddingTop: 8,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: "#FFC629",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeWrapper: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  profileMeta: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    marginTop: 8,
  },
  quickStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  quickStatItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  quickStatIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsSection: {
    gap: 8,
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F1F4",
  },
  settingsItemLast: {
    borderBottomWidth: 0,
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsItemText: {
    gap: 2,
  },
  settingsItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  itemBadge: {
    marginRight: 8,
  },
  dangerZone: {
    gap: 8,
    marginTop: 8,
  },
  dangerItem: {
    borderBottomColor: "#FDE4EA",
  },
  versionInfo: {
    paddingTop: 24,
    paddingBottom: 16,
  },
});