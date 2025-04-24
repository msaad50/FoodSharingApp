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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { AirbnbRating } from "react-native-ratings";

const ItemViewEditScreen = ({ route, navigation }) => {
  const item = route.params?.item;
  const from = route.params?.from;

  const [firstName, setFirstName] = useState(item.firstName);
  const [lastName, setLastName] = useState(item.lastName);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [expiry, setExpiry] = useState(item.expiry);
  const [image, setImage] = useState(item.image || null);
  const [rating, setRating] = useState(item.rating || 3);

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

      if (!result.canceled && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Image Picker Error:", error);
    }
  };

  const handleSave = async () => {
    if (!firstName || !lastName || !title || !expiry) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    try {
      const ref = doc(db, "listings", item.id);
      await updateDoc(ref, {
        firstName,
        lastName,
        title,
        description,
        expiry,
        image,
        rating,
      });

      Alert.alert("Success", "Listing updated!");

      navigation.navigate("Edit Address", {
        item,
        updatedDetails: {
          firstName,
          lastName,
          title,
          description,
          expiry,
          image,
          rating,
        },
        from, // this ensures the from is passed all the way to ItemView
      });
    } catch (error) {
      console.error("Error updating document: ", error);
      Alert.alert("Error", "Failed to update the listing.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          <Button title="Change Photo" onPress={pickImage} />

          {image && (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          )}

          <Text style={styles.ratingLabel}>Update Food Quality:</Text>
          <AirbnbRating
            count={5}
            defaultRating={rating}
            size={30}
            onFinishRating={setRating}
          />

          <View style={styles.buttonRow}>
            <Button
              title="Next ➡️"
              onPress={() =>
                navigation.navigate("Edit Address", {
                  item,
                  updatedDetails: {
                    firstName,
                    lastName,
                    title,
                    description,
                    expiry,
                    image,
                    rating,
                  },
                  from,
                })
              }
              color="#42a5f5"
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
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
  step: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "#42a5f5",
  },
  buttonRow: { marginTop: 20 },
});

export default ItemViewEditScreen;
