import AllProducts from "@/components/AllProducts";
import CategoryShow from "@/components/CategoryShow";
import ImageSlider from "@/components/ImageSlider";
import SearchBar from "@/components/SearchBar";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={
          <>
            <ImageSlider />
            <CategoryShow />
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
