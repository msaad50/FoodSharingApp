import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import AddListScreen from "../screens/AddListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { TabIcon } from "../components/Icons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "home";
          else if (route.name === "Favourites") iconName = "favorite";
          else if (route.name === "Add") iconName = "add-circle-outline";
          else if (route.name === "Profile") iconName = "person";

          return <TabIcon name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} />
      <Tab.Screen name="Add" component={AddListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
