import { StyleSheet, View } from "react-native";
import { OnboardingData } from "../data/data";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  data: OnboardingData[];
  screenWidth: number;
  x: SharedValue<number>;
};

const RADIUS = 100;

const Circle = ({ data, screenWidth, x }: Props) => {
  const animatedBackgroundColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      Math.abs(x.value),
      [
        0,
        screenWidth / 2 - 0.0001,
        screenWidth / 2,
        screenWidth - 10,
        screenWidth,
        (screenWidth * 3) / 2 - 0.001,
        screenWidth * 3 / 2,
        screenWidth * 2,
      ],
      [
        data[1].backgroundColor,
        data[1].backgroundColor,
        data[0].backgroundColor,
        data[0].backgroundColor,
        data[2].backgroundColor,
        data[2].backgroundColor,
        data[1].backgroundColor,
        data[1].backgroundColor,
        data[0].backgroundColor,
      ]
    );
    return {
      backgroundColor,
    };
  });

  const animatedTransformCircle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      Math.abs(x.value % screenWidth),
      [0, screenWidth],
      [0, -180],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      Math.abs(x.value % screenWidth),
      [0, screenWidth / 2, screenWidth],
      [1, 8, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { perspective: 300 },
        { rotateY: `${rotateY}deg` },
        { scale },
      ],
    };
  });
  return <Animated.View style={[styles.circle, animatedTransformCircle]} />;
};

export default Circle;

const styles = StyleSheet.create({
  circle: {
    zIndex: 0,
    position: "absolute",
    width: RADIUS,
    height: RADIUS,
    bottom: 100,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RADIUS,
    backgroundColor: "white",
  },
});
