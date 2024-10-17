import { View, Text, StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import { OnboardingData } from "../data/data";

type Props = {
  data: OnboardingData[];
  screenWidth: number;
  x: SharedValue<number>;
};

const Background = ({ data, screenWidth, x }: Props) => {
  const animatedBackgroundColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      Math.abs(x.value),
      [0, screenWidth / 2 - 0.0001, screenWidth * 2, (screenWidth * 3) / 2 - 0.0001, (screenWidth * 3) / 2],
      [
        data[0].backgroundColor,
        data[0].backgroundColor,
        data[1].backgroundColor,
        data[1].backgroundColor,
        data[2].backgroundColor
      ],
    );
    return {
        backgroundColor
    }
  });

  return <Animated.View style={[styles.bg, animatedBackgroundColor]} />;
};

const styles = StyleSheet.create({
  bg: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -9999999,
  },
});

export default Background;
