import { View, Text, StyleSheet } from "react-native";

const Dashboard = () => {
  // TODO: get authenticated user else redirect to login page
  // (figure out how to do this in the _layout.tsx file)

  return (
    <View style={styles.container}>
      <Text>Todo Dashboard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});

export default Dashboard;
