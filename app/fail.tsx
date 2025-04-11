import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Fail() {
  const router = useRouter();

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
      <FontAwesome name="times-circle" size={100} color="#721c24" />
      <Text style={styles.title}>Payment Failed</Text>
      <Text style={styles.message}>
        Sorry, something went wrong. Please try again later.
      </Text>
      <Text style={styles.autoCancelNote}>
        Note: Your order will be automatically canceled after 30 minutes.
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
  autoCancelNote: {
    fontSize: 14,
    color: "#a94442",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#721c24",
    marginTop: 20,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#721c24",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
