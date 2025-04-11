import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationMatchesGesture: true,
        animationDuration: 300,
      }}
    >
      <Stack.Screen name="index" />

      <Stack.Screen name="add-address" />
    </Stack>
  );
}
