import { StyleSheet, Text, View } from "react-native";
import Onboard from "./Onboard";
import Home from "./src/screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import AppNavigator from "./navigation/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Props = {};

const Stack = createNativeStackNavigator();

const App = (props: Props) => {
  // FONTS
  const [fontsLoaded] = useFonts({
    // POPPINS
    PoppinsThin: require("./assets/fonts/Poppins/Poppins-Thin.ttf"),
    PoppinsThinItaltic: require("./assets/fonts/Poppins/Poppins-ThinItalic.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins/Poppins-Light.ttf"),
    PoppinsExtraLight: require("./assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    PoppinsExtraBold: require("./assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    PoppinsExtraBoldItalic: require("./assets/fonts/Poppins/Poppins-ExtraBoldItalic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
