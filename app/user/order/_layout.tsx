import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Order" }} />
      <Stack.Screen name="[id]" options={{ title: "Order Details" }} />
    </Stack>
  );
}
