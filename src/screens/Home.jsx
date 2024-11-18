import React from "react";
import "./Home.css";
import ThreeDModel from "./Object.jsx";
import EventRemainder from "../components/EventRemainder.jsx";
import Activities from "../components/Activities.jsx";

function Home() {
  return (
    <div>
      <ThreeDModel />
      <h2 className="Heading">Event Reminder</h2>
      <EventRemainder/>
      <Activities/>
    </div>
  );
}

export default Home;
