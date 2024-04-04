import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/Register/Register";
import Lists from "./components/Lists/Lists";
import Profile from "./components/Profile/Profile";

export default (
  <Routes>
    <Route path="/profile" element={<Profile />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/lists" element={<Lists />} />
    <Route path="/" element={<Dashboard />} />
  </Routes>
);
