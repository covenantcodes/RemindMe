import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DatePicker from "react-native-modal-datetime-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import moment from "moment";

type DatePickerProps = {
  selectedDate: string;
  onDateChange: (date: string) => void;
};

const DatePickerComponent: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const formattedDate = moment(date).format("MMM DD, YYYY");
    onDateChange(formattedDate);
    hideDatePicker();
  };

  return (
    <View>
      <TouchableOpacity style={styles.dateContainer} onPress={showDatePicker}>
        <Text style={styles.dateText}>
          {selectedDate ? selectedDate : "Select Date"}
        </Text>
        <FontAwesomeIcon icon={faCalendar as IconProp} color="#fff" size={20} />
      </TouchableOpacity>
      <DatePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    borderRadius: 15,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dateText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "PoppinsMedium",
    marginRight: 4,
  },
});

export default DatePickerComponent;
