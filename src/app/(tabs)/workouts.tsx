import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  Button,
  Chip,
  Badge,
  IconButton,
  Icon,
  TextField,
  SegmentedControl,
} from "@/components/ui";
import { router } from "expo-router";

const workoutCategories = [
  { id: "all", label: "All", icon: { ios: "list.bullet", android: "view_list", web: "list" } },
  { id: "strength", label: "Strength", icon: { ios: "dumbbell.fill", android: "fitness_center", web: "fitness_center" } },
  { id: "cardio", label: "Cardio", icon: { ios: "figure.run", android: "directions_run", web: "directions_run" } },
  { id: "mobility", label: "Mobility", icon: { ios: "figure.mixed.cardio", android: "accessibility", web: "accessibility" } },
  { id: "hiit", label: "HIIT", icon: { ios: "bolt.fill", android: "flash_on", web: "flash_on" } },
  { id: "yoga", label: "Yoga", icon: { ios: "figure.mind.and.body", android: "self_improvement", web: "self_improvement" } },
];

const workoutPlans = [
  {
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
    image: null,
    tags: ["Muscle Building", "Gym Required"],
    isNew: false,
  },
  {
    id: "2",
    name: "Morning Run Series",
    type: "Cardio",
    level: "Beginner",
    duration: "30 min",
    sessions: 6,
    exercises: 12,
    rating: 4.8,
    reviews: 890,
    color: "#1A7F50",
    image: null,
    tags: ["Fat Loss", "No Equipment"],
    isNew: true,
  },
  {
    id: "3",
    name: "Full Body Mobility",
    type: "Mobility",
    level: "All Levels",
    duration: "20 min",
    sessions: 7,
    exercises: 28,
    rating: 4.9,
    reviews: 2100,
    color: "#C9B4FF",
    image: null,
    tags: ["Recovery", "No Equipment"],
    isNew: false,
  },
  {
    id: "4",
    name: "HIIT Burn",
    type: "HIIT",
    level: "Advanced",
    duration: "25 min",
    sessions: 5,
    exercises: 20,
    rating: 4.7,
    reviews: 650,
    color: "#E03A45",
    image: null,
    tags: ["Fat Loss", "Minimal Equipment"],
    isNew: true,
  },
  {
    id: "5",
    name: "Yoga Flow Foundations",
    type: "Yoga",
    level: "Beginner",
    duration: "35 min",
    sessions: 8,
    exercises: 32,
    rating: 4.9,
    reviews: 1800,
    color: "#5B3DF5",
    image: null,
    tags: ["Flexibility", "Mindfulness"],
    isNew: false,
  },
  {
    id: "6",
    name: "Push Pull Legs",
    type: "Strength",
    level: "Intermediate",
    duration: "60 min",
    sessions: 6,
    exercises: 36,
    rating: 4.8,
    reviews: 980,
    color: "#FFC629",
    image: null,
    tags: ["Muscle Building", "Gym Required"],
    isNew: false,
  },
];

const durationOptions = [
  { value: "all", label: "Any Duration" },
  { value: "short", label: "Under 20 min" },
  { value: "medium", label: "20-45 min" },
  { value: "long", label: "45+ min" },
];

