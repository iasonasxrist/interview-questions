// TaskContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    if (storedTasks.length === 0) {
      // console.log("No tasks found in localStorage, initializing with an empty array");
    } else {
      console.log("Tasks retrieved from localStorage:", storedTasks);
      setTasks(storedTasks);
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
