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
  Badge,
  IconButton,
  Icon,
  SegmentedControl,
  Card,
  CardContent,
} from "@/components/ui";
import { router } from "expo-router";

const timeRangeOptions = [
  { value: "week", label: "1W" },
  { value: "month", label: "4W" },
  { value: "quarter", label: "12W" },
  { value: "year", label: "1Y" },
];

const weeklyData = [
  { day: "Mon", workouts: 1, duration: 45, calories: 420, volume: 3100 },
  { day: "Tue", workouts: 0, duration: 0, calories: 0, volume: 0 },
  { day: "Wed", workouts: 1, duration: 55, calories: 510, volume: 4200 },
  { day: "Thu", workouts: 0, duration: 0, calories: 0, volume: 0 },
  { day: "Fri", workouts: 1, duration: 60, calories: 580, volume: 4800 },
  { day: "Sat", workouts: 1, duration: 40, calories: 320, volume: 1200 },
  { day: "Sun", workouts: 1, duration: 35, calories: 280, volume: 0 },
];

const monthlyStats = [
  { label: "Workouts", value: "18", change: "+12%", trend: "up", color: "#FFC629" },
  { label: "Total Time", value: "14h 32m", change: "+2h 15m", trend: "up", color: "#1A7F50" },
  { label: "Calories", value: "8,420", change: "+1,240", trend: "up", color: "#E03A45" },
  { label: "Volume", value: "98,400 lbs", change: "+15%", trend: "up", color: "#5B3DF5" },
  { label: "Avg Heart Rate", value: "142 bpm", change: "-3 bpm", trend: "down", color: "#C9B4FF" },
  { label: "Streak", value: "12 days", change: "+5", trend: "up", color: "#FFC629" },
];

const muscleGroupData = [
  { name: "Chest", volume: 28400, percentage: 29, color: "#FFC629" },
  { name: "Back", volume: 24600, percentage: 25, color: "#1A7F50" },
  { name: "Legs", volume: 19800, percentage: 20, color: "#5B3DF5" },
  { name: "Shoulders", volume: 12200, percentage: 12, color: "#C9B4FF" },
  { name: "Arms", volume: 9800, percentage: 10, color: "#E03A45" },
  { name: "Core", volume: 3600, percentage: 4, color: "#FFC629" },
];

const personalRecords = [
  { exercise: "Bench Press", weight: "225 lbs", reps: "5", date: "Mar 15", icon: "dumbbell.fill" },
  { exercise: "Deadlift", weight: "315 lbs", reps: "3", date: "Mar 10", icon: "dumbbell.fill" },
  { exercise: "Squat", weight: "275 lbs", reps: "5", date: "Mar 8", icon: "dumbbell.fill" },
  { exercise: "Pull-Ups", weight: "Bodyweight", reps: "15", date: "Mar 12", icon: "figure.arms.open" },
  { exercise: "5K Run", weight: "22:30", reps: "", date: "Mar 5", icon: "figure.run" },
  { exercise: "Plank", weight: "3:45", reps: "", date: "Mar 1", icon: "timer" },
];

const achievements = [
  { id: "1", name: "First Workout", description: "Complete your first workout", icon: "star.fill", color: "#FFC629", unlocked: true, date: "Jan 15", progress: 0, target: 0 },
  { id: "2", name: "Week Warrior", description: "Workout 5 days in a week", icon: "calendar.badge.checkmark", color: "#1A7F50", unlocked: true, date: "Jan 28", progress: 0, target: 0 },
  { id: "3", name: "Century Club", description: "Complete 100 workouts", icon: "100.circle.fill", color: "#5B3DF5", unlocked: false, progress: 42, target: 100 },
  { id: "4", name: "Iron Will", description: "30 day streak", icon: "flame.fill", color: "#E03A45", unlocked: false, progress: 12, target: 30 },
  { id: "5", name: "Heavy Lifter", description: "Lift 100,000 lbs total volume", icon: "scalemass.fill", color: "#C9B4FF", unlocked: false, progress: 78400, target: 100000 },
  { id: "6", name: "Early Bird", description: "10 workouts before 7 AM", icon: "sunrise.fill", color: "#FFC629", unlocked: true, date: "Feb 20", progress: 0, target: 0 },
];

