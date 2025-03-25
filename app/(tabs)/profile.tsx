import { useAppDispatch, useAppSelector } from "@/redux/hook/hooks";
import { logout } from "@/redux/reducer/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";

export default function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.auth.user);
  const logoutHandeler = async () => {
    await AsyncStorage.removeItem("user");
    dispatch(logout());
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <>
          <Avatar.Icon size={24} icon="account" style={styles.profileImage} />
          <Text style={styles.name}>{user?.name || "nayeem"}</Text>
          <Text style={styles.email}>{user?.email}</Text>

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
            onPress={logoutHandeler}
          >
            <Text style={[styles.buttonText, { color: "#fff" }]}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        // Guest View
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push("/auth/login");
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/auth/register")}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafc",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#e2b9cf",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#ce0c82",
  },
});
