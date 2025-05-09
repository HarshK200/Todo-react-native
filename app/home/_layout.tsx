import { useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { Redirect } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

const HomeLayout = () => {
  const auth = useAuth();

  if (auth.user === null) {
    return <Redirect href="/signin" />;
  }

  // NOTE: undefined is considered a loading state
  return auth.user === undefined ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <Stack screenOptions={{ headerShown: false }} />
  );
};

export default HomeLayout;
