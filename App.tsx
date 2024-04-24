import { StyleSheet, Text, View } from "react-native";
import Onboard from "./Onboard";
import { NavigationContainer } from "@react-navigation/native";
import {CreateStackNavigator} from '@react-navigation/stack'

type Props = {};

const App = (props: Props) => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Onboard />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
