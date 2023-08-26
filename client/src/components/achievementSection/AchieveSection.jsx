import React from "react";
import "./achievement.css";
import statistics1 from "../../assets/statistics1.png";
import statistics2 from "../../assets/statistics2.png";
import statistics3 from "../../assets/statistics3.png";
import statistics4 from "../../assets/statistics4.png";

function Statistics({ img, h2, p }) {
  return (
    <div className="statistics">
      <img src={img} alt="statistics" />
      <div>
        <h2>{h2}</h2>
        <p>{p}</p>
      </div>
    </div>
  );
}

export default function AchieveSection() {
  return (
    <section className="achievement-section">
      <Statistics img={statistics1} h2="55%" p="Average Salary Hike" />
      <Statistics img={statistics2} h2="600+" p="Different Courses" />
      <Statistics img={statistics3} h2="12000+" p="Career Transitions" />
      <Statistics img={statistics4} h2="400+" p="Hiring Partners" />
    </section>
  );
}
