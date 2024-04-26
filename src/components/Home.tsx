import { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";
import GlobalStyles from "./GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import GlassmorphismTextInput from "./GlassmorphismTextInput";
import DatePicker from "react-native-neat-date-picker";
import TimePickerModal from "react-native-modal-datetime-picker";

type Props = {};

const reminderData = [
  {
    id: 1,
    title: "Reminder 1",
    description: "This is a 32 bit dseskldsklklsd",
    reminderDate: "2023-02-23",
    reminderTime: "23:09AM",
  }
]

const currentTime = new Date();
const hours = currentTime.getHours();
let greeting;

if (hours < 12) {
  greeting = "Good Morning";
} else if (hours < 18) {
  greeting = "Good Afternoon";
} else {
  greeting = "Good Evening";
}

const settingIconColor: string = "#44196c";
const pickerIconColor: string = "#fff";

const Home = (props: Props) => {
  const [reminderTitle, setReminderTitle] = useState("");
  const [reminderDescription, setReminderDescription] = useState("");
  const [showDatePickerSingle, setShowDatePickerSingle] = useState(false);

  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const dateColorOptions = {
    headerColor: "#0d132a",
    backgroundColor: "#44196c",
    dateTextColor: "#fff",
  };

  const openDatePickerSingle = () => setShowDatePickerSingle(true);

  const onCancelSingle = () => {
    setShowDatePickerSingle(false);
  };

  const onConfirmSingle = (output) => {
    setShowDatePickerSingle(false);
    console.log(output);
    setDate(output.dateString);
  };

  // FOR TIME PICKER
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    setSelectedTime(time.toLocaleTimeString());
    hideTimePicker();
  };

  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <LinearGradient
        colors={["#0d132a", "#44196c"]}
        style={styles.mainContainer}
      >
        <DatePicker
          isVisible={showDatePickerSingle}
          colorOptions={dateColorOptions}
          mode={"single"}
          onCancel={onCancelSingle}
          onConfirm={onConfirmSingle}
        />

        <TimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideTimePicker}
        />
        <View style={styles.topContainer}>
          <Text style={styles.topTabText}>
            {greeting} {"\n"}Superstar!
          </Text>

          <TouchableOpacity style={styles.topLeftButtonContainer}>
            <FontAwesomeIcon
              icon={faGear as IconProp}
              color={settingIconColor}
              size={24}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.formBody}>
          <GlassmorphismTextInput
            placeholder="Reminder Title"
            maxLength={12}
            value={reminderTitle}
            onChangeText={setReminderTitle}
          />
          <GlassmorphismTextInput
            placeholder="Reminder Description"
            maxLength={32}
            value={reminderDescription}
            onChangeText={setReminderDescription}
            multiline={true}
            numberOfLines={1}
          />

          <View style={styles.dateTimeContainer}>
            <TouchableOpacity
              style={styles.dateContainer}
              onPress={openDatePickerSingle}
            >
              <Text style={styles.dateText}>{date}</Text>

              <View>
                <FontAwesomeIcon
                  icon={faCalendar as IconProp}
                  color={pickerIconColor}
                  size={20}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateContainer}
              onPress={showTimePicker}
            >
              <Text style={styles.dateText}>{selectedTime}</Text>

              <View>
                <FontAwesomeIcon
                  icon={faClock as IconProp}
                  color={pickerIconColor}
                  size={20}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.buttonContainer}>
          <LinearGradient
            colors={["#256afe", "#8124e7"]}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Add Reminder</Text>
          </LinearGradient>
        </TouchableOpacity>

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
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  topContainer: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  topTabText: {
    color: "#fff",
    fontFamily: "PoppinsSemiBold",
    fontSize: 22,
  },

  mainContainer: {
    flex: 1,
  },

  topLeftButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: "white",
    borderRadius: 25,
    shadowColor: "rgba(255,255,255,0.3)",
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 1,
    shadowRadius: 4
  },

  formBody: {
    padding: 10,
  },

  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },

  dateContainer: {
    borderRadius: 15,
    padding: 15,
    width: "45%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dateText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },

  buttonContainer: {
    padding: 15,
    alignItems: "center",
  },

  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    width: "45%",
    paddingVertical: 15,
  },

  buttonText: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },

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
