import React, { useRef, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

// reducer slice imports
import { getAllCourses } from "../../Redux/courseSlice";
import {
  getCourseLecture,
  updateCourseLecture,
} from "../../Redux/lectureSlice";

// component import 
import NotFound from "../../utils/NotFound";
import InputField from "../../components/inputField/InputField";
import TextAreaField from "../../components/inputField/TextAreaField";

export default function UpdateLecture() {
  const dispatch = useDispatch();
  const VideoInputRef = useRef(null);
  const { courseId, lectureNo } = useParams();

  const lecturesData = useSelector((state) => state.lecture.lectures);
  const lectureDetails = lecturesData?.[lectureNo - 1];

  useEffect(() => {
    // Fetch course Lectures by courseId when the component mounts
    dispatch(getCourseLecture(courseId));
  }, [courseId]);

  const [isChanged, setIsChanged] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [videoChanged, setVideoChanged] = useState(false);
  const [formData, setFormData] = useState({
    lecture: "",
    title: "",
    description: "",
  });

  // fill the input, so that admin easily edit lecture
  useEffect(() => {
    if (lectureDetails) {
      setFormData({
        lecture: lectureDetails?.lecture?.secure_url,
        title: lectureDetails?.title,
        description: lectureDetails?.description,
      });
    }
  }, [lectureDetails]);

  // logic for button disable , if not any chages in the input field
  useEffect(() => {
    const isChanged =
      formData.title !== (lectureDetails?.title || "") ||
      formData.description !== lectureDetails?.description ||
      formData.lecture !== lectureDetails?.lecture?.secure_url;
    setIsChanged(isChanged);
  }, [formData, lectureDetails]);

  // function for handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // function for handle video change
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      lecture: file,
    }));
    setVideoChanged(true);
  };

  // function for handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!formData.lecture || !formData.title || !formData.description) {
      toast.error("All fields are mandatory");
      return;
    }

    // set isUpdating true
    setIsUpdating(true);

    const formDataToSend = new FormData();
    if (formData.lecture instanceof File) {
      formDataToSend.append("lecture", formData.lecture);
    }
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);

    const data = {
      formDataToSend,
      courseId: courseId,
      lectureId: lectureDetails?._id,
    };

    const res = await dispatch(updateCourseLecture(data));

    if (res?.payload?.success) {
      // Refresh lectures data after updating
      dispatch(getCourseLecture(courseId));
    }
    // set isUpdating false
    setIsUpdating(false);
  };

  // if admin pass wrong course id in the url, show lecture not found
  if (!lectureDetails) {
    return <NotFound text={"Lecture Not Found"} />;
  }

  return (
    // main section for update lecture
    <section className="py-5 lg:py-10 px-2 flex justify-center">
      <div className="flex flex-col lg:w-[80vw] md:w-[70vw] w-[100%] gap-10 shadow-custom lg:py-4 pt-10 py-7 lg:px-16 md:px-16 px-4 rounded-xl">
        {/* heading */}
        <h1 className="md:text-2xl text-lg text-gray-800 font-semibold text-center">
          Update lecture {lectureNo}
        </h1>
        {/* main form container */}
        <form
          className="flex relative pb-20 lg:pb-5 justify-between gap-7 flex-col lg:flex-row w-[100%]"
          onSubmit={handleSubmit}
        >
          {/* Form section for lecture video */}
          <div className="lg:w-[47%] w-[100%] flex flex-col gap-7">
            <div
              className="w-[100%] h-[200px] overflow-x-auto lg:h-[250px] border-solid flex justify-center items-center border-gray-300 border-[1px] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                VideoInputRef.current.click();
              }}
            >
              {formData.lecture ? (
                <video
                  onClick={(e) => {
                    e.stopPropagation();
                    VideoInputRef.current.click();
                  }}
                  src={
                    formData.lecture instanceof File
                      ? URL.createObjectURL(formData.lecture)
                      : formData.lecture
                  }
                  alt="video"
                  controls
                  muted
                  controlsList="nodownload nofullscreen"
                  disablePictureInPicture
                  className="h-[100%]"
                />
              ) : (
                <span className="text-base text-gray-600 font-semibold">
                  Choose your video
                </span>
              )}
              <input
                type="file"
                style={{ display: "none" }}
                id="lecture"
                name="lecture"
                accept="video/mp4,video/x-m4v,video/*"
                ref={VideoInputRef}
                onChange={handleVideoChange}
              />
            </div>
            {/* input for lecture title */}
            <InputField
              label="Lecture Title"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            {/* submit button */}
            <button
              disabled={!isChanged || isUpdating}
              type="submit"
              className={`px-20 bg-[var(--primary-bg)] w-[100%] lg:w-fit py-3.5 absolute bottom-0 lg:static ${
                isUpdating ? "cursor-wait" : "cursor-pointer"
              }`}
            >
              {isUpdating ? "Updating..." : "Update Lecture"}
            </button>
          </div>
          {/* Form section for course description */}
          <div className="lg:w-[47%] w-[100%] flex flex-col gap-7">
            <TextAreaField
              rows={11}
              cols={10}
              name={"description"}
              label={"Lecture Description"}
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>
    </section>
  );
}
