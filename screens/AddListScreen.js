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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { AirbnbRating } from "react-native-ratings";

const AddListScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiry, setExpiry] = useState("");
  const [image, setImage] = useState(null);
  const [rating, setRating] = useState(3);

  // Request Permission on Component Mount
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

  // Submit Listing to Firestore
  const handleSubmit = async () => {
    if (!firstName || !lastName || !title || !expiry) {
      Alert.alert("Error", "Please fill in required fields.");
      return;
    }

    try {
      await addDoc(collection(db, "listings"), {
        firstName,
        lastName,
        title,
        description,
        expiry,
        image,
        rating,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Listing submitted!");

      // Reset Form Fields After Submission
      setFirstName("");
      setLastName("");
      setTitle("");
      setDescription("");
      setExpiry("");
      setImage(null);
      setRating(3); // Reset rating to default

      navigation.navigate("Home"); // Navigate back to Home Screen
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
          placeholder="Food Title *"
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

        <Text style={styles.ratingLabel}>Rate the food quality:</Text>
        <AirbnbRating
          count={5}
          reviews={["Very Bad", "Bad", "Okay", "Good", "Excellent"]}
          defaultRating={rating}
          size={30}
          onFinishRating={setRating}
        />

        <Button title="Upload Photo" onPress={pickImage} />

        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

        <Button title="Submit Listing" onPress={handleSubmit} color="#42a5f5" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
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
