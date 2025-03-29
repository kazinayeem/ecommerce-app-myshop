import AllProducts from "@/components/AllProducts";
import CategoryShow from "@/components/CategoryShow";
import { maincolor } from "@/components/color/color";
import DiscountAnimation from "@/components/DiscountAnimation";
import ImageSlider from "@/components/ImageSlider";
import SearchBar from "@/components/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
export default function Index() {
  return (
    <View style={styles.container}>
      <SearchBar
        iconPress={() => {
          Alert.alert("Notification", "No Notification Yet", [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
            },
          ]);
        }}
        isBackButtonVisible={false}
        icon={<Ionicons name="notifications" size={26} color={maincolor} />}
      />
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={
          <>
            <ImageSlider />
            <Divider />
            <CategoryShow />
            <Divider />
            <DiscountAnimation />
            <Divider />
            <AllProducts mb={100} />
          </>
        }
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
