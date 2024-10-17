import {View, Text, StyleSheet} from 'react-native'
import Onboard from "../Onboard";
import Home from "../src/components/Home";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

type AppNavigatorProps = {}

const Stack = createNativeStackNavigator()

const AppNavigator = (props: AppNavigatorProps) => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Onboard">
        <Stack.Screen name="Onboard" component={Onboard} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}


export default AppNavigator