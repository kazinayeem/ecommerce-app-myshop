import AllProducts from "@/components/AllProducts";
import HeaderBar from "@/components/HeaderBar";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function CategoryDetails() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1 }}>
      <HeaderBar />
      <AllProducts categoryid={id as string} mb={0} colnum={1} />
    </View>
  );
}
