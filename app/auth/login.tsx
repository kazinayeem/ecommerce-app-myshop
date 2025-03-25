import { useLoginMutation } from "@/redux/api/userApi";
import { useAppDispatch } from "@/redux/hook/hooks";
import { loginSuccess } from "@/redux/reducer/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Button,
  Card,
  IconButton,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading, isSuccess, isError }] = useLoginMutation();
  const [email, setEmail] = useState("user1@gmail.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [SnackbarText, setSnackbarText] = useState("");

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const handleLogin = async () => {
    try {
      const response = await login({ email, password }).unwrap();
      if (response) {
        await AsyncStorage.setItem("user", JSON.stringify(response.user));
        await AsyncStorage.setItem("token", response.token);
        dispatch(loginSuccess(response.user));
        setSnackbarText("Login successful!");
        onToggleSnackBar();
        router.replace("/");
      }
    } catch (error) {
      setSnackbarText(
        (error as any)?.data?.message || "Login failed. Please try again."
      );
      onToggleSnackBar();
    }
  };

  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Undo",
          onPress: () => {},
        }}
      >
        <Text>{SnackbarText}</Text>
        {isLoading && <Text>Loading...</Text>}
      </Snackbar>
      <Card style={styles.card}>
        <Card.Title title="Login" titleStyle={styles.title} />
        <Card.Content>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
            />
            <IconButton
              icon={showPassword ? "eye-off" : "eye"}
              size={20}
              onPress={() => setShowPassword(!showPassword)}
              style={styles.icon}
            />
          </View>
          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Login
          </Button>

          {/* Register Link */}
          <TouchableOpacity onPress={() => router.push("/auth/register")}>
            <Text style={styles.registerText}>
              Don't have an account? Register
            </Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#e3f2fd", // Soft blue background
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 5,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e88e5",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#f9f9f9", // Light input background
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  passwordInput: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  icon: {
    position: "absolute",
    right: 0,
    top: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#1e88e5", // Strong blue for button
  },
  registerText: {
    marginTop: 15,
    fontSize: 16,
    color: "#1e88e5",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
