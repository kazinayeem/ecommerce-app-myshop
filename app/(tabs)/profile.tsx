import { useAppDispatch, useAppSelector } from "@/redux/hook/hooks";
import { logout } from "@/redux/reducer/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Card, Divider } from "react-native-paper";

export default function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.auth.user);

  const logoutHandler = async () => {
    await AsyncStorage.removeItem("user");
    dispatch(logout());
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Icon size={80} icon="account" style={styles.profileImage} />
            <Text style={styles.name}>{user?.name || "Nayeem"}</Text>
            <Text style={styles.email}>{user?.email}</Text>

            <Divider style={styles.divider} />

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/user")}
            >
              <Text style={styles.buttonText}>User Information</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/user/order")}
            >
              <Text style={styles.buttonText}>Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/user/address")}
            >
              <Text style={styles.buttonText}>Address</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.logoutButton]}
              onPress={logoutHandler}
            >
              <Text style={[styles.buttonText, { color: "#fff" }]}>Logout</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      ) : (
        // Guest View
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Text style={styles.guestText}>You are not logged in</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/auth/login")}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/auth/register")}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
    padding: 20,
    marginBottom: 20,
  },
  profileContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
    backgroundColor: "#e2e2e2",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4c7ef2", // Main button color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  logoutButton: {
    backgroundColor: "#e74c3c", // Red logout button color
  },
  guestText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  divider: {
    marginVertical: 15,
    width: "100%",
    borderColor: "#e0e0e0",
    borderWidth: 0.5,
  },
});
