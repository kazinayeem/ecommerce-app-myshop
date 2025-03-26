import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Appbar, Divider, Menu } from "react-native-paper";

const HeaderBar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  return (
    <Appbar.Header style={styles.header}>
      {/* Title */}
      <Appbar.Content title="Categories" titleStyle={styles.title} />

      {/* Search Icon */}
      <Appbar.Action
        icon="magnify"
        iconColor="#6c7386"
        onPress={() => router.push("/search")}
      />

      {/* Menu Icon */}
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Appbar.Action
            icon="dots-horizontal"
            iconColor="#6c7386"
            onPress={() => setMenuVisible(true)}
          />
        }
      >
        <Menu.Item onPress={() => console.log("Item 1")} title="Item 1" />
        <Menu.Item onPress={() => console.log("Item 2")} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => console.log("Item 3")} title="Item 3" />
      </Menu>
    </Appbar.Header>
  );
};

// Styles
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fffffd",
    elevation: 2,
  },
  title: {
    color: "#030303",
    fontWeight: "bold",
  },
});

export default HeaderBar;
