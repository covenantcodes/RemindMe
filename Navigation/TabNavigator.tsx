// src/navigators/TabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Home from "../src/screens/Home";
import Settings from "../src/screens/Settings";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        detachInactiveScreens: true,
        tabBarStyle: {
          backgroundColor: "#44196c",
          borderTopWidth: 0,
          position: "absolute",
          height: 80,
        },
        tabBarLabelStyle: {
          color: "#fff",
          fontFamily: "PoppinsMedium",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../assets/icon/home_active.png")
                  : require("../assets/icon/home_inactive.png")
              }
              style={{ width: 34, height: 34 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../assets/icon/settings_active.png")
                  : require("../assets/icon/settings_inactive.png")
              }
              style={{ width: 34, height: 34 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
