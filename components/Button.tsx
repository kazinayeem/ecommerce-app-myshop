import React from "react";
import {
  FlexAlignType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { nextbtncolor } from "./color/color";

interface BigButtonProps {
  title: string;
  textcolor?: string;
  w?: number;
  h?: number;
  fs?: number;
  mt?: number;
  mb?: number;
  position?: string;
  br?: number;
  icon?: boolean;
  children?: React.ReactNode;
  action?: (title: string) => void;
  actiontitle?: string;
  bg?: string;
  disabled?: boolean;
  loading?: boolean;
}
export default function BigButton({
  title,
  textcolor,
  w,
  h,
  fs,
  mt,
  mb,
  position,
  br,
  icon = false,
  children,
  action,
  actiontitle,
  bg,
  disabled = false,
  loading = false,
}: BigButtonProps) {
  const presshandeler = () => {
    if (typeof action === "function") {
      action(actiontitle || "");
    } else {
      console.log("not found");
    }
  };

  return (
    <TouchableOpacity
      onPress={presshandeler}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          width: responsiveWidth(w ?? 90),
          height: responsiveHeight(h ?? 5.6),
          marginTop: responsiveWidth(mt ?? 0),
          marginBottom: responsiveWidth(mb ?? 0),
          alignSelf: (position as FlexAlignType) || "center",
          borderRadius: br ?? 5,
          flexDirection: icon ? "row" : "column",
          backgroundColor: bg || nextbtncolor,
        },
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color: textcolor || "#fff",
            fontSize: responsiveFontSize(fs ?? 3),
          },
        ]}
      >
        {loading ? "Loading..." : title}
      </Text>

      {icon && children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    alignSelf: "center",
  },
});
