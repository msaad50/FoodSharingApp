import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const MoreScreen = () => {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    setTimeout(async () => {
      try {
        await signOut(auth);
        console.log("User logged out!");
      } catch (err) {
        console.error(err);
      } finally {
        setLoggingOut(false);
      }
    }, 2000); // Simulate loading time of 2 seconds
  };

  if (loggingOut) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>ecoBites</Text>
        <ActivityIndicator size="large" color="#42a5f5" />
        <Text style={styles.loadingText}>Logging Out...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>More</Text>
      <Button title="Logout" onPress={handleLogout} color="#d9534f" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    fontSize: 36,
    color: "#42a5f5",
    letterSpacing: 3,
    marginBottom: 20,
    fontFamily: "Courier",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default MoreScreen;
