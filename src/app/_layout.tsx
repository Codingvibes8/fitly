import React, { useEffect } from "react";
import { Stack, Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { AuthProvider, useAuth } from "@/context/AuthContext";

// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

// Inner layout with auth protection
function InnerLayout() {
  const { initialized, user } = useAuth();

  if (!initialized) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Protected routes - redirect to login if not authenticated */}
      {user ? (
        <>
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
        </>
      ) : (
        // Redirect to login if not authenticated
        <Redirect href="/(auth)/login" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "PlusJakartaSans-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "PlusJakartaSans-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "PlusJakartaSans-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "PlusJakartaSans-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(protected)">
          <InnerLayout />
        </Stack.Screen>
      </Stack>
    </AuthProvider>
  );
}