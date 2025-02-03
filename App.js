import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { AuthProvider } from "./contexts/AuthContext";
import Logo from "./components/Logo";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <View></View>

        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 50,
    alignItems: "center",
  },
});
