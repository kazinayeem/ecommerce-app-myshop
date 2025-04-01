import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "User" }} />
      <Stack.Screen name="order/index" options={{ title: "Orders" }} />
      <Stack.Screen name="address/index" options={{ title: "Addresses" }} />
      <Stack.Screen
        name="address/add-address"
        options={{ title: "Add Address" }}
      />
      <Stack.Screen name="/order/[id]" options={{ title: "Order Details" }} />
    </Stack>
  );
}
