import CartTable from "@/components/CheckOutProducts";
import { useAppSelector } from "@/redux/hook/hooks";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Divider } from "react-native-paper";

export default function CheckoutPage() {
  const {
    items: cartItems,
    totalPrice,
    discountPrice,
    shippingPrice,
  } = useAppSelector((state) => state.cart);

  const finalPrice = totalPrice - (discountPrice || 0) + (shippingPrice || 0);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },

  priceSummary: {
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 3, // subtle shadow for card effect
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },

  label: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },

  amount: {
    fontSize: 14,
    fontWeight: "600",
  },

  discount: {
    color: "#ff3b30",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },

  totalAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e60023", // Red for the total price to stand out
  },

  divider: {
    marginVertical: 16,
    borderColor: "#ddd",
  },

  buttonSection: {
    marginTop: 20,
    alignItems: "center",
  },

  checkoutButton: {
    backgroundColor: "#5cb85c", // Soft green for positive action
    borderRadius: 8,
    width: "100%",
    paddingVertical: 12,
  },

  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff", // White text for contrast
  },
});
