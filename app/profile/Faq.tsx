import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { List, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

const faqData = [
  {
    question: "How can I track my order?",
    answer:
      'You can track your order through the "My Orders" section in your account. A tracking link will also be sent via email/SMS.',
  },
  {
    question: "What is your return policy?",
    answer:
      "Returns are accepted within 30 days of delivery. The item must be unused and in original packaging.",
  },
  {
    question: "How do I cancel an order?",
    answer:
      'If your order hasn’t been shipped, you can cancel it in "My Orders". For shipped orders, contact our support team.',
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We support Visa, Mastercard, PayPal, Apple Pay, Google Pay, and major credit/debit cards.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes! We ship to over 50 countries. Shipping fees and delivery times vary by location.",
  },
  {
    question: "How do I contact customer service?",
    answer:
      'You can reach us through the "Contact Us" page or email support@yourshop.com. Support is available 24/7.',
  },
  {
    question: "Is it safe to shop on your site?",
    answer:
      "Absolutely. We use industry-standard SSL encryption and secure payment gateways to protect your data.",
  },
  {
    question: "Can I change my delivery address after placing an order?",
    answer:
      "If the order hasn’t been shipped, you can change the address from your account settings or by contacting support.",
  },
  {
    question: "How do I apply a discount code?",
    answer:
      "Enter the discount code at checkout in the provided field. The discount will be applied to your order total.",
  },
  {
    question: "What should I do if I receive a damaged item?",
    answer:
      "Please contact our support team within 48 hours of delivery with photos of the damage for a replacement or refund.",
  },
  {
    question: "Do you offer gift cards?",
    answer:
      "Yes, we offer digital gift cards that can be purchased on our website and sent via email.",
  },
  {
    question: "How can I reset my password?",
    answer:
      'Go to the "Login" page and click on "Forgot Password?". Follow the instructions in the email to reset your password.',
  },
  {
    question: "Do you have a mobile app?",
    answer:
      "Yes, our mobile app is available for both iOS and Android. Download it from the App Store or Google Play.",
  },
  {
    question: "Can I use multiple discount codes on one order?",
    answer:
      "No, only one discount code can be applied per order. Choose the best one for your purchase.",
  },
];

export default function Faq() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  interface FAQItem {
    question: string;
    answer: string;
  }

  const handlePress = (index: number): void => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderItem = ({ item, index }: { item: FAQItem; index: number }) => (
    <List.Accordion
      title={item.question}
      expanded={expandedIndex === index}
      onPress={() => handlePress(index)}
      left={(props) => (
        <MaterialIcons
          name="help-outline"
          size={22}
          color="#5c8dff"
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
          }}
        />
      )}
      style={{
        backgroundColor: "#ffffff", // force light bg
        marginBottom: 10,
        borderRadius: 12,
        elevation: 2,
        paddingHorizontal: 4,
      }}
      titleStyle={{
        fontWeight: "600",
        fontSize: 16,
        color: "#000",
      }}
      theme={{ colors: { background: "#ffffff" } }} // override dark theme if active
    >
      <List.Item
        title={item.answer}
        titleNumberOfLines={10}
        titleStyle={{
          fontSize: 14,
          color: "#333",
          lineHeight: 22,
          paddingHorizontal: 8,
        }}
        style={{ backgroundColor: "#ffffff" }} // ensure answer bg is white
      />
    </List.Accordion>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fdfdfd", padding: 20 }}>
      <Text
        variant="headlineMedium"
        style={{
          fontWeight: "bold",
          marginBottom: 20,
          color: "#000",
        }}
      >
        Frequently Asked Questions
      </Text>

      <FlatList
        data={faqData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
