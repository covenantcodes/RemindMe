import { Pressable, StyleSheet } from "react-native";
import { OnboardingData } from "../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import Animated, {
  Extrapolation,
  SharedValue,
  clamp,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = {
  data: OnboardingData[];
  screenWidth: number;
  x: SharedValue<number>;
  currentIndex: number;
};
import { useNavigation } from "@react-navigation/native";

const RADIUS = 100;
const iconColor: string = "#003cc9";

const Button = ({ data, screenWidth, x, currentIndex }: Props) => {
  const navigation = useNavigation();

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const animatedOpacityButton = useAnimatedStyle(() => {
    const opacity = interpolate(
      Math.abs(x.value % screenWidth),
      [0, 40],
      [1, 0],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  });

  return (
    <AnimatedPressable
      style={[styles.button, animatedOpacityButton]}
      // onPress={() => {
      //   if (Math.abs(x.value) % screenWidth === 0) {
      //     const clampValue = clamp(
      //       Math.abs(x.value) + screenWidth,
      //       0,
      //       2 * screenWidth
      //     );
      //     x.value = withTiming(-clampValue, { duration: 1000 });
      //   }
      // }}
      onPress={() => {
        if (Math.abs(x.value) % screenWidth === 0) {
          if (currentIndex === data.length - 1) {
            // Navigate to the new screen using navigation library
            navigation.navigate("Tabs");
          } else {
            const clampValue = clamp(
              Math.abs(x.value) + screenWidth,
              0,
              2 * screenWidth
            );
            x.value = withTiming(-clampValue, { duration: 1000 });
          }
        }
      }}
    >
      <FontAwesomeIcon icon={faChevronRight as IconProp} color={iconColor} />
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    zIndex: 9999999,
    position: "absolute",
    width: RADIUS,
    height: RADIUS,
    bottom: 100,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RADIUS,
  },
});

export default Button;
