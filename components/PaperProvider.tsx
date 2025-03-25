import { store } from "@/redux/store";
import * as React from "react";
import { PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import CheckAuthProvider from "./CheckAuthProvider";
export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <CheckAuthProvider>{children}</CheckAuthProvider>
      </PaperProvider>
    </StoreProvider>
  );
}
