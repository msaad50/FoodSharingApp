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
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GOOGLE_API_KEY = "AIzaSyCYqNe56qzLAp9T4zKAgKuEkHHigcNYc3o";

const AddressViewEditScreen = ({ route, navigation }) => {
  const item = route.params?.item;
  const updatedDetails = route.params?.updatedDetails;
  const from = route.params?.from;

  const [address, setAddress] = useState(item.address || "");
  const [latitude, setLatitude] = useState(item.latitude || null);
  const [longitude, setLongitude] = useState(item.longitude || null);

  const handleSubmit = async () => {
    if (!address || !latitude || !longitude) {
      Alert.alert("Validation Error", "Please select an address.");
      return;
    }

    try {
      const ref = doc(db, "listings", item.id);
      await updateDoc(ref, {
        ...updatedDetails,
        address,
        latitude,
        longitude,
      });

      Alert.alert("Success", "Listing updated!");

      navigation.reset({
        index: 1,
        routes: [
          { name: "Tabs" },
          {
            name: "ItemView",
            params: {
              item: {
                ...item,
                ...updatedDetails,
                address,
                latitude,
                longitude,
              },
              from,
            },
          },
        ],
      });
    } catch (error) {
      console.error("Error updating address:", error);
      Alert.alert("Error", "Failed to update address.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Text style={styles.step}>Step 2 of 2</Text>
        <Text style={styles.label}>Update Collection Address *</Text>
        <GooglePlacesAutocomplete
          placeholder="Search new address"
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
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <Button title="Save Changes" onPress={handleSubmit} color="#42a5f5" />
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
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 20,
  },
  cancelText: {
    color: "#42a5f5",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddressViewEditScreen;
