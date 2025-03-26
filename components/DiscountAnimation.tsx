import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";

export default function DiscountAnimation() {
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
          width: 300,
          height: 150,
          backgroundColor: "#fff",
        }}
        source={require("../assets/discount.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
