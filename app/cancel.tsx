import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function Cancel() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❌ Payment Canceled</Text>
      <Text style={styles.message}>
        Your payment has been canceled. If this was a mistake, please try again.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleGoHome}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8d7da",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#721c24",
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: "#721c24",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 10,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
