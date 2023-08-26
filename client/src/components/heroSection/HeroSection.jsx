import React from "react";
import "./hero.css";
import heroImg from "../../assets/hero.png";
import { useNavigate } from "react-router-dom";
import Typed from "react-typed";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="hero-section">
      <div className="left-section">
        <header>
          <h1>
            <span className="upscalling-text">Upscalling Made</span>
            <span className="type-writter">
              {" <"}
              <Typed
                strings={["Affordable", "Practical", "Easy"]}
                typeSpeed={150}
                backSpeed={100}
                loop
              />
              {">"}
            </span>
            <br />
            With LMS Skills
          </h1>

          <p>
            LMS Skills is your one-stop-shop for upscaling. Get maximum value
            for time and resources you invest, with job-ready courses &
            high-technology, available at the lowest cost.
          </p>
          <button onClick={() => navigate('/courses')}>Explore Courses</button>
        </header>
      </div>
      <div className="right-section">
        <img src={heroImg} alt="hero-image" />
      </div>
    </section>
  );
}
