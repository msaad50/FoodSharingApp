import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyCYqNe56qzLAp9T4zKAgKuEkHHigcNYc3o";
const { width, height } = Dimensions.get("window");

const RouteMapScreen = ({ route }) => {
  const { item } = route.params;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directions, setDirections] = useState([]);
  const [eta, setEta] = useState(null);
  const [mode, setMode] = useState("driving");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    if (currentLocation && item.latitude && item.longitude) {
      fetchDirections();
    }
  }, [currentLocation, mode]);

  const fetchDirections = async () => {
    const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
    const destination = `${item.latitude},${item.longitude}`;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&key=${GOOGLE_API_KEY}`;

    try {
      const response = await axios.get(url);
      const points = decodePolyline(
        response.data.routes[0].overview_polyline.points
      );
      setDirections(points);
      const duration = response.data.routes[0].legs[0].duration.text;
      setEta(duration);
    } catch (error) {
      console.error("Error fetching directions", error);
    }
  };

  const decodePolyline = (t) => {
    let points = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < t.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return points;
  };

  if (!currentLocation) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#42a5f5" />
        <Text>Loading your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={currentLocation} title="You" pinColor="blue" />
        <Marker
          coordinate={{
            latitude: item.latitude,
            longitude: item.longitude,
          }}
          title="Collection Address"
        />
        <Polyline
          coordinates={directions}
          strokeWidth={4}
          strokeColor="#42a5f5"
        />
      </MapView>

      <View style={styles.infoBox}>
        <Text style={styles.etaText}>ETA: {eta || "..."}</Text>
        <TouchableOpacity
          style={styles.modeButton}
          onPress={() =>
            setMode((prev) => (prev === "driving" ? "walking" : "driving"))
          }
        >
          <Text style={styles.modeText}>
            Switch to {mode === "driving" ? "Walking" : "Driving"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width, height },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoBox: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  etaText: { fontSize: 18, fontWeight: "bold" },
  modeButton: {
    marginTop: 10,
    backgroundColor: "#42a5f5",
    padding: 10,
    borderRadius: 6,
  },
  modeText: { color: "white", fontWeight: "bold" },
});

export default RouteMapScreen;
