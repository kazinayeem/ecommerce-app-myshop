import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SuccessScreen() {
  const { tran_id } = useLocalSearchParams();
  const router = useRouter();

  const handleSeeOrder = () => {
    router.replace("/user/order");
  };

  const handleCurrentOrder = () => {
    router.replace(`/user/order/${tran_id}`);
  };

  const handleGoHome = React.useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleGoHome();
    }, 5000);

    return () => clearTimeout(timer);
  }, [handleGoHome]);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome name="check-circle" size={100} color="#28a745" />
      </View>
      <Text style={styles.title}>Payment Successful!</Text>
      <Text style={styles.transactionId}>Transaction ID: {tran_id}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGoHome}>
          <Text style={styles.buttonText}>🏠 Go to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSeeOrder}>
          <Text style={styles.buttonText}>📋 See All Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCurrentOrder}>
          <Text style={styles.buttonText}>🛒 View This Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  iconContainer: {
    backgroundColor: "#e6f5ea",
    padding: 30,
    borderRadius: 100,
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#28a745",
    marginBottom: 10,
  },
  transactionId: {
    fontSize: 16,
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 30,
    marginVertical: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