const levelOptions = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export default function WorkoutsScreen() {
  const [searchText, setSearchText] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedDuration, setSelectedDuration] = React.useState("all");
  const [selectedLevel, setSelectedLevel] = React.useState("all");
  const [refreshing, setRefreshing] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);

  const filteredPlans = workoutPlans.filter((plan) => {
    const matchesSearch = plan.name.toLowerCase().includes(searchText.toLowerCase()) ||
      plan.type.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === "all" || plan.type.toLowerCase() === selectedCategory;
    const matchesDuration = selectedDuration === "all" || 
      (selectedDuration === "short" && parseInt(plan.duration) < 20) ||
      (selectedDuration === "medium" && parseInt(plan.duration) >= 20 && parseInt(plan.duration) <= 45) ||
      (selectedDuration === "long" && parseInt(plan.duration) > 45);
    const matchesLevel = selectedLevel === "all" || plan.level.toLowerCase() === selectedLevel;
    return matchesSearch && matchesCategory && matchesDuration && matchesLevel;
  });

  const hasActiveFilters = selectedCategory !== "all" || selectedDuration !== "all" || selectedLevel !== "all";

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
            <Text variant="heading" tone="ink">Workouts</Text>
            <Text variant="subtitle" tone="ink-muted">Find your next session</Text>
          </View>
          <IconButton
            name={{ ios: "slider.horizontal.3", android: "tune", web: "tune" }}
            size="md"
            variant="default"
            accessibilityLabel="Filters"
            onPress={() => setShowFilters(!showFilters)}
          />
        </View>

        {/* Search */}
        <TextField
          label="Search"
          placeholder="Search workouts, plans, exercises..."
          type="search"
          leadingIcon={{ ios: "magnifyingglass", android: "search", web: "search" }}
          value={searchText}
          onChangeText={setSearchText}
          className="mb-4"
        />

        {/* Category Chips */}
        <View style={styles.categoryChips}>
          {workoutCategories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setSelectedCategory(cat.id)}
              style={styles.chipWrapper}
            >
              <Chip
                label={cat.label}
                icon={cat.icon}
                size="md"
                tone="lavender"
                selected={selectedCategory === cat.id}
                onPress={() => {}}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Filter Row */}
        {showFilters && (
          <View style={styles.filterRow}>
            <SegmentedControl
              options={durationOptions}
              value={selectedDuration}
              onValueChange={setSelectedDuration}
              className="flex-1"
            />
            <SegmentedControl
              options={levelOptions}
              value={selectedLevel}
              onValueChange={setSelectedLevel}
              className="flex-1"
            />
          </View>
        )}

        {hasActiveFilters && (
          <View style={styles.activeFilters}>
            <Text variant="footnote" tone="ink-muted">Active filters:</Text>
            <View style={styles.filterChips}>
              {selectedCategory !== "all" && (
                <Chip
                  label={workoutCategories.find(c => c.id === selectedCategory)?.label || selectedCategory}
                  size="sm"
                  tone="primary"
                  onPress={() => setSelectedCategory("all")}
                />
              )}
              {selectedDuration !== "all" && (
                <Chip
                  label={durationOptions.find(d => d.value === selectedDuration)?.label || selectedDuration}
                  size="sm"
                  tone="lavender"
                  onPress={() => setSelectedDuration("all")}
                />
              )}
              {selectedLevel !== "all" && (
                <Chip
                  label={levelOptions.find(l => l.value === selectedLevel)?.label || selectedLevel}
                  size="sm"
                  tone="accent"
                  onPress={() => setSelectedLevel("all")}
                />
              )}
              <Chip
                label="Clear all"
                size="sm"
                tone="ink-muted"
                variant="outline"
                onPress={() => {
                  setSelectedCategory("all");
                  setSelectedDuration("all");
                  setSelectedLevel("all");
                }}
              />
            </View>
          </View>
        )}

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text variant="label" tone="ink-muted">
            {filteredPlans.length} {filteredPlans.length === 1 ? "workout" : "workouts"} found
          </Text>
        </View>

        {/* Workout Grid */}
        <View style={styles.workoutGrid}>
          {filteredPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={styles.workoutCard}
              onPress={() => router.push(`/workouts/${plan.id}`)}
              activeOpacity={0.8}
            >
              <View style={styles.workoutCardImage}>
                <View
                  style={[
                    styles.workoutCardGradient,
                    { backgroundColor: `${plan.color}20` },
                  ]}
                >
                  <Icon
                    name={{
                      ios: plan.type === "Strength" ? "dumbbell.fill" : 
                           plan.type === "Cardio" ? "figure.run.fill" :
                           plan.type === "HIIT" ? "bolt.fill" :
                           plan.type === "Yoga" ? "figure.mind.and.body" :
                           "figure.mixed.cardio",
                      android: plan.type === "Strength" ? "fitness_center" :
                             plan.type === "Cardio" ? "directions_run" :
                             plan.type === "HIIT" ? "flash_on" :
                             plan.type === "Yoga" ? "self_improvement" :
                             "accessibility",
                      web: plan.type === "Strength" ? "fitness_center" :
                           plan.type === "Cardio" ? "directions_run" :
                           plan.type === "HIIT" ? "flash_on" :
                           plan.type === "Yoga" ? "self_improvement" :
                           "accessibility",
                    }}
                    size={32}
                    tone={plan.color}
                  />
                  {plan.isNew && (
                    <Badge label="New" tone="primary" style={styles.newBadge} />
                  )}
                </View>
              </View>
              <View style={styles.workoutCardContent}>
                <View style={styles.workoutCardHeader}>
                  <Text variant="label" tone="ink" className="font-jakarta-semibold" numberOfLines={1}>
                    {plan.name}
                  </Text>
                  <Badge label={plan.type} tone="primary" size="sm" />
                </View>
                <Text variant="footnote" tone="ink-muted" className="mt-1">{plan.level} • {plan.sessions} weeks</Text>
                <View style={styles.workoutCardMeta}>
                  <View style={styles.metaItem}>
                    <Icon name={{ ios: "clock", android: "schedule", web: "schedule" }} size={14} tone="ink-subtle" />
                    <Text variant="footnote" tone="ink-muted" className="ml-1">{plan.duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Icon name={{ ios: "list.number", android: "format_list_numbered", web: "format_list_numbered" }} size={14} tone="ink-subtle" />
                    <Text variant="footnote" tone="ink-muted" className="ml-1">{plan.exercises} exercises</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Icon name={{ ios: "star.fill", android: "star", web: "star" }} size={14} tone="primary" />
                    <Text variant="footnote" tone="ink" className="ml-1 font-jakarta-medium">{plan.rating}</Text>
                    <Text variant="footnote" tone="ink-subtle">({plan.reviews})</Text>
                  </View>
                </View>
                <View style={styles.workoutCardTags}>
                  {plan.tags.map((tag) => (
                    <Badge key={tag} label={tag} tone="lavender" size="sm" className="mr-2" />
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredPlans.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name={{ ios: "magnifyingglass", android: "search", web: "search" }} size={48} tone="ink-subtle" />
            <Text variant="title" tone="ink" className="mt-4">No workouts found</Text>
            <Text variant="body" tone="ink-muted" className="mt-2 text-center px-8">
              Try adjusting your filters or search terms
            </Text>
            <Button variant="secondary" size="md" className="mt-6" onPress={() => {
              setSelectedCategory("all");
              setSelectedDuration("all");
              setSelectedLevel("all");
              setSearchText("");
            }}>
              Clear Filters
            </Button>
          </View>
        )}
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
    gap: 16,
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
  categoryChips: {
    gap: 8,
  },
  chipWrapper: {},
  filterRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  activeFilters: {
    gap: 8,
    paddingVertical: 8,
  },
  filterChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  resultsHeader: {
    marginTop: 8,
  },
  workoutGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  workoutCard: {
    width: "48.5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#0B0B1A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  workoutCardImage: {
    aspectRatio: 16 / 10,
    position: "relative",
  },
  workoutCardGradient: {
    ...StyleSheet.absoluteFill,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    padding: 12,
  },
  newBadge: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  workoutCardContent: {
    padding: 16,
    gap: 8,
  },
  workoutCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  workoutCardMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: "#F4F5F7",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  workoutCardTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
});