import React from "react";
import { Tabs } from "expo-router";
import { Icon } from "@/components/ui/Icon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FFC629",
        tabBarInactiveTintColor: "#9AA1B4",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          paddingTop: 8,
          paddingBottom: 16,
          height: 88,
          shadowColor: "#0B0B1A",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={{
                ios: focused ? "house.fill" : "house",
                android: focused ? "home" : "home",
                web: focused ? "home" : "home",
              }}
              size={24}
              tone={focused ? "primary" : "ink-subtle"}
            />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={{
                ios: focused ? "dumbbell.fill" : "dumbbell",
                android: focused ? "fitness_center" : "fitness_center",
                web: focused ? "fitness_center" : "fitness_center",
              }}
              size={24}
              tone={focused ? "primary" : "ink-subtle"}
            />
          ),
          tabBarLabel: "Workouts",
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={{
                ios: focused ? "chart.line.uptrend.xyaxis" : "chart.line.uptrend.xyaxis",
                android: focused ? "show_chart" : "show_chart",
                web: focused ? "show_chart" : "show_chart",
              }}
              size={24}
              tone={focused ? "primary" : "ink-subtle"}
            />
          ),
          tabBarLabel: "Progress",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={{
                ios: focused ? "person.crop.circle.fill" : "person.crop.circle",
                android: focused ? "person" : "person_outline",
                web: focused ? "person" : "person_outline",
              }}
              size={24}
              tone={focused ? "primary" : "ink-subtle"}
            />
          ),
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}