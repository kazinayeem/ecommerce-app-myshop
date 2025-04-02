import { useGetordersByIdQuery } from "@/redux/api/orderApi";
import { ProductItem } from "@/redux/type";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Card, Divider, Title } from "react-native-paper";

export default function OrderDetailsPage() {
  const { id } = useLocalSearchParams();

  const navigate = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    if (id) {
      navigate.setOptions({
        headerTitle: "Order Details",
        headerBackTitle: "Back",
        headerTintColor: "#000",
        headerStyle: {
          backgroundColor: "#fff",
        },
      });
    }
  }, [id, navigate]);
  const {
    data: order,
    isLoading,
    isError,

    refetch,
  } = useGetordersByIdQuery(id as string);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          Error loading order. Please try again later.
        </Text>
        <Button onPress={onRefresh}>Retry</Button>
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.centered}>
        <Text>No order found.</Text>
      </View>
    );
  }

  const getStatusColor = (status: string) => {
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
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Card style={styles.card}>
        <Title style={styles.sectionTitle}>Order Details</Title>
        <Text style={styles.orderText}>Order ID: {order._id}</Text>
        <Text style={styles.orderText}>
          Status:{" "}
          <Text
            style={[styles.statusText, { color: getStatusColor(order.status) }]}
          >
            {order.status}
          </Text>
        </Text>
        <Text style={styles.orderText}>
          Payment Method: <Text>{order.paymentMethod}</Text>
        </Text>
        <Text style={styles.orderText}>
          Transaction Status: {order.transactionStatus}
        </Text>
        <Text style={styles.orderText}>
          Delivery Charge: ৳{order.deliveryCharge}
        </Text>
        <Text style={styles.orderText}>Due Amount: ৳{order.dueAmount}</Text>
        <Divider style={styles.divider} />
        <Title style={styles.sectionTitle}>Shipping Address</Title>
        <Text style={styles.orderText}>
          {order.address?.addressLine1 || ""}
        </Text>
        <Text style={styles.orderText}>
          {order.address?.district || ""}, {order.address?.division || ""}
        </Text>
        <Text style={styles.orderText}>
          {order.address?.upazilla || ""}, {order.address?.zipCode || ""}
        </Text>
        <Text style={styles.orderText}>{order.address?.country || ""}</Text>
        <Text style={styles.orderText}>
          Phone: {order.address?.phoneNumber || ""}
        </Text>
        <Divider style={styles.divider} />
        <Title style={styles.sectionTitle}>Products</Title>
        {order.products.map((item: ProductItem, index: number) => (
          <View key={index} style={styles.productItem}>
            <Image
              width={80}
              height={80}
              source={{ uri: item.productId.image[0] }}
              style={styles.productImage}
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.productId.name}</Text>
              {item.variant && (
                <Text style={styles.productText}>Variant : {item.variant}</Text>
              )}
              {item.color && (
                <Text style={styles.productText}>Color: {item.color}</Text>
              )}
              <Text style={styles.productText}>Quantity: {item.quantity}</Text>
              <Text style={styles.productText}>Price: ৳{item.price}</Text>
            </View>
          </View>
        ))}
        <Divider style={styles.divider} />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Total: <Text style={styles.amount}>৳{order.totalPrice}</Text>
          </Text>
          <Text style={styles.totalText}>
            Shipping Charge:{" "}
            <Text style={styles.amount}>৳{order.deliveryCharge}</Text>
          </Text>
          <Text style={styles.totalText}>
            Final Total:{" "}
            <Text style={styles.amount}>
              ৳{order.totalPrice + order.deliveryCharge}
            </Text>
          </Text>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  orderText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  statusText: {
    color: "green",
  },
  divider: {
    marginVertical: 10,
  },
  productItem: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productText: {
    fontSize: 14,
    color: "#555",
  },
  totalContainer: {
    marginVertical: 16,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  amount: {
    fontWeight: "normal",
    color: "#000",
  },
  statusButton: {
    marginTop: 16,
  },
});
