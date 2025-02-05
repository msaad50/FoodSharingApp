import React from "react";
import { Text, StyleSheet } from "react-native";

const Logo = () => {
  return <Text style={styles.logo}>ecoBites</Text>;
};

const styles = StyleSheet.create({
  logo: {
    fontSize: 36,
    // fontWeight: "bold",
    color: "#42a5f5",
    letterSpacing: 3,
    textAlign: "center",
    fontFamily: "courier",
    marginBottom: 20,
  },
});

export default Logo;
