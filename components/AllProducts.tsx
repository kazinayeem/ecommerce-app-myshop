import { useGetProductsQuery } from "@/redux/api/productApi";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { Card } from "react-native-paper";
import NoFound from "./NoFound";

const PAGE_SIZE = 10;

export default function AllProducts({
  search,
  categoryid,
  subcategoryid,
  mb,
  colnum = 2,
}: {
  search?: string;
  categoryid?: string;
  mb?: number;
  colnum?: number;
  subcategoryid?: string;
}) {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { data, isFetching, isLoading, isError } = useGetProductsQuery({
    limit: PAGE_SIZE,
    page,
    search,
    categoryid,
    subcategoryid,
  });

  useEffect(() => {
    if (data?.products) {
      setProducts((prev) =>
        page === 1 ? data.products : [...prev, ...data.products]
      );
    }
    setIsFetchingMore(false);
  }, [data, page]);

  const loadMore = useCallback(() => {
    if (
      !isFetching &&
      !isFetchingMore &&
      products.length < (data?.totalProducts || 0)
    ) {
      setIsFetchingMore(true);
      setPage((prev) => prev + 1);
    }
  }, [isFetching, isFetchingMore, products.length, data?.totalProducts]);

  const router = useRouter();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error: Failed to load products. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { marginBottom: mb || 0 }]}>
      {search && (
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Search Results for "{search}"
        </Text>
      )}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {products.length === 0 ? (
          <View style={styles.loadingContainer}>
            <Text>No products found.</Text>
            <NoFound />
          </View>
        ) : null}
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) =>
          item?._id + Math.random().toString() || Math.random().toString()
        }
        numColumns={colnum}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => router.push(`/product/${item._id}`)}
          >
            <Image
              source={{
                uri: item.image?.[0] || "https://via.placeholder.com/150",
              }}
              style={styles.image}
            />
            <Text style={styles.name}>
              {item.name.length > 30
                ? `${item.name.slice(0, 30)}...`
                : item.name}
            </Text>
            <Text style={styles.price}>
              {"\u09F3"}
              {item?.priceByVariant?.[0]?.price
                ? item.priceByVariant[0].price.toLocaleString()
                : item.price.toLocaleString()}
            </Text>
          </Card>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingMore ? (
            <ActivityIndicator
              size="large"
              color="blue"
              style={{ marginBottom: 100 }}
            />
          ) : null
        }
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9fafc",
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  image: {
    height: 100,
    resizeMode: "contain" as "contain",
  },
  name: {
    fontWeight: "bold" as "bold",
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    color: "#e90a8b",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
};
