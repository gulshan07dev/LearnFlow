import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher, FaVideo } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function CourseCard({ details }) {
  const user = useSelector((state) => state.auth.data);
  const navigate = useNavigate();
  return (
    <div className="course">
      <div className="image">
        <img
          src={details?.thumbnail?.secure_url}
          alt={`${details?.title}Image`}
        />
      </div>
      <div className="details">
        <h4>{details?.title}</h4>
        <p className="teacher">
          <FaChalkboardTeacher /> {details?.createdBy}
        </p>
        <p>
          <FaVideo /> College Student & Working Professional
        </p>
      </div>
      <div className="price">₹499</div>
      <div className="btn-container">
        <button
          onClick={() =>
            navigate(`/course/${details.title.replaceAll(" ", "-")}`)
          }
        >
          Explore
        </button>
        <button
          onClick={() =>
            navigate(
              user?.subscription?.status === "active" || user?.role === "ADMIN"
                ? `/course/display-lecture/${details?.title.replaceAll(
                    " ",
                    "-"
                  )}`
                : "/checkout"
            )
          }
        >
          {user?.subscription?.status === "active" || user?.role === "ADMIN"
            ? "Veiw Lectures"
            : "Enroll"}
        </button>
      </div>
    </div>
  );
}
