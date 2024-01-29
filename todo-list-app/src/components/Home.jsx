import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Title */}
      <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 text-center px-4">
        Welcome to Notes
      </h1>
      {/* Navigate to main screen */}
      <Link
        to="/todo"
        className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        Go to Todo List
      </Link>
    </div>
  );
};

export default Home;
