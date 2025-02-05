import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

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
          <Text>Expiry: {item.expiry}</Text>
          <Text>Donor: {item.donor || "Unknown"}</Text>
          <Text>
            Description: {item.description || "No description available"}
          </Text>
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
});

export default ItemViewScreen;
