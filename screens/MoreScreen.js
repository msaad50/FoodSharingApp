import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const MoreScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>More Options</Text>
      <Button
        title="About Us"
        onPress={() => navigation.navigate("About Us")}
      />
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
      <Button
        title="Logout"
        onPress={() => navigation.navigate("Logout")}
        color="#d9534f"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default MoreScreen;
