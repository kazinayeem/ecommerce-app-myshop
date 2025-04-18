import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import { useAppSelector } from "@/redux/hook/hooks";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Divider, FAB, TextInput } from "react-native-paper";

export default function Index() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const { data, isLoading, isError, refetch, isSuccess } = useGetUserByIdQuery(
    user?.id as string
  );
  const [updateUser] = useUpdateUserMutation();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );
  useEffect(() => {
    if (data) {
      setUsername(data.username);
      setEmail(data.email);
      setMobileNumber(data.mobileNumber);
    }
  }, [data]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      await updateUser({
        id: user?.id,
        username,
        email,
        mobileNumber,
      }).unwrap();

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Error loading user data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isSuccess && (
        <>
          <View>
            <Text style={styles.title}>User Profile</Text>

            {/* Username */}
            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              editable={isEditing}
              mode="outlined"
              textColor="black"
              selectionColor="black"
              underlineColor="black"
              activeUnderlineColor="black"
              placeholderTextColor="black"
            />

            {/* Email */}
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              editable={isEditing}
              mode="outlined"
              textColor="black"
              selectionColor="black"
              underlineColor="black"
              activeUnderlineColor="black"
              placeholderTextColor="black"
            />

            {/* Mobile Number */}
            <TextInput
              label="Mobile Number"
              value={mobileNumber}
              onChangeText={(text) => setMobileNumber(text)}
              style={styles.input}
              editable={isEditing}
              mode="outlined"
              keyboardType="numeric"
              textColor="black"
              selectionColor="black"
              underlineColor="black"
              activeUnderlineColor="black"
              placeholderTextColor="black"
            />

            {/* Edit and Save buttons */}
            <View style={styles.buttonsContainer}>
              {isEditing && (
                <Button
                  mode="contained"
                  onPress={handleSave}
                  style={styles.saveButton}
                >
                  Save
                </Button>
              )}
            </View>
          </View>
        </>
      )}
      <FAB
        style={styles.fab}
        icon="lock-reset"
        onPress={() => router.push("/auth/reset-password")}
        label="Change Password"
        color="white"
        theme={{ colors: { primary: "#6200ea" } }}
      />
      <Divider />

      {/* Edit button */}
      {/* Floating Action Button to trigger edit */}
      {!isEditing && (
        <FAB style={styles.fab} icon="pencil" onPress={handleEdit} />
      )}

      {/* chnage password */}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#fff",
    color: "black",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  editButton: {
    backgroundColor: "#6200ea",
    color: "white",
  },
  saveButton: {
    backgroundColor: "#6200ea",
    color: "white",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#6200ea",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
