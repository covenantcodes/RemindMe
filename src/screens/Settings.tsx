// src/components/Settings.js
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import GlobalStyles from "../components/GlobalStyles";

const Settings = () => {
  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <LinearGradient colors={["#0d132a", "#44196c"]} style={styles.container}>
        <Text style={styles.headerText}>Settings</Text>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Privacy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>About</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 32,
    fontFamily: "PoppinsBold",
    marginBottom: 20,
  },
  option: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  optionText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "PoppinsMedium",
  },
});

export default Settings;
