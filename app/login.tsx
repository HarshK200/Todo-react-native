import { View, Text, StyleSheet } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "red", height: 300 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  wave: {
    position: "absolute",
    top: 250,
    left: -200,
    width: 1100,
    height: 200,
  },
});
