import { useLocalSearchParams, useRouter } from "expo-router";
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
    if (event.url.includes("/cancel")) {
      router.replace("/cancel");
    }
  };

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading... Please wait.</Text>
        </View>
      )}

      {redirectUrl ? (
        <WebView
          source={{ uri: redirectUrl as string }}
          onNavigationStateChange={handleNavigationChange}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          style={styles.webview}
        />
      ) : (
        <Text style={styles.error}>Redirect URL missing</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4", 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555", // Gray text to match the loading spinner
  },
  webview: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#ddd", // Adds a subtle separation from the loading state
  },
  error: {
    textAlign: "center",
    marginTop: 20,
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },
});
