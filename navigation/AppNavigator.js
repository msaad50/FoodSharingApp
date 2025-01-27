import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ListingScreen from "../screens/ListingScreen"; // Import the ListingScreen

// Create the stack navigator instance
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#f8f8f8" },
          headerTintColor: "#333",
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
        }}
      >
        {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home Page" }}
        />
        {/* Listing Screen */}
        <Stack.Screen
          name="Listings"
          component={ListingScreen}
          options={{ title: "Food Listings" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
