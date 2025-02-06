import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { AirbnbRating } from "react-native-ratings";

const ItemViewScreen = ({ route }) => {
  const item = route.params?.item || {};

  return (
    <View style={styles.container}>
      {Object.keys(item).length > 0 ? (
        <>
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.listingImage} />
          )}
          <Text style={styles.title}>{item.title}</Text>
          <Text>
            From: {item.firstName} {item.lastName}
          </Text>
          <Text>Expiry: {item.expiry}</Text>
          <Text>
            Description: {item.description || "No description available"}
          </Text>

          {/* ⭐ Show rating */}
          <View style={styles.ratingContainer}>
            <Text>Condition Rating:</Text>
            <AirbnbRating
              count={5}
              defaultRating={item.rating}
              size={20}
              showRating={true}
              isDisabled
            />
          </View>
        </>
      ) : (
        <Text style={styles.text}>Select a listing to view details</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  listingImage: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    borderRadius: 10,
    marginBottom: 10,
  },
  ratingContainer: {
    marginTop: 10,
    alignItems: "flex-start",
  },
});

export default ItemViewScreen;
