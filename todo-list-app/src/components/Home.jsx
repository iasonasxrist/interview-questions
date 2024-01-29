import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to Your App</h1>
      <Link
        to="/todo"
        className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold transition duration-300 ease-in-out hover:bg-blue-600"
      >
        Go to Todo List
      </Link>
    </div>
  );
};

export default Home;