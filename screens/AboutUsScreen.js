import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const AboutUsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.mission}>
        🌱 <Text style={{ fontSize: 19 }}>ecoBites</Text> is on a mission to
        reduce food waste and build a sustainable future. We connect people who
        have excess food with those who need it, fostering a sharing community
        while helping the planet.
      </Text>
      <Text style={styles.description}>
        🥗 Through our platform, you can:
        {"\n"}• Find free food from local donors.
        {"\n"}• Share your surplus food with neighbours.
        {"\n"}• Reduce food waste and support eco-friendly living.
      </Text>
      <Text style={styles.quote}>
        “Together, we can fight food waste and make the world greener.” 🌍💚
      </Text>
      <View style={styles.spacing} />

      <Text style={styles.logo}>ecoBites</Text>
      <Text style={styles.logoSubtitle}>
        Connecting Communities • Reducing Waste
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#42a5f5",
    marginBottom: 20,
    textAlign: "center",
  },
  mission: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 20,
    textAlign: "center",
  },
  quote: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#777",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  spacing: {
    height: 50,
  },
  logo: {
    fontSize: 36,
    color: "#42a5f5",
    letterSpacing: 3,
    marginBottom: 5,
    fontFamily: "Courier",
    // fontWeight: "bold",
  },
  logoSubtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default AboutUsScreen;
