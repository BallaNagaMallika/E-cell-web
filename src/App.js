// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav"; // Import your Navigator
import Home from "./screens/Home"; // Your Home component
import Events from "./screens/Events"; // Your Events component
import Event from "./screens/Event";
import NewEvent from "./screens/NewEvent";
import RegistrationForm from "./screens/RegistrationForm";
import Registrations from "./screens/Registrations";
import Dashboard from "./screens/Dashboard";
import Reg from "./screens/Reg";
import Object3D from './screens/Object'; // Import the 3D Logo Component

const App = () => {
  return (
    <Router>
      <Nav /> {/* Add the Navigator component here */}
      <div style={{ paddingTop: "60px" }}>
        {/* Padding to prevent content overlap with fixed header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event" element={<Event />} />
          <Route path="/newevent" element={<NewEvent />} />
          <Route path="/regform" element={<RegistrationForm />} />
          <Route path="/reg" element={<Registrations />} />
          <Route path="/reg2" element={<Reg />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logo3d" element={<Object3D />} /> {/* New Route for 3D logo */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
