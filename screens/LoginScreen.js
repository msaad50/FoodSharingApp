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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [appLoading, setAppLoading] = useState(false);

  const handleLogin = async () => {
    setAppLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setAppLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (appLoading) {
      const timer = setTimeout(() => setAppLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [appLoading]);

  if (appLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>ecoBites</Text>
        <ActivityIndicator size="large" color="#42a5f5" />
        <Text style={styles.loadingText}>Logging in...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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

      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
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
    padding: 16,
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
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
    width: "100%",
  },
  error: {
    color: "red",
    marginBottom: 16,
    textAlign: "center",
  },
  link: {
    color: "#42a5f5",
    marginTop: 16,
    textAlign: "center",
  },
});

export default LoginScreen;
