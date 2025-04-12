import React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";

export default function About() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text
        variant="headlineMedium"
        style={{ fontWeight: "bold", color: "#000", marginBottom: 12 }}
      >
        About Us
      </Text>
      <Text style={{ fontSize: 15, color: "#333", lineHeight: 24 }}>
        Welcome to ShopEase! We’re a passionate team dedicated to delivering
        high-quality products with excellent service.
        {"\n\n"}Our mission is to make online shopping fast, easy, and
        affordable for everyone. From tech gadgets to trendy fashion, we
        carefully curate our collection to meet your needs.
        {"\n\n"}Thank you for choosing us. We’re here to serve you better every
        day!
      </Text>
    </ScrollView>
  );
}
