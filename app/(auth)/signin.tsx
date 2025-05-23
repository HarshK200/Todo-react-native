import { Text, View, StyleSheet, TextInput } from "react-native";
import LandingPageIllustration from "@/assets/svg/landing_page_illustration";
import { BigButton } from "@/components/BigButton";
import UserIcon from "@/assets/svg/user_icon";
import LockIcon from "@/assets/svg/lock_icon";
import { useState } from "react";
import EyeSlashIcon from "@/assets/svg/eye_slash_icon";
import EyeIcon from "@/assets/svg/eye_icon";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

// Signin page
const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [passwordHidden, setPasswordHidden] = useState(true);

  const router = useRouter();
  const auth = useAuth();

  async function handleSignin() {
    setLoading(true);

    const response = await auth.signIn(username, password);
    if (!response) {
      setErrorMsg("In useAuth() error occured during signin");
      return;
    }

    if (response.statusCode === 200) {
      await SecureStore.setItemAsync("accessToken", response.accessToken!);
      await SecureStore.setItemAsync("refreshToken", response.refreshToken!);

      setLoading(false);
      router.navigate("/home");
    } else {
      setLoading(false);
      setErrorMsg(response.message);
    }
  }

  return (
    <View style={styles.containerView}>
      <LandingPageIllustration style={styles.illustration} />
      <Text style={styles.headingText}>Welcome Back</Text>
      <Text style={styles.subHeadingText}>SignIn to your account</Text>
      <View style={styles.inputForm}>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            placeholderTextColor={"#4A3EFF"}
            value={username}
            onChange={(e) => setUsername(e.nativeEvent.text)}
          />
          <UserIcon style={styles.inputIcon} />
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor={"#4A3EFF"}
            secureTextEntry={passwordHidden}
            value={password}
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />
          <LockIcon style={styles.inputIcon} />
          {passwordHidden ? (
            <EyeIcon
              style={styles.eyeIcon}
              onPress={() => setPasswordHidden(false)}
            />
          ) : (
            <EyeSlashIcon
              style={styles.eyeIcon}
              onPress={() => setPasswordHidden(true)}
            />
          )}
        </View>
        <Text style={styles.errorMessage}>{errorMsg}</Text>
      </View>
      <BigButton
        title="Signin"
        onPress={handleSignin}
        style={styles.bigButtonStyle}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    alignItems: "center",
  },
  illustration: {
    width: 250,
    height: 250,
    marginTop: 100,
  },
  headingText: {
    marginTop: 50,
    fontSize: 40,
    fontWeight: "bold",
  },
  subHeadingText: {
    marginTop: 10,
    color: "#959595",
    fontSize: 18,
  },
  inputForm: {
    marginTop: 30,
    alignItems: "center",
  },
  textInputWrapper: {
    marginTop: 20,
    position: "relative",
  },
  textInput: {
    backgroundColor: "#e2e0ff",
    color: "#4A3EFF",
    fontWeight: "bold",
    paddingVertical: 15,
    paddingHorizontal: 45,
    borderRadius: 15,
    width: 350,
  },
  inputIcon: {
    width: 15,
    height: 15,
    position: "absolute",
    left: 18,
    top: 18,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    position: "absolute",
    right: 15,
    top: 15,
  },
  bigButtonStyle: { marginTop: 100 },
  errorMessage: {
    marginVertical: 15,
    marginHorizontal: 10,
    alignSelf: "flex-start",
    color: "red",
  },
});

export default SignIn;
