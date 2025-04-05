import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";

export default function CategoryShow() {
  const router = useRouter();
  const {
    data: categoriesData = [],
    isLoading,
    isError,
  } = useGetCategoriesQuery({});

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.text} variant="labelLarge">
          Categories
        </Text>
        <Link href="/category" asChild>
          <TouchableOpacity>
            <Text style={[styles.text, styles.viewAll]}>View All</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Loading / Error Handling */}
      {isLoading && <Text style={styles.loadingText}>Loading...</Text>}
      {isError && (
        <Text style={styles.errorText}>
          Error: Failed to load categories. Please try again later.
        </Text>
      )}

      {/* Categories List */}
      <FlatList
        data={categoriesData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => router.push(`/category/${item._id}`)}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text variant="titleMedium" style={styles.itemText}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        initialNumToRender={5} 
        getItemLayout={(data, index) => ({
          length: 80,
          offset: 80 * index,
          index,
        })}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  viewAll: {
    color: "#ce0c82", // Highlighted color
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginVertical: 10,
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
    marginVertical: 10,
  },
  listContainer: {
    paddingHorizontal: 5,
  },
  itemContainer: {
    alignItems: "center",
    marginRight: 12,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  itemText: {
    fontSize: 13,
    marginTop: 5,
    color: "#333",
    textAlign: "center",
  },
});
