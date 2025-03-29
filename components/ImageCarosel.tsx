import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

interface Props {
  data: {
    image: string[];
  };
}
export default function ImageCarosel({ data }: Props) {
  const width = Dimensions.get("window").width;
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };
  return (
    <View>
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
  );
}

const styles = StyleSheet.create({
  productImage: {
    width: 200,
    height: 200,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
