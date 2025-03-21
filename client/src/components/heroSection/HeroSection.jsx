import React from "react";
import "./hero.css";
import heroImg from "../../assets/hero.png";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";

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
              <Typewriter
                options={{
                  strings: [
                    "Easy",
                    "Affordable",
                    "Practical",
                    "Empowering",
                    "Innovative",
                    "Transformative",
                    "Interactive",
                  ],
                  autoStart: true,
                  deleteSpeed: 100,
                  loop: true,
                }}
              />
              {">"}
            </span>
            <br />
            With LearnFlow
          </h1>

          <p>
            LMS Skills is your one-stop-shop for upscaling. Get maximum value
            for time and resources you invest, with job-ready courses &
            high-technology, available at the lowest cost.
          </p>
          <button onClick={() => navigate("/courses")}>Explore Courses</button>
        </header>
      </div>
      <div className="right-section">
        <img src={heroImg} alt="hero-image" />
      </div>
    </section>
  );
}
