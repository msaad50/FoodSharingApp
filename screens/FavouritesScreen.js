import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavouritesScreen = ({ navigation }) => {
  const [favourites, setFavourites] = useState([]);

  // Load Favourites from AsyncStorage
  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const storedFavourites = await AsyncStorage.getItem("favourites");
        if (storedFavourites) {
          setFavourites(JSON.parse(storedFavourites));
        }
      } catch (error) {
        console.error("Error loading favourites:", error);
      }
    };

    loadFavourites();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favourite Listings</Text>

      {favourites.length === 0 ? (
        <Text style={styles.noFavourites}>No favourites added yet.</Text>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listingCard}
              onPress={() => navigation.navigate("ItemView", { item })}
            >
              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={styles.listingImage}
                />
              )}
              <Text style={styles.title}>{item.title}</Text>
              <Text>Expires: {item.expiry}</Text>
              <Text>From: {item.donor || "Unknown"}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
  },
  noFavourites: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: "gray",
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
  listingImage: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default FavouritesScreen;
