// src/navigators/AppNavigator.js
import { View, Text, StyleSheet } from "react-native";
import Onboard from "../Onboard";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ReminderProvider } from "../src/context/ReminderContext";
import TabNavigator from "./TabNavigator"; // Import the TabNavigator

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <ReminderProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboard">
          <Stack.Screen
            name="Onboard"
            component={Onboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tabs" // Change this to a more relevant name
            component={TabNavigator} // Use the TabNavigator
            options={{ headerShown: false }} // Optional, set to true if you want a header
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ReminderProvider>
  );
};

export default AppNavigator;
