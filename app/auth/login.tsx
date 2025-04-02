import BigButton from "@/components/Button";
import { bordercolor, btncolor, graycolor } from "@/components/color/color";
import { useLoginMutation } from "@/redux/api/userApi";
import { useAppDispatch } from "@/redux/hook/hooks";
import { loginSuccess } from "@/redux/reducer/authReducer";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await login({ email, password }).unwrap();
      if (response) {
        await AsyncStorage.setItem("user", JSON.stringify(response.user));
        await AsyncStorage.setItem("token", response.token);
        dispatch(loginSuccess(response.user));
        router.push("/");
      }
    } catch {
      Alert.alert(
        "Error",
        "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Welcome </Text>
        <Text style={styles.headerText}>Back! </Text>
      </View>
      {/* handel error */}
      {isError && (
        <Text style={{ color: "red", textAlign: "center" }}>
          {"data" in error &&
          error.data &&
          typeof error.data === "object" &&
          "message" in error.data
            ? (error.data as { message: string }).message
            : "An error occurred"}
        </Text>
      )}
      <View>
        <View style={styles.textInputContainer}>
          <AntDesign name="user" size={24} color="#626262" />
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Username or Email"
            placeholderTextColor={graycolor}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.textInputContainer}>
          <Entypo name="lock" size={24} color="#626262" />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            placeholderTextColor={graycolor}
            secureTextEntry={!showPassword}
            style={styles.textInput}
          />
          <AntDesign
            name="eye"
            size={20}
            color="#626262"
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <BigButton
        textcolor={"white"}
        title={"Login"}
        w={90}
        h={6}
        fs={2.5}
        mt={5}
        mb={5}
        action={handleLogin}
        actiontitle={"Login"}
        disabled={isLoading}
        loading={isLoading}
      />

      <Text style={styles.orText}>- OR Continue with -</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="google" size={25} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="apple1" size={25} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="facebook-square" size={25} color="#3b5998" />
        </TouchableOpacity>
      </View>

      {/* Create Account */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Create An Account</Text>
        <TouchableOpacity>
          <Text
            style={styles.signUpText}
            onPress={() => router.push("/auth/register")}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  textContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 36,
    fontWeight: "900",
  },

  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: bordercolor,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    height: 50,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#000",
  },
  forgotPasswordText: {
    color: btncolor,
    fontSize: 14,
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: btncolor,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    color: graycolor,
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 30,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: bordercolor,
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 10,
  },
  footerText: {
    color: graycolor,
    fontSize: 14,
  },
  signUpText: {
    textDecorationLine: "underline",
    textDecorationColor: btncolor,
    color: btncolor,
    fontSize: 14,
    fontWeight: "bold",
  },
});
