import moment from "moment";
import React from "react";
import { Text, View } from "react-native";

export default function GuaranteedDate() {
  const deliveryDate = `${moment().format("MMM D")} - ${moment()
    .add(5, "days")
    .format("MMM D")}`;

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
        Shipping Information
      </Text>

      <Text style={{ fontSize: 16, color: "#555", lineHeight: 22 }}>
        Expected delivery within{" "}
        <Text style={{ fontWeight: "bold", color: "#333" }}>
          3-5 business days
        </Text>
        . Guaranteed Buy today to{" "}
        <Text style={{ fontWeight: "bold", color: "#333" }}>
          {deliveryDate}
        </Text>
        .
      </Text>
    </View>
  );
}
