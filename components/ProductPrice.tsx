import { ProductPriceProps } from "@/redux/type";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { maincolor } from "./color/color";

export default function ProductPrice({
  _id,
  name,
  value,
  price,
  stock,

  selectedProduct,
}: ProductPriceProps) {
  const product = selectedProduct?._id
    ? selectedProduct
    : { _id, name, value, price, stock };

  return (
    <View>
      <Text style={styles.priceText}>
        {"\u09F3"}
        {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </Text>
      <Text>Stock: {product.stock > 0 ? product.stock : "No Available"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  priceText: {
    fontSize: 22,
    fontWeight: "bold",
    color: maincolor,
  },
});
