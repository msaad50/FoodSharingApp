import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GOOGLE_API_KEY = "AIzaSyCYqNe56qzLAp9T4zKAgKuEkHHigcNYc3o";

const AddListAddressScreen = ({ route, navigation }) => {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const formData = route.params;

  const handleSubmit = async () => {
    if (!address || !latitude || !longitude) {
      Alert.alert("Validation Error", "Please select an address.");
      return;
    }

    try {
      await addDoc(collection(db, "listings"), {
        ...formData,
        address,
        latitude,
        longitude,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Listing submitted!");
      navigation.navigate("Main");
    } catch (error) {
      console.error("Error saving listing:", error);
      Alert.alert("Error", "Failed to submit the listing.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Text style={styles.step}>Step 2 of 2</Text>
        <Text style={styles.label}>Collection Address *</Text>
        <GooglePlacesAutocomplete
          placeholder="Enter collection address"
          fetchDetails={true}
          onPress={(data, details = null) => {
            setAddress(data.description);
            if (details?.geometry?.location) {
              setLatitude(details.geometry.location.lat);
              setLongitude(details.geometry.location.lng);
            }
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
          styles={{
            textInput: styles.input,
            container: { flex: 0, marginBottom: 16 },
          }}
        />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>⬅️ Back</Text>
        </TouchableOpacity>

        <Button title="Submit Listing" onPress={handleSubmit} color="#42a5f5" />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  inner: { flex: 1 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  label: { fontWeight: "bold", marginBottom: 5, color: "#333" },
  step: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "#42a5f5",
  },
  backButton: { marginBottom: 20 },
  backButtonText: { color: "#42a5f5", fontWeight: "bold", fontSize: 16 },
});

export default AddListAddressScreen;
