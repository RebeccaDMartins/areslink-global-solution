import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import Tasks from "./pages/Tasks";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </>
  );
}

export default App;