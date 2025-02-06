import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { AirbnbRating } from "react-native-ratings";

const ItemViewScreen = ({ route }) => {
  const item = route.params?.item || {};

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        {/* 📌 Display Image */}
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.listingImage} />
        )}

        {/* 📌 Title */}
        <Text style={styles.title}>{item.title}</Text>

        {/* 📌 Food Donor Info */}
        <Text style={styles.subTitle}>
          Donated By:{" "}
          <Text style={styles.boldText}>
            {item.firstName} {item.lastName}
          </Text>
        </Text>

        {/* 📌 Expiry Date */}
        <Text style={styles.expiryText}>Expires: {item.expiry}</Text>

        {/* 📌 Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {item.description || "No description available"}
        </Text>

        {/* 📌 ⭐ Condition Rating */}
        <View style={styles.ratingContainer}>
          <Text style={styles.sectionTitle}>Condition Rating:</Text>
          <AirbnbRating
            count={5}
            defaultRating={item.rating}
            size={20}
            showRating={false}
            isDisabled
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f4f4f4", // Light Grey Background
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4, // Android shadow
  },
  listingImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 6,
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
    color: "#42a5f5",
  },
  expiryText: {
    fontSize: 14,
    color: "#ff5252",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    color: "#444",
  },
  description: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 12,
  },
  ratingContainer: {
    marginTop: 15,
    alignItems: "center",
  },
});

export default ItemViewScreen;
