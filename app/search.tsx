import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Search() {
  const searchInputRef = useRef<TextInput | null>(null);
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Search Bar Row */}
      <View style={styles.searchRow}>
        {/* Back Button */}
        <Pressable onPress={router.back} style={styles.backButton}>
          <Entypo name="chevron-left" size={26} color="black" />
        </Pressable>

        {/* Search Input */}
        <View style={styles.inputContainer}>
          <Entypo
            name="magnifying-glass"
            size={20}
            color="#677280"
            style={styles.searchIcon}
          />
          <TextInput
            ref={searchInputRef}
            placeholder="Search"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
        </View>

        {/* Search Button */}
        <Pressable style={styles.searchButton}>
          <Text style={styles.searchText}>Search</Text>
        </Pressable>
      </View>

      {/* Search Results or Suggestions */}
      <Text style={styles.resultText}>Search Results...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 8,
  },
  inputContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6c2da",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 45,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#e6c2da",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginLeft: 10,
  },
  searchText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
    color: "#444",
  },
});
