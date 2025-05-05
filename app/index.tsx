import { Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { BigButton } from "@/components/BigButton";
import LandingPageIllustration from "@/assets/svg/landing_page_illustration";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

// Landing page
export default function Index() {
  const router = useRouter();

  // TODO: check for auth token validity by getting it for expo-secure-store
  // and verifying it by making a request to /auth/me
  // (IF USER IS VERIFIED REDIRECT TO DASHBOARD)

  useEffect(() => {
    // SecureStore.deleteItemAsync("accessToken");
    SecureStore.getItemAsync("accessToken").then((accessToken) => {
      if (accessToken) {
        router.navigate("/todo");
      }
    });
  }, []);

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
