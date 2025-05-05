import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { BigButton } from "@/components/BigButton";
import LandingPageIllustration from "@/assets/svg/landing_page_illustration";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

// Landing page
export default function Index() {
  const [loadingAuth, setLoadingAuth] = useState(true);

  const router = useRouter();

  async function checkAuthUser() {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    if (!accessToken) {
      setLoadingAuth(false);
      return;
    }

    const response = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 200) {
      router.navigate("/todo");
    } else {
      setLoadingAuth(false);
    }
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  if (loadingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#6c63ff" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LandingPageIllustration style={styles.illustration} />
      <Text style={styles.headingText}>
        The best app for managing your todos
      </Text>
      <BigButton
        style={styles.bigButton}
        textStyle={styles.bigButtonText}
        title="Login"
        onPress={() => router.navigate("/auth/login")}
      />
      <Text
        style={styles.smallButtonText}
        onPress={() => console.log("navigate to signup page")}
      >
        Don't have an account? create account
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  illustration: {
    width: 300,
    height: 500,
    position: "absolute",
    top: 250,
  },
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  headingText: {
    paddingVertical: 80,
    paddingHorizontal: 40,
    fontSize: 60,
    fontWeight: "500",
    color: "#000",
  },
  bigButton: {
    marginTop: 220,
  },
  bigButtonText: {
    color: "#fff",
  },
  smallButtonText: {
    paddingVertical: 10,
    fontSize: 16,
  },
});
