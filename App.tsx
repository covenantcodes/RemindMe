import { useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RenderItem from "./src/components/RenderItem";
import data from "./src/data/data";
import Button from "./src/components/Button";
import {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";

type Props = {};

const App = () => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const x = useSharedValue(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  const translateXStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    };
  });

  useAnimatedReaction(
    () => {
      return Math.floor(Math.abs(x.value) / SCREEN_WIDTH);
    },
    (currentValue, previousValue) => {
      if (currentValue !== previousValue) {
        runOnJS(setCurrentIndex)(currentValue);
      }
    }
  );
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Background />
        <Animated.View
          style={[
            styles.listContainer,
            {
              width: data.length * SCREEN_WIDTH,
            },
            translateXStyle,
          ]}
        >
          {data.map((item, index) => {
            return <RenderItem item={item} index={index} key={index} x={x}/>;
          })}
        </Animated.View>
      </View>

      <Button
        data={data}
        screenWidth={SCREEN_WIDTH}
        x={x}
        currentIndex={currentIndex}
      />
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
