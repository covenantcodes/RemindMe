import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import { OnboardingData } from "../data/data";
import LottieView from "lottie-react-native";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  item: OnboardingData;
  index: number;
  x: SharedValue<number>;
};

const RenderItem = ({ item, index, x }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      Math.abs(x.value),
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      Math.abs(x.value),
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }, { translateY }],
    };
  });
  return (
    <Animated.View
      style={[
        styles.itemContainer,
        animatedStyle,
      ]}
    >
      <View
        style={[
          styles.animationContainer,
          { backgroundColor: item.animationBg },
        ]}
      >
        <LottieView
          source={item.animation}
          autoPlay
          loop
          renderMode="HARDWARE"
          style={styles.animation}
        />
      </View>
      <Text style={[styles.itemText, { color: item.textColor }]}>
        {item.text}
      </Text>
    </Animated.View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 150,
  },

  itemText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: 'PoppinsBold',
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 20,
  },

  animationContainer: {
    borderRadius: 40,
    overflow: "hidden",
  },

  animation: {
    width: 200,
    height: 200,
  },
});
