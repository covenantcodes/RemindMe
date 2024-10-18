// context/ReminderContext.js
import React, { createContext, useReducer, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReminderContext = createContext();

const initialState = {
  reminders: [],
};

const reminderReducer = (state, action) => {
  switch (action.type) {
    case "ADD_REMINDER":
      return { ...state, reminders: [action.payload, ...state.reminders] };
    case "DELETE_REMINDER":
      return {
        ...state,
        reminders: state.reminders.filter(
          (reminder) => reminder.id !== action.payload
        ),
      };
    case "EDIT_REMINDER":
      return {
        ...state,
        reminders: state.reminders.map((reminder) =>
          reminder.id === action.payload.id ? action.payload : reminder
        ),
      };
    case "LOAD_REMINDERS":
      return { ...state, reminders: action.payload };
    default:
      return state;
  }
};

export const ReminderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reminderReducer, initialState);

  // Load reminders from AsyncStorage
  useEffect(() => {
    const loadReminders = async () => {
      try {
        const savedReminders = await AsyncStorage.getItem("reminders");
        if (savedReminders !== null) {
          const parsedReminders = JSON.parse(savedReminders);
          dispatch({ type: "LOAD_REMINDERS", payload: parsedReminders });
        }
      } catch (error) {
        console.error("Error loading reminders:", error);
      }
    };
    loadReminders();
  }, []);

  // Save reminders to AsyncStorage whenever they change
  useEffect(() => {
    const saveReminders = async () => {
      try {
        await AsyncStorage.setItem(
          "reminders",
          JSON.stringify(state.reminders)
        );
      } catch (error) {
        console.error("Error saving reminders:", error);
      }
    };
    saveReminders();
  }, [state.reminders]);

  return (
    <ReminderContext.Provider value={{ state, dispatch }}>
      {children}
    </ReminderContext.Provider>
  );
};

export const useReminderContext = () => {
  return useContext(ReminderContext);
};
