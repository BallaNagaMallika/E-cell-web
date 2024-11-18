import React, { useEffect } from "react";
import "./Activities.css";

const Activities = () => {
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll(".card");
      const scrollPosition = window.scrollY + window.innerHeight;

      cards.forEach((card) => {
        const cardPosition = card.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition > cardPosition + 300) {
          card.classList.add("scroll-active");
        } else {
          card.classList.remove("scroll-active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="activities-container">
      <div className="card">
        <p className="heading">About E-Cell</p>
        <p>E-Cell is the heart of innovation and entrepreneurship in our college, fostering a vibrant ecosystem where ideas thrive and transform into impactful solutions. Our mission is to empower students with the knowledge, resources, and opportunities to explore their entrepreneurial potential. Through workshops, mentorship programs, pitch competitions, and networking events, we aim to bridge the gap between ideas and execution. Whether you're an aspiring entrepreneur or simply eager to learn, E-Cell provides a platform to collaborate, innovate, and grow. Join us to be part of a community that’s shaping the future, one idea at a time.</p>      </div>
    </div>
  );
};

export default Activities;
