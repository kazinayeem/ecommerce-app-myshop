import { useGetSlidersQuery } from "@/redux/api/sliderApi";
import React, { useRef } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");
const sliderWidth = width * 0.95;

export default function ImageSlider() {
  const { data: sliderData = [], isLoading, isError } = useGetSlidersQuery({});
  const ref = useRef<ICarouselInstance>(null);

  return (
    <View style={styles.container}>
      {isLoading && <Text style={styles.loadingText}>Loading...</Text>}
      {isError && <Text style={styles.errorText}>Error loading images</Text>}

      {!isLoading && !isError && (
        <Carousel
          ref={ref}
          width={sliderWidth}
          height={sliderWidth / 3}
          data={sliderData}
          loop
          autoPlay
          autoPlayInterval={2500}
          pagingEnabled
          snapEnabled
          scrollAnimationDuration={800}
          renderItem={({ index }) => (
            <Image
              source={{ uri: sliderData[index]?.image }}
              resizeMode="cover"
              style={styles.image}
            />
          )}
        />
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: width / 3,
  },
  image: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 14,
    color: "gray",
  },
  errorText: {
    textAlign: "center",
    fontSize: 14,
    color: "red",
  },
});
