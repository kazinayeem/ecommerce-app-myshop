import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";

export default function Payment() {
  const { redirectUrl } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const handleNavigationChange = (event: WebViewNavigation) => {
    if (event.url.includes("/success")) {
      const url = new URL(event.url);
      const tran_id = url.searchParams.get("tran_id");
      router.replace({
        pathname: "/success",
        params: { tran_id },
      });
    }

    if (event.url.includes("/fail")) {
      router.replace("/fail");
    }
  };

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading... Please wait.</Text>
        </View>
      )}

      {redirectUrl ? (
        <WebView
          source={{ uri: redirectUrl as string }}
          onNavigationStateChange={handleNavigationChange}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          style={{ flex: 1 }}
        />
      ) : (
        <Text style={styles.error}>Redirect URL missing</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    textAlign: "center",
    marginTop: 20,
    color: "red",
  },
});
