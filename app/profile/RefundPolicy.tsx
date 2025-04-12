import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "react-native-paper";

export default function RefundPolicy() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text
        variant="headlineMedium"
        style={{ fontWeight: "bold", color: "#000", marginBottom: 12 }}
      >
        Refund Policy
      </Text>
      <Text style={{ fontSize: 15, color: "#333", lineHeight: 24 }}>
        We want you to love your purchase!
        {"\n\n"}If you're not satisfied, you can request a return or refund
        within 30 days of delivery. Items must be unused and in original
        packaging.
        {"\n\n"}Once approved, refunds will be processed to your original
        payment method within 5–7 business days.
        {"\n\n"}For any issues, please contact us at support@shopease.com.
      </Text>
    </ScrollView>
  );
}
