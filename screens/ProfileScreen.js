import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth } from "../config/firebaseConfig";

const ProfileScreen = () => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      setUserEmail(auth.currentUser.email);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      <Text style={styles.label}>Logged in as:</Text>
      <Text style={styles.email}>{userEmail}</Text>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#42a5f5",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  email: {
    fontSize: 18,
    color: "#555",
    marginTop: 5,
  },
});

export default ProfileScreen;
