import { CartItem } from "@/redux/type";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";

export default function CartTable({ cartItems }: { cartItems: CartItem[] }) {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Cart Items</Text>
      <View style={styles.rowHeader}>
        <Text style={styles.headerCell}>Product</Text>
        <Text style={styles.headerCell}>Price</Text>
        <Text style={styles.headerCell}>Size/Variant</Text>
        <Text style={styles.headerCell}>Color</Text>
        <Text style={styles.headerCell}>Quantity</Text>
        <Text style={styles.headerCell}>Subtotal</Text>
      </View>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.cellProduct}>
                {/* {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                  />
                )} */}
                <Text style={styles.productName}>
                  {item.name.length > 8
                    ? `${item.name.slice(0, 8)}...`
                    : item.name}
                </Text>
              </View>
              <Text style={styles.cell}>
                {"\u09F3"}
                {item.price.toLocaleString()}
              </Text>
              <Text style={styles.cell}>{item.size || ""}</Text>
              <Text style={styles.cell}>{item.color || ""}</Text>
              <Text style={styles.cell}>{item.quantity}</Text>
              <Text style={styles.cell}>
                {"\u09F3"}
                {(item.price * item.quantity).toLocaleString()}
              </Text>
            </View>
          )}
        />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 2,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  rowHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    marginBottom: 5,
  },
  headerCell: {
    flex: 1,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexWrap: "wrap",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 10,
    flexShrink: 1, // Prevent overflow
  },
  cellProduct: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap", // Allow product details to wrap
  },
  productImage: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 5,
  },
  productName: {
    fontSize: 12,
    flexShrink: 1, // Ensure text wraps in case it's too long
  },
  emptyCart: {
    textAlign: "center",
    padding: 20,
    color: "#888",
  },
});
