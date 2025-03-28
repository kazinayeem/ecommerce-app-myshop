import HtmlParseData from "@/components/HtmlParseData";
import SearchBar from "@/components/SearchBar";
import { useGetProductByIdQuery } from "@/redux/api/productApi";
import { useAppDispatch } from "@/redux/hook/hooks";
import { addItem } from "@/redux/reducer/cartReducer";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, RadioButton, SegmentedButtons } from "react-native-paper"; // Import RadioButton
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
interface ProductType {
  name: string;
  value: string;
  price: number;
  stock: number;
  image: string;
  _id: string;
}

export default function Product() {
  const width = Dimensions.get("window").width;
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
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
  const { data, isLoading, isError } = useGetProductByIdQuery(id as string);

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

  // Check if priceByVariant exists before mapping
  const priceByVariant = data.priceByVariant || [];
  const colorOptions = data.color || [];
  const productImages = data.image || [];

  return (
    <View style={styles.container}>
      <SearchBar />

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <Carousel
            ref={ref}
            width={width}
            loop={true}
            autoPlay={true}
            autoPlayInterval={2000}
            height={width / 2}
            data={data.image}
            onProgressChange={progress}
            renderItem={({ index }) => (
              <Image
                key={index}
                source={{ uri: data.image[index] }}
                style={styles.productImage}
                resizeMode="cover"
              />
            )}
          />
          <Pagination.Basic
            progress={progress}
            data={data.image}
            dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
            containerStyle={{ gap: 5, marginTop: 10 }}
            onPress={onPressPagination}
          />
        </View>

        {/* Product Title */}
        <Text style={styles.productTitle}>{data.name}</Text>

        {/* Variant Selection */}
        {priceByVariant.length > 0 && (
          <View style={styles.variantContainer}>
            {/* <Text style={styles.variantText}>Select Size/Variant</Text> */}
            <SegmentedButtons
              theme={{ fonts: { labelLarge: { fontSize: 10 } } }}
              value={selectedProduct._id}
              onValueChange={(value: string) => {
                const selectedVariant: ProductType | undefined =
                  priceByVariant.find((v: ProductType) => v._id === value);
                if (selectedVariant) {
                  setSelectedProduct({
                    name: selectedVariant.name,
                    value: selectedVariant.value,
                    price: selectedVariant.price,
                    stock: selectedVariant.stock,
                    image: selectedVariant.image,
                    _id: selectedVariant._id,
                  });
                }
              }}
              buttons={priceByVariant.map((v: ProductType) => ({
                value: v._id,
                label: `${v.name} - ${v.value}`,
                disabled: v.stock <= 0,
                accessibilityLabel: v.stock <= 0 ? "Out of stock" : undefined,
                style: {
                  fontSize: 10,
                },
              }))}
            />
          </View>
        )}

        {/* Color Selection using RadioButton */}
        {colorOptions.length > 0 && (
          <View style={styles.colorContainer}>
            <Text style={styles.colorText}>Select Color</Text>
            <RadioButton.Group
              onValueChange={(newColor) => setSelectedColor(newColor)}
              value={selectedColor}
            >
              {colorOptions.map((color: string, index: number) => (
                <View key={index} style={styles.colorOption}>
                  <RadioButton value={color} color={color} />
                  <Text>{color}</Text>
                </View>
              ))}
            </RadioButton.Group>
          </View>
        )}

        {/* Product Price and Stock */}
        <Text style={styles.priceText}>
          {"\u09F3"}
          {selectedProduct.name || selectedProduct._id
            ? selectedProduct.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
        <Text>
          Stock:{" "}
          {selectedProduct._id
            ? selectedProduct.stock > 0
              ? selectedProduct.stock
              : "No Available"
            : data.stock > 0
            ? data.stock
            : "No Available"}
        </Text>
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            icon={"cart-outline"}
            disabled={
              selectedProduct._id ? selectedProduct.stock <= 0 : data.stock <= 0
            }
            mode="contained"
            onPress={addToCart}
          >
            Add to Cart
          </Button>
          <Button
            disabled={
              selectedProduct._id ? selectedProduct.stock <= 0 : data.stock <= 0
            }
            icon={"credit-card-outline"}
            mode="contained"
            onPress={buynowHandeler}
          >
            Buy Now
          </Button>
        </View>
        {/* Description - Render the Last Description */}
        {data.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <HtmlParseData tnode={data.description} />
          </View>
        )}
      </ScrollView>
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
  productImage: {
    width: 200,
    height: 200,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  variantContainer: {
    marginBottom: 16,
  },
  variantText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  colorContainer: {
    marginBottom: 16,
  },
  colorText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  colorOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  priceText: {
    fontSize: 20,
    marginVertical: 8,
  },
  descriptionContainer: {
    marginVertical: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});
