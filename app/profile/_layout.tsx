import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true, animation: "fade_from_bottom" }}>
      <Stack.Screen name="Faq" options={{ headerTitle: "FAQ" }} />
      <Stack.Screen name="About" options={{ headerTitle: "About" }} />
      <Stack.Screen name="Contact" options={{ headerTitle: "Contact" }} />
      <Stack.Screen
        name="RefundPolicy"
        options={{ headerTitle: "RefundPolicy" }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        options={{ headerTitle: "PrivacyPolicy" }}
      />
      <Stack.Screen
        name="TermsAndConditions"
        options={{ headerTitle: "TermsAndConditions" }}
      />
    </Stack>
  );
}
