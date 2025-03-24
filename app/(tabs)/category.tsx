import HeaderBar from "@/components/HeaderBar";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { Subcategory } from "@/redux/type";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, Divider } from "react-native-paper";
function Category() {
  const [subcategory, setSubcategory] = useState<Subcategory[]>([]);
  const {
    data: categoriesData = [],
    isLoading,
    isError,
  } = useGetCategoriesQuery({});

  useEffect(() => {
    if (categoriesData.length > 0) {
      setSubcategory(categoriesData[0]?.subcategory || []);
    }
  }, [categoriesData]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ce0c82" />
        <Text style={styles.loadingText}>Loading Categories...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>⚠️ Failed to load categories.</Text>
        <Text style={styles.errorSubText}>Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderBar />
      <Divider />

      <View style={styles.content}>
        {/* Category List */}
        <View style={styles.categoryContainer}>
          <FlatList
            data={categoriesData}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => setSubcategory(item.subcategory || [])}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Subcategory List */}
        <View style={styles.subcategoryContainer}>
          {subcategory.length > 0 ? (
            <FlatList
              numColumns={3}
              data={subcategory}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.subcategoryItem}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.subcategoryImage}
                  />
                  <Text style={styles.subcategoryText} numberOfLines={1}>
                    {item.name.length > 15
                      ? `${item.name.slice(0, 15)}..`
                      : item.name}
                  </Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noSubcategoryText}>
              No Subcategories Available
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#f9fafc",
    padding: 10,
  },
  categoryContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  subcategoryContainer: {
    flex: 3,
    backgroundColor: "#f9fafc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  categoryItem: {
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 5,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  subcategoryItem: {
    backgroundColor: "#fff",
    width: "30%",
    margin: "1.5%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  subcategoryImage: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginBottom: 5,
  },
  subcategoryText: {
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
  noSubcategoryText: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ce0c82",
  },
  errorSubText: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
});

export default Category;
