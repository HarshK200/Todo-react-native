import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { BigButton } from "@/components/BigButton";

// Landing page
export default function Index() {
  // TODO: check for auth token validity by getting it for expo-secure-store
  // and verifying it by making a request to /auth/me
  // (IF USER IS VERIFIED REDIRECT TO DASHBOARD)
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require("@/assets/images/clean-purple-background.jpg")}
      >
        <Text style={styles.headingText}>
          The best app for managing your todos
        </Text>
        <BigButton
          style={styles.bigButton}
          textStyle={styles.bigButtonText}
          title="Login"
          onPress={() => router.navigate("/login")}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    paddingVertical: 30,
    alignItems: "center",
  },
  headingText: {
    paddingVertical: 120,
    paddingHorizontal: 40,
    fontSize: 60,
    fontWeight: "500",
    color: "#a66ff5",
  },
  bigButton: {
    marginTop: 100,
    borderRadius: 20,
    backgroundColor: "#4A3EFF",
  },
  bigButtonText: {
    color: "#fff",
  },
});
