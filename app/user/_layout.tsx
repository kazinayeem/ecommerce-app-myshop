import { Tabs } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "User" }} />
      <Tabs.Screen name="order" options={{ title: "Orders" }} />
      <Tabs.Screen name="address" options={{ title: "Addresses" }} />
    </Tabs>
  );
}
