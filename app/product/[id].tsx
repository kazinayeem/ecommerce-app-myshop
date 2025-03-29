import CustomBottomSheet from "@/components/CustomBottomSheet";
import GradientButton from "@/components/GradientButton";
import HtmlParseData from "@/components/HtmlParseData";
import ImageCarosel from "@/components/ImageCarosel";
import ProductBasicInfo from "@/components/ProductBasicInfo";
import ProductColor from "@/components/ProductColor";
import ProductPrice from "@/components/ProductPrice";
import ProductPriceVariant from "@/components/ProductPriceVariant";
import SearchBar from "@/components/SearchBar";
import { useGetProductByIdQuery } from "@/redux/api/productApi";
import { useAppDispatch } from "@/redux/hook/hooks";
import { addItem } from "@/redux/reducer/cartReducer";
import { ProductType } from "@/redux/type";
import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
export default function Product() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [bottomSheetContent, setBottomSheetContent] =
    useState<React.ReactNode>(null);
  const openBottomSheet = (content: React.ReactNode) => {
    setBottomSheetContent(content);
    bottomSheetRef.current?.expand();
  };

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
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, [refetch]);

  useEffect(() => {
    if (data && data.priceByVariant && data.priceByVariant.length > 0) {
      setSelectedProduct(data.priceByVariant[0]);
    }
  }, [data]);

  const addToCart = () => {
    dispatch(
      addItem({
        productId: data._id,
        name: data.name,
        price: selectedProduct._id ? selectedProduct.price : data.price,
        quantity: 1,
        image: data.image[0],
        variantsName: selectedProduct.value || "",
        size: selectedProduct.value || "",
        color: selectedColor || "",
      })
    );
  };

  const buynowHandler = () => {
    addToCart();
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

  return (
    <GestureHandlerRootView style={styles.container}>
      <SearchBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.imageContainer}>
          <ImageCarosel data={data} />
        </View>

        <Text style={styles.productTitle}>{data.name}</Text>
        <ProductPriceVariant
          priceByVariant={data.priceByVariant}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
        <ProductColor
          colorOptions={data.color}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <ProductPrice
          _id={data._id}
          name={data.name}
          value={selectedProduct.value || ""}
          price={selectedProduct.price || data.price}
          stock={selectedProduct.stock || data.stock}
        />
        <ProductBasicInfo
          warranty={data.warranty}
          returnableDays={data.returnableDays}
          openBottomSheet={openBottomSheet}
        />

        {data.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <HtmlParseData tnode={data.description} />
          </View>
        )}
      </ScrollView>
      <CustomBottomSheet
        bottomSheetContent={bottomSheetContent}
        bottomSheetRef={bottomSheetRef}
      />

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
          disabled={
            selectedProduct._id ? selectedProduct.stock <= 0 : data.stock <= 0
          }
          title="Buy Now"
          onPress={buynowHandler}
          colors={["#4777bd", "#159dcd", "#00acd4"]}
        />
      </View>
    </GestureHandlerRootView>
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
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
  },
  sheetContent: {
    padding: 20,
    alignItems: "center",
  },
  sheetText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  deliveryContainer: {
    backgroundColor: "#f5fafe",
    padding: 2,
    borderRadius: 4,
    marginVertical: 0,
    flexDirection: "column",
  },
  deliveryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  deliveryTitle: {
    fontSize: 12,
    color: "#3b818e",
    fontWeight: "bold",
  },
  deliveryText: {
    fontSize: 14,
    color: "#3b818e",
  },
});
