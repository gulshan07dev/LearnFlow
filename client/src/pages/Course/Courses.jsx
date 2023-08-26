import React, { useEffect } from "react";
import CourseCard from "../../components/coursesSection/CourseCard";
import "../../components/coursesSection/course.css"; 
import { useSelector } from "react-redux";

export default function Courses() {
  const coursesData = useSelector((state) => state.course.coursesData);

   return (
    <section className="py-5 pb-10 lg:px-16 bg-gray-50 flex flex-col">
      <h1 className="section-heading pb-10 text-lg underline border-x-green-500 underline-offset-8">
        Our Courses
      </h1>
      <div className="course-container flex justify-evenly gap-10 flex-wrap">
        {coursesData.map((course) => (
          <CourseCard key={course._id} details={course} />
        ))}
      </div>
    </section>
  );
}
