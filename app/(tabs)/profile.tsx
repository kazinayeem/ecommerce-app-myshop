import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { ActivityIndicator, Card, Divider } from "react-native-paper";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { useAppDispatch, useAppSelector } from "@/redux/hook/hooks";
import { logout } from "@/redux/reducer/authReducer";

export default function Profile() {
  const headerHeight = useHeaderHeight();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        process.env.EXPO_WEB_CLIENT_ID ||
        "602612340251-sv5th0jru1q5klidslclcjeuco9jjnbt.apps.googleusercontent.com",
      offlineAccess: true,
    });
  }, []);

  const logoutHandler = async () => {
    try {
      setLoading(true);
      const currentUser = GoogleSignin.getCurrentUser();
      if (currentUser) {
        await GoogleSignin.revokeAccess();
      }
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      dispatch(logout());
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", "Logout failed. Please try again.");
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={[styles.container, { marginTop: headerHeight }]}
      >
        {isAuthenticated ? (
          <Card.Content style={styles.profileContent}>
            <Image
              source={{
                uri:
                  user?.profilePic ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
              }}
              style={styles.profileImage}
            />
            <Text style={styles.email}>{user?.email}</Text>
            <Divider style={styles.divider} />
            <View style={styles.row}>
              <NavButton
                label="Profile"
                icon={<Feather name="user" size={24} color="#5c8dff" />}
                onPress={() => router.push("/user")}
              />
              <NavButton
                label="Orders"
                icon={
                  <FontAwesome5 name="file-alt" size={24} color="#1fbc1e" />
                }
                onPress={() => router.push("/user/order")}
              />
              <NavButton
                label="Address"
                icon={
                  <FontAwesome name="address-book" size={24} color="#d26223" />
                }
                onPress={() => router.push("/user/address")}
              />
              <NavButton
                label="Logout"
                icon={<MaterialIcons name="logout" size={24} color="#cda004" />}
                onPress={logoutHandler}
              />
            </View>
          </Card.Content>
        ) : (
          <View style={styles.guestCard}>
            <Text style={styles.guestText}>Welcome, Guest!</Text>
            <Divider style={styles.divider} />
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.authButton}
                onPress={() => router.push("/auth/login")}
              >
                <Feather name="log-in" size={24} color="#5c8dff" />
                <Text style={styles.authText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.authButton}
                onPress={() => router.push("/auth/register")}
              >
                <FontAwesome5 name="user-plus" size={24} color="#1fbc1e" />
                <Text style={styles.authText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View
          style={{
            marginTop: 20,
            marginBottom: 100,
          }}
        >
          {[
            { label: "FAQPage", route: "/profile/Faq" },
            {
              label: "Terms and Conditions",
              route: "/profile/TermsAndConditions",
            },
            { label: "Privacy Policy", route: "/profile/PrivacyPolicy" },
            { label: "Contact Us", route: "/profile/Contact" },
            { label: "RefundPolicy", route: "/profile/RefundPolicy" },
            { label: "About", route: "/profile/About" },
          ].map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.infoCard}
              onPress={() => router.push(item.route as any)}
            >
              <Text style={styles.infoText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const NavButton = ({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <View style={styles.iconWraper}>{icon}</View>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
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
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  guestCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 24,
  },
  authButton: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  authText: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
  },
  guestText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  button: {
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    fontSize: 13,
    color: "#787878",
    marginTop: 6,
  },
  iconWraper: {
    backgroundColor: "#f2f3f5",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    marginVertical: 15,
    width: "100%",
    borderColor: "#e0e0e0",
    borderWidth: 0.5,
  },
  infoCard: {
    backgroundColor: "#f2f3f5",
    padding: 20,
    borderRadius: 15,
    marginBottom: 16,
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
