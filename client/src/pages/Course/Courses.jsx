import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import '../../components/coursesSection/course.css'

// component import
import CourseCard from "../../components/coursesSection/CourseCard";
import CardSkeleton from '../../components/coursesSection/CardSkeleton'

export default function Courses() {
  const coursesData = useSelector((state) => state.course.coursesData);
  const isLoading = useSelector((state) => state.course.isLoading);

  return (
    <section className="py-5 pb-10 lg:px-16 bg-gray-50 flex flex-col">
      <h1 className="section-heading pb-10 text-lg underline border-x-green-500 underline-offset-8">
        Our Courses
      </h1>
      <div className="course-container flex justify-evenly gap-10 flex-wrap">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => ( 
                <CardSkeleton key={index} /> 
            ))
          : coursesData.map((course) => (
              <CourseCard key={course._id} details={course} />
            ))}
      </div>
    </section>
  );
}
