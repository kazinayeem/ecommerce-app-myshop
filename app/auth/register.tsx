import BigButton from "@/components/Button";
import { bordercolor, btncolor, graycolor } from "@/components/color/color";
import GoogleLogin from "@/components/GoogleLogin";
import { useRegisterMutation } from "@/redux/api/userApi";
import AntDesign from "@expo/vector-icons/AntDesign";
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
export default function Register() {
  const [register, { isLoading }] = useRegisterMutation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const respose = await register({
        username,
        email,
        password,
      }).unwrap();
      if (respose) {
        Alert.alert(
          "Success",
          "Registration successful! Please log in to continue."
        );
        router.push("/auth/login");
      }
    } catch {
      Alert.alert("Error", "Registration failed. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Create an </Text>
        <Text style={styles.headerText}>Account </Text>
      </View>
      <View>
        <View style={styles.textInputContainer}>
          <AntDesign name="user" size={24} color="#626262" />
          <TextInput
            style={styles.textInput}
            placeholder="user name"
            value={username}
            onChangeText={(text) => setUsername(text)}
            keyboardType="default"
            placeholderTextColor={graycolor}
          />
        </View>

        <View style={styles.textInputContainer}>
          <AntDesign name="user" size={24} color="#626262" />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            placeholderTextColor={graycolor}
          />
        </View>

        <View style={styles.textInputContainer}>
          <AntDesign name="lock" size={24} color="#626262" />
          <TextInput
            placeholder="Password"
            placeholderTextColor={graycolor}
            secureTextEntry={showPassword}
            style={styles.textInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
            keyboardType="default"
          />
          <AntDesign
            name="eye"
            size={26}
            color="#626262"
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>

        <View style={styles.textInputContainer}>
          <AntDesign name="lock" size={24} color="#626262" />
          <TextInput
            placeholder="ConfirmPassword"
            placeholderTextColor={graycolor}
            secureTextEntry={showPassword}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            style={styles.textInput}
          />
          <AntDesign
            name="eye"
            size={26}
            color="#626262"
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
      </View>
      <TouchableOpacity>
        <Text style={styles.RegisterText}>
          By clicking the Register button, you agree to the public offer
        </Text>
      </TouchableOpacity>
      <BigButton
        textcolor={"white"}
        title={isLoading ? "Loading..." : "Register"}
        w={90}
        h={6}
        fs={2.5}
        mt={5}
        mb={5}
        action={handleRegister}
        actiontitle={"Register"}
      />

      <Text style={styles.orText}>- OR Continue with -</Text>

      <GoogleLogin />

      {/* Create Account */}
       <View style={styles.footer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
      
              <View>
                <TouchableOpacity>
                  <Text
                    style={styles.signUpText}
                    onPress={() => router.push("/auth/ResetPasswordScreen")}
                  >
                    Reset Password
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  textContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 30,
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
  RegisterText: {
    color: btncolor,
    fontSize: 14,
    alignSelf: "flex-start",
    marginBottom: 20,
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
    flexDirection: "column",
    alignItems: "center",
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
