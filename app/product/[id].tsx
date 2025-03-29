import GradientButton from "@/components/GradientButton";
import HtmlParseData from "@/components/HtmlParseData";
import ImageCarosel from "@/components/ImageCarosel";
import ProductColor from "@/components/ProductColor";
import ProductPrice from "@/components/ProductPrice";
import ProductPriceVariant from "@/components/ProductPriceVariant";
import SearchBar from "@/components/SearchBar";
import { useGetProductByIdQuery } from "@/redux/api/productApi";
import { useAppDispatch } from "@/redux/hook/hooks";
import { addItem } from "@/redux/reducer/cartReducer";
import { ProductType } from "@/redux/type";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function Product() {
  const dispatch = useAppDispatch();
  const [selectedProduct, setSelectedProduct] = useState<ProductType>({
    name: "",
    value: "",
    price: 0,
    stock: 0,
    image: "",
    _id: "",
  });
  const [selectedColor, setSelectedColor] = useState<string>("");
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError, refetch } = useGetProductByIdQuery(
    id as string
  );
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => {
      setRefreshing(false);
    });
  }, [refetch]);

  useEffect(() => {
    if (data && data.priceByVariant && data.priceByVariant.length > 0) {
      const firstVariant = data.priceByVariant[0];
      setSelectedProduct({
        name: firstVariant.name,
        value: firstVariant.value,
        price: firstVariant.price,
        stock: firstVariant.stock,
        image: firstVariant.image,
        _id: firstVariant._id,
      });
    }
  }, [data]);

  const addToCart = () => {
    dispatch(
      addItem({
        productId: data._id,
        name: data.name,
        price:
          selectedProduct.name || selectedProduct._id
            ? selectedProduct.price
            : data.price,
        quantity: 1,
        image: data.image[0],
        variantsName: selectedProduct.value || "",
        size: selectedProduct.value || "",
        color: selectedColor || "",
      })
    );
  };
  const buynowHandeler = () => {
    dispatch(
      addItem({
        productId: data._id,
        name: data.name,
        price:
          selectedProduct.name || selectedProduct._id
            ? selectedProduct.price
            : data.price,
        quantity: 1,
        image: data.image[0],
        variantsName: selectedProduct.value || "",
        size: selectedProduct.value || "",
        color: selectedColor || "",
      })
    );
    router.push("/checkout");
  };

  if (isLoading) {
    return (
      <View style={styles.centeredView}>
        <Text>Loading product...</Text>
        <ActivityIndicator color="#0000ff" size="large" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.centeredView}>
        <Text>Error: Failed to load product. Please try again later.</Text>
      </View>
    );
  }

  const priceByVariant = data.priceByVariant || [];
  const colorOptions = data.color || [];

  return (
    <View style={styles.container}>
      <SearchBar />

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <ImageCarosel data={data} />
        </View>

        <Text style={styles.productTitle}>{data.name}</Text>
        <ProductPriceVariant
          priceByVariant={priceByVariant}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
        <ProductColor
          colorOptions={colorOptions}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <ProductPrice
          _id={data._id}
          name={data.name}
          value={selectedProduct.value || ""}
          price={
            selectedProduct.name || selectedProduct._id
              ? selectedProduct.price
              : data.price
          }
          stock={selectedProduct._id ? selectedProduct.stock : data.stock}
          selectedProduct={selectedProduct}
        />
        {/* Description */}
        {data.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <HtmlParseData tnode={data.description} />
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <GradientButton
          disabled={
            selectedProduct._id ? selectedProduct.stock <= 0 : data.stock <= 0
          }
          title="Add to Cart"
          onPress={addToCart}
          colors={["#5b6db8", "#d41294", "#ed0089"]}
        />
        <GradientButton
          title="Buy Now"
          disabled={
            selectedProduct._id ? selectedProduct.stock <= 0 : data.stock <= 0
          }
          onPress={buynowHandeler}
          colors={["#4777bd", "#159dcd", "#00acd4"]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 16,
  },

  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  variantContainer: {
    marginBottom: 16,
  },

  descriptionContainer: {
    marginVertical: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: "#f9fafc",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
