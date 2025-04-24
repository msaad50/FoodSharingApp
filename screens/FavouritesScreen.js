/* import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { AirbnbRating } from "react-native-ratings";

const FavouritesScreen = ({ navigation }) => {
  const [favourites, setFavourites] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadFavourites = async () => {
        try {
          const storedFavourites = await AsyncStorage.getItem("Favourites");
          if (storedFavourites) {
            setFavourites(JSON.parse(storedFavourites));
          }
        } catch (error) {
          console.error("Error loading favourites:", error);
        }
      };
      loadFavourites();
    }, [])
  );

  // Remove Favourite & Sync with HomeScreen
  const toggleFavourite = async (itemId) => {
    try {
      const updatedFavourites = favourites.filter((item) => item.id !== itemId);
      setFavourites(updatedFavourites);
      await AsyncStorage.setItem(
        "Favourites",
        JSON.stringify(updatedFavourites)
      );
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  };

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
            <View style={styles.listingCard}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ItemView", { item, from: "Favourites" })
                }
              >
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.listingImage}
                  />
                )}
                <Text style={styles.title}>{item.title}</Text>
                <Text>
                  From: {item.firstName} {item.lastName}
                </Text>
                <Text>Expires: {item.expiry}</Text>
                <Text>Location: {item.address}</Text>

                <View style={styles.ratingContainer}>
                  <AirbnbRating
                    count={5}
                    defaultRating={item.rating}
                    size={15}
                    showRating={false}
                    isDisabled
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.favButton}
                onPress={() => toggleFavourite(item.id)}
              >
                <Text style={styles.favButtonText}>❤️</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: "bold", padding: 16, marginBottom: 10 },
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
    borderRadius: 12,
    elevation: 3,
    position: "relative",
  },
  title: { fontSize: 18, fontWeight: "bold" },
  listingImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 10,
  },
  ratingContainer: { marginTop: 5, alignItems: "flex-start" },
  favButton: { position: "absolute", top: 10, right: 10, padding: 10 },
  favButtonText: { fontSize: 22 },
});

export default FavouritesScreen;
*/

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
import { useFocusEffect } from "@react-navigation/native";
import { AirbnbRating } from "react-native-ratings";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const FavouritesScreen = ({ navigation }) => {
  const [favouriteIds, setFavouriteIds] = useState([]);
  const [favouritesData, setFavouritesData] = useState([]);

  // Sync FAV IDs (for toggling)
  useFocusEffect(
    React.useCallback(() => {
      const loadFavourites = async () => {
        try {
          const stored = await AsyncStorage.getItem("Favourites");
          const favs = stored ? JSON.parse(stored) : [];
          setFavouriteIds(favs.map((item) => item.id));
        } catch (error) {
          console.error("Error loading favourites:", error);
        }
      };
      loadFavourites();
    }, [])
  );

  // Real-time updates of fav data
  useEffect(() => {
    if (favouriteIds.length === 0) {
      setFavouritesData([]);
      return;
    }

    const unsubscribe = onSnapshot(collection(db, "listings"), (snapshot) => {
      const allItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const matched = allItems.filter((item) => favouriteIds.includes(item.id));
      setFavouritesData(matched);
    });

    return () => unsubscribe();
  }, [favouriteIds]);

  const toggleFavourite = async (itemId) => {
    try {
      const stored = await AsyncStorage.getItem("Favourites");
      let favs = stored ? JSON.parse(stored) : [];

      if (favouriteIds.includes(itemId)) {
        favs = favs.filter((item) => item.id !== itemId);
      }

      await AsyncStorage.setItem("Favourites", JSON.stringify(favs));
      setFavouriteIds(favs.map((item) => item.id));
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favourite Listings</Text>
      {favouritesData.length === 0 ? (
        <Text style={styles.noFavourites}>No favourites added yet.</Text>
      ) : (
        <FlatList
          data={favouritesData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.listingCard}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ItemView", { item, from: "Favourites" })
                }
              >
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.listingImage}
                  />
                )}
                <Text style={styles.title}>{item.title}</Text>
                <Text>
                  From: {item.firstName} {item.lastName}
                </Text>
                <Text>Expires: {item.expiry}</Text>
                <Text>Location: {item.address}</Text>

                <View style={styles.ratingContainer}>
                  <AirbnbRating
                    count={5}
                    defaultRating={item.rating}
                    size={15}
                    showRating={false}
                    isDisabled
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.favButton}
                onPress={() => toggleFavourite(item.id)}
              >
                <Text style={styles.favButtonText}>❤️</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: "bold", padding: 16, marginBottom: 10 },
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
    borderRadius: 12,
    elevation: 3,
    position: "relative",
  },
  title: { fontSize: 18, fontWeight: "bold" },
  listingImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 10,
  },
  ratingContainer: { marginTop: 5, alignItems: "flex-start" },
  favButton: { position: "absolute", top: 10, right: 10, padding: 10 },
  favButtonText: { fontSize: 22 },
});

export default FavouritesScreen;
