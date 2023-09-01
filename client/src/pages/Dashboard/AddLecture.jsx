import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// reducer slice import
import { addCourseLecture } from "../../Redux/lectureSlice";

// component import
import NotFound from "../../utils/NotFound";
 import InputField from "../../components/inputField/InputField";
import TextAreaField from '../../components/inputField/TextAreaField'

export default function AddLecture() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { courseId } = useParams();
  const coursesData = useSelector((state) => state.course.coursesData);

  const VideoInputRef = useRef(null);
  const [formData, setFormData] = useState({
    lecture: "",
    title: "",
    description: "",
  });

  // finding course details bt course id
  const courseDetails = coursesData.find((course) => course._id === courseId);

  // fetch the courses Data if its not in state
  useEffect(() => {
    if (!coursesData) {
      dispatch(getAllCourses());
    }
  }, []);

  // function for handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // function for  lecture video input change
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      lecture: file,
    }));
  };

  // function for handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // checking for the empty fields
    if (!formData.lecture || !formData.title || !formData.description) {
      toast.error("All fields are mandatory");
      return;
    }

    // set is Loading true
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("lecture", formData.lecture);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);

    const data = { formDataToSend, id: courseId };

    const res = await dispatch(addCourseLecture(data));

    if (res?.payload?.success) {
      setFormData({
        lecture: "",
        title: "",
        description: "",
      });
    }
    // set IsLoading false
    setIsLoading(false);
  };

  if (!courseDetails) {
    return <NotFound text={"Course Not Found"} />;
  }

  return (
    // main section for add lecture
    <section className="py-5 lg:py-10 px-2 flex justify-center">
      <div className="flex flex-col lg:w-[80vw] md:w-[70vw] w-[100%] gap-10 shadow-custom lg:py-4 pt-10 py-7 lg:px-16 md:px-16 px-4 rounded-xl">
        {/* heading */}
        <h1 className="md:text-2xl text-lg text-gray-800 font-semibold text-center">
          Create a new Lecture for {courseDetails?.title || ""} Course
        </h1>
        {/* main form */}
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
                  src={URL.createObjectURL(formData.lecture)}
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
              disabled={isLoading}
              type="submit"
              className="px-20 bg-[var(--primary-bg)] w-[100%] lg:w-fit py-3.5 absolute bottom-0 lg:static"
            >
              {isLoading ? "Creating Lecture..." : "Create Lecture"}
            </button>
          </div>
          {/* Form section for lecture description */}
          <div className="lg:w-[47%] w-[100%] flex flex-col gap-7">
            <TextAreaField
              rows={8}
              cols={14}
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
