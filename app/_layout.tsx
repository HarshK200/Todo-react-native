import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";

const RootLayout = () => {
  // TODO: utilize useAuth() hook and then redirect to home page else stay(if not logged in)

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
};

export default RootLayout;
