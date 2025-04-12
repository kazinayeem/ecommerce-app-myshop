import React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";

export default function PrivacyPolicy() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text
        variant="headlineMedium"
        style={{ fontWeight: "bold", color: "#000", marginBottom: 12 }}
      >
        Privacy Policy
      </Text>
      <Text style={{ fontSize: 15, color: "#333", lineHeight: 24 }}>
        At ShopEase, we value your privacy.
        {"\n\n"}We collect personal information such as name, email, and
        shipping address to fulfill your orders and provide better service.
        {"\n\n"}We never sell or rent your data. All transactions are encrypted
        and processed through secure payment gateways.
        {"\n\n"}You can update or delete your information at any time from your
        account settings.
        {"\n\n"}By using our app, you consent to our privacy practices.
      </Text>
    </ScrollView>
  );
}
