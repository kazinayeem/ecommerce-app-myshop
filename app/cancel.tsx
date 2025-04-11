import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function Cancel() {
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
      <MaterialIcons
        name="cancel"
        size={64}
        color="#721c24"
        style={styles.icon}
      />
      <Text style={styles.title}>Payment Canceled</Text>
      <Text style={styles.message}>
        Your payment has been canceled. If this was a mistake, please try again.
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
    backgroundColor: "#fdecea",
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#721c24",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#721c24",
    textAlign: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  autoCancelNote: {
    fontSize: 14,
    color: "#a94442",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
