import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { BigButton } from "@/components/BigButton";
import LandingPageIllustration from "@/assets/svg/landing_page_illustration";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

// Landing page
const Index = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.navigate("/home");
    }
  }, [user]);

  return user === undefined || user ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View style={styles.container}>
      <LandingPageIllustration style={styles.illustration} />
      <Text style={styles.headingText}>
        The best app for managing your todos
      </Text>
      <BigButton
        style={styles.bigButton}
        textStyle={styles.bigButtonText}
        title="Signin"
        onPress={() => router.navigate("/signin")}
      />
      <Text
        style={styles.smallButtonText}
        onPress={() => console.log("navigate to signup page")}
      >
        Don't have an account? create account
      </Text>
    </View>
  );
};

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

export default Index;
