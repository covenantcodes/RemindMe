import { useState, useEffect, useRef, useMemo } from "react";
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from "expo-linear-gradient";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGear, faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import GlassmorphismTextInput from "./GlassmorphismTextInput";
import DatePicker from "react-native-neat-date-picker";
import TimePickerModal from "react-native-modal-datetime-picker";
import ReminderCard from "./ReminderCard";
import GlobalStyles from "./GlobalStyles";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet"

type Reminder = {
  id: number,
  title: string,
  description: string,
  reminderDate: string,
  reminderTime: string,
};

const Home = () => {
  const [reminderTitle, setReminderTitle] = useState("");
  const [reminderDescription, setReminderDescription] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [showDatePickerSingle, setShowDatePickerSingle] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const savedReminders = await AsyncStorage.getItem("reminders");
      if (savedReminders !== null) {
        setReminders(JSON.parse(savedReminders));
      }
    } catch (error) {
      console.error("Error loading reminders:", error);
    }
  };

  const saveReminders = async (remindersToSave: Reminder[]) => {
    try {
      await AsyncStorage.setItem("reminders", JSON.stringify(remindersToSave));
    } catch (error) {
      console.error("Error saving reminders:", error);
    }
  };

  const handleAddReminder = () => {
    if (reminderTitle && reminderDescription && reminderDate && reminderTime) {
      const newReminder: Reminder = {
        id: reminders.length + 1,
        title: reminderTitle,
        description: reminderDescription,
        reminderDate,
        reminderTime,
      };
      const updatedReminders = [...reminders, newReminder];
      setReminders(updatedReminders);
      saveReminders(updatedReminders);
      setReminderTitle("");
      setReminderDescription("");
      setReminderDate("");
      setReminderTime("");
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDeleteReminder = (id: number) => {
    const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
    setReminders(updatedReminders);
    saveReminders(updatedReminders);
  };

  const openDatePickerSingle = () => setShowDatePickerSingle(true);

  const onCancelSingle = () => {
    setShowDatePickerSingle(false);
  };

  const onConfirmSingle = (output: any) => {
    setShowDatePickerSingle(false);
    setReminderDate(output.dateString);
  };

  const onCancelTimePicker = () => {
    setShowTimePicker(false);
  };

  const onConfirmTimePicker = (time: Date) => {
    setShowTimePicker(false);
    setReminderTime(time.toLocaleTimeString());
  };

  // For Bottom Sheet
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = ["25%", "50%"];


  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <LinearGradient
        colors={["#0d132a", "#44196c"]}
        style={styles.mainContainer}
      >
        <DatePicker
          isVisible={showDatePickerSingle}
          colorOptions={{ headerColor: "#0d132a", backgroundColor: "#44196c", dateTextColor: "#fff" }}
          mode="single"
          onCancel={onCancelSingle}
          onConfirm={onConfirmSingle}
        />

        <TimePickerModal
          isVisible={showTimePicker}
          mode="time"
          onConfirm={onConfirmTimePicker}
          onCancel={onCancelTimePicker}
        />

        <View style={styles.topContainer}>
          <Text style={styles.topTabText}>Good Morning {"\n"}Superstar!</Text>
          <TouchableOpacity style={styles.topLeftButtonContainer}>
            <FontAwesomeIcon
              icon={faGear as IconProp}
              color="#44196c"
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
              <Text style={styles.dateText}>{reminderDate}</Text>
              <FontAwesomeIcon
                icon={faCalendar as IconProp}
                color="#fff"
                size={20}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateContainer}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.dateText}>{reminderTime}</Text>
              <FontAwesomeIcon
                icon={faClock as IconProp}
                color="#fff"
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleAddReminder}
        >
          <LinearGradient
            colors={["#256afe", "#8124e7"]}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Add Reminder</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.remindersMainContainer}>
          <Text style={styles.remindersMainContainerText}>My Reminders</Text>
          <FlatList
            data={reminders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ReminderCard
                reminderTitle={item.title}
                reminderDescription={item.description}
                reminderDate={item.reminderDate}
                reminderTime={item.reminderTime}
                onPress={() => handleDeleteReminder(item.id)}
              />
            )}
          />
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
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 4,
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

  remindersMainContainer: {
    flex: 1,
  },

  remindersMainContainerText: {
    padding: 12,
    color: "#fff",
    fontSize: 22,
    fontFamily: "PoppinsSemiBold",
  },
});
