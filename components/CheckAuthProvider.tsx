import { useAppDispatch } from "@/redux/hook/hooks";
import { setUserandToken } from "@/redux/reducer/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

export default function CheckAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    bootstrapAsync();
  }, [dispatch]);
  const bootstrapAsync = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        dispatch(setUserandToken({ user: JSON.parse(user) }));
      } else {
        console.log("Token or user not found in AsyncStorage.");
      }
    } catch (e) {
      console.error("Error restoring token or user:", e);
    }
  };
  return <React.Fragment>{children}</React.Fragment>;
}
