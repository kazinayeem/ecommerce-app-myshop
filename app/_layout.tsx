import MainProvider from "@/components/PaperProvider";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <MainProvider>
      <StatusBar
        animated={true}
        backgroundColor={"#ddd"}
        barStyle="dark-content"
        showHideTransition="slide"
        hidden={false}
        translucent={false}
      />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="category/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="subcategory/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="searched/[name]" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="user" options={{ headerShown: false }} />
      </Stack>
    </MainProvider>
  );
}
