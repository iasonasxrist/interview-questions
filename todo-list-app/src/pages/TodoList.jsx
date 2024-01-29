import React, { useState } from "react";
import { useTaskContext } from "../context/ TaskContext";
import Task from "../components/Task";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";

const TodoList = () => {
  // Imported state (empty or not) based on localStorage on browser
  const { tasks, setTasks } = useTaskContext();
  const [taskInput, setTaskInput] = useState("");

  // Add a task by trimming spaces
  // create unique id using (minutes, seconds, milliseconds)
  // Add an animated alert box for better user experience (success, error)
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
        autoClose: 500,
        hideProgressBar: true,
      });
      return;
    }
  };

  // Set the task completed by altering the boolean parameter
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task using its unique id (avoiding removing duplicated tasks e.g same title )
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <>
      {/* Use the component of header */}
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
          <h1 className="text-3xl font-bold mb-4 text-center">My Todo List</h1>

          <div className="flex items-center mb-4">
            {/* Input for task adding feature */}
            <input
              type="text"
              className="flex-1 border border-gray-300 p-2 mr-2 rounded-md"
              aria-label="Enter task to add"
              placeholder="Enter task"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            {/* Pass the task on the tasks state to be stored on  localstorage */}
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={addTask}
            >
              Add Task
            </button>
          </div>

          {/* A render of all tasks for user visualization */}

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
        {/* Render the Toast alert box */}
        <ToastContainer />
      </div>
    </>
  );
};

export default TodoList;
