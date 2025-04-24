/* import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { AirbnbRating } from "react-native-ratings";

const GOOGLE_API_KEY = "AIzaSyCYqNe56qzLAp9T4zKAgKuEkHHigcNYc3o"; // GOOGLE_API_KEY = "AIzaSyAu7fsmTRtW4qOTEXP3wBBa658hnFm_49A";

const AddListScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiry, setExpiry] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [image, setImage] = useState(null);
  const [rating, setRating] = useState(3);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Enable permissions to upload images."
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error opening image picker:", error);
    }
  };

  // **Fetch Coordinates from Google Geocoding API**
  const getCoordinatesFromAddress = async (enteredAddress) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          enteredAddress
        )}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        setLatitude(location.lat);
        setLongitude(location.lng);
        console.log("Fetched Lat/Lng:", location.lat, location.lng);
        return { lat: location.lat, lng: location.lng };
      } else {
        Alert.alert("Error", "Could not find coordinates for the address.");
        return null;
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting with:", {
      firstName,
      lastName,
      title,
      expiry,
      address,
      latitude,
      longitude,
      rating,
    });

    if (!firstName || !lastName || !title || !expiry || !address) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const location = await getCoordinatesFromAddress(address);
    if (!location) return;

    try {
      await addDoc(collection(db, "listings"), {
        firstName,
        lastName,
        title,
        description,
        expiry,
        address,
        latitude: location.lat,
        longitude: location.lng,
        image,
        rating,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Listing submitted!");

      setFirstName("");
      setLastName("");
      setTitle("");
      setDescription("");
      setExpiry("");
      setAddress("");
      setLatitude(null);
      setLongitude(null);
      setImage(null);
      setRating(3);

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Error", "Could not submit listing.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TextInput
            placeholder="First Name *"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
          <TextInput
            placeholder="Last Name *"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />
          <TextInput
            placeholder="Item Title *"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            style={[styles.input, { height: 100 }]}
          />
          <TextInput
            placeholder="Expiry Date (YYYY-MM-DD) *"
            value={expiry}
            onChangeText={setExpiry}
            style={styles.input}
          />

          <TextInput
            placeholder="Collection Address *"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />

          <Button title="Upload Photo" onPress={pickImage} />

          {image && (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          )}

          <Text style={styles.ratingLabel}>Rate the food quality:</Text>
          <AirbnbRating
            count={5}
            reviews={["Very Bad", "Bad", "Okay", "Good", "Excellent"]}
            defaultRating={rating}
            size={30}
            onFinishRating={setRating}
          />

          <Button
            title="Submit Listing"
            onPress={handleSubmit}
            color="#42a5f5"
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginVertical: 10,
    borderRadius: 10,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    textAlign: "center",
  },
});

export default AddListScreen;
*/

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AirbnbRating } from "react-native-ratings";

const AddListScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiry, setExpiry] = useState("");
  const [image, setImage] = useState(null);
  const [rating, setRating] = useState(3);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setTitle("");
    setDescription("");
    setExpiry("");
    setImage(null);
    setRating(3);
  };

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Enable permissions to upload images."
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Image Picker Error:", error);
    }
  };

  const handleNext = () => {
    if (!firstName || !lastName || !title || !expiry) {
      Alert.alert("Validation Error", "Please fill all required fields.");
      return;
    }

    const formData = {
      firstName,
      lastName,
      title,
      description,
      expiry,
      image,
      rating,
    };

    navigation.navigate("Add Address", { ...formData, resetForm });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.step}>Step 1 of 2</Text>

        <TextInput
          placeholder="First Name *"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name *"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
        <TextInput
          placeholder="Item Title *"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          style={[styles.input, { height: 100 }]}
        />
        <TextInput
          placeholder="Expiry Date (YYYY-MM-DD) *"
          value={expiry}
          onChangeText={setExpiry}
          style={styles.input}
        />

        <Button title="Upload Photo" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

        <Text style={styles.ratingLabel}>Rate the food quality:</Text>
        <AirbnbRating
          count={5}
          defaultRating={rating}
          size={30}
          onFinishRating={setRating}
        />

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next ➡️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: "#ccc" }]}
          onPress={() => {
            resetForm();
            navigation.goBack();
          }}
        >
          <Text style={styles.nextButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  scrollContainer: { paddingBottom: 50 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginVertical: 10,
    borderRadius: 10,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: "#42a5f5",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: { color: "white", fontWeight: "bold" },
  step: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "#42a5f5",
  },
});

export default AddListScreen;
