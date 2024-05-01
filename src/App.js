import React from "react";
import User from "./components/users/User";
import Admin from "./components/admin/Admin";

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import EventDetails from "./components/users/EventDetails";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/event-details/:eventId" element={<EventDetails />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
