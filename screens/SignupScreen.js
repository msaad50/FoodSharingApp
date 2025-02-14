import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  const handleSignup = async () => {
    setSigningIn(true); // Show loading screen

    setTimeout(async () => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (err) {
        setError(err.message);
      } finally {
        setSigningIn(false); // Hide loading screen
      }
    }, 2000); // Simulate 2 seconds loading time
  };

  if (signingIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>ecoBites</Text>
        <ActivityIndicator size="large" color="#42a5f5" />
        <Text style={styles.loadingText}>Signing in...</Text>
      </View>
    );
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Sign Up</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Sign Up" onPress={handleSignup} />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
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
  formContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
  },
  error: { color: "red", marginBottom: 16, textAlign: "center" },
  link: { color: "#42a5f5", marginTop: 16, textAlign: "center" },
});

export default SignupScreen;
