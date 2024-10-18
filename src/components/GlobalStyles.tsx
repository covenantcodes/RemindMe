import { StyleSheet, Platform } from "react-native";

type Props = {};

export default StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    color: "#fff",
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
});
