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

  // const submitOrder = async () => {
  //   try {
  //     const orderData = {
  //       userId: user?.id,
  //       products: cartItems,
  //       totalPrice: totalPrice - (discountPrice || 0) + (shippingPrice || 0),
  //       address: selectedAddress,
  //       deliveryCharge: shippingPrice,
  //       paidAmount: paymentMethod === "cash_on_delivery" ? 0 : totalPrice,
  //       paymentMethod,
  //       dueAmount: ["bkash", "nagad"].includes(paymentMethod) ? 0 : totalPrice,
  //       transactionId,
  //       number: senderNumber,
  //     };

  //     await addorders(orderData).unwrap();
  //     dispatch(clearCart());
  //     dispatch(setShippingPrice(0));
  //     setSelectedAddress("");
  //     setPaymentMethod("");
  //     setTransactionId("");
  //     setSenderNumber("");
  //     setIsDialogVisible(false);
  //     Alert.alert("Order Placed", "Your order has been placed successfully.", [
  //       {
  //         text: "OK",
  //         onPress: () => router.replace("/user/order"),
  //       },
  //     ]);
  //   } catch {
  //     Alert.alert("Error", "Failed to place order. Please try again.");
  //   }
  // };
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
          dueAmount: paymentMethod === "cash_on_delivery" ? totalPrice : 0,
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
                router.replace("/user/order");
              },
            },
          ]
        );
      } else if (paymentMethod === "online" || paymentMethod === "Online") {
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
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text style={styles.loadingText}>Loading addresses...</Text>
      </View>
    );
  }

  if (isErrorAddresses) {
    return <Text style={styles.errorText}>Error loading addresses.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {isAdding && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#6200ea" />
          <Text style={styles.loadingText}>Placing order...</Text>
        </View>
      )}

      {/* Price Details Section with Row Layout */}
      <Card style={styles.priceCard}>
        <View style={styles.priceRow}>
          <Text style={styles.sectionTitle}>Total:</Text>
          <Text style={styles.totalPrice}>
            {"\u09F3"}
            {totalPrice.toLocaleString()}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.sectionTitle}>Shipping Charge:</Text>
          <Text style={styles.shippingCharge}>
            {"\u09F3"}
            {shippingPrice.toLocaleString()}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.sectionTitle}>Final Total:</Text>
          <Text style={styles.finalTotal}>
            {"\u09F3"}
            {finalPrice.toLocaleString()}
          </Text>
        </View>
      </Card>

      {/* Address and Payment Method Selection Cards */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Select Address</Text>
        {addresses?.length > 0 ? (
          <RadioButton.Group
            onValueChange={handleAddressSelection}
            value={selectedAddress}
          >
            {addresses.map((address: Address) => (
              <RadioButton.Item
                style={styles.radioButton}
                labelStyle={styles.radioButtonLabel}
                key={address._id}
                label={`${address.addressLine1}, ${address.district}, ${address.division}, ${address.upazilla}, ${address.zipCode}, ${address.phoneNumber}`}
                value={address._id}
              />
            ))}
          </RadioButton.Group>
        ) : (
          <>
            <Text>No address found. Please add one.</Text>
            <Link href="/user/address/add-address">
              <FAB
                icon="plus"
                label="Add Address"
                style={styles.addAddressFab}
              />
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
            label="Online"
            value="online"
            labelStyle={styles.radioButtonLabel}
          />
          <RadioButton.Item
            label="Cash on Delivery"
            value="cash_on_delivery"
            labelStyle={styles.radioButtonLabel}
          />
        </RadioButton.Group>
      </Card>

      {/* Order Placement Button */}
      <View style={styles.buttonSection}>
        <Button
          mode="contained"
          onPress={() => setIsDialogVisible(true)}
          disabled={!selectedAddress || !paymentMethod}
          style={styles.placeOrderButton}
        >
          {isAdding ? "Placing Order..." : "Place Order"}
        </Button>
      </View>

      {/* Confirmation Dialog */}
      <Portal theme={{ colors: { primary: "#fff" } }}>
        <Dialog
          style={styles.dialog}
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
        >
          <Dialog.Title style={styles.dialogTitle}>Confirm Order</Dialog.Title>
          <Dialog.Content style={styles.dialogContent}>
            <Text>Are you sure you want to place this order?</Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogActions}>
            <Button
              style={styles.cancelButton}
              onPress={() => setIsDialogVisible(false)}
            >
              Cancel
            </Button>
            <Button style={styles.confirmButton} onPress={submitOrder}>
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
    backgroundColor: "#fff",
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#6200ea",
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
  },
  priceCard: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#007BFF",
  },
  shippingCharge: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FF6347",
  },
  finalTotal: {
    fontSize: 20,
    fontWeight: "700",
    color: "#28A745",
  },
  card: {
    marginVertical: 12,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  radioButton: {
    paddingVertical: 10,
  },
  radioButtonLabel: {
    color: "#333",
    fontSize: 14,
  },
  addAddressFab: {
    marginTop: 12,
  },
  buttonSection: {
    marginBottom: 50,
    alignItems: "center",
  },
  placeOrderButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    width: "100%",
    paddingVertical: 12,
  },
  dialog: {
    backgroundColor: "white",
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  dialogContent: {
    paddingVertical: 20,
    alignItems: "center",
  },
  dialogActions: {
    justifyContent: "space-around",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
});
