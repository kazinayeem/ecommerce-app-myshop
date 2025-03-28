import { removeItem, updateItemQuantity } from "@/redux/reducer/cartReducer";
import { RootState } from "@/redux/store";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  const handleQuantityChange = (productId: string, quantity: number) => {
    dispatch(updateItemQuantity({ id: productId, quantity }));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.cartList}>
        {items.length === 0 && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 18, color: "black" }}>
              No items in cart
            </Text>
            <Button
              mode="contained"
              onPress={() => router.push("/")}
              style={{ marginTop: 20 }}
            >
              Go to Products
            </Button>
          </View>
        )}

        {items.map((item) => (
          <View key={item.productId} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name.slice(0, 30)}</Text>
            <View style={styles.quantityControls}>
              <IconButton
                icon="minus"
                size={20}
                onPress={() =>
                  handleQuantityChange(
                    item.productId,
                    Math.max(item.quantity - 1, 1)
                  )
                }
              />
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <IconButton
                icon="plus"
                size={20}
                onPress={() =>
                  handleQuantityChange(item.productId, item.quantity + 1)
                }
              />
              {/* remove button */}
              <IconButton
                icon="trash-can"
                size={20}
                onPress={() => dispatch(removeItem(item.productId))}
              />
            </View>
          </View>
        ))}
        <Text style={styles.totalPrice}>Total Price: ৳{totalPrice}</Text>
        <View style={styles.checkoutContainer}>
          <Button
            mode="contained"
            style={styles.checkoutButton}
            onPress={() => router.push("/checkout")}
            disabled={items.length === 0}
          >
            Continue to Checkout
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 50,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
    textAlign: "center",
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  cartList: {
    flex: 1,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  productImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  productName: {
    flex: 1,
    fontSize: 12,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  checkoutContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  checkoutButton: {
    padding: 10,
  },
});
