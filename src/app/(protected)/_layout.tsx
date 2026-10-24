import React from 'react';
import { Stack } from 'expo-router';

export default function ProtectedLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="workouts/[id]" />
      <Stack.Screen name="workouts/active/[sessionId]" />
      <Stack.Screen name="workouts/start" />
      <Stack.Screen name="workouts/history" />
      <Stack.Screen name="workouts/create" />
      <Stack.Screen name="progress/records" />
      <Stack.Screen name="progress/achievements" />
      <Stack.Screen name="progress/body-metrics" />
      <Stack.Screen name="profile/edit" />
      <Stack.Screen name="profile/subscription" />
      <Stack.Screen name="profile/connected-apps" />
      <Stack.Screen name="profile/data-privacy" />
      <Stack.Screen name="profile/units" />
      <Stack.Screen name="profile/theme" />
      <Stack.Screen name="profile/help" />
      <Stack.Screen name="profile/feedback" />
      <Stack.Screen name="profile/terms" />
      <Stack.Screen name="profile/privacy" />
      <Stack.Screen name="profile/licenses" />
      <Stack.Screen name="log" />
      <Stack.Screen name="plans/create" />
      <Stack.Screen name="gyms" />
    </Stack>
  );
}