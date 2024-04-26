import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
  reminderTitle: string,
  reminderDescription: string,
  reminderDate: string,
  reminderTime: string,
};

const settingIconColor: string = "#44196c";
const pickerIconColor: string = "#fff";

const ReminderCard = ({reminderTitle, reminderDescription, reminderDate, reminderTime}:Props) => {
    return (

          <View style={styles.remindersBoxContainer}>
            <View style={styles.remindersBox}>
              <TouchableOpacity style={styles.remindersCloseIcon}>
                <FontAwesomeIcon
                  icon={faTrash as IconProp}
                  color={pickerIconColor}
                  size={20}
                />
              </TouchableOpacity>
              <Text style={styles.remindersTitle}>{reminderTitle}</Text>
              <Text style={styles.remindersDescription}>
                {reminderDescription}
              </Text>

              <Text style={styles.remindersDescription}>Rings at: {reminderDate} {reminderTime}</Text>
            </View>
          </View>
    );
};

const styles = StyleSheet.create({

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