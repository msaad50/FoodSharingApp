import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Mock Data
const mockData = [
  { id: 1, name: "Apples", description: "Fresh apples available for pickup." },
  { id: 2, name: "Bread", description: "Day-old bread, still good to eat!" },
];

const ListingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Listings</Text>
      {mockData.map((item) => (
        <View key={item.id} style={styles.listing}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  listing: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
});

export default ListingScreen;
