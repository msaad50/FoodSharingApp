import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";
import { AirbnbRating } from "react-native-ratings";

const HomeScreen = ({ navigation }) => {
  const [listings, setListings] = useState([]);
  const [favourites, setFavourites] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch Listings from Firestore
  useEffect(() => {
    const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListings(items);
    });
    return () => unsubscribe();
  }, []);

  // Load Favourites from AsyncStorage & Sync when Screen Focuses
  useFocusEffect(
    React.useCallback(() => {
      const loadFavourites = async () => {
        try {
          const storedFavourites = await AsyncStorage.getItem("favourites");
          if (storedFavourites) {
            const favItems = JSON.parse(storedFavourites);
            const favMap = favItems.reduce((acc, item) => {
              acc[item.id] = true;
              return acc;
            }, {});
            setFavourites(favMap);
          }
        } catch (error) {
          console.error("Error loading favourites:", error);
        }
      };
      loadFavourites();
    }, [])
  );

  // Toggle Favourites & Sync with AsyncStorage
  const toggleFavourite = async (item) => {
    let storedFavourites = await AsyncStorage.getItem("favourites");
    storedFavourites = storedFavourites ? JSON.parse(storedFavourites) : [];

    if (favourites[item.id]) {
      storedFavourites = storedFavourites.filter((fav) => fav.id !== item.id);
    } else {
      storedFavourites.push(item);
    }

    setFavourites((prev) => ({
      ...prev,
      [item.id]: !prev[item.id],
    }));

    await AsyncStorage.setItem("favourites", JSON.stringify(storedFavourites));
  };

  // Filtered Listings Based on Search Query
  const filteredListings = listings.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for food..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Text style={styles.header}>Available Now</Text>

      <FlatList
        data={filteredListings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listingCard}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ItemView", { item })}
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
              onPress={() => toggleFavourite(item)}
            >
              <Text style={styles.favButtonText}>
                {favourites[item.id] ? "❤️" : "🤍"}
              </Text>
            </TouchableOpacity>
          </View>
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
  container: { flex: 1, padding: 16 },
  searchBar: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    marginTop: 5,
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
  addButton: {
    backgroundColor: "#42a5f5",
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});

export default HomeScreen;
