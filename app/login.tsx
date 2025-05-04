import { Text, View, StyleSheet, TextInput } from "react-native";
import LandingPageIllustration from "@/assets/svg/landing_page_illustration";
import { BigButton } from "@/components/BigButton";
import UserIcon from "@/assets/svg/user_icon";
import LockIcon from "@/assets/svg/lock_icon";
import { useState } from "react";
import EyeSlashIcon from "@/assets/svg/eye_slash_icon";
import EyeIcon from "@/assets/svg/eye_icon";

// Login page
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleLogin() {
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        expiresInMins: 30, // optional, defaults to 60
      }),
      credentials: "include", // Include cookies (e.g., accessToken) in the request
    })
      .then((res) => res.json())
      .then(console.log);
  }

  return (
    <View style={styles.containerView}>
      <LandingPageIllustration style={styles.illustration} />
      <Text style={styles.headingText}>Welcome Back</Text>
      <Text style={styles.subHeadingText}>Login to your account</Text>
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
            secureTextEntry={passwordVisible}
            value={password}
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />
          <LockIcon style={styles.inputIcon} />
          {passwordVisible ? (
            <EyeIcon
              style={styles.eyeIcon}
              onPress={() => setPasswordVisible(false)}
            />
          ) : (
            <EyeSlashIcon
              style={styles.eyeIcon}
              onPress={() => setPasswordVisible(true)}
            />
          )}
        </View>
      </View>
      <BigButton
        title="Login"
        onPress={handleLogin}
        style={styles.bigButtonStyle}
      />
    </View>
  );
}

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
  bigButtonStyle: { marginTop: 120 },
});
