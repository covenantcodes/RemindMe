import { StyleSheet, Text, View } from "react-native";
import Onboard from "./Onboard";
import Home from "./src/components/Home";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';


type Props = {};

const Stack = createNativeStackNavigator()

const App = (props: Props) => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboard">
            <Stack.Screen name="Onboard" component={Onboard} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
