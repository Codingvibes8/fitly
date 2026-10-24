import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import {
  Text,
  Button,
  Badge,
  IconButton,
  Icon,
} from "@/components/ui";
import { router } from "expo-router";

const todayWorkout = {
  id: "1",
  name: "Upper Body Strength",
  type: "Strength",
  duration: 45,
  exercises: 6,
  completed: 2,
  color: "#FFC629",
  icon: { ios: "dumbbell.fill", android: "fitness_center", web: "fitness_center" },
};

const quickStats = [
  { label: "This Week", value: "4", unit: "workouts", trend: "+1" },
  { label: "Total Time", value: "3h 20m", unit: "active", trend: "+45m" },
  { label: "Calories", value: "1,840", unit: "burned", trend: "+320" },
  { label: "Streak", value: "7", unit: "days", trend: "🔥" },
];

interface QuickAction {
  label: string;
  icon: string;
  color: string;
  href: string;
}

interface RecentWorkout {
  id: string;
  name: string;
  type: string;
  time: string;
  duration: string;
  calories: string;
  color: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  target: number;
}

const quickActions: QuickAction[] = [
  { label: "Start Workout", icon: "play.fill", color: "#FFC629", href: "/workouts/start" },
  { label: "Log Activity", icon: "plus.circle.fill", color: "#1A7F50", href: "/log" },
  { label: "Create Plan", icon: "doc.badge.plus", color: "#5B3DF5", href: "/plans/create" },
  { label: "Find a Gym", icon: "location.fill", color: "#C9B4FF", href: "/gyms" },
];

const recentWorkouts: RecentWorkout[] = [
  { id: "1", name: "Morning Run", type: "Cardio", time: "Today, 6:30 AM", duration: "32 min", calories: "320", color: "#1A7F50" },
  { id: "2", name: "Push Day", type: "Strength", time: "Yesterday, 7:00 PM", duration: "55 min", calories: "410", color: "#FFC629" },
  { id: "3", name: "Yoga Flow", type: "Mobility", time: "2 days ago", duration: "40 min", calories: "180", color: "#C9B4FF" },
  { id: "4", name: "HIIT Circuit", type: "Cardio", time: "3 days ago", duration: "25 min", calories: "350", color: "#E03A45" },
];

const achievements: Achievement[] = [
  { id: "1", name: "Early Bird", description: "Complete 5 workouts before 7 AM", icon: "sunrise.fill", color: "#FFC629", progress: 3, target: 5 },
  { id: "2", name: "Iron Will", description: "Complete 10 strength workouts", icon: "dumbbell.fill", color: "#5B3DF5", progress: 7, target: 10 },
  { id: "3", name: "Marathoner", description: "Run 100km total", icon: "figure.run", color: "#1A7F50", progress: 42, target: 100 },
];

