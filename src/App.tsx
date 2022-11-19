/**
 * @file App component definition file
 */

// External imports
import { Route, Routes } from "react-router-dom";

// Internal imports
import Home from "./pages/Home";
import UserEvents from "./pages/UserEvents";
import Error from "./pages/Error";

// Styles imports
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:username" element={<UserEvents />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
