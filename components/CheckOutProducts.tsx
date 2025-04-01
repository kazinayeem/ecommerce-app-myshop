import { CartItem } from "@/redux/type";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";

const ProductItem = ({ item }: { item: CartItem }) => {
  return (
    <View key={item.productId} style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.priceQuantityContainer}>
          <Text style={styles.price}>
            {"\u09F3"} {item.price.toLocaleString()}
          </Text>
          <Text style={styles.multiply}> x </Text>
          <Text style={styles.quantity}>{item.quantity}</Text>
        </View>
        {item.size && <Text style={styles.option}>Size: {item.size}</Text>}
        {item.color && <Text style={styles.option}>Color: {item.color}</Text>}
      </View>
    </View>
  );
};

export default function CartTable({ cartItems }: { cartItems: CartItem[] }) {
  return (
    <View>
      <Text style={styles.title}>Products</Text>
      <Card.Content>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyCart}>Your cart is empty</Text>
        ) : (
          <View>
            {cartItems.map((item) => (
              <ProductItem key={item.productId} item={item} />
            ))}
          </View>
        )}
      </Card.Content>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: "#ddd",
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  priceQuantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 12,
    fontWeight: "bold",
  },
  multiply: {
    fontSize: 12,
    marginHorizontal: 5,
  },
  quantity: {
    fontSize: 12,
  },
  option: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },
  emptyCart: {
    textAlign: "center",
    padding: 20,
    color: "#888",
  },
});
