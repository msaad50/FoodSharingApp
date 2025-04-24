import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import AddListScreen from "../screens/AddListScreen";
import MoreScreen from "../screens/MoreScreen";
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
          else if (route.name === "More") iconName = "more-horiz";

          return <TabIcon name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerBackTitleVisible: false }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{ headerBackTitleVisible: false, gestureEnabled: false }}
      />
      <Tab.Screen
        name="Add"
        component={AddListScreen}
        options={{ headerBackTitleVisible: false, title: "Add Details" }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{ headerBackTitleVisible: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
