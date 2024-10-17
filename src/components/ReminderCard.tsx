import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
  reminderTitle: string;
  reminderDescription: string;
  reminderDate: string;
  reminderTime: string;
  onDeletePress: () => void;
  onEditPress: () => void;
};

const pickerIconColor: string = "#fff";

const ReminderCard = ({
  reminderTitle,
  reminderDescription,
  reminderDate,
  reminderTime,
  onDeletePress,
  onEditPress,
}: Props) => {
  return (
    <View style={styles.remindersBoxContainer}>
      <View style={styles.remindersBox}>
        <View style={styles.reminderIconContainer}>
          <TouchableOpacity style={styles.remindersCloseIcon} onPress={onEditPress}>
            <FontAwesomeIcon
              icon={faPen as IconProp}
              color={pickerIconColor}
              size={20}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.remindersCloseIcon} onPress={onDeletePress}>
            <FontAwesomeIcon
              icon={faTrash as IconProp}
              color={pickerIconColor}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.remindersTitle}>{reminderTitle}</Text>
        <Text style={styles.remindersDescription}>{reminderDescription}</Text>
        <Text style={styles.remindersDescription}>
          Rings at: {reminderDate} {reminderTime}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  remindersBoxContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  remindersBox: {
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 15,
  },
  reminderIconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  remindersCloseIcon: {
    marginLeft: 15,
  },
  remindersTitle: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "PoppinsSemiBold",
  },
  remindersDescription: {
    fontSize: 13,
    color: "#fff",
    fontFamily: "PoppinsMedium",
  },
});

export default ReminderCard;
