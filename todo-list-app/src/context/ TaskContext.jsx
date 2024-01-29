import React, { createContext, useState, useEffect, useContext } from "react";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

// Provider for passing data to children on React dom tree
export const TaskProvider = ({ children }) => {
  // Global state for managing tasks
  const [tasks, setTasks] = useState([]);

  // Loading the data from localStorage
  useEffect(() => {
    // If localStorage is empty , returns [] (empty array)
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (storedTasks.length === 0) {
      // console.log("No tasks found in localStorage, initializing with an empty array");
    } else {
      // Just for debugging purposes
      console.log("Tasks retrieved from localStorage:", storedTasks);
      setTasks(storedTasks);
    }
  }, []);

  // Effect to update localStorage when tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Render the provider with passing state and function
  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
