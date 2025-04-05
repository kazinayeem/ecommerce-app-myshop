import Ionicons from "@expo/vector-icons/Ionicons";
import * as Network from "expo-network";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Divider } from "react-native-paper";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import AllProducts from "@/components/AllProducts";
import CategoryShow from "@/components/CategoryShow";
import { maincolor } from "@/components/color/color";
import ImageSlider from "@/components/ImageSlider";
import SearchBar from "@/components/SearchBar";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(true); // State to track internet connection

  // Reanimated shared values
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const checkConnection = async () => {
    const networkState = await Network.getNetworkStateAsync();
    if (!networkState.isConnected) {
      setIsConnected(false);
      Alert.alert("No Internet", "Please check your internet connection.");
    } else {
      setIsConnected(true);
    }
  };
  useEffect(() => {
    checkConnection();

    const timer = setTimeout(() => {
      // Animate out the loading screen
      opacity.value = withTiming(0, { duration: 500 });
      scale.value = withTiming(0.9, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
      setTimeout(() => setLoading(false), 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [opacity, scale]);

  const handleRefresh = () => {
    setRefreshing(true);
    checkConnection();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // Animated style
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  if (!isConnected) {
    return (
      <View style={styles.noConnectionContainer}>
        <ActivityIndicator size="large" color={maincolor} />
        <Text style={styles.noConnectionText}>No internet connection</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar
        iconPress={() => {
          Alert.alert("Notification", "No Notification Yet");
        }}
        isBackButtonVisible={false}
        icon={<Ionicons name="notifications" size={26} color={maincolor} />}
      />

      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={
          <>
            <ImageSlider />
            <Divider />
            <CategoryShow />
            <Divider />
            <Divider />
            <AllProducts mb={100} />
          </>
        }
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />

      {/* Animated loading overlay */}
      {loading && (
        <Animated.View style={[styles.loadingOverlay, animatedStyle]}>
          <ActivityIndicator size="large" color={maincolor} />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  noConnectionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  noConnectionText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});
