import { useAppSelector } from "@/redux/hook/hooks";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Badge } from "react-native-paper";

function SearchBar() {
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart.totalQuantity);

  return (
    <View style={styles.container}>
      {/* Search Bar Section (Takes most of the space) */}
      <Pressable
        onPress={() => router.push("/search")}
        style={styles.searchWrapper}
      >
        <Feather name="search" size={20} color="#677280" style={styles.icon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#aaa"
          editable={false} // Prevents keyboard from opening
        />
      </Pressable>

      {/* Notification Icon (Separate from Search Bar) */}
      <Pressable
        style={styles.notificationContainer}
        onPress={() => router.push("/cart")}
      >
        <Badge
          style={{
            position: "absolute",
            top: -7,
            right: -8,
            backgroundColor: "#ce0c82",
          }}
          size={22}
        >
          {cart}
        </Badge>
        <MaterialIcons name="add-shopping-cart" size={22} color="#ce0c82" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 12,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e2b9cf",
    paddingLeft: 12,
    height: 48,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 10,
    backgroundColor: "#ffffff",
  },
  icon: {
    marginRight: 8,
  },
  notificationContainer: {
    backgroundColor: "#ffffff",
    width: 42,
    height: 42,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    elevation: 1,
  },
});

export default SearchBar;
