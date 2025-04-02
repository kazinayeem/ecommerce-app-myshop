import { ProductPriceVariantProps } from "@/redux/type";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { maincolor } from "./color/color";

export default function ProductPriceVariant({
  priceByVariant,
  selectedProduct,
  setSelectedProduct,
}: ProductPriceVariantProps) {
  return (
    <View style={{ flexDirection: "row", marginBottom: 10 }}>
      {priceByVariant.length > 0 &&
        priceByVariant.map((d) => (
          <TouchableOpacity
            key={d._id}
            style={{
              alignItems: "center",
              marginRight: 10,
              borderWidth: 1,
              borderColor: maincolor,
              borderRadius: 10,
              padding: 5,
              position: "relative",
              backgroundColor: "white",
            }}
            onPress={() => {
              setSelectedProduct({
                name: d.name,
                value: d.value,
                price: d.price,
                stock: d.stock,
                image: d.image,
                _id: d._id,
              });
            }}
          >
            {selectedProduct._id === d._id && (
              <View
                style={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  zIndex: 10,
                }}
              >
                <MaterialIcons
                  name="check-circle"
                  size={22}
                  color={maincolor}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 11,
                  }}
                />
              </View>
            )}

            {/* Product Image */}
            <Image
              source={{ uri: d.image }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 10,
              }}
            />

            {/* Product Details */}
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                {d.name}{" "}
              </Text>

              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  marginBottom: 5,
                  color: maincolor,
                }}
              >
                {d.value}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
}
