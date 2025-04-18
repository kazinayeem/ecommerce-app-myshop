// ResetPasswordScreen.tsx
import { useResetPasswordMutation } from "@/redux/api/userApi";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  const passwordsMatch = newPassword === confirmPassword;
  const isFormValid =
    email && oldPassword && newPassword && confirmPassword && passwordsMatch;
  const router = useRouter();
  const handleReset = async () => {
    const newpassword = {
      email: email,
      oldpassword: oldPassword,
      password: newPassword,
    };
    try {
      const response = await resetPassword(newpassword).unwrap();
      if (response) {
        Alert.alert("Success", "Password reset successfully");
        router.replace("/user");
      }
    } catch {
      Alert.alert(
        "Error",
        error &&
          typeof error === "object" &&
          "data" in error &&
          typeof error.data === "object" &&
          error.data &&
          "message" in error.data
          ? (error.data as { message: string }).message
          : "An error occurred",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Old Password"
        placeholderTextColor="#999"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#999"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        placeholderTextColor="#999"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {!passwordsMatch && confirmPassword.length > 0 && (
        <Text style={styles.errorText}>Passwords do not match</Text>
      )}

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isFormValid ? "#000" : "#ccc" },
        ]}
        disabled={!isFormValid || isLoading}
        onPress={handleReset}
      >
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    color: "#000",
  },
  errorText: {
    color: "red",
    marginBottom: 12,
    fontSize: 13,
  },
  button: {
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
