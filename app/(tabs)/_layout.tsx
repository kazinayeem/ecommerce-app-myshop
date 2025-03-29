import { useAppSelector } from "@/redux/hook/hooks";
import { RootState } from "@/redux/store";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  const cartItem = useAppSelector(
    (state: RootState) => state.cart.items.length
  );
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          borderRadius: 0,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 1,
          shadowColor: "transparent",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "Category",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="category" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          headerShown: true,
          headerTitle: "My Cart",
          headerTitleAlign: "center",
          tabBarBadge: cartItem,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="shopping-cart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Profile",
          headerTitleAlign: "center",
          headerTintColor: "#000",

          headerLeft: () => (
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color="#000"
              style={{ marginLeft: 30 }}
              onPress={() => {
                navigation.navigate("index");
              }}
            />
          ),
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
        })}
      />
    </Tabs>
  );
}
