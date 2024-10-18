import { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimePickerComponent = ({ reminderTime, setReminderTime }) => {
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirm = (time) => {
    setReminderTime(time.toLocaleTimeString());
    hideTimePicker();
  };

  return (
    <>
      <TouchableOpacity style={styles.dateContainer} onPress={showTimePicker}>
        <Text style={styles.dateText}>
          {" "}
          {reminderTime ? reminderTime : "Select Time"}
        </Text>
        <FontAwesomeIcon icon={faClock} color="#fff" size={20} />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />
    </>
  );
};

const styles = {
  dateContainer: {
    borderRadius: 15,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dateText: {
    marginRight: 5,
    color: "#fff",
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
};

export default TimePickerComponent;
