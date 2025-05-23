import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";

const ItemViewScreen = ({ route, navigation }) => {
  const { item, from } = route.params;

  /*React.useLayoutEffect(() => {
    navigation.setOptions({
      // Use the default back button (no custom headerLeft)
      headerBackTitleVisible: false,
    });
  }, [navigation]); */

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        {/* Display Image */}
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.listingImage} />
        )}

        {/* Title */}
        <Text style={styles.title}>{item.title}</Text>

        {/* Food Donor Info */}
        <Text style={styles.subTitle}>
          Donated By:{" "}
          <Text style={styles.boldText}>
            {item.firstName} {item.lastName}
          </Text>
        </Text>

        {/* Expiry Date */}
        <Text style={styles.expiryText}>Expires: {item.expiry}</Text>

        {/* Address */}
        {item.address && (
          <View>
            <Text style={styles.sectionTitle}>Collection Address</Text>
            <Text style={styles.infoText}>{item.address}</Text>
          </View>
        )}

        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {item.description || "No description available"}
        </Text>

        {/* Condition Rating */}
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

        {/* Modify Button */}
        <TouchableOpacity
          style={styles.modifyButton}
          onPress={() => navigation.navigate("Edit Item", { item, from })}
        >
          <Text style={styles.modifyButtonText}>Modify Listing</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.routeButton}
          onPress={() => navigation.navigate("Route Map", { item })}
        >
          <Text style={styles.routeButtonText}>View Route to Collection</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
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
  infoText: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 8,
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
  modifyButton: {
    marginTop: 20,
    backgroundColor: "#42a5f5",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  modifyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  routeButton: {
    marginTop: 10,
    backgroundColor: "#4caf50",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  routeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ItemViewScreen;