export default function ProgressScreen() {
  const [selectedRange, setSelectedRange] = React.useState("month");
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
            <Text variant="heading" tone="ink">Progress</Text>
            <Text variant="subtitle" tone="ink-muted">Track your fitness journey</Text>
          </View>
          <IconButton
            name={{ ios: "square.and.arrow.up", android: "share", web: "share" }}
            size="md"
            variant="ghost"
            accessibilityLabel="Share progress"
          />
        </View>

        {/* Time Range Selector */}
        <SegmentedControl
          options={timeRangeOptions}
          value={selectedRange}
          onValueChange={setSelectedRange}
          className="mb-4"
        />

        {/* Key Stats */}
        <View style={styles.section}>
          <Text variant="title" tone="ink" className="mb-4">{selectedRange === "week" ? "This Week" : selectedRange === "month" ? "This Month" : selectedRange === "quarter" ? "This Quarter" : "This Year"}</Text>
          <View style={styles.statsGrid}>
            {monthlyStats.map((stat) => (
              <Card key={stat.label} variant="default" padding="md" style={styles.statCard}>
                <View style={styles.statHeader}>
                  <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                    <Icon
                      name={{
                        ios: stat.label === "Workouts" ? "checkmark.circle.fill" :
                             stat.label === "Total Time" ? "clock.fill" :
                             stat.label === "Calories" ? "flame.fill" :
                             stat.label === "Volume" ? "scalemass.fill" :
                             stat.label === "Avg Heart Rate" ? "heart.fill" :
                             "flame.fill",
                        android: stat.label === "Workouts" ? "check_circle" :
                               stat.label === "Total Time" ? "schedule" :
                               stat.label === "Calories" ? "local_fire_department" :
                               stat.label === "Volume" ? "fitness_center" :
                               stat.label === "Avg Heart Rate" ? "favorite" :
                               "local_fire_department",
                        web: stat.label === "Workouts" ? "check_circle" :
                             stat.label === "Total Time" ? "schedule" :
                             stat.label === "Calories" ? "local_fire_department" :
                             stat.label === "Volume" ? "fitness_center" :
                             stat.label === "Avg Heart Rate" ? "favorite" :
                             "local_fire_department",
                      }}
                      size={20}
                      tone={stat.color}
                    />
                  </View>
                  <View style={styles.statTrend}>
                    <Icon
                      name={{
                        ios: stat.trend === "up" ? "arrow.up.right" : "arrow.down.right",
                        android: stat.trend === "up" ? "trending_up" : "trending_down",
                        web: stat.trend === "up" ? "trending_up" : "trending_down",
                      }}
                      size={14}
                      tone={stat.trend === "up" ? "success" : "danger"}
                    />
                    <Text variant="caption" tone={stat.trend === "up" ? "success" : "danger"} className="font-jakarta-medium">
                      {stat.change}
                    </Text>
                  </View>
                </View>
                <Text variant="heading" tone="ink" className="mt-2 font-jakarta-bold">{stat.value}</Text>
                <Text variant="caption" tone="ink-muted">{stat.label}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* Weekly Activity Chart */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="title" tone="ink">Weekly Activity</Text>
          </View>
          <Card variant="outlined" padding="lg">
            <CardContent>
              <View style={styles.chartContainer}>
                <View style={styles.chartBars}>
                  {weeklyData.map((day, index) => {
                    const maxDuration = Math.max(...weeklyData.map(d => d.duration));
                    const height = maxDuration > 0 ? (day.duration / maxDuration) * 160 : 0;
                    const isToday = index === new Date().getDay() - 1 || (index === 6 && new Date().getDay() === 0);
                    
                    return (
                      <View key={day.day} style={styles.chartBarWrapper}>
                        <View style={styles.chartBarContainer}>
                          <View
                            style={[
                              styles.chartBar,
                              { height, backgroundColor: isToday ? "#FFC629" : day.workouts > 0 ? "#C9B4FF" : "#F4F5F7" },
                            ]}
                          />
                        </View>
                        <Text variant="footnote" tone={isToday ? "primary" : "ink-muted"} className="mt-4 text-center font-jakarta-medium">
                          {day.day}
                        </Text>
                        {day.workouts > 0 && (
                          <Text variant="footnote" tone="ink-subtle" className="text-center" style={{ fontSize: 10 }}>
                            {day.duration}min
                          </Text>
                        )}
                      </View>
                    );
                  })}
                </View>
                <View style={styles.chartLegend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: "#FFC629" }]} />
                    <Text variant="footnote" tone="ink-muted">Today</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: "#C9B4FF" }]} />
                    <Text variant="footnote" tone="ink-muted">Workout</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: "#F4F5F7" }, { borderWidth: 1, borderColor: "#E5E7EB" }]} />
                    <Text variant="footnote" tone="ink-muted">Rest</Text>
                  </View>
                </View>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Muscle Group Distribution */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="title" tone="ink">Muscle Distribution</Text>
          </View>
          <Card variant="outlined" padding="lg">
            <CardContent>
              <View style={styles.muscleList}>
                {muscleGroupData.map((muscle, index) => (
                  <View key={muscle.name} style={styles.muscleItem}>
                    <View style={styles.muscleColorBar}>
                      <View
                        style={[
                          styles.muscleColorFill,
                          { width: `${muscle.percentage}%`, backgroundColor: muscle.color },
                        ]}
                      />
                    </View>
                    <View style={styles.muscleInfo}>
                      <View style={styles.muscleInfoTop}>
                        <Text variant="label" tone="ink" className="font-jakarta-medium">{muscle.name}</Text>
                        <Text variant="label" tone="primary" className="font-jakarta-semibold">{muscle.percentage}%</Text>
                      </View>
                      <Text variant="footnote" tone="ink-muted">{muscle.volume.toLocaleString()} lbs volume</Text>
                    </View>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Personal Records */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="title" tone="ink">Personal Records</Text>
            <Text variant="buttonSecondary" tone="primary" onPress={() => router.push("/progress/records")}>
              View All
            </Text>
          </View>
          <Card variant="outlined" padding="md">
            <CardContent>
              {personalRecords.map((pr, index) => (
                <View key={pr.exercise} style={[styles.prItem, index > 0 && styles.prItemDivider]}>
                  <View style={[styles.prIcon, { backgroundColor: index < 3 ? "#FFC62920" : "#F4F5F7" }]}>
                    <Icon
                      name={{
                        ios: pr.icon,
                        android: pr.icon.replace(/\.fill$/, ""),
                        web: pr.icon.replace(/\.fill$/, ""),
                      }}
                      size={20}
                      tone={index < 3 ? "#FFC629" : "ink-muted"}
                    />
                    {index < 3 && (
                      <View style={styles.prMedal}>
                        <Text variant="footnote" tone="primary" className="font-jakarta-bold">{index + 1}</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.prInfo} className="flex-1">
                    <Text variant="label" tone="ink" className="font-jakarta-medium">{pr.exercise}</Text>
                    <View style={styles.prMeta}>
                      <Text variant="body" tone="primary" className="font-jakarta-semibold">{pr.weight}</Text>
                      {pr.reps && <Text variant="body" tone="ink-muted" className="ml-2">× {pr.reps} reps</Text>}
                      <Text variant="footnote" tone="ink-subtle" className="ml-2">{pr.date}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </CardContent>
          </Card>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="title" tone="ink">Achievements</Text>
            <Text variant="buttonSecondary" tone="primary" onPress={() => router.push("/progress/achievements")}>
              View All
            </Text>
          </View>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <Card key={achievement.id} variant="default" padding="md" style={[
                styles.achievementCard,
                !achievement.unlocked && styles.achievementCardLocked,
              ]}>
                <View style={styles.achievementHeader}>
                  <View style={[styles.achievementIcon, { backgroundColor: `${achievement.color}20`, opacity: achievement.unlocked ? 1 : 0.4 }]}>
                    <Icon
                      name={{
                        ios: achievement.icon,
                        android: achievement.icon.replace(/\.fill$/, ""),
                        web: achievement.icon.replace(/\.fill$/, ""),
                      }}
                      size={24}
                      tone={achievement.unlocked ? achievement.color : "ink-subtle"}
                    />
                  </View>
                  <View style={styles.achievementInfo} className="flex-1">
                    <Text variant="label" tone={achievement.unlocked ? "ink" : "ink-muted"} className="font-jakarta-medium">{achievement.name}</Text>
                    <Text variant="footnote" tone="ink-muted">{achievement.description}</Text>
                  </View>
                  {achievement.unlocked ? (
                    <Badge label="Unlocked" tone="success" size="sm" />
                  ) : (
                    <View style={styles.achievementProgress}>
                      <View style={styles.progressBarSmall}>
                        <View
                          style={[
                            styles.progressFillSmall,
                            { width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%`, backgroundColor: achievement.color },
                          ]}
                        />
                      </View>
                      <Text variant="footnote" tone="ink-muted" className="text-right mt-1">
                        {achievement.progress.toLocaleString()}/{achievement.target.toLocaleString()}
                      </Text>
                    </View>
                  )}
                </View>
                {achievement.unlocked && achievement.date && (
                  <Text variant="footnote" tone="success" className="mt-3 font-jakarta-medium">
                    Unlocked {achievement.date}
                  </Text>
                )}
              </Card>
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
    paddingBottom: 40,
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
    width: "48.5%",
    alignItems: "center",
    gap: 8,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statTrend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  chartContainer: {
    gap: 16,
  },
  chartBars: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 180,
    paddingHorizontal: 8,
  },
  chartBarWrapper: {
    alignItems: "center",
    flex: 1,
  },
  chartBarContainer: {
    width: "100%",
    alignItems: "center",
    height: 160,
    justifyContent: "flex-end",
  },
  chartBar: {
    width: "60%",
    borderRadius: 4,
    minHeight: 4,
  },
  chartLegend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  muscleList: {
    gap: 16,
  },
  muscleItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  muscleColorBar: {
    width: 60,
    height: 10,
    backgroundColor: "#F4F5F7",
    borderRadius: 5,
    overflow: "hidden",
  },
  muscleColorFill: {
    height: "100%",
    borderRadius: 5,
  },
  muscleInfo: {
    flex: 1,
    gap: 2,
  },
  muscleInfoTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  prItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  prItemDivider: {
    borderTopWidth: 1,
    borderColor: "#F0F1F4",
    marginTop: -1,
  },
  prIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  prMedal: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFC629",
    alignItems: "center",
    justifyContent: "center",
  },
  prInfo: {
    gap: 4,
  },
  prMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  achievementsGrid: {
    gap: 12,
  },
  achievementCard: {
    gap: 12,
  },
  achievementCardLocked: {
    opacity: 0.7,
  },
  achievementHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
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