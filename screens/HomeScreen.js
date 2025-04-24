/* import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";
import { AirbnbRating } from "react-native-ratings";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [listings, setListings] = useState([]);
  const [favourites, setFavourites] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setListings(items);
    });
    return () => unsubscribe();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const loadFavourites = async () => {
        try {
          const storedFavourites = await AsyncStorage.getItem("Favourites");
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

  const toggleFavourite = async (item) => {
    let storedFavourites = await AsyncStorage.getItem("Favourites");
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

    await AsyncStorage.setItem("Favourites", JSON.stringify(storedFavourites));
  };

  const filteredListings = listings.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Available Now</Text>
        {filteredListings.length > 0 ? (
          <View style={styles.singleListingCard}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ItemView", { item: filteredListings[0] })
              }
            >
              {filteredListings[0].image && (
                <Image
                  source={{ uri: filteredListings[0].image }}
                  style={styles.listingImage}
                />
              )}
              <Text style={styles.title}>{filteredListings[0].title}</Text>
              <Text>
                From: {filteredListings[0].firstName}{" "}
                {filteredListings[0].lastName}
              </Text>
              <Text>Expires: {filteredListings[0].expiry}</Text>
              <Text>Location: {filteredListings[0].address}</Text>
              <View style={styles.ratingContainer}>
                <AirbnbRating
                  count={5}
                  defaultRating={filteredListings[0].rating}
                  size={15}
                  showRating={false}
                  isDisabled
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.favButton}
              onPress={() => toggleFavourite(filteredListings[0])}
            >
              <Text style={styles.favButtonText}>
                {favourites[filteredListings[0].id] ? "❤️" : "🤍"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.noListingsText}>No listings added yet</Text>
        )}

        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={() => navigation.navigate("See All")}
        >
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Near You</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 55.3781,
            longitude: -3.436,
            latitudeDelta: 5.5,
            longitudeDelta: 5.5,
          }}
        >
          {listings.map((item) =>
            item.latitude && item.longitude ? (
              <Marker
                key={item.id}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
              >
                <Callout
                  onPress={() => navigation.navigate("ItemView", { item })}
                >
                  <View style={{ width: 200 }}>
                    <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                    <Text>{item.address}</Text>
                    <Image
                      source={{ uri: item.image }}
                      style={{ width: "100%", height: 100, marginTop: 5 }}
                    />
                    <Text style={{ color: "blue" }}>View Details</Text>
                  </View>
                </Callout>
              </Marker>
            ) : null
          )}
        </MapView>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Add")}
        >
          <Text style={styles.buttonText}>Add Listing ➕</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  searchBar: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  scrollContent: { padding: 16 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    marginTop: 5,
  },
  singleListingCard: {
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
  seeAllButton: {
    alignSelf: "flex-end",
    marginRight: 16,
    marginBottom: 10,
  },
  seeAllText: {
    fontSize: 16,
    color: "#42a5f5",
    fontWeight: "bold",
  },
  map: {
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: "#42a5f5",
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
  noListingsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginVertical: 10,
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
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";
import { AirbnbRating } from "react-native-ratings";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [listings, setListings] = useState([]);
  const [favourites, setFavourites] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [nearestItem, setNearestItem] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setListings(items);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    if (userLocation && listings.length) {
      const distances = listings
        .filter((item) => item.latitude && item.longitude)
        .map((item) => ({
          ...item,
          distance: Math.sqrt(
            Math.pow(userLocation.latitude - item.latitude, 2) +
              Math.pow(userLocation.longitude - item.longitude, 2)
          ),
        }));
      const nearest = distances.reduce((a, b) =>
        a.distance < b.distance ? a : b
      );
      setNearestItem(nearest);
    }
  }, [userLocation, listings]);

  useFocusEffect(
    React.useCallback(() => {
      const loadFavourites = async () => {
        try {
          const storedFavourites = await AsyncStorage.getItem("Favourites");
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

  const toggleFavourite = async (item) => {
    let storedFavourites = await AsyncStorage.getItem("Favourites");
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

    await AsyncStorage.setItem("Favourites", JSON.stringify(storedFavourites));
  };

  const filteredListings = listings.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Available Now</Text>
        {filteredListings.length > 0 ? (
          <View style={styles.singleListingCard}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ItemView", { item: filteredListings[0] })
              }
            >
              {filteredListings[0].image && (
                <Image
                  source={{ uri: filteredListings[0].image }}
                  style={styles.listingImage}
                />
              )}
              <Text style={styles.title}>{filteredListings[0].title}</Text>
              <Text>
                From: {filteredListings[0].firstName}{" "}
                {filteredListings[0].lastName}
              </Text>
              <Text>Expires: {filteredListings[0].expiry}</Text>
              <Text>Location: {filteredListings[0].address}</Text>
              <View style={styles.ratingContainer}>
                <AirbnbRating
                  count={5}
                  defaultRating={filteredListings[0].rating}
                  size={15}
                  showRating={false}
                  isDisabled
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.favButton}
              onPress={() => toggleFavourite(filteredListings[0])}
            >
              <Text style={styles.favButtonText}>
                {favourites[filteredListings[0].id] ? "❤️" : "🤍"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.noListingsText}>No listings added yet</Text>
        )}

        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={() => navigation.navigate("See All")}
        >
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Near You</Text>
        <MapView
          style={styles.map}
          region={
            nearestItem
              ? {
                  latitude: nearestItem.latitude,
                  longitude: nearestItem.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }
              : {
                  latitude: 55.3781,
                  longitude: -3.436,
                  latitudeDelta: 5.5,
                  longitudeDelta: 5.5,
                }
          }
        >
          {userLocation && (
            <Marker
              coordinate={userLocation}
              pinColor="blue"
              title="You are here"
            />
          )}
          {listings.map(
            (item) =>
              item.latitude &&
              item.longitude && (
                <Marker
                  key={item.id}
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}
                >
                  <Callout
                    onPress={() => navigation.navigate("ItemView", { item })}
                  >
                    <View style={{ width: 200 }}>
                      <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                      <Text>{item.address}</Text>
                      <Image
                        source={{ uri: item.image }}
                        style={{ width: "100%", height: 100, marginTop: 5 }}
                      />
                      <Text style={{ color: "blue" }}>View Details</Text>
                    </View>
                  </Callout>
                </Marker>
              )
          )}
        </MapView>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Add")}
        >
          <Text style={styles.buttonText}>Add Listing ➕</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  searchBar: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  scrollContent: { padding: 16 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    marginTop: 5,
  },
  singleListingCard: {
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
  seeAllButton: {
    alignSelf: "flex-end",
    marginRight: 16,
    marginBottom: 10,
  },
  seeAllText: {
    fontSize: 16,
    color: "#42a5f5",
    fontWeight: "bold",
  },
  map: {
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: "#42a5f5",
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
  noListingsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginVertical: 10,
  },
});

export default HomeScreen;
