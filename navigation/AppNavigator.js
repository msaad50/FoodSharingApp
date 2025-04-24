import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import { useAuth } from "../contexts/AuthContext";
import ItemViewScreen from "../view/ItemViewScreen";
import ViewSeeAllScreen from "../view/ViewSeeAllScreen";
import AboutUsScreen from "../screens/AboutUsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddListAddressScreen from "../screens/AddListAddressScreen";
import ItemViewEditScreen from "../view/ItemViewEditScreen";
import AddressViewEditScreen from "../view/AddressViewEditScreen";
import RouteMapScreen from "../screens/RouteMapScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, loading } = useAuth();
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAppLoading(false);
    }, 2000); // Simulate loading time of 2 seconds
  }, []);

  if (appLoading || loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>ecoBites</Text>
        <ActivityIndicator size="large" color="#42a5f5" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: "",
        headerBackTitleVisible: false,
      }}
    >
      {user ? (
        <Stack.Screen
          name="Tabs"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
      <Stack.Screen
        name="ItemView"
        component={ItemViewScreen}
        options={({ route }) => ({
          title: route.params?.item?.title || "Item",
        })}
      />
      <Stack.Screen name="See All" component={ViewSeeAllScreen} />
      <Stack.Screen name="About Us" component={AboutUsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Add Address" component={AddListAddressScreen} />
      <Stack.Screen
        name="Edit Item"
        component={ItemViewEditScreen}
        options={{
          headerTitle: "Edit Listing",
          headerBackTitle: "",
          headerBackTitleVisible: false,
        }}
      />

      <Stack.Screen
        name="Edit Address"
        component={AddressViewEditScreen}
        options={{
          headerTitle: "Edit Address",
          headerBackTitle: "",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Route Map"
        component={RouteMapScreen}
        options={{ title: "Route to Collection Point" }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    fontSize: 36,
    //  fontWeight: "bold",
    color: "#42a5f5",
    letterSpacing: 3,
    marginBottom: 20,
    fontFamily: "Courier",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});

export default AppNavigator;
