/* import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const AddListScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiry, setExpiry] = useState("");
  const [image, setImage] = useState(null);

  // Pick Image from Gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Submit Food Listing to Firestore
  const handleSubmit = async () => {
    if (!title || !expiry) {
      Alert.alert("Error", "Please fill in required fields");
      return;
    }

    try {
      await addDoc(collection(db, "listings"), {
        title,
        description,
        expiry,
        image: image || null, // Store image URI if available
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Listing submitted!");
      navigation.navigate("Home"); // Go back to HomeScreen after submission
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Error", "Could not submit listing.");
    }
  };

  return (
    <View style={styles.container}>
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

      <Button title="Upload Photo" onPress={pickImage} />
      {image && <Text style={styles.imageText}>1 image selected</Text>}

      <Button title="Submit Listing" onPress={handleSubmit} color="#42a5f5" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
  },
  imageText: {
    color: "green",
    marginVertical: 8,
  },
});

export default AddListScreen;
*/

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const AddListScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiry, setExpiry] = useState("");
  const [image, setImage] = useState(null);

  // Pick Image from Gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Submit Food Listing to Firestore
  const handleSubmit = async () => {
    if (!title || !expiry) {
      Alert.alert("Error", "Please fill in required fields");
      return;
    }

    try {
      await addDoc(collection(db, "listings"), {
        title,
        description,
        expiry,
        image,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Listing submitted!");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Error", "Could not submit listing.");
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Upload Photo" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      <Button title="Submit Listing" onPress={handleSubmit} color="#42a5f5" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  },
});

export default AddListScreen;
