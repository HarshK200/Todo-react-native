import { Text, View, StyleSheet } from "react-native";
import LandingPageIllustration from "@/assets/svg/landing_page_illustration";
import { BigButton } from "@/components/BigButton";
import { useRouter } from "expo-router";

// Landing page
export default function Index() {
  // TODO: check for auth token validity by getting it for expo-secure-store
  // and verifying it by making a request to /auth/me
  // (IF USER IS VERIFIED REDIRECT TO DASHBOARD)
  const router = useRouter();

  return (
    <View style={styles.containerView}>
      <View style={styles.sectionA}>
        <LandingPageIllustration style={styles.illustration} />
        <Text style={styles.headingText}>Manage all your todos simply</Text>
      </View>
      <View style={styles.sectionB}>
        <BigButton title="Log in" onPress={() => router.navigate("/login")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    gap: 20,
    display: "flex",
  },
  sectionA: {
    paddingTop: 100,
    paddingBottom: 40,
    alignItems: "center",
  },
  sectionB: {
    paddingTop: 40,
  },
  illustration: {
    width: 250,
    height: 250,
  },
  headingText: {
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 50,
    fontWeight: "bold",
  },
});
