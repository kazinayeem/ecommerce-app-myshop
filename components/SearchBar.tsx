import { useAppSelector } from "@/redux/hook/hooks";
import { SearchBarProps } from "@/redux/type";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Badge } from "react-native-paper";
import { maincolor } from "./color/color";

function SearchBar({
  isBackButtonVisible = true,
  icon,
  iconPress,
}: SearchBarProps) {
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart.totalQuantity);

  return (
    <View style={styles.container}>
      {isBackButtonVisible && (
        <Pressable onPress={router.back} style={styles.backButton}>
          <Entypo name="chevron-left" size={26} color="black" />
        </Pressable>
      )}
      <Pressable
        onPress={() => router.push("/search")}
        style={styles.searchWrapper}
      >
        <Feather name="search" size={20} color="#677280" style={styles.icon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#aaa"
          editable={false}
        />
      </Pressable>
      {!icon && (
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
      )}
      {icon && (
        <Pressable
          onPress={iconPress}
          android_ripple={{ color: "#ddd" }}
          style={styles.notificationContainer}
        >
          {icon}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: maincolor,
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
  backButton: {
    padding: 0,
  },
});

export default SearchBar;
