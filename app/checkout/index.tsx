import CartTable from "@/components/CheckOutProducts";
import { useAppSelector } from "@/redux/hook/hooks";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";

export default function CheckoutPage() {
  const {
    items: cartItems,
    totalPrice,
    discountPrice,
    shippingPrice,
  } = useAppSelector((state) => state.cart);

  const finalPrice = totalPrice - (discountPrice || 0) + (shippingPrice || 0);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <CartTable cartItems={cartItems} />

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Price:</Text>
          <Text style={styles.totalAmount}>
            {"\u09F3"}
            {finalPrice.toLocaleString()}
          </Text>
        </View>

        <View style={styles.buttonSection}>
          <Button
            mode="contained"
            onPress={() => router.push("/checkout/payment")}
            disabled={cartItems.length === 0}
          >
            Go to Payment
          </Button>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 0,
  },
  card: {
    backgroundColor: "#ffff",
  },
  totalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  buttonSection: {
    backgroundColor: "#fff",
    padding: 16,
    alignItems: "center",
  },
});
