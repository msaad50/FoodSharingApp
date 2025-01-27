import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ListingScreen from "../screens/ListingScreen";
import AddListScreen from "../screens/AddListScreen";
import { TabIcon } from "../components/Icons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
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
            }

            return <TabIcon name={iconName} color={color} size={size} />;
          },
          tabBarActiveTintColor: "#42a5f5",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add" component={AddListScreen} />
        <Tab.Screen name="Listings" component={ListingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;
