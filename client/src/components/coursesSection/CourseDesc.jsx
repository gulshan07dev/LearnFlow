import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "./course.css";
import { FaHome } from "react-icons/fa";

export default function CoursesDetails({ details }) {
  const { role, data } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <section className="flex flex-col-reverse pt-16 pb-10 gap-7 lg:flex-row justify-between items-center lg:py-10 lg:pt-20 relative">
      <div className="w-[100%]  lg:w-[50%] bg-white p-5 pt-0 pb-10 shadow-custom lg:shadow-none">
        {/* back to home */}
        <div className="flex gap-1 items-center text-sm pb-3 lg:static absolute top-6">
          <FaHome className="text-gray-500" />{" "}
          <NavLink to={"/"} className="text-gray-400">
            Home {" > "}
          </NavLink>
          <span className="text-gray-900 font-[600]  font-[Inter] text-[14px] text-capitalize">
            {details.category}
          </span>
        </div>
        {/* course title */}
        <h1 className="lg:text-3xl md:text-2xl text-xl text-gray-800 font-bold sm:text-left mb-3">{details.title}</h1>
        {/* course desc */}
        <p className="text-sm md:text-[17px] mt-2 leading-[22px] md:leading-6 font-semibold text-gray-600">
          {details.description}
        </p>
        {/* course category */}
        <p className="text-sm md:text-[17px] mt-3 leading-[22px] md:leading-6 font-semibold text-gray-700">
          <span className="font-bold">Category: </span> {details.category}
        </p>
        {/* course instructor */}
        <p className="text-sm md:text-[17px] mt-3 leading-[22px] md:leading-6 font-semibold text-gray-700">
          <span className="font-bold">Mentor: </span> {details.createdBy}
        </p>
        {/* no. of total lectures */}
        <p className="text-sm md:text-[17px] mt-3 leading-[22px] md:leading-6 font-semibold text-gray-700">
          <span className="font-bold">Total Lectures: </span>{" "}
          {details.numberOfLectures}
        </p>
        {/* course price */}
        <div className="flex w-[100%] justify-between items-end">
          <span className="w-[35%] text-red-600 font-semibold text-center lg:text-base text-sm rounded-md p-[12px] bg-white shadow-md">
            Price: ₹499
          </span>
          {/* checkout button */}
          <button
            className="mt-8 lg:text-base text-sm py-[12px]  w-[60%]"
            onClick={() =>
              navigate(
                role === "ADMIN" || data?.subscription?.status === "active"
                  ? `/course/display-lecture/${details?.title.replaceAll(" ", "-")}`
                  : "/checkout"
              )
            }
          >
            {role === "ADMIN" || data?.subscription?.status === "active"
              ? "Veiw Lectures"
              : "Enroll Now"}
          </button>
        </div>
      </div>
      <div className="w-[100%] lg:w-[42%] self-start">
        <img
          src={details.thumbnail.secure_url}
          alt="course-Thumbnail"
          className="w-[100%] lg:w-[80%] rounded-xl"
        />
      </div>
    </section>
  );
}
