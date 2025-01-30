import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const ListingScreen = ({ route }) => {
  const item = route.params?.item || {};

  return (
    <View style={styles.container}>
      {Object.keys(item).length > 0 ? (
        <>
          <Text style={styles.title}>{item.title}</Text>
          <Text>Expiry: {item.expiry}</Text>
          <Text>Donor: {item.donor}</Text>
          {/* Add more details here */}
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
});

export default ListingScreen;
