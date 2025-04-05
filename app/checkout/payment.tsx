import { useGetAddressQuery } from "@/redux/api/addressApi";
import { useAddordersMutation } from "@/redux/api/orderApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook/hooks";
import { clearCart, setShippingPrice } from "@/redux/reducer/cartReducer";
import { Address } from "@/redux/type";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Dialog,
  FAB,
  Portal,
  RadioButton,
} from "react-native-paper";

export default function PaymentPage() {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const dispatch = useAppDispatch();

  const {
    items: cartItems,
    totalPrice,
    discountPrice,
    shippingPrice,
  } = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.auth.user);
  const finalPrice = totalPrice - (discountPrice || 0) + (shippingPrice || 0);
  const {
    data: addresses,
    isLoading: isLoadingAddresses,
    isError: isErrorAddresses,
  } = useGetAddressQuery(user?.id);
  const [addorders, { isLoading: isAdding }] = useAddordersMutation();

  const handleAddressSelection = (addressId: string) => {
    setSelectedAddress(addressId);
    const selected = addresses?.find((addr: Address) => addr._id === addressId);
    dispatch(setShippingPrice(selected?.district === "Dhaka" ? 60 : 120));
  };

  const submitOrder = async () => {
    try {
      if (paymentMethod === "cash_on_delivery") {
        const orderData = {
          userId: user?.id,
          products: cartItems,
          totalPrice: totalPrice - (discountPrice || 0) + (shippingPrice || 0),
          address: selectedAddress,
          deliveryCharge: shippingPrice,
          paidAmount: paymentMethod === "cash_on_delivery" ? 0 : totalPrice,
          paymentMethod,
          dueAmount: ["bkash", "nagad"].includes(paymentMethod)
            ? 0
            : totalPrice,
          transactionId,
          number: senderNumber,
        };
        await addorders(orderData).unwrap();
        dispatch(clearCart());
        dispatch(setShippingPrice(0));
        setSelectedAddress("");
        setPaymentMethod("");
        setTransactionId("");
        setSenderNumber("");
        setIsDialogVisible(false);
        Alert.alert(
          "Order Placed",
          "Your order has been placed successfully.",
          [
            {
              text: "OK",
              onPress: () => {
                router.push("/user/order");
              },
            },
          ]
        );
      } else if (paymentMethod === "online") {
        const orderData = {
          userId: user?.id,
          products: cartItems,
          totalPrice: totalPrice - (discountPrice || 0) + (shippingPrice || 0),
          address: selectedAddress,
          deliveryCharge: shippingPrice,
          paidAmount: 0,
          paymentMethod,
          dueAmount: totalPrice,
        };
        const response = await addorders(orderData).unwrap();
        if (response?.GatewayPageURL) {
          const redirectUrl = response.GatewayPageURL;
          router.push({
            pathname: "/checkout/makepayment",
            params: { redirectUrl },
          });
        }
        dispatch(clearCart());
        dispatch(setShippingPrice(0));
        setSelectedAddress("");
        setPaymentMethod("");
        setTransactionId("");
        setSenderNumber("");
        setIsDialogVisible(false);
      }
    } catch {
      Alert.alert("Error", "Failed to place order. Please try again.");
    }
  };

  if (isLoadingAddresses) {
    return <Text style={styles.loadingText}>Loading addresses...</Text>;
  }

  if (isErrorAddresses) {
    return <Text style={styles.errorText}>Error loading addresses.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {isAdding && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#6200ea" />
          <Text style={styles.loadingText}>Placing order...</Text>
        </View>
      )}
      <View style={styles.priceContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>Total:</Text>
          <Text style={styles.totalPrice}>
            {"\u09F3"}
            {totalPrice.toLocaleString()}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>Shipping Charge:</Text>
          <Text style={styles.shippingCharge}>
            {"\u09F3"}
            {shippingPrice.toLocaleString()}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>Final Total:</Text>
          <Text style={styles.finalTotal}>
            {"\u09F3"}
            {finalPrice.toLocaleString()}
          </Text>
        </View>
      </View>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Select Address</Text>
        {addresses?.length > 0 ? (
          <RadioButton.Group
            onValueChange={handleAddressSelection}
            value={selectedAddress}
          >
            {addresses?.map((address: Address) => (
              <RadioButton.Item
                style={{ padding: 10 }}
                labelStyle={{ color: "black", fontSize: 10 }}
                key={address._id}
                label={`${address.addressLine1}, ${address.district}, ${address.division}, ${address.upazilla}, ${address.zipCode}, ${address.phoneNumber}`}
                value={address._id as string}
              />
            ))}
          </RadioButton.Group>
        ) : (
          <>
            <Text>No address found. Please add one.</Text>
            <Link href="/user/address/add-address">
              <FAB icon="plus" label="Add Address" />
            </Link>
          </>
        )}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <RadioButton.Group
          onValueChange={setPaymentMethod}
          value={paymentMethod}
        >
          <RadioButton.Item
            label="online"
            value="online"
            labelStyle={{ color: "black" }}
          />

          <RadioButton.Item
            label="Cash on Delivery"
            value="cash_on_delivery"
            labelStyle={{ color: "black" }}
          />
        </RadioButton.Group>
      </Card>

      <View style={{ marginBottom: 50 }}>
        <Button
          mode="contained"
          onPress={() => setIsDialogVisible(true)}
          disabled={!selectedAddress || !paymentMethod}
        >
          {isAdding ? "Placing Order..." : "Place Order"}
        </Button>
      </View>

      <Portal theme={{ colors: { primary: "#fff" } }}>
        <Dialog
          style={{ backgroundColor: "white" }}
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
        >
          <Dialog.Title
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Confirm Order
          </Dialog.Title>
          <Dialog.Content style={{ padding: 20, alignItems: "center" }}>
            <Text>Are you sure you want to place this order?</Text>
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: "space-around" }}>
            <Button
              style={{
                backgroundColor: "#f44336",
                borderRadius: 5,
              }}
              onPress={() => setIsDialogVisible(false)}
            >
              Cancel
            </Button>
            <Button
              style={{
                backgroundColor: "#4CAF50",
                borderRadius: 5,
              }}
              onPress={submitOrder}
            >
              Confirm
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  card: {
    padding: 12,
    marginVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  input: {
    marginVertical: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    color: "#333",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
  },

  priceContainer: {
    marginVertical: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 12,
  },
  shippingCharge: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6347",
    marginBottom: 12,
  },
  finalTotal: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#28A745", // Green for final total
    marginBottom: 12,
  },
});
