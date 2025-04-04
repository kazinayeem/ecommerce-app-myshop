import React from "react";
import { Text, View } from "react-native";

interface WarrantyPolicyProps {
  warranty?: number;
}
export default function WarrantyPolicy({ warranty }: WarrantyPolicyProps) {
  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#3b818e",
          marginBottom: 5,
        }}
      >
        Warranty Information
      </Text>

      <Text style={{ fontSize: 16, color: "#555", lineHeight: 22 }}>
        This product comes with a
        <Text style={{ fontWeight: "bold", color: "#333" }}>
          {warranty || 12}
        </Text>
        month warranty from the date of purchase, covering only manufacturing
        defects.
      </Text>
    </View>
  );
}
