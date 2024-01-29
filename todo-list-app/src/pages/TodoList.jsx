import React, { useState, useEffect } from "react";
import { useTaskContext } from "../context/ TaskContext";
import Task from "../components/Task";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoList = () => {
  const { tasks, setTasks } = useTaskContext();
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: taskInput,
          completed: false,
        },
      ]);
      setTaskInput("");

      toast.success("Task added!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeButton: true,
        draggable: true,
        className: "confetti-toast",
      });
    } else {
      toast.error("Please enter a task!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Todo List</h1>

        <div className="flex items-center mb-10">
          <input
            type="text"
            className="flex-1 border border-gray-300 p-2 mr-2 rounded-md"
            aria-label="Enter task to add"
            placeholder="Enter task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>

        <div className="flex flex-col">
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onToggleCompletion={toggleTaskCompletion}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </div>
      <ToastContainer /> {/* Render ToastContainer here */}
    </div>
  );
};

export default TodoList;
