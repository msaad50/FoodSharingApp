/* import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const HomeScreen = ({ navigation }) => {
  const [listings, setListings] = useState([]);

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Now</Text>

      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listingCard}
            onPress={() => navigation.navigate("Listings", { item })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text>Expires: {item.expiry}</Text>
            <Text>From: {item.donor || "Unknown"}</Text>
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
  container: {
    flex: 1,
    padding: 16,
  },
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
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const HomeScreen = ({ navigation }) => {
  const [listings, setListings] = useState([]);
  const [favourites, setFavourites] = useState({});

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

  // Load Favourites from AsyncStorage
  useEffect(() => {
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
  }, []);

  // Toggle Favourites
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Now</Text>

      <FlatList
        data={listings}
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
              <Text>Expires: {item.expiry}</Text>
              <Text>From: {item.donor || "Unknown"}</Text>
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
  container: {
    flex: 1,
    padding: 16,
  },
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
    position: "relative",
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
  favButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  favButtonText: {
    fontSize: 22,
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
