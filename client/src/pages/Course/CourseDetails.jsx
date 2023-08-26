import React, { useEffect } from "react";
import CourseDesc from "../../components/coursesSection/CourseDesc";
import { useParams } from "react-router-dom";
import NotFound from "../../utils/NotFound";
import { useSelector } from "react-redux";
 
export default function CourseDetails() { 
  const { courseName } = useParams(); 
  const coursesData = useSelector((state) => state.course.coursesData);
 
  // Find the course with the matching id
  const details = coursesData.find((course) => course.title === courseName.replaceAll("-", " "));

  if (!details) {
    // Handle case where course details are not found
    return <NotFound text="Course Not Found" />;
  }

  return <CourseDesc details={details} />;
}
