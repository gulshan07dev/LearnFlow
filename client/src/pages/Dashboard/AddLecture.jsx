import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NotFound from "../../utils/NotFound";
import InputField from "../../components/inputField/InputField";
import { useDispatch, useSelector } from "react-redux";
import { addCourseLecture } from "../../Redux/lectureSlice";

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
    <section className="py-5 lg:py-10 flex justify-center">
      <div className="flex flex-col lg:w-[80vw] w-[97%] gap-10 shadow-custom lg:py-4 pt-10 py-7 lg:px-16 px-3.5 rounded-xl">
        {/* heading */}
        <h1 className="text-2xl text-gray-800 font-semibold text-center">
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
              className="w-[100%] h-[200px] overflow-x-auto lg:h-[250px] border-solid flex justify-center items-center border-gray-100 border-[3px] cursor-pointer"
              onClick={() => {
                VideoInputRef.current.click();
              }}
            >
              {formData.lecture ? (
                <video
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
          {/* Form section for course details */}
          <div className="lg:w-[47%] w-[100%] flex flex-col gap-7">
            <div className="relative">
              <textarea
                className="mytextarea w-full text-gray-600 text-base border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none py-[11px] px-[10px]"
                rows={8}
                cols={10}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                autoComplete="off"
                required
              />
              <label
                className={`absolute left-2.5 transition-all text-gray-500 text-base opacity-80 pointer-events-none origin-[0%]`}
              >
                Lecture Description
              </label>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
