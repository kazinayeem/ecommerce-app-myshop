import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

export default function Contact() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text
        variant="headlineMedium"
        style={{ fontWeight: "bold", color: "#000", marginBottom: 16 }}
      >
        Contact Us
      </Text>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <MaterialIcons name="email" size={20} color="#000" />
        <Text style={{ marginLeft: 10, fontSize: 15, color: "#333" }}>
          support@shopease.com
        </Text>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <MaterialIcons name="phone" size={20} color="#000" />
        <Text style={{ marginLeft: 10, fontSize: 15, color: "#333" }}>
          +1 234 567 8901
        </Text>
      </View>

      <Text style={{ fontSize: 14, color: "#666", marginTop: 20 }}>
        We’re available 24/7 to assist you with any questions, concerns, or
        feedback.
      </Text>
    </ScrollView>
  );
}
