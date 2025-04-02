import { useAddAddressMutation } from "@/redux/api/addressApi";
import { useAppSelector } from "@/redux/hook/hooks";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { Dropdown } from "react-native-element-dropdown";
import {
  ActivityIndicator,
  Button,
  Caption,
  TextInput,
  Title,
} from "react-native-paper";
export interface AddressType {
  addressLine1: string;
  addressLine2?: string;
  zipCode: string;
  phoneNumber: string;
  division: string;
  district: string;
  upazilla: string;
  union: string;
}
export default function AddAddress() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [divisions, setDivisions] = useState<{ id: string; name: string }[]>(
    []
  );
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>(
    []
  );
  const [upazillas, setUpazillas] = useState<{ id: string; name: string }[]>(
    []
  );
  const [unions, setUnions] = useState<{ id: string; name: string }[]>([]);

  const [formData, setFormData] = useState<AddressType>({
    addressLine1: "",
    addressLine2: "",
    zipCode: "",
    phoneNumber: "",
    division: "",
    district: "",
    upazilla: "",
    union: "",
  });

  const user = useAppSelector((state) => state.auth.user);
  const [addAddress] = useAddAddressMutation();

  useEffect(() => {
    fetch("https://bdapi.vercel.app/api/v.1/division")
      .then((res) => res.json())
      .then((data) => setDivisions(data.data));
  }, []);

  useEffect(() => {
    if (!formData.division) return;
    const selectedDivision = divisions.find(
      (d) => d.name === formData.division
    );
    if (selectedDivision) {
      fetch(`https://bdapi.vercel.app/api/v.1/district/${selectedDivision.id}`)
        .then((res) => res.json())
        .then((data) => setDistricts(data.data));
    }
  }, [divisions, formData.division]);

  useEffect(() => {
    if (!formData.district) return;
    const selectedDistrict = districts.find(
      (d) => d.name === formData.district
    );
    if (selectedDistrict) {
      fetch(`https://bdapi.vercel.app/api/v.1/upazilla/${selectedDistrict.id}`)
        .then((res) => res.json())
        .then((data) => setUpazillas(data.data));
    }
  }, [districts, formData.district]);

  useEffect(() => {
    if (!formData.upazilla) return;
    const selectedUpazilla = upazillas.find(
      (d) => d.name === formData.upazilla
    );
    if (selectedUpazilla) {
      fetch(`https://bdapi.vercel.app/api/v.1/union/${selectedUpazilla.id}`)
        .then((res) => res.json())
        .then((data) => setUnions(data.data));
    }
  }, [formData.upazilla, upazillas]);

  const handleAddAddress = async () => {
    if (!formData.addressLine1 || !formData.zipCode) {
      Alert.alert("Error", "Address Line 1 and Zip Code are required.");
      return;
    }
    try {
      setLoading(true);
      const addressData = { ...formData, userId: user?.id };
      await addAddress(addressData).unwrap();

      Alert.alert("Success", "Address added successfully", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch {
      Alert.alert("Error", "Failed to add address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.header}>
            <Title style={{ color: "black" }}>Add New Address</Title>
            <Caption style={{ color: "black" }}>
              Fill in the details below to add your address
            </Caption>
          </View>

          <TextInput
            label="Address Line 1"
            value={formData.addressLine1}
            onChangeText={(text) =>
              setFormData({ ...formData, addressLine1: text })
            }
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Address Line 2"
            value={formData.addressLine2}
            onChangeText={(text) =>
              setFormData({ ...formData, addressLine2: text })
            }
            style={styles.input}
            mode="outlined"
          />

          <Dropdown
            style={styles.dropdown}
            data={divisions.map((d) => ({ label: d.name, value: d.name }))}
            labelField="label"
            valueField="value"
            value={formData.division}
            onChange={(item) =>
              setFormData({ ...formData, division: item.value })
            }
            placeholder="Select Division"
          />

          <Dropdown
            style={styles.dropdown}
            data={districts.map((d) => ({ label: d.name, value: d.name }))}
            labelField="label"
            valueField="value"
            value={formData.district}
            onChange={(item) =>
              setFormData({ ...formData, district: item.value })
            }
            placeholder="Select District"
          />

          <Dropdown
            style={styles.dropdown}
            data={upazillas.map((d) => ({ label: d.name, value: d.name }))}
            labelField="label"
            valueField="value"
            value={formData.upazilla}
            onChange={(item) =>
              setFormData({ ...formData, upazilla: item.value })
            }
            placeholder="Select Upazilla"
          />

          <Dropdown
            style={styles.dropdown}
            data={unions.map((d) => ({ label: d.name, value: d.name }))}
            labelField="label"
            valueField="value"
            value={formData.union}
            onChange={(item) => setFormData({ ...formData, union: item.value })}
            placeholder="Select Union"
          />

          <TextInput
            label="Zip Code"
            value={formData.zipCode}
            keyboardType="numeric"
            onChangeText={(text) => setFormData({ ...formData, zipCode: text })}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            keyboardType="phone-pad"
            label="Phone Number"
            value={formData.phoneNumber}
            onChangeText={(text) =>
              setFormData({ ...formData, phoneNumber: text })
            }
            style={styles.input}
            mode="outlined"
          />

          <Button
            mode="contained"
            onPress={handleAddAddress}
            disabled={loading}
            style={styles.button}
          >
            {loading ? (
              <ActivityIndicator animating={true} color="white" />
            ) : (
              "Add Address"
            )}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  header: { marginBottom: 20, alignItems: "center" },
  input: { marginBottom: 12, backgroundColor: "white" },
  dropdown: {
    marginBottom: 12,
    borderColor: "#6200ee",
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  button: { marginTop: 20, backgroundColor: "#6200ee" },
});
