import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import {
  getCourseLecture,
  deleteCourseLecture,
} from "../../Redux/lectureSlice";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../../utils/NotFound";

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

  useEffect(() => {
    if (courseDetails) {
      setCourseId(courseDetails._id);
      dispatch(getCourseLecture(courseDetails._id));
    }
  }, [dispatch, courseDetails]);

  const lecturesData = useSelector((state) => state.lecture.lectures);

  useEffect(() => {
    if (lecturesData?.length > 0) {
      setSelectedLecture(lecturesData[0]); // Select the first lecture by default
    }
  }, [lecturesData, getCourseLecture]);

  if (!courseDetails) {
    return <NotFound text={"Course Not Found"} />;
  }

  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
  };

  const handleDeleteLecture = async (id) => {
    if (window.confirm("Are you sure you want to delete the lecture?")) {
      const data = { courseId: courseId, lectureId: id };
      const res = await dispatch(deleteCourseLecture(data));

      // fetching the new updated data for the course
      if (res.payload.success) {
        await dispatch(getCourseLecture(courseId));
      }
    }
  };

  return (
    // lecture dashboard section
    <section className="bg-white p-0 w-[100vw] flex flex-col lg:flex-row justify-between gap-0">
      {/* video play and video details section */}
      <div className="w-[100%] lg:gap-2 gap4 lg:w-[65%] lg:h-[100vh] h-[40vh] overflow-y-scroll">
        {/* video header */}
        <div className="py-7 px-5 flex shadow-xl lg:gap-3 gap-4 lg:h-[75px] h-[70px] overflow-hidden text-ellipsis bg-white w-[100%] items-center sticky top-0 z-50">
          <FaArrowLeft
            className="text-2xl text-gray-700 font-semibold cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h6 className="lg:text-base text-sm text-gray-600 font-semibold">
            <span className="font-thin">Now Playing -- </span>{" "}
            {selectedLecture?.title}
          </h6>
        </div>
        {/* lecture video */}
        <div className="w-[100%] flex bg-black justify-center items-center lg:h-[400px] md:h-[300px] h-[230px]">
          <video
            className="h-[100%]"
            src={selectedLecture?.lecture?.secure_url}
            controls
          ></video>
        </div>
        {/* video description */}
        <div className="flex flex-col py-8 px-4">
          <header className="text-2xl text-[var(--primary-bg)] font-semibold">
            Description
          </header>
          <p>{selectedLecture?.description}</p>
        </div>
      </div>
      {/* lecture list and crud for admin section */}
      <div className="w-[100%] lg:w-[35%] lg:h-[100vh] flex flex-col bg-[#fff8fa] shadow-lg h-[60vh] overflow-y-scroll">
        {/* add lecture button for admin */}
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
              key={lecture._id}
              className={`w-[100%] py-5 px-3 text-lg  border-b-[1px] cursor-pointer border-gray-600 ${
                selectedLecture?._id === lecture._id
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
                {idx + 1}. {lecture.title}
              </p>
              {/* button for edit and delete lecture for admin */}
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
        {!selectedLecture && (
          <p>Currently Not Any Lectures Available in this course</p>
        )}
      </div>
    </section>
  );
}
