import { AntDesign } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_left",
        animationMatchesGesture: true,
        animationDuration: 300,
        headerShown: true,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="login"
        options={({ navigation }) => ({
          title: "Login",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                console.log("back");
                navigation.goBack();
              }}
              style={{ marginLeft: 15 }}
            >
              <AntDesign name="arrowleft" size={25} color="#000" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="register" options={{ title: "Register" }} />
    </Stack>
  );
}
