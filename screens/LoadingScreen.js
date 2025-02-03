/* import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

 const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate a loading time (e.g., fetching data, checking auth)
    setTimeout(() => {
      navigation.replace("Main"); // Navigate to main app after loading
    }, 2000); // 2 seconds delay
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ecoBites</Text>
      <ActivityIndicator size="large" color="#42a5f5" />
      <Text style={styles.loadingText}>Loading...</Text>
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
    //  fontWeight: "bold",
    color: "#42a5f5",
    letterSpacing: 3,
    marginBottom: 20, // Space between logo and spinner
    fontFamily: "courier",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});

export default LoadingScreen;
*/
