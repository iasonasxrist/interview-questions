import React from "react";
import { BsTrash } from "react-icons/bs";

const Task = ({ task, onToggleCompletion, onDelete }) => {
  return (
    <div className="relative group">
      <div className="flex items-center p-2 rounded-lg shadow-sm hover:bg-gray-200 transform transition-transform duration-300 hover:scale-105">
        {/* Checkbox for task completion */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleCompletion(task.id)}
          className={`mr-2 ${
            task.completed ? "text-gray-400 line-through" : ""
          }`}
        />

        {/* Task text */}
        <span
          className={`flex-grow ${
            task.completed ? "text-gray-400 line-through" : ""
          }`}
        >
          {task.text}
        </span>

        {/* Delete button from tasks state. So it's permantely deleted  */}
        <button
          className={`ml-auto text-red-500 rounded-md cursor-pointer ${
            task.completed ? "text-green-500" : ""
          }`}
          onClick={() => onDelete(task.id)}
        >
          <BsTrash className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Task;
