import React from 'react';
import TodoList from './pages/TodoList'
import { TaskProvider } from './context/ TaskContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

const App = () => {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          {/* Route for the home screen */}
          <Route path="/" element={<Home/>} />
          {/* Route for the todo list */}
          <Route path="/todo" element={<TodoList/>} />
        </Routes>
      </Router>
    </TaskProvider>
  );
};

export default App;