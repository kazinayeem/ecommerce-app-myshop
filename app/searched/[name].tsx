import AllProducts from "@/components/AllProducts";
import SearchBar from "@/components/SearchBar";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Searched() {
  const { name } = useLocalSearchParams();
  return (
    <View style={{ flex: 1 }}>
      <SearchBar />
      <AllProducts search={name as string} />
    </View>
  );
}
