import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  Button,
  Badge,
  Icon,
  SegmentedControl,
  Card,
  CardContent,
} from "@/components/ui";
import { useLocalSearchParams } from "expo-router";

interface WorkoutExercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  weight: string;
  completed: boolean;
  muscle: string;
}

interface WorkoutStats {
  totalVolume: string;
  avgHeartRate: string;
  caloriesBurned: string;
}

interface WorkoutData {
  id: string;
  name: string;
  type: string;
  level: string;
  duration: string;
  sessions: number;
  exercises: number;
  rating: number;
  reviews: number;
  color: string;
  description: string;
  tags: string[];
  schedule: string[];
  exerciseList: WorkoutExercise[];
  stats: WorkoutStats;
}

const workoutData: Record<string, WorkoutData> = {
  "1": {
    id: "1",
    name: "Upper Body Strength",
    type: "Strength",
    level: "Intermediate",
    duration: "45 min",
    sessions: 4,
    exercises: 24,
    rating: 4.9,
    reviews: 1240,
    color: "#FFC629",
    description: "Build a strong, defined upper body with this comprehensive 4-week program. Focus on compound movements for maximum muscle growth and functional strength.",
    tags: ["Muscle Building", "Gym Required", "Progressive Overload"],
    schedule: ["Mon: Push", "Tue: Rest", "Wed: Pull", "Thu: Rest", "Fri: Legs", "Sat: Core", "Sun: Rest"],
    exerciseList: [
      { id: "1", name: "Bench Press", sets: 4, reps: "8-10", rest: "90s", weight: "135 lbs", completed: true, muscle: "Chest" },
      { id: "2", name: "Pull-Ups", sets: 3, reps: "8-12", rest: "90s", weight: "Bodyweight", completed: true, muscle: "Back" },
      { id: "3", name: "Overhead Press", sets: 3, reps: "8-10", rest: "90s", weight: "95 lbs", completed: false, muscle: "Shoulders" },
      { id: "4", name: "Barbell Rows", sets: 4, reps: "8-10", rest: "90s", weight: "115 lbs", completed: false, muscle: "Back" },
      { id: "5", name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "60s", weight: "50 lbs", completed: false, muscle: "Chest" },
      { id: "6", name: "Face Pulls", sets: 3, reps: "15-20", rest: "60s", weight: "40 lbs", completed: false, muscle: "Rear Delts" },
    ],
    stats: { totalVolume: "12,450 lbs", avgHeartRate: "142 bpm", caloriesBurned: "420" },
  },
};

const segmentedOptions = [
  { value: "overview", label: "Overview", icon: { ios: "info.circle", android: "info", web: "info" } },
  { value: "exercises", label: "Exercises", icon: { ios: "list.bullet", android: "format_list_bulleted", web: "format_list_bulleted" } },
  { value: "schedule", label: "Schedule", icon: { ios: "calendar", android: "calendar_month", web: "calendar_month" } },
  { value: "stats", label: "Stats", icon: { ios: "chart.bar", android: "bar_chart", web: "bar_chart" } },
];

