import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import GlassmorphismTextInput from "../components/GlassmorphismTextInput";
import ReminderCard from "../components/ReminderCard";
import GlobalStyles from "../components/GlobalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useReminderContext } from "../context/ReminderContext"; // Import the context
import TimePickerComponent from "../components/TimePickerComponent";
import DatePickerComponent from "../components/DatePickerComponent";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

const Home = () => {
  const { state, dispatch } = useReminderContext(); // Use the context
  const [isAddReminderModalVisible, setIsAddReminderModalVisible] =
    useState(false);
  const [reminderTitle, setReminderTitle] = useState("");
  const [reminderDescription, setReminderDescription] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [editReminderId, setEditReminderId] = useState(null);
  const [editReminderTitle, setEditReminderTitle] = useState("");
  const [editReminderDescription, setEditReminderDescription] = useState("");
  const [editReminderDate, setEditReminderDate] = useState("");
  const [editReminderTime, setEditReminderTime] = useState("");

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

  // Push Notifications setup
  useEffect(() => {
    if (Device.isDevice) {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
    }
  }, []);

  const sendNotification = async (reminder) => {
    const reminderDateTime = new Date(
      `${reminder.reminderDate} ${reminder.reminderTime}`
    );

    await Notifications.scheduleNotificationAsync({
      content: {
        title: reminder.title,
        body: reminder.description,
        sound: require("../../assets/sound.mp3"),
      },
      trigger: {
        date: reminderDateTime,
      },
    });
  };

  useEffect(() => {
    state.reminders.forEach((reminder) => {
      sendNotification(reminder);
    });
  }, [state.reminders]);

  useEffect(() => {
    console.log("Reminders state updated:", state.reminders);
  }, [state.reminders]);

  const handleAddReminder = () => {
    try {
      if (
        reminderTitle &&
        reminderDescription &&
        reminderDate &&
        reminderTime
      ) {
        const newReminder = {
          id: Date.now(),
          title: reminderTitle,
          description: reminderDescription,
          reminderDate,
          reminderTime,
        };
        console.log("Adding new reminder:", newReminder);

        const isValidReminder = (reminder) => {
          return (
            reminder.id &&
            reminder.title &&
            reminder.description &&
            reminder.reminderDate &&
            reminder.reminderTime
          );
        };

        if (isValidReminder(newReminder)) {
          dispatch({ type: "ADD_REMINDER", payload: newReminder });
          setReminderTitle("");
          setReminderDescription("");
          setReminderDate("");
          setReminderTime("");
          setIsAddReminderModalVisible(false);
        } else {
          console.error("Invalid reminder data:", newReminder);
          alert("There was an issue with the reminder data. Please try again.");
        }
      } else {
        alert("Please fill in all fields.");
      }
    } catch (error) {
      console.error("Error in handleAddReminder:", error);
      alert("An error occurred while adding the reminder. Please try again.");
    }
  };

  const handleDeleteReminder = (id) => {
    dispatch({ type: "DELETE_REMINDER", payload: id });
  };

  const handleEditReminder = () => {
    if (
      editReminderTitle &&
      editReminderDescription &&
      editReminderDate &&
      editReminderTime &&
      editReminderId !== null
    ) {
      const updatedReminder = {
        id: editReminderId,
        title: editReminderTitle,
        description: editReminderDescription,
        reminderDate: editReminderDate,
        reminderTime: editReminderTime,
      };
      dispatch({ type: "EDIT_REMINDER", payload: updatedReminder });
      setIsPopupVisible(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <LinearGradient
        colors={["#0d132a", "#44196c"]}
        style={styles.mainContainer}
      >
        {/* Add Reminder Modal */}
        <Modal
          visible={isAddReminderModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsAddReminderModalVisible(false)}
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
                  onPress={() => setIsAddReminderModalVisible(false)}
                />
              </View>
              <View style={styles.modalHeader}>
                <Text style={styles.todoModalText}>Add Task</Text>
              </View>
              <GlassmorphismTextInput
                placeholder="Reminder Title"
                maxLength={30}
                value={reminderTitle}
                onChangeText={setReminderTitle}
              />
              <GlassmorphismTextInput
                placeholder="Reminder Description"
                maxLength={80}
                value={reminderDescription}
                onChangeText={setReminderDescription}
                multiline={true}
                numberOfLines={3}
              />
              <View style={styles.dateTimeContainer}>
                <DatePickerComponent
                  selectedDate={reminderDate}
                  onDateChange={setReminderDate}
                />
                <TimePickerComponent
                  reminderTime={reminderTime}
                  setReminderTime={setReminderTime}
                />
              </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleAddReminder}
              >
                <LinearGradient
                  colors={["#256afe", "#8124e7"]}
                  style={styles.gradient}
                >
                  <Text style={styles.buttonText}>Add Task</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </Modal>

        <View style={styles.topContainer}>
          <Text style={styles.topTabText}>
            {greeting} {"\n"}Superstar!
          </Text>
        </View>

        <View style={styles.remindersMainContainer}>
          <View style={styles.remindersHeader}>
            <Text style={styles.remindersMainContainerText}>My Tasks</Text>
            <TouchableOpacity
              onPress={() => setIsAddReminderModalVisible(true)}
            >
              <FontAwesomeIcon icon={faPlus} size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {state.reminders.length === 0 ? (
            <View style={styles.noRemindersContainer}>
              <Image
                source={require("../../assets/message.png")}
                style={{ width: 250, height: 250 }}
              />
              <Text style={styles.emptyListMessage}>
                No reminders added yet.
              </Text>
            </View>
          ) : (
            <View>
              <FlatList
                data={state.reminders}
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
                extraData={state.reminders}
              />
            </View>
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

  formContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignContent: "center",
    justifyContent: "center",
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
    padding: 18,
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

  remindersHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
    justifyContent: "space-between",
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

  emptyListMessage: {
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
