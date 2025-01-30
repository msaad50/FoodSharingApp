import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const AddListScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiry, setExpiry] = useState("");
  const [image, setImage] = useState(null);

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

  const handleSubmit = () => {
    if (!title || !expiry) {
      Alert.alert("Error", "Please fill in required fields");
      return;
    }
    // TODO: Connect to Firebase
    console.log({ title, description, expiry, image });
    Alert.alert("Success", "Listing submitted for review!");
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
