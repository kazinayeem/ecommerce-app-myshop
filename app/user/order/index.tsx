import { useGetOrdersQuery } from "@/redux/api/orderApi";
import { useAppSelector } from "@/redux/hook/hooks";
import { router, useFocusEffect } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const user = useAppSelector((state) => state.auth.user);
  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useGetOrdersQuery(user?.id as string);
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );
  const getStatusColor = (status: any) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "#fcbf49";
      case "shipped":
        return "#4d96ff";
      case "delivered":
        return "#1cec26";
      case "cancelled":
        return "#ef4e22";
      case "returned":
        return "#ff9f1c";
      case "refunded":
        return "#9b5de5";
      case "failed":
        return "#d00000";
      case "completed":
        return "#06d6a0";
      case "processing":
        return "#ffbe0b";
      default:
        return "#cccccc";
    }
  };

  const getPaymentColor = (method: any) => {
    switch (method) {
      case "bkash":
        return "#D71A27"; // Bkash (Red)
      case "nagad":
        return "#F7941D"; // Nagad (Orange)
      case "cash_on_delivery":
        return "#4CAF50"; // COD (Green)
      default:
        return "#333"; // Default (Gray)
    }
  };
  if (isLoading && !orders) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={true} size="large" color="#6200ea" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>Error loading orders</Text>
      </View>
    );
  }

  // Function to render each order

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              router.push(`/user/order/${item._id}`);
            }}
            style={{
              backgroundColor: "white",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              marginVertical: 5,
            }}
          >
            {/* Left Side: Order ID & Total Price */}
            <View>
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "#333" }}>
                MY{item._id.slice(0, 10)}...
              </Text>
              <Text style={{ fontSize: 15, color: "#666", marginTop: 5 }}>
                Tk {item.totalPrice}
              </Text>
            </View>

            {/* Right Side: Status, Payment, and Order Date */}
            <View style={{ alignItems: "center" }}>
              {/* Status & Payment Row */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: getStatusColor(item.status),
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    borderStartStartRadius: 5,
                    borderBottomStartRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "semibold",
                      color: "white",
                      marginRight: 8,
                    }}
                  >
                    {item.status}
                  </Text>
                </View>
                {/* Order Status */}

                <View
                  style={{
                    backgroundColor: getPaymentColor(item.paymentMethod),
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    borderEndStartRadius: 5,
                    borderBottomEndRadius: 5,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "white" }}>
                    {item.paymentMethod === "cash_on_delivery"
                      ? "COD"
                      : item.paymentMethod === "bkash"
                      ? "Bkash"
                      : item.paymentMethod === "nagad"
                      ? "Nagad"
                      : "Other"}
                  </Text>
                </View>
              </View>

              {/* Order Date Below */}
              <Text style={{ fontSize: 14, color: "#666", marginTop: 5 }}>
                {new Date(item.createdAt).toLocaleDateString("en-GB")}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(order) => order._id}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
});
