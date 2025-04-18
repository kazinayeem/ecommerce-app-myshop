import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

import {
  useChangePasswordMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/api/userApi";
import { useRouter } from "expo-router";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp" | "password">("email");
  const [email, setEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [sendOtp, { isLoading: sendingOtp, error: otperror }] =
    useSendOtpMutation();
  const [verifyOtp, { isLoading: verifyingOtp, error: verifyError }] =
    useVerifyOtpMutation();
  const [
    changePassword,
    { isLoading: changingPassword, error: changePasswordError },
  ] = useChangePasswordMutation();

  const handleSendOtp = async () => {
    try {
      await sendOtp({ email }).unwrap();
      Alert.alert("OTP Sent", "Check your email.");
      setStep("otp");
    } catch {
      const message =
        otperror && "data" in otperror
          ? (otperror.data as { message?: string })?.message
          : "An error occurred while sending OTP.";
      Alert.alert("Error", message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await verifyOtp({ email, otp: otpValue }).unwrap();
      Alert.alert("OTP Verified", "Enter your new password.");
      setStep("password");
    } catch {
      const message =
        (verifyError &&
          "data" in verifyError &&
          (verifyError.data as { message?: string })?.message) ||
        "An error occurred while verifying OTP.";
      Alert.alert("Error", message);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword.length < 6) {
      return Alert.alert(
        "Too Short",
        "Password must be at least 6 characters."
      );
    }
    if (newPassword !== confirmPassword) {
      return Alert.alert("Mismatch", "Passwords do not match.");
    }
    try {
      await changePassword({ email, password: newPassword }).unwrap();
      Alert.alert("Success", "Password changed successfully!", [
        {
          text: "OK",
          onPress: () => router.replace("/auth/login"),
        },
      ]);
    } catch {
      const message =
        (changePasswordError &&
          "data" in changePasswordError &&
          (changePasswordError.data as { message?: string })?.message) ||
        "Failed to change password.";
      Alert.alert("Error", message);
    }
  };

  const handleEnterKey = () => {
    if (step === "email") handleSendOtp();
    else if (step === "otp") handleVerifyOtp();
    else if (step === "password") handlePasswordChange();
  };

  return (
    <View style={styles.container}>
      {step === "email" && (
        <>
          <Text style={styles.title}>Reset Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={handleEnterKey}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Button
            title={sendingOtp ? "Sending..." : "Send OTP"}
            onPress={handleSendOtp}
            disabled={sendingOtp || !email}
          />
        </>
      )}

      {step === "otp" && (
        <>
          <Text style={styles.title}>Enter OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter 6-digit OTP"
            keyboardType="numeric"
            maxLength={6}
            value={otpValue}
            onChangeText={setOtpValue}
            onSubmitEditing={handleEnterKey}
          />
          <Button
            title={verifyingOtp ? "Verifying..." : "Verify OTP"}
            onPress={handleVerifyOtp}
            disabled={otpValue.length !== 6}
          />
          <View style={{ marginTop: 10 }}>
            <Button
              title="Resend OTP"
              onPress={() => {
                setOtpValue("");
                setStep("email");
              }}
            />
          </View>
        </>
      )}

      {step === "password" && (
        <>
          <Text style={styles.title}>Set New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onSubmitEditing={handleEnterKey}
          />
          <Button
            title={changingPassword ? "Updating..." : "Update Password"}
            onPress={handlePasswordChange}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginTop: 60,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
});