export default function WorkoutDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const workout = workoutData[params.id] || workoutData["1"];
  
  const [selectedTab, setSelectedTab] = React.useState("overview");
  const [exerciseStates, setExerciseStates] = React.useState<Record<string, boolean>>(() => {
    const initialStates: Record<string, boolean> = {};
    workout.exerciseList.forEach((ex: WorkoutExercise) => {
      initialStates[ex.id] = ex.completed || false;
    });
    return initialStates;
  });

  const toggleExercise = (exerciseId: string) => {
    setExerciseStates(prev => ({ ...prev, [exerciseId]: !prev[exerciseId] }));
  };

  const completedCount = workout.exerciseList.filter((ex: WorkoutExercise) => exerciseStates[ex.id]).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroBackground}>
            <View style={[styles.heroGradient, { backgroundColor: `${workout.color}30` }]} />
            <View style={styles.heroContent}>
              <View style={styles.heroIcon}>
                <Icon
                  name={{
                    ios: workout.type === "Strength" ? "dumbbell.fill" : 
                         workout.type === "Cardio" ? "figure.run.fill" :
                         workout.type === "HIIT" ? "bolt.fill" :
                         workout.type === "Yoga" ? "figure.mind.and.body" :
                         "figure.mixed.cardio",
                    android: workout.type === "Strength" ? "fitness_center" :
                           workout.type === "Cardio" ? "directions_run" :
                           workout.type === "HIIT" ? "flash_on" :
                           workout.type === "Yoga" ? "self_improvement" :
                           "accessibility",
                    web: workout.type === "Strength" ? "fitness_center" :
                         workout.type === "Cardio" ? "directions_run" :
                         workout.type === "HIIT" ? "flash_on" :
                         workout.type === "Yoga" ? "self_improvement" :
                         "accessibility",
                  }}
                  size={40}
                  tone={workout.color}
                />
              </View>
              <View style={styles.heroInfo}>
                <Badge label={workout.type} tone="primary" className="mb-2" />
                <Text variant="heading" tone="white" className="font-jakarta-bold">{workout.name}</Text>
                <View style={styles.heroMeta}>
                  <View style={styles.heroMetaItem}>
                    <Icon name={{ ios: "clock", android: "schedule", web: "schedule" }} size={16} tone="white" style={{ opacity: 0.8 }} />
                    <Text variant="label" tone="white" className="ml-2" style={{ opacity: 0.9 }}>{workout.duration}</Text>
                  </View>
                  <View style={styles.heroMetaItem}>
                    <Icon name={{ ios: "list.number", android: "format_list_numbered", web: "format_list_numbered" }} size={16} tone="white" style={{ opacity: 0.8 }} />
                    <Text variant="label" tone="white" className="ml-2" style={{ opacity: 0.9 }}>{workout.exercises} exercises</Text>
                  </View>
                  <View style={styles.heroMetaItem}>
                    <Icon name={{ ios: "calendar", android: "calendar_month", web: "calendar_month" }} size={16} tone="white" style={{ opacity: 0.8 }} />
                    <Text variant="label" tone="white" className="ml-2" style={{ opacity: 0.9 }}>{workout.sessions} weeks</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          
          {/* Progress Bar */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text variant="label" tone="ink" className="font-jakarta-medium">Week 1 • Day 1</Text>
              <Text variant="label" tone="primary" className="font-jakarta-semibold">{completedCount}/{workout.exercises} completed</Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(completedCount / workout.exercises) * 100}%`, backgroundColor: workout.color },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <SegmentedControl
            options={segmentedOptions}
            value={selectedTab}
            onValueChange={setSelectedTab}
          />
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {selectedTab === "overview" && (
            <OverviewTab workout={workout} />
          )}
          {selectedTab === "exercises" && (
            <ExercisesTab workout={workout} exerciseStates={exerciseStates} onToggle={toggleExercise} />
          )}
          {selectedTab === "schedule" && (
            <ScheduleTab workout={workout} />
          )}
          {selectedTab === "stats" && (
            <StatsTab workout={workout} />
          )}
        </View>

        {/* Start/Continue Button */}
        <View style={styles.bottomAction}>
          <Button
            variant="primary"
            size="md"
            className="w-full"
            onPress={() => {}}
          >
            <Icon name={{ ios: "play.fill", android: "play_arrow", web: "play_arrow" }} size={20} tone="ink" className="mr-2" />
            {completedCount > 0 ? "Continue Workout" : "Start Workout"}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function OverviewTab({ workout }: { workout: WorkoutData }) {
  return (
    <View style={styles.tabPanel}>
      <Card variant="outlined" className="mb-4">
        <CardContent>
          <Text variant="title" tone="ink" className="mb-3">About This Program</Text>
          <Text variant="body" tone="ink-muted" style={{ lineHeight: 24 }}>{workout.description}</Text>
        </CardContent>
      </Card>

      <Card variant="outlined" className="mb-4">
        <CardContent>
          <Text variant="title" tone="ink" className="mb-3">What You&apos;ll Need</Text>
          <View style={styles.tagsRow}>
            {workout.tags.map((tag: string) => (
              <Badge key={tag} label={tag} tone="lavender" className="mr-2 mb-2" />
            ))}
          </View>
        </CardContent>
      </Card>

      <Card variant="outlined" className="mb-4">
        <CardContent>
          <Text variant="title" tone="ink" className="mb-3">Program Rating</Text>
          <View style={styles.ratingRow}>
            <View style={styles.ratingMain}>
              <Text variant="display" tone="ink" className="font-jakarta-bold">{workout.rating}</Text>
              <View style={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name={{ ios: "star.fill", android: "star", web: "star" }} size={16} tone="primary" />
                ))}
              </View>
              <Text variant="body" tone="ink-muted" className="mt-1">{workout.reviews.toLocaleString()} reviews</Text>
            </View>
            <View style={styles.ratingBars}>
              {[5, 4, 3, 2, 1].map((star) => (
                <View key={star} style={styles.ratingBar}>
                  <Text variant="footnote" tone="ink-muted" style={{ width: 30 }}>{star}★</Text>
                  <View style={styles.ratingBarTrack}>
                    <View style={[styles.ratingBarFill, { width: `${(6 - star) * 15}%` }]} />
                  </View>
                  <Text variant="footnote" tone="ink-subtle" style={{ width: 35, textAlign: "right" }}>{Math.floor(workout.reviews * (6 - star) * 0.15)}</Text>
                </View>
              ))}
            </View>
          </View>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Text variant="title" tone="ink" className="mb-3">Key Benefits</Text>
          <View style={styles.benefitsGrid}>
            {[
              { icon: "arrow.up.circle.fill", label: "Progressive Overload", desc: "Systematic weight increases" },
              { icon: "target", label: "Balanced Development", desc: "All major muscle groups" },
              { icon: "chart.line.uptrend.xyaxis", label: "Track Progress", desc: "Built-in analytics" },
              { icon: "clock.fill", label: "Time Efficient", desc: "45 min sessions" },
            ].map((benefit, i) => (
              <View key={i} style={styles.benefitItem}>
                <View style={[styles.benefitIcon, { backgroundColor: `${workout.color}20` }]}>
                  <Icon name={{ ios: benefit.icon, android: benefit.icon.replace(/\.fill$/, ""), web: benefit.icon.replace(/\.fill$/, "") }} size={20} tone={workout.color} />
                </View>
                <Text variant="label" tone="ink" className="mt-2 font-jakarta-medium">{benefit.label}</Text>
                <Text variant="footnote" tone="ink-muted">{benefit.desc}</Text>
              </View>
            ))}
          </View>
        </CardContent>
      </Card>
    </View>
  );
}

function ExercisesTab({ workout, exerciseStates, onToggle }: { workout: WorkoutData; exerciseStates: Record<string, boolean>; onToggle: (id: string) => void }) {
  return (
    <View style={styles.tabPanel}>
      {workout.exerciseList.map((exercise: WorkoutExercise, index: number) => (
        <TouchableOpacity
          key={exercise.id}
          style={styles.exerciseCard}
          onPress={() => onToggle(exercise.id)}
          activeOpacity={0.9}
        >
          <View style={styles.exerciseCheckbox}>
            {exerciseStates[exercise.id] ? (
              <Icon name={{ ios: "checkmark.circle.fill", android: "check_circle", web: "check_circle" }} size={28} tone="success" />
            ) : (
              <Icon name={{ ios: "circle", android: "radio_button_unchecked", web: "radio_button_unchecked" }} size={28} tone="ink-subtle" />
            )}
          </View>
          <View style={styles.exerciseInfo} className="flex-1">
            <View style={styles.exerciseHeader}>
              <Text variant="label" tone="ink" className="font-jakarta-medium">{exercise.name}</Text>
              <Badge label={exercise.muscle} tone="primary" size="sm" />
            </View>
            <View style={styles.exerciseDetails}>
              <View style={styles.detailItem}>
                <Icon name={{ ios: "repeat", android: "replay", web: "replay" }} size={14} tone="ink-subtle" />
                <Text variant="footnote" tone="ink-muted" className="ml-1">{exercise.sets} sets × {exercise.reps} reps</Text>
              </View>
              <View style={styles.detailItem}>
                <Icon name={{ ios: "timer", android: "timer", web: "timer" }} size={14} tone="ink-subtle" />
                <Text variant="footnote" tone="ink-muted" className="ml-1">{exercise.rest} rest</Text>
              </View>
              <View style={styles.detailItem}>
                <Icon name={{ ios: "scalemass.fill", android: "fitness_center", web: "fitness_center" }} size={14} tone="ink-subtle" />
                <Text variant="footnote" tone="ink-muted" className="ml-1">{exercise.weight}</Text>
              </View>
            </View>
          </View>
          <Icon name={{ ios: "chevron.right", android: "chevron_right", web: "chevron_right" }} size={20} tone="ink-subtle" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

function ScheduleTab({ workout }: { workout: WorkoutData }) {
  const today = new Date().getDay(); // 0 = Sunday
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  return (
    <View style={styles.tabPanel}>
      <Text variant="title" tone="ink" className="mb-4">Weekly Schedule</Text>
      <View style={styles.scheduleGrid}>
        {workout.schedule.map((day: string, index: number) => {
          const [dayLabel, ...activityParts] = day.split(": ");
          const activity = activityParts.join(": ");
          const isToday = dayNames[index] === dayNames[today];
          const isRest = activity === "Rest";
          
          return (
            <View key={index} style={[
              styles.scheduleCard,
              isToday && styles.scheduleCardToday,
              isRest && styles.scheduleCardRest,
            ]}>
              <Text variant="label" tone={isToday ? "primary" : isRest ? "ink-subtle" : "ink"} className="font-jakarta-semibold">
                {dayLabel}
              </Text>
              <Text variant="body" tone={isToday ? "primary" : isRest ? "ink-subtle" : "ink"}>
                {isRest ? "Rest Day" : activity}
              </Text>
              {isToday && !isRest && (
                <Badge label="Today" tone="primary" size="sm" style={styles.todayBadge} />
              )}
            </View>
          );
        })}
      </View>
      
      <Card variant="outlined" className="mt-6">
        <CardContent>
          <Text variant="title" tone="ink" className="mb-3">Program Notes</Text>
          <View style={styles.notesList}>
            {[
              "Rest 60-90 seconds between sets",
              "Increase weight by 2.5-5 lbs when you hit top of rep range for all sets",
              "Track your weights in the app for progressive overload",
              "Deload week 4: reduce weight by 40% for recovery",
              "Optional: Add 10 min mobility work on rest days",
            ].map((note, i) => (
              <View key={i} style={styles.noteItem}>
                <Icon name={{ ios: "checkmark.circle.fill", android: "check_circle", web: "check_circle" }} size={16} tone="success" className="mr-3 mt-1" />
                <Text variant="body" tone="ink-muted" className="flex-1">{note}</Text>
              </View>
            ))}
          </View>
        </CardContent>
      </Card>
    </View>
  );
}

function StatsTab({ workout }: { workout: WorkoutData }) {
  return (
    <View style={styles.tabPanel}>
      <View style={styles.statsGrid}>
        {[
          { label: "Total Volume", value: workout.stats.totalVolume, icon: "scalemass.fill", color: "#FFC629" },
          { label: "Avg Heart Rate", value: workout.stats.avgHeartRate, icon: "heart.fill", color: "#E03A45" },
          { label: "Calories Burned", value: workout.stats.caloriesBurned, icon: "flame.fill", color: "#1A7F50" },
          { label: "Completion Rate", value: "67%", icon: "checkmark.circle.fill", color: "#5B3DF5" },
        ].map((stat, i) => (
          <Card key={i} variant="default" padding="md" style={styles.statCard}>
            <View style={styles.statCardHeader}>
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                <Icon name={{ ios: stat.icon, android: stat.icon.replace(/\.fill$/, ""), web: stat.icon.replace(/\.fill$/, "") }} size={24} tone={stat.color} />
              </View>
            </View>
            <Text variant="heading" tone="ink" className="mt-3 font-jakarta-bold">{stat.value}</Text>
            <Text variant="caption" tone="ink-muted">{stat.label}</Text>
          </Card>
        ))}
      </View>

      <Card variant="outlined" className="mt-6">
        <CardContent>
          <Text variant="title" tone="ink" className="mb-4">Weekly Progress</Text>
          <View style={styles.weeklyProgress}>
            {[
              { week: "Week 1", completion: 75, volume: "3,100 lbs" },
              { week: "Week 2", completion: 88, volume: "3,450 lbs" },
              { week: "Week 3", completion: 92, volume: "3,800 lbs" },
              { week: "Week 4", completion: 67, volume: "2,100 lbs" },
            ].map((week, i) => (
              <View key={i} style={styles.weekRow}>
                <Text variant="label" tone="ink" style={{ width: 70 }}>{week.week}</Text>
                <View style={styles.weekBarContainer} className="flex-1">
                  <View style={styles.weekBar}>
                    <View
                      style={[
                        styles.weekBarFill,
                        { width: `${week.completion}%`, backgroundColor: week.completion >= 90 ? "#1A7F50" : week.completion >= 75 ? "#FFC629" : "#E03A45" },
                      ]}
                    />
                  </View>
                </View>
                <Text variant="label" tone="ink" className="font-jakarta-medium" style={{ width: 50, textAlign: "right" }}>{week.completion}%</Text>
                <Text variant="caption" tone="ink-muted" style={{ width: 80, textAlign: "right" }}>{week.volume}</Text>
              </View>
            ))}
          </View>
        </CardContent>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  hero: {
    marginHorizontal: -20,
    marginTop: -20,
  },
  heroBackground: {
    height: 280,
    position: "relative",
  },
  heroGradient: {
    ...StyleSheet.absoluteFill,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
    justifyContent: "flex-end",
  },
  heroIcon: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  heroInfo: {
    gap: 4,
  },
  heroMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  heroMetaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressSection: {
    marginHorizontal: 20,
    marginTop: -16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#0B0B1A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#F4F5F7",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
  },
  tabContainer: {
    marginHorizontal: 20,
    marginTop: 16,
  },
  tabContent: {
    marginHorizontal: 20,
    marginTop: 16,
  },
  tabPanel: {
    gap: 16,
    paddingBottom: 24,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  ratingRow: {
    flexDirection: "row",
    gap: 24,
  },
  ratingMain: {
    gap: 4,
  },
  stars: {
    flexDirection: "row",
    gap: 2,
  },
  ratingBars: {
    flex: 1,
    gap: 6,
  },
  ratingBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ratingBarTrack: {
    flex: 1,
    height: 6,
    backgroundColor: "#F4F5F7",
    borderRadius: 3,
    overflow: "hidden",
  },
  ratingBarFill: {
    height: "100%",
    backgroundColor: "#FFC629",
    borderRadius: 3,
  },
  benefitsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  benefitItem: {
    width: "48%",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FAFAFC",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F0F1F4",
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  exerciseCheckbox: {
    width: 40,
    alignItems: "center",
  },
  exerciseInfo: {
    gap: 8,
  },
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  exerciseDetails: {
    flexDirection: "row",
    gap: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  scheduleCard: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 8,
  },
  scheduleCardToday: {
    borderColor: "#FFC629",
    borderWidth: 2,
    backgroundColor: "#FFF6DC",
  },
  scheduleCardRest: {
    opacity: 0.6,
  },
  todayBadge: {
    marginTop: 8,
  },
  notesList: {
    gap: 12,
  },
  noteItem: {
    flexDirection: "row",
    alignItems: "flex-start",
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
  statCardHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  weeklyProgress: {
    gap: 12,
  },
  weekRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  weekBarContainer: {
    height: 8,
  },
  weekBar: {
    height: "100%",
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    overflow: "hidden",
  },
  weekBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  bottomAction: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#F4F5F7",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
});