import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const dummyData = [
  {
    id: "1",
    title: "Fresh Bread",
    expiry: "2024-04-30",
    donor: "Local Bakery",
  },
  {
    id: "2",
    title: "Vegetables Box",
    expiry: "2024-04-28",
    donor: "Community Garden",
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Now</Text>

      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listingCard}
            onPress={() => navigation.navigate("Listings", { item })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text>Expires: {item.expiry}</Text>
            <Text>From: {item.donor}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Add")}
      >
        <Text style={styles.buttonText}>Add Listing ➕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
  },
  listingCard: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 8,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#42a5f5",
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;
