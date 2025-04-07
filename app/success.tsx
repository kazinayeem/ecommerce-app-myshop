import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function SuccessScreen() {
  const { tran_id } = useLocalSearchParams();
  const router = useRouter();
  useEffect(() => {
    setInterval(() => {
      router.replace("/(tabs)");
    }, 5000);
  }, [router]);

  const handleGoHome = () => {
    router.replace("/(tabs)");
  };

  const handleSeeOrder = () => {
    router.replace("/user/order");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Payment Successful!</Text>
      <Text style={styles.transactionId}>Transaction ID: {tran_id}</Text>

      {/* Button for Go to Home */}
      <TouchableOpacity style={styles.button} onPress={handleGoHome}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>

      {/* Button for See Order */}
      <TouchableOpacity style={styles.button} onPress={handleSeeOrder}>
        <Text style={styles.buttonText}>See Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f8fa",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 20,
  },
  transactionId: {
    fontSize: 18,
    color: "#333",
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
