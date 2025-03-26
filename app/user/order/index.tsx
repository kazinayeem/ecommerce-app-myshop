import { useGetOrdersQuery } from "@/redux/api/orderApi";
import { useAppSelector } from "@/redux/hook/hooks";
import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Divider } from "react-native-paper";
interface Product {
  productId: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
  quantity: number;
  price: number;
  variant?: string;
  color?: string;
}
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
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (isLoading && !orders) {
    return (
      <View style={styles.centeredContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Error loading orders</Text>
      </View>
    );
  }

  // Function to render each order
  const renderOrderItem = ({
    item: order,
  }: {
    item: {
      _id: string;
      status: string;
      totalPrice: number;
      paidAmount: number;
      dueAmount: number | null;
      products: Product[];
    };
  }) => {
    const toggleOrderDetails = () => {
      setExpandedOrder(expandedOrder === order._id ? null : order._id);
    };

    return (
      <Card key={order._id} style={styles.card}>
        <Card.Content>
          <Text style={styles.orderDetailTitle}>Order ID: {order._id}</Text>
          <Text style={styles.orderDetail}>Status: {order.status}</Text>
          <Text style={styles.orderDetail}>
            Total Price: {order.totalPrice}
          </Text>
          <Text style={styles.orderDetail}>
            Paid Amount: {order.paidAmount}
          </Text>
          {order.dueAmount !== null && (
            <Text style={styles.orderDetail}>
              Due Amount: {order.dueAmount}
            </Text>
          )}

          {/* See More / See Details Button */}
          <TouchableOpacity onPress={toggleOrderDetails}>
            <Text style={styles.seeMoreButton}>
              {expandedOrder === order._id ? "See Less" : "See More"}
            </Text>
          </TouchableOpacity>

          {expandedOrder === order._id && (
            <>
              <Divider style={styles.divider} />
              <Text style={styles.productsTitle}>Products:</Text>
              {order.products.map((product: Product, index: number) => (
                <View key={index} style={styles.productDetails}>
                  <Text style={styles.productDetail}>
                    Product ID: {product.productId?._id || "N/A"}
                  </Text>
                  <Text style={styles.productDetail}>
                    Quantity: {product.quantity}
                  </Text>
                  <Text style={styles.productDetail}>
                    Price: {product.price}
                  </Text>
                  {product.variant && (
                    <Text style={styles.productDetail}>
                      Variant: {product.variant}
                    </Text>
                  )}
                  {product.color && (
                    <Text style={styles.productDetail}>
                      Color: {product.color}
                    </Text>
                  )}
                  <Divider style={styles.divider} />
                </View>
              ))}
            </>
          )}
        </Card.Content>
      </Card>
    );
  };

  return (
    <FlatList
      data={orders}
      renderItem={renderOrderItem}
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
    paddingBottom: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    elevation: 5,
    backgroundColor: "#fff",
  },
  orderDetailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  orderDetail: {
    fontSize: 16,
    color: "black",
    marginBottom: 8,
  },
  productsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginTop: 15,
    marginBottom: 10,
  },
  productDetails: {
    marginBottom: 10,
  },
  productDetail: {
    fontSize: 14,
    color: "black",
    marginBottom: 5,
  },
  seeMoreButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
    marginTop: 10,
  },
  divider: {
    marginVertical: 8,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
