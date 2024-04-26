t
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

types Props = {

}

const ReminderCard = (props:Props) => {
    return (
       
        <View style={styles.remindersMainContainer}>
          <Text style={styles.remindersMainContainerText}>My Reminders</Text>
          <ScrollView style={styles.remindersBoxContainer}>
            <View style={styles.remindersBox}>
              <TouchableOpacity style={styles.remindersCloseIcon}>
                <FontAwesomeIcon
                  icon={faTrash as IconProp}
                  color={pickerIconColor}
                  size={20}
                />
              </TouchableOpacity>
              <Text style={styles.remindersTitle}>Reminder 1</Text>
              <Text style={styles.remindersDescription}>
                This a 32 charcgter descrrotion
              </Text>

              <Text style={styles.remindersDescription}>Rings at: {date} {selectedTime}</Text>
            </View>
          </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    remindersMainContainer: {},

  remindersMainContainerText: {
    padding: 12,
    color: "#fff",
    fontSize: 22,
    fontFamily: "PoppinsSemiBold",
  },

  remindersBoxContainer: {
    paddingHorizontal: 20,
  },

  remindersBox: {
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 15,
  },

  remindersCloseIcon: {
    flexDirection: "row",
    justifyContent: "flex-end"
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