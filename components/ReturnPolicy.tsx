import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface ReturnPolicyProps {
  returnableDays?: number;
}
export default function ReturnPolicy({ returnableDays }: ReturnPolicyProps) {
  return (
    <View>
      <MaterialCommunityIcons name="refresh" size={24} color="#3b818e" />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#3b818e",
        }}
      >
        Return Policy
      </Text>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          color: "#3b818e",
        }}
      >
        You can return this product within{" "}
        <Text style={{ fontWeight: "bold" }}>{returnableDays || 7}</Text> days
        if it’s defective or not as described.
      </Text>
    </View>
  );
}
