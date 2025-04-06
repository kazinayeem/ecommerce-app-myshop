import { useGetProductsQuery } from "@/redux/api/productApi";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Card } from "react-native-paper";
import NoFound from "./NoFound";

const PAGE_SIZE = 20;
const fallbackImage = "https://via.placeholder.com/150";

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

  const router = useRouter();

  useEffect(() => {
    if (data?.products) {
      setProducts((prev) => {
        const newProducts =
          page === 1 ? data.products : [...prev, ...data.products];
        if (prev.length !== newProducts.length) {
          return newProducts;
        }
        return prev;
      });
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
  const handlePress = useCallback(
    (itemId: string) => {
      router.push(`/product/${itemId}`);
    },
    [router]
  );

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <ProductCard item={item} onPress={() => handlePress(item._id)} />
    ),
    [handlePress]
  );

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
      {search?.trim() && (
        <Text style={styles.searchTitle}>Search Results for "{search}"</Text>
      )}

      {products.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Text>No products found.</Text>
          <NoFound />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id + Math.random().toString() + page}
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          numColumns={colnum}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          onEndReached={loadMore}
          ListEmptyComponent={
            <View style={styles.loadingContainer}>
              <Text>No products found.</Text>
              <NoFound />
            </View>
          }
          initialNumToRender={PAGE_SIZE}
          onEndReachedThreshold={0.2}
          getItemLayout={(data, index) => ({
            length: 150,
            offset: 150 * index,
            index,
          })}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          ListHeaderComponent={
            <View style={{ padding: 10 }}>
              <Text style={styles.searchTitle}>Products</Text>
            </View>
          }
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
      )}
    </View>
  );
}

const ProductCard = React.memo(
  ({ item, onPress }: { item: any; onPress: () => void }) => (
    <Card style={styles.card} onPress={onPress}>
      <FastImage
        source={{ uri: item.image?.[0] || fallbackImage }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.name}>
        {item.name.length > 30 ? `${item.name.slice(0, 30)}...` : item.name}
      </Text>
      <Text style={styles.price}>
        {"\u09F3"}
        {item?.priceByVariant?.[0]?.price
          ? item.priceByVariant[0].price.toLocaleString()
          : item.price.toLocaleString()}
      </Text>
    </Card>
  )
);

ProductCard.displayName = "ProductCard";

const styles = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9fafc",
  },
  searchTitle: {
    fontSize: 18,
    fontWeight: "bold" as const,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: "#ffffff",
    elevation: 2,
  },
  image: {
    height: 100,
    resizeMode: "contain" as const,
  },
  name: {
    fontWeight: "bold" as const,
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
