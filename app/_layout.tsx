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
      <Stack
        initialRouteName="(tabs)"
        screenOptions={{
          animation: "slide_from_left",
          animationMatchesGesture: true,
          animationDuration: 300,
        }}
      >
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
        <Stack.Screen name="checkout" options={{ headerShown: false }} />
        <Stack.Screen name="success" options={{ headerShown: false }} />
        <Stack.Screen name="fail" options={{ headerShown: false }} />
        <Stack.Screen name="cancel" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
      </Stack>
    </MainProvider>
  );
}
