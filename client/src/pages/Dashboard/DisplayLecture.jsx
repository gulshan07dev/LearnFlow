import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Reducer slice imports
import {
  getCourseLecture,
  deleteCourseLecture,
} from "../../Redux/lectureSlice";

// Icons import
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";

// Component import
import NotFound from "../../utils/NotFound";
import Loading from "../../components/loading/Loading";

export default function DisplayLecture() {
  const [courseId, setCourseId] = useState("");
  const [selectedLecture, setSelectedLecture] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, role } = useSelector((state) => state.auth);
  const { courseName } = useParams();
  const coursesData = useSelector((state) => state.course.coursesData);
  const courseDetails = coursesData.find(
    (course) => course.title === courseName.replaceAll("-", " ")
  );

  // Check if lectures are fetched
  const [isLecturesFetched, setIsLecturesFetched] = useState(false);

  // Fetch lectures by course id
  useEffect(() => {
    const fetchCourseLecture = async (id) => {
      const res = await dispatch(getCourseLecture(id));
      if (res?.payload?.success) {
        setIsLecturesFetched(true); // Lectures are fetched
      }
    };
    if (courseDetails) {
      setCourseId(courseDetails?._id);
      fetchCourseLecture(courseDetails?._id);
    }
  }, [dispatch, courseDetails]);

  // Fetch lectures data from state
  const lecturesData = useSelector((state) => state.lecture.lectures);

  // Select the first lecture by default
  useEffect(() => {
    if (lecturesData?.length > 0) {
      setSelectedLecture(lecturesData[0]);
    }
    // If no lectures exist, set null
    else {
      setSelectedLecture(null);
    }
  }, [lecturesData]);

  // If lectures are still being fetched, show loading
  if (!isLecturesFetched) {
    return <Loading />;
  }

  // If user searches for a lecture with a non-existent course, show "Course Not Found"
  if (!courseDetails) {
    return <NotFound text={"Course Not Found"} />;
  }

  // Function for handling lecture click
  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
  };

  // Function for handling delete lecture
  const handleDeleteLecture = async (id) => {
    if (window.confirm("Are you sure you want to delete the lecture?")) {
      const data = { courseId: courseId, lectureId: id };
      const res = await dispatch(deleteCourseLecture(data));

      // Fetch the new updated data for the course
      if (res.payload.success) {
        await dispatch(getCourseLecture(courseId));
      }
    }
  };

  return (
    // Lecture dashboard section
    <section className="bg-white p-0 w-[100vw] h-[100vh] flex flex-col lg:flex-row justify-between">
      {/* Video play and video details section */}
      <div className="w-[100%] lg:gap-2 gap-4 lg:w-[65%] lg:h-[100vh] h-[50vh] shadow-sm overflow-y-scroll">
        {/* Video header */}
        <div className="py-7 px-5 flex shadow-xl lg:gap-3 gap-4 lg:h-[75px] h-[70px] overflow-hidden text-ellipsis bg-white w-[100%] items-center sticky top-0 z-50">
          <FaArrowLeft
            className="text-2xl text-gray-700 font-semibold cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h6 className="lg:text-base text-sm text-gray-600 font-semibold">
            <span className="font-light">Now Playing -- </span>{" "}
            {selectedLecture?.title || ""}
          </h6>
        </div>
        {/* Lecture video */}
        <div className="w-[100%] flex bg-black justify-center items-center lg:h-[400px] md:h-[300px] h-[200px]">
          <video
            className="h-[100%]"
            src={selectedLecture?.lecture?.secure_url || ""}
            controls
          ></video>
        </div>
        {/* Video description */}
        <div className="flex flex-col gap-3 pb-8">
          <header className="text-2xl text-[var(--primary-bg)] px-4 py-6  bg-[#F8F8F8] font-semibold">
            Description
          </header>
          <p className="text-[18px] text-gray-600 font-medium px-4">
            {selectedLecture?.description || ""}
          </p>
        </div>
      </div>
      {/* Lecture list and CRUD for admin section */}
      <div className="w-[100%] lg:w-[35%] lg:h-[100vh] flex flex-col bg-purple-50 shadow-lg h-[50vh] overflow-y-scroll">
        {/* Add lecture button for admin */}
        {role === "ADMIN" && (
          <div className="lg:h-[75px] h-[70px] flex py-3 justify-center items-center bg-white shadow-xl">
            <button
              className="w-[80%]"
              onClick={() => navigate(`/course/addlecture/${courseId}`)}
            >
              Add Lecture
            </button>
          </div>
        )}

        <ul className="flex flex-col">
          {lecturesData?.map((lecture, idx) => (
            <li
              key={lecture?._id}
              className={`w-[100%] py-5 px-3 md:text-lg text-base border-b-[1.7px] cursor-pointer border-gray-300 ${
                selectedLecture?._id === lecture?._id
                  ? "font-semibold text-[var(--primary-bg)]"
                  : "text-gray-800"
              }  ${role === "ADMIN" ? "flex gap-2 justify-between" : ""}`}
              onClick={() => handleLectureClick(lecture)}
            >
              <p>
                <span
                  className={`text-base text-gray-600 font-semibold ${
                    role === "ADMIN" ? "w-[80%]" : ""
                  }`}
                ></span>
                {idx + 1}. {lecture?.title}
              </p>
              {/* Buttons for edit and delete lecture for admin */}
              {role === "ADMIN" && (
                <div className="flex items-center gap-2 w-[20%] ">
                  <button
                    className="text-[12px] py-1.5 px-2.5 shadow-lg text-white font-normal bg-[#97536b]"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/course/updatelecture/${courseId}/${idx + 1}`);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-[12px] py-1.5 px-2.5 text-red-700 shadow-md font-normal bg-red-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteLecture(lecture?._id);
                    }}
                  >
                    <BsTrash />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        {/* If no lectures are found, show this */}
        {!selectedLecture && (
          <p className="text-lg text-red-600 py-7 px-3 font-mono">
            Currently Not Any Lectures are Available in this course
          </p>
        )}
      </div>
    </section>
  );
}
