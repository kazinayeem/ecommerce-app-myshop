import {
  removeItem,
  setShippingPrice,
  updateItemQuantity,
} from "@/redux/reducer/cartReducer";
import { RootState } from "@/redux/store";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Card, IconButton } from "react-native-paper";
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
        {items.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartText}>No items in cart</Text>
            <Button
              mode="contained"
              onPress={() => router.push("/")}
              style={styles.goToProductsButton}
            >
              Go to Products
            </Button>
          </View>
        ) : (
          items.map((item) => (
            <Card key={item.productId} style={styles.cartItem}>
              <View style={styles.cartItemContent}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>
                    {item.name.length > 30
                      ? `${item.name.slice(0, 30)}...`
                      : item.name}
                  </Text>
                  <Text style={styles.productPrice}>৳{item.price}</Text>
                </View>
                <View style={styles.quantityControls}>
                  <IconButton
                    icon="minus"
                    size={24}
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
                    size={24}
                    onPress={() =>
                      handleQuantityChange(item.productId, item.quantity + 1)
                    }
                  />
                </View>
              </View>
              <IconButton
                icon="trash-can"
                size={24}
                onPress={() => {
                  dispatch(removeItem(item.productId));
                  dispatch(setShippingPrice(0));
                }}
                style={styles.removeButton}
              />
            </Card>
          ))
        )}
        {items.length > 0 && (
          <Text style={styles.totalPrice}>Total Price: ৳{totalPrice}</Text>
        )}
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
    backgroundColor: "#fff",
    padding: 16,
  },
  cartList: {
    flex: 1,
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyCartText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
  goToProductsButton: {
    width: 200,
    marginTop: 20,
  },
  cartItem: {
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#f9f9f9",
    elevation: 2,
  },
  cartItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "center",
    color: "#333",
  },
  checkoutContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  checkoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
