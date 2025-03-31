import CartTable from "@/components/CheckOutProducts";
import { useAppSelector } from "@/redux/hook/hooks";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Card, Divider } from "react-native-paper";

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
        <Text style={styles.header}>Review Your Order</Text>
        <Divider style={styles.divider} />

        <CartTable cartItems={cartItems} />

        <View style={styles.priceSummary}>
          <View style={styles.priceRow}>
            <Text style={styles.label}>Subtotal:</Text>
            <Text style={styles.amount}>
              {"\u09F3"}
              {totalPrice.toLocaleString()}
            </Text>
          </View>

          {discountPrice > 0 && (
            <View style={styles.priceRow}>
              <Text style={styles.label}>Discount:</Text>
              <Text style={[styles.amount, styles.discount]}>
                -{"\u09F3"}
                {discountPrice.toLocaleString()}
              </Text>
            </View>
          )}

          <View style={styles.priceRow}>
            <Text style={styles.label}>Shipping:</Text>
            <Text style={styles.amount}>
              {"\u09F3"}
              {shippingPrice.toLocaleString()}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>
              {"\u09F3"}
              {finalPrice.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.buttonSection}>
          <Button
            mode="contained"
            onPress={() => router.push("/checkout/payment")}
            disabled={cartItems.length === 0}
            style={styles.checkoutButton}
            labelStyle={styles.buttonLabel}
          >
            Proceed to Payment
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
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    padding: 16,
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  divider: {
    marginVertical: 10,
  },
  priceSummary: {
    marginTop: 10,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  amount: {
    fontSize: 14,
    fontWeight: "bold",
  },
  discount: {
    color: "#ff3b30",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e60023",
  },
  buttonSection: {
    marginTop: 15,
    alignItems: "center",
  },
  checkoutButton: {
    backgroundColor: "#ff6f00",
    borderRadius: 8,
    paddingVertical: 10,
    width: "100%",
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
