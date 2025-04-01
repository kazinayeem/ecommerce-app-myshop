import { useAppDispatch, useAppSelector } from "@/redux/hook/hooks";
import { logout } from "@/redux/reducer/authReducer";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHeaderHeight } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Card, Divider } from "react-native-paper";
export default function Profile() {
  const headerHeight = useHeaderHeight();

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
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={[styles.container, { marginTop: headerHeight }]}>
        {isAuthenticated ? (
          <Card.Content style={styles.profileContent}>
            <Avatar.Icon size={80} icon="account" style={styles.profileImage} />

            <Text style={styles.email}>{user?.email}</Text>

            <Divider style={styles.divider} />

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/user")}
              >
                <View style={styles.iconWraper}>
                  <Feather name="user" size={24} color="#5c8dff" />
                </View>
                <Text style={styles.buttonText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/user/order")}
              >
                <View style={styles.iconWraper}>
                  <FontAwesome5 name="file-alt" size={24} color="#1fbc1e" />
                </View>
                <Text style={styles.buttonText}>Orders</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/user/address")}
              >
                <View style={styles.iconWraper}>
                  <FontAwesome name="address-book" size={24} color="#d26223" />
                </View>
                <Text style={styles.buttonText}>Address</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={logoutHandler}>
                <View style={styles.iconWraper}>
                  <MaterialIcons name="logout" size={24} color="#cda004" />
                </View>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        ) : (
          <View style={styles.profileCard}>
            <Text style={styles.guestText}>Guest User</Text>
            <Divider style={styles.divider} />
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/auth/login")}
              >
                <View style={styles.iconWraper}>
                  <Feather name="log-in" size={24} color="#5c8dff" />
                </View>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/auth/register")}
              >
                <View style={styles.iconWraper}>
                  <FontAwesome5 name="user-plus" size={24} color="#1fbc1e" />
                </View>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    elevation: 2,
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
    alignItems: "center",
  },
  buttonText: {
    fontSize: 13,
    color: "#787878",
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
  iconWraper: {
    backgroundColor: "#f2f3f5",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
