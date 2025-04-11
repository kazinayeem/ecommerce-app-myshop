import { useAppDispatch } from "@/redux/hook/hooks";
import { logout, setUserandToken } from "@/redux/reducer/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

export default function CheckAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          dispatch(setUserandToken({ user: JSON.parse(user) }));
        } else {
          dispatch(logout());
        }
      } catch (e) {
        console.error("Error restoring token or user:", e);
        dispatch(logout());
      }
    };
    bootstrapAsync();
  }, [dispatch]);

  return <React.Fragment>{children}</React.Fragment>;
}
