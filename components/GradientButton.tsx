import { GradientButtonProps } from "@/redux/type";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const GradientButton = ({
  title,
  onPress,
  disabled = false,
  colors,
}: GradientButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={{ width: "45%" }} // Ensure button width is 45%
    >
      <LinearGradient
        colors={colors || ["#5b6db8", "#d41294", "#ed0089"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button, { opacity: disabled ? 0.5 : 1 }]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default GradientButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
