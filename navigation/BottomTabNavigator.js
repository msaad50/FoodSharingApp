import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ListingScreen from "../screens/ListingScreen";
import AddListScreen from "../screens/AddListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { View } from "react-native";
import { TabIcon } from "../components/Icons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Listings") {
            iconName = "list";
          } else if (route.name === "Add") {
            iconName = "add-circle-outline";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <TabIcon name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: "#42a5f5",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      {/* ✅ Ensure each screen is correctly inside <Tab.Screen> */}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Add" component={AddListScreen} />
      <Tab.Screen name="Listings" component={ListingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
