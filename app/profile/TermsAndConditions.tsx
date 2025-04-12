import React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";

export default function TermsAndConditions() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text
        variant="headlineMedium"
        style={{ fontWeight: "bold", color: "#000", marginBottom: 12 }}
      >
        Terms & Conditions
      </Text>
      <Text style={{ fontSize: 15, color: "#333", lineHeight: 24 }}>
        By using ShopEase, you agree to the following terms:
        {"\n\n"}1. All content and products are the property of ShopEase.
        {"\n\n"}2. You must provide accurate and up-to-date account information.
        {"\n\n"}3. Orders may be canceled or delayed based on availability or
        payment issues.
        {"\n\n"}4. We are not liable for delays caused by third-party carriers.
        {"\n\n"}5. Refunds and returns are subject to our Refund Policy.
        {"\n\n"}We reserve the right to update these terms at any time.
      </Text>
    </ScrollView>
  );
}
