import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        animationMatchesGesture: true,
        animationDuration: 300,
      }}
    >
      <Stack.Screen name="index" options={{ title: "User" }} />
      <Stack.Screen name="order" options={{ title: "Orders" }} />
      <Stack.Screen name="address" options={{ title: "Addresses" }} />
    </Stack>
  );
}
