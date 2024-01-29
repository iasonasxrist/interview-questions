import React from "react";
import TodoList from "./pages/TodoList";
import { TaskProvider } from "./context/ TaskContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
  return (
    // Provider for data passing to children components
    <TaskProvider>
      {/* Routes for easy navigation */}
      <Router>
        <Routes>
          {/* Route for the start screen */}
          <Route path="/" element={<Home />} />
          {/* Route for the my main screen */}
          <Route path="/todo" element={<TodoList />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
};

export default App;
