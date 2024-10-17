import { useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import RenderItem from "./src/components/RenderItem";
import data from "./src/data/data";
import Button from "./src/components/Button";
import {
  clamp,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";
import Background from "./src/components/Background";
import Circle from "./src/components/Circle";

import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

type Props = {};

const Onboard = () => {
  const navigation = useNavigation();

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const x = useSharedValue(0);
  const context = useSharedValue(0);

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

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      context.value = Math.abs(x.value);
    })
    .onUpdate((e) => {
      const clampValue = clamp(
        context.value - e.translationX,
        9,
        2 * SCREEN_WIDTH
      );
      x.value = -clampValue;
    })
    .onEnd((e) => {
      const isSwipeLeft = e.translationX < 0;
      const isSwipeRight = e.translationX > 0;
      const isBeyondLeftLimit =
        context.value < 2 * SCREEN_WIDTH && currentIndex <= 1;
      const isBeyondRightLimit = context.value > 0;

      let targetIndex;

      if (isSwipeLeft && isBeyondLeftLimit) {
        targetIndex =
          e.translationX < -SCREEN_WIDTH / 2 || e.velocityX < -500
            ? currentIndex + 1
            : currentIndex;
      } else if (isSwipeRight && !isBeyondRightLimit) {
        targetIndex =
          e.translationX > SCREEN_WIDTH / 2 || e.velocityX > 500
            ? currentIndex
            : currentIndex + 1;
      }

      if (targetIndex !== undefined) {
        x.value = withTiming(-SCREEN_WIDTH * targetIndex, { duration: 500 });

        if (targetIndex === 2) {
        }
      }
    });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Circle data={data} screenWidth={SCREEN_WIDTH} x={x} />
        <Background data={data} screenWidth={SCREEN_WIDTH} x={x} />
        <GestureDetector gesture={panGesture}>
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
              return <RenderItem item={item} index={index} key={index} x={x} />;
            })}
          </Animated.View>
        </GestureDetector>
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
    zIndex: 9999999,
  },
});

export default Onboard;
