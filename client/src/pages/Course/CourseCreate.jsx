import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

// reducer slice imports
import {
  createNewCourse,
  updateCourse,
  getAllCourses,
} from "../../Redux/courseSlice";

// component import
import NotFound from "../../utils/NotFound";
import InputField from "../../components/inputField/InputField";
import TextAreaField from "../../components/inputField/TextAreaField";

export default function CourseCreate({ update }) {
  const dispatch = useDispatch();
  const thumbnailInputRef = useRef(null);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { courseId } = useParams();
  const coursesData = useSelector((state) => state.course.coursesData);

  const [thumbnailChanged, setThumbnailChanged] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    thumbnail: "",
  });

  // finding course details by course id, admin can update the course
  const courseDetails = coursesData.find((course) => course._id === courseId);

  // fetch the courses Data if its not in state
  useEffect(() => {
    if (!coursesData) {
      dispatch(getAllCourses());
    }
  }, []);

  // fill the input form by courseDetails, so that admin can easily update the course
  useEffect(() => {
    if (update && courseDetails) {
      setFormData((prevFormData) => ({
        title: courseDetails?.title,
        description: courseDetails?.description,
        category: courseDetails?.category,
        createdBy: courseDetails?.createdBy,
        thumbnail: courseDetails?.thumbnail?.secure_url,
      }));

      setThumbnailChanged(
        courseDetails?.thumbnail?.secure_url !== formData.thumbnail
      );
    }
  }, [coursesData, update, courseId]);

  // logic for disable update button, if no any changes in the input field
  useEffect(() => {
    const isChanged =
      formData.title !== courseDetails?.title ||
      formData.description !== courseDetails?.description ||
      formData.createdBy !== courseDetails?.createdBy ||
      formData.category !== courseDetails?.category ||
      formData.thumbnail !== courseDetails?.thumbnail?.secure_url;

    setIsFormChanged(isChanged);
  }, [formData, courseDetails]);

  // function for handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // function for handle thumbnail input change
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      thumbnail: file,
    }));
    setThumbnailChanged(true);
  };

  // function for handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if no fill all field
    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.createdBy ||
      !formData.thumbnail
    ) {
      console.log(formData);
      toast.error("all field are required");
      return;
    }

    // set is isloading true
    setIsLoading(true);

    // fcreate a formDataToSend for update or create course
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("createdBy", formData.createdBy);

    if (formData.thumbnail instanceof File) {
      formDataToSend.append("thumbnail", formData.thumbnail);
    }

    // for update course
    if (update) {
      const data = { formDataToSend, id: courseId };
      const res = await dispatch(updateCourse(data));

      if (res?.payload?.success) {
        // fetch coursesData
        dispatch(getAllCourses());
      }
      // set isloading false
      setIsLoading(false);
    }
    // for create course
    else {
      const res = await dispatch(createNewCourse(formDataToSend));
      if (res?.payload?.success) {
        setFormData({
          title: "",
          description: "",
          category: "",
          createdBy: "",
          thumbnail: "",
        });
        // set isloading false
        setIsLoading(false);
      }
    }
  };

  // if wrong course id, then return course not found
  if (update && !courseDetails) {
    return <NotFound text={"Course Not Found"} />;
  }

  return (
    // main container
    <section className="py-5 lg:py-10 px-2 flex justify-center">
      <div className="flex flex-col lg:w-[80vw] md:w-[70vw] w-[100%] gap-10 shadow-custom lg:py-4 pt-10 py-7 lg:px-16 md:px-16 px-4 rounded-xl">
        {/* heading */}
        <h1 className="lg:text-2xl text-lg text-gray-800 font-semibold text-center w-[100%] overflow-hidden text-ellipsis">
          {update ? (
            <>
              Update '
              <span className="text-[var(--primary-bg)] lg:text-2xl text-lg">
                {courseDetails?.title}
              </span>
              ' Course
            </>
          ) : (
            "Create new Course"
          )}
        </h1>

        {/* main form */}
        <form
         className="flex relative pb-20 lg:pb-5 justify-between gap-7 flex-col lg:flex-row w-[100%]"
          onSubmit={handleSubmit}
        >
          {/* Form section for thumbnail */}
          <div className="lg:w-[47%] w-[100%] flex flex-col gap-7">
            <div
              className="w-[100%] h-[200px] lg:h-[250px] border-solid flex justify-center items-center border-gray-300 border-[1px] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                thumbnailInputRef.current.click();
              }}
            >
              {formData.thumbnail ? (
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    thumbnailInputRef.current.click();
                  }}
                  src={
                    formData.thumbnail instanceof File
                      ? URL.createObjectURL(formData.thumbnail)
                      : formData.thumbnail
                  }
                  alt="thumbnail"
                  className="h-[100%]"
                />
              ) : (
                <span className="text-base text-gray-600 font-semibold">
                  Upload your course thumbnail
                </span>
              )}
              <input
                type="file"
                style={{ display: "none" }}
                id="thumbnail"
                name="thumbnail"
                accept="image/*"
                ref={thumbnailInputRef}
                onChange={handleThumbnailChange}
              />
            </div>
            {/* for course title */}
            <InputField
              label="Course Title"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            {/* for submit button */}
            <button
              disabled={!isFormChanged || isLoading}
              type="submit"
              className="px-20 bg-[var(--primary-bg)] w-[100%] lg:w-fit py-3.5 absolute bottom-0 lg:static"
            >
              {isLoading
                ? update
                  ? "Updating Course..."
                  : "Creating Course..."
                : update
                ? "Update Course"
                : "Create Course"}
            </button>
          </div>
          {/* Form section for course details */}
          <div className="lg:w-[47%] w-[100%] flex flex-col gap-7">
            {/* for course created by */}
            <InputField
              label="Instructor Name"
              type="text"
              id="createdBy"
              name="createdBy"
              value={formData.createdBy}
              onChange={handleInputChange}
            />
            {/* for course category */}
            <InputField
              label="Course Category"
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
            {/* for course description */}
            <TextAreaField
              rows={6}
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
