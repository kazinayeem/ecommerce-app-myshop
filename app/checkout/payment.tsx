import { useGetAddressQuery } from "@/redux/api/addressApi";
import { useAddordersMutation } from "@/redux/api/orderApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook/hooks";
import { clearCart } from "@/redux/reducer/cartReducer";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Button, Card, Dialog, Portal, RadioButton } from "react-native-paper";
import Toast from "react-native-toast-message";

interface Address {
  _id: string;
  addressLine1: string;
  addressLine2?: string;
  division: string;
  district: string;
  upazilla: string;
  zipCode: string;
  phoneNumber: string;
  country?: string;
}

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

  const {
    data: addresses,
    isLoading: isLoadingAddresses,
    isError: isErrorAddresses,
  } = useGetAddressQuery(user?.id);
  const [addorders, { isLoading: isAdding }] = useAddordersMutation();

  const submitOrder = async () => {
    try {
      const orderData = {
        userId: user?.id,
        products: cartItems,
        totalPrice: totalPrice - (discountPrice || 0) + (shippingPrice || 0),
        address: selectedAddress,
        deliveryCharge: shippingPrice || 0,
        paidAmount: paymentMethod === "cash_on_delivery" ? 0 : totalPrice,
        paymentMethod,
        dueAmount: ["bkash", "nagad"].includes(paymentMethod) ? 0 : totalPrice,
        transactionId,
        number: senderNumber,
      };
      await addorders(orderData).unwrap();
      dispatch(clearCart());
      Toast.show({ type: "success", text1: "Order placed successfully!" });
    } catch (error) {
      Toast.show({ type: "error", text1: "Error placing order!" });
    }
  };

  // Loading and error states for addresses
  if (isLoadingAddresses) {
    return <Text style={styles.loadingText}>Loading addresses...</Text>;
  }

  if (isErrorAddresses) {
    return <Text style={styles.errorText}>Error loading addresses.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Select Address</Text>
        {addresses?.length > 0 ? (
          <RadioButton.Group
            onValueChange={setSelectedAddress}
            value={selectedAddress}
          >
            {addresses.map((address: Address) => (
              <RadioButton.Item
                style={{ padding: 10 }}
                labelStyle={{ color: "black" }}
                key={address._id}
                label={`${address.addressLine1}, ${address.district}, ${address.division}, ${address.upazilla}, ${address.zipCode}, ${address.phoneNumber}`}
                value={address._id}
              />
            ))}
          </RadioButton.Group>
        ) : (
          <Text>No address found. Please add one.</Text>
        )}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <RadioButton.Group
          onValueChange={setPaymentMethod}
          value={paymentMethod}
        >
          <RadioButton.Item
            label="Bkash"
            value="bkash"
            labelStyle={{ color: "black" }}
          />
          <RadioButton.Item
            label="Nagad"
            value="nagad"
            labelStyle={{ color: "black" }}
          />
          <RadioButton.Item
            label="Cash on Delivery"
            value="cash_on_delivery"
            labelStyle={{ color: "black" }}
          />
        </RadioButton.Group>
        {["bkash", "nagad"].includes(paymentMethod) && (
          <>
            <TextInput
              value={senderNumber}
              onChangeText={setSenderNumber}
              keyboardType="numeric"
              style={styles.input}
              placeholder="Sender Number"
            />
            <TextInput
              value={transactionId}
              onChangeText={setTransactionId}
              style={styles.input}
              placeholder="Transaction ID"
            />
          </>
        )}
      </Card>

      <View style={{ padding: 16, alignItems: "center" }}>
        <Button
          mode="contained"
          onPress={() => setIsDialogVisible(true)}
          disabled={
            !selectedAddress ||
            !paymentMethod ||
            (paymentMethod !== "cash_on_delivery" && !transactionId)
          }
        >
          {isAdding ? "Placing Order..." : "Place Order"}
        </Button>
      </View>

      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
        >
          <Dialog.Title>Confirm Order</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to place this order?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDialogVisible(false)}>Cancel</Button>
            <Button onPress={submitOrder}>Confirm</Button>
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  card: {
    padding: 16,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  input: {
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "black",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
  },
  errorText: {
    textAlign: "center",
    fontSize: 18,
    color: "red",
  },
});
