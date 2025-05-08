import { useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { Redirect } from "expo-router";
import { Text } from "react-native";

const HomeLayout = () => {
  // TODO: check if the session is valid (utilize useAuth() hook) if not redirect to /signin
  const auth = useAuth();

  return !auth.user ? (
    // <Redirect href="/signin" />
    <Text>Loading</Text>
  ) : (
    <Stack screenOptions={{ headerShown: false }} />
  );
};

export default HomeLayout;
