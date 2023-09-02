import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

// css import
import "./course.css";

// component import
import CourseCard from "./CourseCard";
import CardSkeleton from "./CardSkeleton";

export default function CoursesCrousel() {
  const courses = useSelector((state) => state.course.coursesData);
  const isLoading = useSelector((state) => state.course.isLoading);
  const [activeCategory, setActiveCategory] = useState("Trending");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const settings = {
    dots: true,
    screenY: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="courses-section">
      <h1 className="section-heading">Our Courses</h1>
      <div className="course-category">
        <span
          className={activeCategory === "Trending" ? "active" : ""}
          onClick={() => handleCategoryClick("Trending")}
        >
          Trending
        </span>
        <span
          className={activeCategory === "Live" ? "active" : ""}
          onClick={() => handleCategoryClick("Live")}
        >
          Live
        </span>
        <span
          className={activeCategory === "Community" ? "active" : ""}
          onClick={() => handleCategoryClick("Community")}
        >
          Community
        </span>
      </div>
      <hr />
      <div className="course-container">
        <Slider {...settings}>
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={index}>
                  <CardSkeleton />
                </div>
              ))
            : courses.slice(0, 5).map((details, index) => (
                <div key={index}>
                  <CourseCard details={details} />
                </div>
              ))}
        </Slider>
      </div>
    </section>
  );
}
