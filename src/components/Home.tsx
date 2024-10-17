import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Platform,
  Image
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGear, faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import GlassmorphismTextInput from "./GlassmorphismTextInput";
import DatePicker from "react-native-neat-date-picker";
import TimePickerModal from "react-native-modal-datetime-picker";
import ReminderCard from "./ReminderCard";
import GlobalStyles from "./GlobalStyles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
// For Notifications
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { scheduleNotificationAsync } from "expo-notifications";

type Reminder = {
  id: number;
  title: string;
  description: string;
  reminderDate: string;
  reminderTime: string;
};

const Home = () => {
  const [reminderTitle, setReminderTitle] = useState("");
  const [reminderDescription, setReminderDescription] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [showDatePickerSingle, setShowDatePickerSingle] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [editReminderId, setEditReminderId] = useState<number | null>(null);
  const [editReminderTitle, setEditReminderTitle] = useState("");
  const [editReminderDescription, setEditReminderDescription] = useState("");
  const [editReminderDate, setEditReminderDate] = useState("");
  const [editReminderTime, setEditReminderTime] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");


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


  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    sendNotification();
  }, [reminders]);

  useEffect(() => {
    console.log("Registering for Push Notifications");
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("token: ", token);
        setExpoPushToken(token);
      })
      .catch((err) => console.log(err));
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "e28a41a2-6679-4d9d-aa1d-3ad436ae50e6",
        })
      ).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  const sendNotification = async () => {
    console.log("Scheduling push notifications");

    // Iterate over reminders and schedule notification for each one
    reminders.forEach(async (reminder) => {
      const reminderDateTime = new Date(
        `${reminder.reminderDate} ${reminder.reminderTime}`
      );

      // Schedule notification
      try {
        await scheduleNotificationAsync({
          content: {
            title: reminder.title,
            body: reminder.description,
            sound: require("../../assets/sound.mp3"),
            // data: { data: 'goes here' },
          },
          trigger: {
            date: reminderDateTime,
          },
        });

        console.log("Notification scheduled for:", reminder.title);
      } catch (error) {
        console.error("Error scheduling notification:", error);
      }
    });
  };

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const savedReminders = await AsyncStorage.getItem("reminders");
      if (savedReminders !== null) {
        const parsedReminders = JSON.parse(savedReminders);
        const currentDate = new Date(); // Get current date and time
        const updatedReminders = parsedReminders.filter((reminder) => {
          // Parse the reminder's date and time
          const reminderDateTime = new Date(
            `${reminder.reminderDate} ${reminder.reminderTime}`
          );
          // Compare with current date and time
          return reminderDateTime.getTime() > currentDate.getTime();
        });
        setReminders(updatedReminders);
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
      const updatedReminders = [newReminder, ...reminders]; // Add new reminder to the beginning of the array
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

  const handleEditReminder = () => {
    if (
      editReminderTitle &&
      editReminderDescription &&
      editReminderDate &&
      editReminderTime &&
      editReminderId !== null
    ) {
      const updatedReminders = reminders.map((reminder) =>
        reminder.id === editReminderId
          ? {
              ...reminder,
              title: editReminderTitle,
              description: editReminderDescription,
              reminderDate: editReminderDate,
              reminderTime: editReminderTime,
            }
          : reminder
      );

      console.log("Updated Reminders:", updatedReminders); // Log the updated reminders array

      setReminders(updatedReminders);
      saveReminders(updatedReminders);
      setIsPopupVisible(false);
    } else {
      alert("Please fill in all fields.");
    }
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

  const handleAddReminderAndSendNotification = () => {
    handleAddReminder();
    sendNotification();
  };

  const deleteIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to check and delete reminders after 5 seconds
  // const checkAndDeleteReminders = () => {
  //   const currentDate = new Date(); // Get the current date and time
  //   reminders.forEach((reminder) => {
  //     const reminderDateTime = new Date(`${reminder.reminderDate} ${reminder.reminderTime}`);
  //     const timeDifference = reminderDateTime.getTime() - currentDate.getTime();
  //     if (timeDifference > 0 && timeDifference <= 5000) { // Check if time difference is positive and less than or equal to 5 seconds
  //       handleDeleteReminder(reminder.id); // Delete the reminder
  //     }
  //   });
  // };

  const checkAndDeleteReminders = () => {
    const currentDate = new Date(); // Get the current date and time
    reminders.forEach((reminder) => {
      const reminderDateTime = new Date(
        `${reminder.reminderDate} ${reminder.reminderTime}`
      );
      const timeDifference = reminderDateTime.getTime() - currentDate.getTime();
      if (timeDifference <= 100) {
        // Check if time difference is less than or equal to 10 seconds
        handleDeleteReminder(reminder.id); // Delete the reminder
      }
    });
  };

  // Effect to start the interval for checking and deleting reminders
  useEffect(() => {
    deleteIntervalRef.current = setInterval(checkAndDeleteReminders, 1000);
    return () => {
      // Clean up the interval when the component unmounts
      if (deleteIntervalRef.current) {
        clearInterval(deleteIntervalRef.current);
      }
    };
  }, [reminders]);

  // CLOSE POPUP
  const closemodal = () => {
    setIsPopupVisible(false);
    setEditReminderId(null);
    setEditReminderTitle("");
    setEditReminderDescription("");
    setEditReminderDate("");
    setEditReminderTime("");
  };

  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <LinearGradient
        colors={["#0d132a", "#44196c"]}
        style={styles.mainContainer}
      >
        <Modal
          visible={isPopupVisible}
          animationType="fade"
          transparent
          onRequestClose={() => setIsPopupVisible(crossfalse)}
        >
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={["#032a80", "#3d0373"]}
              style={styles.popup}
            >
              <View style={styles.closeContainer}>
                <MaterialCommunityIcons
                  name="close"
                  color="white"
                  size={20}
                  onPress={closemodal}
                />
              </View>
              {/* MODAL HEADER  */}
              <View style={styles.modalHeader}>
                <Text style={styles.todoModalText}>Edit Reminder</Text>
              </View>
              {/* MODAL CONTENTS */}
              <GlassmorphismTextInput
                placeholder="Reminder Title"
                maxLength={12}
                value={editReminderTitle}
                onChangeText={setEditReminderTitle}
              />
              <GlassmorphismTextInput
                placeholder="Reminder Description"
                maxLength={32}
                value={editReminderDescription}
                onChangeText={setEditReminderDescription}
                multiline={true}
                numberOfLines={3}
              />
              <View style={styles.dateTimeContainer}>
                <TouchableOpacity
                  style={styles.dateContainer}
                  onPress={openDatePickerSingle}
                >
                  <Text style={styles.dateText}>{editReminderDate}</Text>
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
                  <Text style={styles.dateText}>{editReminderTime}</Text>
                  <FontAwesomeIcon
                    icon={faClock as IconProp}
                    color="#fff"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleEditReminder}
              >
                <LinearGradient
                  colors={["#256afe", "#8124e7"]}
                  style={styles.gradient}
                >
                  <Text style={styles.buttonText}>Edit Reminder</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </Modal>

        <View style={{ zIndex: 1000 }}>
          <DatePicker
            isVisible={showDatePickerSingle}
            colorOptions={{
              headerColor: "#0d132a",
              backgroundColor: "#44196c",
              dateTextColor: "#fff",
            }}
            mode="single"
            onCancel={onCancelSingle}
            onConfirm={onConfirmSingle}
          />
        </View>

        <TimePickerModal
          isVisible={showTimePicker}
          mode="time"
          onConfirm={onConfirmTimePicker}
          onCancel={onCancelTimePicker}
        />

        <View style={styles.topContainer}>
          <Text style={styles.topTabText}>{greeting} {"\n"}Superstar!</Text>
          {/* <TouchableOpacity style={styles.topLeftButtonContainer}>
            <FontAwesomeIcon
              icon={faGear as IconProp}
              color="#44196c"
              size={24}
            />
          </TouchableOpacity> */}
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
          onPress={handleAddReminderAndSendNotification}
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
          {reminders.length === 0 ? (
            <View style={styles.noRemindersContainer}>  
              <Image
                  source={require("../../assets/message.png")}
                  style={{width: 250, height: 250}}
              />
              <Text style={styles.emptyListMessage}>
                No reminders added yet.
              </Text>
            </View>
          ) : (
            <FlatList
              data={reminders}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ReminderCard
                  reminderTitle={item.title}
                  reminderDescription={item.description}
                  reminderDate={item.reminderDate}
                  reminderTime={item.reminderTime}
                  onDeletePress={() => handleDeleteReminder(item.id)}
                  onEditPress={() => {
                    setEditReminderId(item.id);
                    setEditReminderTitle(item.title);
                    setEditReminderDescription(item.description);
                    setEditReminderDate(item.reminderDate);
                    setEditReminderTime(item.reminderTime);
                    setIsPopupVisible(true);
                  }}
                />
              )}
            />
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    paddingVertical: 2,
    paddingHorizontal: 10,
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

  noRemindersContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyListMessage:{
      color: "#fff",
      fontSize: 20,
      fontFamily: "PoppinsSemiBold",
  },

  bottomSheetBackground: {
    backgroundColor: "#3d439b",
  },

  contentContainer: {
    paddingHorizontal: 20,
  },

  closeModal: {
    paddingHorizontal: 10,
    alignItems: "center",
  },

  quoteContainer: {
    paddingVertical: 10,
  },

  modalContainer: {
    flex: 1,
    paddingTop: 300,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  popup: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    width: "90%",
  },
  popupItem: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: "lightgray",
    justifyContent: "space-between",
    alignItems: "center",
  },

  popupItemText: {
    paddingRight: 10,
    color: "white",
    fontFamily: "PoppinsSemiBold",
  },

  editInput: {
    fontFamily: "PoppinsMedium",
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingBottom: 5,
    marginBottom: 10,
  },

  todoModalText: {
    color: "white",
    fontSize: 18,
    fontFamily: "PoppinsBold",
  },

  closeContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionIcons: {
    flexDirection: "row",
  },

  actionIcon: {
    marginHorizontal: 5,
  },

  popupContent: {
    // borderColor: "white",
    // borderWidth: 1,
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 10,
    flexDirection: "row",
  },

  popupContentText: {
    color: "white",
    fontFamily: "PoppinsSemiBold",
    marginLeft: 10,
  },
});

const bottomSheetHandleStyle = {
  backgroundColor: "#3d439b",
};

export default Home;
