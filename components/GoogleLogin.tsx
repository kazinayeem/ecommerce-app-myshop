import { useLoginwithGoogleMutation } from "@/redux/api/userApi";
import { useAppDispatch } from "@/redux/hook/hooks";
import { loginSuccess } from "@/redux/reducer/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import React from "react";
import { Alert } from "react-native";

export default function GoogleLogin() {
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        process.env.EXPO_WEB_CLIENT_ID ||
        "602612340251-sv5th0jru1q5klidslclcjeuco9jjnbt.apps.googleusercontent.com",
      offlineAccess: true,
    });
  }, []);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loginwithGoogle, { isLoading: RegisterLoading }] =
    useLoginwithGoogleMutation();
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const userInfo = response.data.user;
        const user: {
          email?: string;
          username?: string;
          id: string;
          profilePic?: string;
          password?: string;
        } = {
          email: userInfo.email,
          username: userInfo.name ?? "",
          id: userInfo.id,
          profilePic: userInfo.photo ?? undefined,
          password: userInfo.id,
        };
        const respose = await loginwithGoogle(user).unwrap();
        if (respose) {
          await AsyncStorage.setItem("user", JSON.stringify(respose.user));
          await AsyncStorage.setItem("token", respose.token);
          dispatch(loginSuccess(respose.user));
          router.back();
        } else {
          Alert.alert(
            "Error",
            "Login failed. Please check your credentials and try again."
          );
        }
      } else {
        console.log("[❌ FAILED] Google Sign-In returned unexpected response:");
        console.log("Response:", response);
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.warn(
              "[⚠️ WARNING] Sign-In already in progress:",
              error.message
            );
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert(
              "Error",
              "Play Services not available. Please install or update Google Play Services."
            );
            break;
          default:
            Alert.alert(
              "Error",
              "An error occurred during Google Sign-In. Please try again."
            );
            break;
        }
      } else {
        console.error("[❌ ERROR] Google Sign-In error:", error);
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <GoogleSigninButton
      style={{
        width: "100%",
        height: 55,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
      }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
      disabled={RegisterLoading}
    />
  );
}
