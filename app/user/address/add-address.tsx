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

export default function AddAddress() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [divisions, setDivisions] = useState<{ name: string; id: string }[]>(
    []
  );
  const [districts, setDistricts] = useState<{ name: string; id: string }[]>(
    []
  );
  const [upazillas, setUpazillas] = useState<{ name: string; id: string }[]>(
    []
  );
  const [unions, setUnions] = useState<{ name: string; id: string }[]>([]);
  const [formData, setFormData] = useState({
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
  const [addAddress, { isError, isLoading, error }] = useAddAddressMutation();

  useEffect(() => {
    fetch("https://bdapi.vercel.app/api/v.1/division")
      .then((res) => res.json())
      .then((data) => setDivisions(data.data));
  }, []);

  useEffect(() => {
    if (!formData.division) return;
    fetch(`https://bdapi.vercel.app/api/v.1/district/${formData.division}`)
      .then((res) => res.json())
      .then((data) => setDistricts(data.data));
  }, [formData.division]);

  useEffect(() => {
    if (!formData.district) return;
    fetch(`https://bdapi.vercel.app/api/v.1/upazilla/${formData.district}`)
      .then((res) => res.json())
      .then((data) => setUpazillas(data.data));
  }, [formData.district]);

  useEffect(() => {
    if (!formData.upazilla) return;
    fetch(`https://bdapi.vercel.app/api/v.1/union/${formData.upazilla}`)
      .then((res) => res.json())
      .then((data) => setUnions(data.data));
  }, [formData.upazilla]);

  const handleAddAddress = async () => {
    if (!formData.addressLine1 || !formData.zipCode) {
      return;
    }
    try {
      setLoading(true);
      await addAddress({ ...formData, userId: user?.id }).unwrap();
      if (isError) {
        Alert.alert(
          "Error",
          error && "data" in error
            ? (error.data as { message: string }).message
            : "An unknown error occurred",
          [{ text: "OK" }]
        );
        return;
      }
      Alert.alert("Success", "Address added successfully", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch {
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
            theme={{ colors: { primary: "#6200ee" } }}
            mode="outlined"
          />
          <TextInput
            label="Address Line 2"
            value={formData.addressLine2}
            onChangeText={(text) =>
              setFormData({ ...formData, addressLine2: text })
            }
            style={styles.input}
            theme={{ colors: { primary: "#6200ee" } }}
            mode="outlined"
          />
          <Dropdown
            style={styles.dropdown}
            data={divisions.map((d) => ({ label: d.name, value: d.id }))}
            labelField="label"
            valueField="value"
            value={formData.division}
            onChange={(item) =>
              setFormData({ ...formData, division: item.value })
            }
            placeholder="Select Division"
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.selectedText}
            itemTextStyle={styles.itemText}
          />
          <Dropdown
            style={styles.dropdown}
            data={districts.map((d) => ({ label: d.name, value: d.id }))}
            labelField="label"
            valueField="value"
            value={formData.district}
            onChange={(item) =>
              setFormData({ ...formData, district: item.value })
            }
            placeholder="Select District"
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.selectedText}
            itemTextStyle={styles.itemText}
          />
          <Dropdown
            style={styles.dropdown}
            data={upazillas.map((d) => ({ label: d.name, value: d.id }))}
            labelField="label"
            valueField="value"
            value={formData.upazilla}
            onChange={(item) =>
              setFormData({ ...formData, upazilla: item.value })
            }
            placeholder="Select Upazilla"
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.selectedText}
            itemTextStyle={styles.itemText}
          />
          <Dropdown
            style={styles.dropdown}
            data={unions.map((d) => ({ label: d.name, value: d.id }))}
            labelField="label"
            valueField="value"
            value={formData.union}
            onChange={(item) => setFormData({ ...formData, union: item.value })}
            placeholder="Select Union"
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.selectedText}
            itemTextStyle={styles.itemText}
          />
          <TextInput
            label="Zip Code"
            value={formData.zipCode}
            keyboardType="numeric"
            onChangeText={(text) => setFormData({ ...formData, zipCode: text })}
            style={styles.input}
            theme={{ colors: { primary: "#6200ee" } }}
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
            theme={{ colors: { primary: "#6200ee" } }}
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white", // full-screen white background
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    marginBottom: 12,
    backgroundColor: "white", // smooth white background for inputs
  },
  dropdown: {
    marginBottom: 12,
    borderColor: "#6200ee",
    borderWidth: 1,
    paddingVertical: 10, // Increased padding for better spacing
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  placeholder: {
    fontSize: 14,
    color: "#aaa",
  },
  selectedText: {
    fontSize: 16,
    color: "#000", // Black text color for dropdown
  },
  itemText: {
    fontSize: 16,
    color: "#333", // Black text color for dropdown items
  },
  dropDownStyle: {
    backgroundColor: "#fff",
    borderRadius: 4,
    marginTop: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#6200ee",
  },
});
