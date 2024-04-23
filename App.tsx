import { StyleSheet, View, useWindowDimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RenderItem from "./src/components/RenderItem";
import data from "./src/data/data";
import Button from "./src/components/Button";

type Props = {};

const App = () => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={[
            styles.listContainer,
            {
              width: data.length * SCREEN_WIDTH,
              transform: [{ translateX: 0}],
            },
          ]}
        >
          {data.map((item, index) => {
            return <RenderItem item={item} index={index} key={index} />;
          })}
        </View>
      </View>

      <Button data={data} screenWidth={SCREEN_WIDTH}/>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listContainer: {
    flex: 1,
    flexDirection: "row",
  },
});

export default App;