export default function HomeScreen() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#FFC629"]} />
        }
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text variant="heading" tone="ink">Good morning,</Text>
            <Text variant="title" tone="ink-muted">Alex</Text>
          </View>
          <View style={styles.headerRight}>
            <IconButton
              name={{ ios: "bell", android: "notifications", web: "notifications" }}
              size="md"
              variant="ghost"
              accessibilityLabel="Notifications"
            />
            <IconButton
              name={{ ios: "gearshape", android: "settings", web: "settings" }}
              size="md"
              variant="ghost"
              accessibilityLabel="Settings"
              onPress={() => router.push("/profile")}
            />
          </View>
        </View>

        {/* Today&apos;s Workout Card */}
        <View style={styles.todayWorkoutCard}>
          <View style={styles.todayWorkoutHeader}>
            <View style={styles.todayWorkoutIcon}>
              <Icon name={todayWorkout.icon} size={28} tone="ink" />
            </View>
            <View style={styles.todayWorkoutInfo}>
              <Text variant="subtitle" tone="ink" className="font-jakarta-semibold">
                Today&apos;s Workout
              </Text>
              <Text variant="body" tone="ink-muted">{todayWorkout.name}</Text>
            </View>
            <Badge label="In Progress" tone="primary" icon={{ ios: "clock.fill", android: "schedule", web: "schedule" }} />
          </View>
          
          <View style={styles.todayWorkoutMeta}>
            <View style={styles.metaItem}>
              <Icon name={{ ios: "timer", android: "timer", web: "timer" }} size={18} tone="ink-muted" />
              <Text variant="label" tone="ink-muted" className="ml-2">{todayWorkout.duration} min</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name={{ ios: "list.number", android: "format_list_numbered", web: "format_list_numbered" }} size={18} tone="ink-muted" />
              <Text variant="label" tone="ink-muted" className="ml-2">{todayWorkout.exercises} exercises</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name={{ ios: "checkmark.circle", android: "check_circle", web: "check_circle" }} size={18} tone="success" />
              <Text variant="label" tone="success" className="ml-2">{todayWorkout.completed} done</Text>
            </View>
          </View>

          <View style={styles.todayWorkoutProgress}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(todayWorkout.completed / todayWorkout.exercises) * 100}%`, backgroundColor: todayWorkout.color },
                ]}
              />
            </View>
            <Text variant="footnote" tone="ink-muted" className="text-right mt-2">
              {todayWorkout.completed} of {todayWorkout.exercises} exercises completed
            </Text>
          </View>

          <Button variant="primary" size="md" className="mt-4 w-full" onPress={() => router.push("/workouts/1")}>
            <Icon name={{ ios: "play.fill", android: "play_arrow", web: "play_arrow" }} size={20} tone="ink" className="mr-2" />
            Continue Workout
          </Button>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="title" tone="ink">This Week</Text>
            <IconButton
              name={{ ios: "calendar", android: "calendar_month", web: "calendar_month" }}
              size="sm"
              variant="ghost"
              accessibilityLabel="View calendar"
            />
          </View>
          <View style={styles.statsGrid}>
            {quickStats.map((stat) => (
              <View key={stat.label} style={styles.statCard}>
                <View style={styles.statHeader}>
                  <Text variant="footnote" tone="ink-muted">{stat.label}</Text>
                  <Text variant="footnote" tone="success" className="font-jakarta-semibold">{stat.trend}</Text>
                </View>
                <View style={styles.statValue}>
                  <Text variant="display" tone="ink" className="font-jakarta-bold">{stat.value}</Text>
                  <Text variant="caption" tone="ink-muted">{stat.unit}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text variant="title" tone="ink" className="mb-4">Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <View key={action.label} style={styles.actionCard}>
                <View
                  style={[
                    styles.actionIcon,
                    { backgroundColor: `${action.color}20` },
                  ]}
                >
                  <Icon
                    name={{
                      ios: action.icon,
                      android: action.icon.replace(/\.fill$/, ""),
                      web: action.icon.replace(/\.fill$/, ""),
                    }}
                    size={24}
                    tone={action.color}
                  />
                </View>
                <Text variant="label" tone="ink" className="mt-3 text-center font-jakarta-medium">
                  {action.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Workouts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="title" tone="ink">Recent Workouts</Text>
            <Text variant="buttonSecondary" tone="primary" onPress={() => router.push("/workouts/history")}>
              See All
            </Text>
          </View>
          <View style={styles.recentList}>
            {recentWorkouts.map((workout) => (
              <View key={workout.id} style={styles.recentItem}>
                <View
                  style={[
                    styles.recentIcon,
                    { backgroundColor: `${workout.color}20` },
                  ]}
                >
                  <Icon
                    name={{
                      ios: workout.type === "Strength" ? "dumbbell.fill" : workout.type === "Cardio" ? "figure.run" : "figure.mixed.cardio",
                      android: workout.type === "Strength" ? "fitness_center" : workout.type === "Cardio" ? "directions_run" : "accessibility",
                      web: workout.type === "Strength" ? "fitness_center" : workout.type === "Cardio" ? "directions_run" : "accessibility",
                    }}
                    size={20}
                    tone={workout.color}
                  />
                </View>
                <View style={styles.recentInfo} className="flex-1">
                  <Text variant="label" tone="ink" className="font-jakarta-medium">{workout.name}</Text>
                  <View style={styles.recentMeta}>
                    <Text variant="footnote" tone="ink-muted">{workout.type}</Text>
                    <Text variant="footnote" tone="ink-subtle">•</Text>
                    <Text variant="footnote" tone="ink-muted">{workout.time}</Text>
                  </View>
                </View>
                <View style={styles.recentStats} className="align-items-flex-end">
                  <Text variant="label" tone="ink" className="font-jakarta-medium">{workout.duration}</Text>
                  <Text variant="footnote" tone="ink-muted">{workout.calories} cal</Text>
                </View>
                <IconButton
                  name={{ ios: "chevron.right", android: "chevron_right", web: "chevron_right" }}
                  size="sm"
                  variant="ghost"
                  accessibilityLabel="View workout details"
                  onPress={() => router.push(`/workouts/${workout.id}`)}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="title" tone="ink">Achievements</Text>
            <IconButton
              name={{ ios: "trophy", android: "emoji_events", web: "emoji_events" }}
              size="sm"
              variant="ghost"
              accessibilityLabel="View all achievements"
            />
          </View>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievementCard}>
                <View
                  style={[
                    styles.achievementIcon,
                    { backgroundColor: `${achievement.color}20` },
                  ]}
                >
                  <Icon
                    name={{
                      ios: achievement.icon,
                      android: achievement.icon.replace(/\.fill$/, ""),
                      web: achievement.icon.replace(/\.fill$/, ""),
                    }}
                    size={24}
                    tone={achievement.color}
                  />
                </View>
                <View style={styles.achievementInfo} className="flex-1">
                  <Text variant="label" tone="ink" className="font-jakarta-medium">{achievement.name}</Text>
                  <Text variant="footnote" tone="ink-muted">{achievement.description}</Text>
                </View>
                <View style={styles.achievementProgress}>
                  <View style={styles.progressBarSmall}>
                    <View
                      style={[
                        styles.progressFillSmall,
                        { width: `${(achievement.progress / achievement.target) * 100}%`, backgroundColor: achievement.color },
                      ]}
                    />
                  </View>
                  <Text variant="footnote" tone="ink-muted" className="text-right mt-1">
                    {achievement.progress}/{achievement.target}
                  </Text>
                </View>
              </View>
            ))}
          </View>
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
    paddingBottom: 100,
    gap: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 8,
  },
  headerLeft: {
    gap: 2,
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  todayWorkoutCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#0B0B1A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  todayWorkoutHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  todayWorkoutIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#FFF6DC",
    alignItems: "center",
    justifyContent: "center",
  },
  todayWorkoutInfo: {
    flex: 1,
    gap: 2,
  },
  todayWorkoutMeta: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  todayWorkoutProgress: {
    marginTop: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#0B0B1A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statValue: {
    marginTop: 8,
    gap: 2,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionCard: {
    width: "48%",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  recentList: {
    gap: 12,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  recentIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  recentInfo: {
    gap: 4,
  },
  recentMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  recentStats: {
    gap: 2,
    alignItems: "flex-end",
  },
  achievementsGrid: {
    gap: 12,
  },
  achievementCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  achievementInfo: {
    gap: 2,
  },
  achievementProgress: {
    width: 80,
    alignItems: "flex-end",
  },
  progressBarSmall: {
    width: "100%",
    height: 6,
    backgroundColor: "#F4F5F7",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFillSmall: {
    height: "100%",
    borderRadius: 3,
  },
});