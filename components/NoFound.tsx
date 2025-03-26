import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";

export default function NoFound() {
  const animation = useRef<LottieView>(null);
  useEffect(() => {
    animation.current?.play();
  }, []);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 700,
          height: 500,
          backgroundColor: "#fff",
        }}
        source={require("../assets/nofound.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "transparent",
  },
});
