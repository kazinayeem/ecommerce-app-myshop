import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import GuaranteedDate from "./GuaranteedDate";
import ReturnPolicy from "./ReturnPolicy";
import WarrantyPolicy from "./WarrantyPolicy";

interface ProductBasicInfoProps {
  warranty: number;
  returnableDays: number;
  openBottomSheet: (content: React.ReactNode) => void;
}

export default function ProductBasicInfo({
  warranty,
  returnableDays,
  openBottomSheet,
}: ProductBasicInfoProps) {
  return (
    <View style={styles.deliveryContainer}>
      {/* guaranteed buy */}
      <TouchableOpacity
        style={styles.deliveryContainer}
        onPress={() => openBottomSheet(<GuaranteedDate />)}
      >
        <View style={styles.deliveryRow}>
          <Text style={styles.deliveryTitle}>
            Guaranteed Buy Today to Next 7 Days
          </Text>
          <AntDesign
            name="right"
            size={22}
            color="#3b818e"
            style={{ marginLeft: 10 }}
          />
        </View>
        <View style={styles.deliveryRow}>
          <Text style={styles.deliveryText}>Standard Delivery</Text>
          <Text style={styles.deliveryText}>To your location</Text>
        </View>
      </TouchableOpacity>

      {/* return policy */}
      <Divider />

      <TouchableOpacity
        style={styles.deliveryContainer}
        onPress={() =>
          openBottomSheet(<ReturnPolicy returnableDays={returnableDays} />)
        }
      >
        <View style={styles.deliveryRow}>
          <MaterialCommunityIcons
            name="truck-delivery"
            size={24}
            color="#3b818e"
          />
          <Text style={styles.deliveryTitle}>7 Days Easy Returns Policy</Text>
        </View>
      </TouchableOpacity>

      {/* warranty */}
      <Divider />
      <TouchableOpacity
        style={styles.deliveryContainer}
        onPress={() => openBottomSheet(<WarrantyPolicy warranty={warranty} />)}
      >
        <View style={styles.deliveryRow}>
          <MaterialCommunityIcons
            name="shield-check"
            size={24}
            color="#3b818e"
          />
          <Text style={styles.deliveryTitle}>Warranty Information</Text>
          <AntDesign
            name="right"
            size={22}
            color="#979daf"
            style={{ marginLeft: 10 }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  deliveryContainer: {
    backgroundColor: "#f5fafe",
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "column",
  },
  deliveryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  deliveryTitle: {
    fontSize: 12,
    color: "#3b818e",
    fontWeight: "bold",
  },
  deliveryText: {
    fontSize: 12,
    color: "#3b818e",
  },
  policyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
