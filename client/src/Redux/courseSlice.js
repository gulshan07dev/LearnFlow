import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const initialState = {
  coursesData: [],
};

// ......function to get all courses........
export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const response = await axios.get(`${apiUrl}/courses`, { withCredentials: true });

    return response.data.courses;
  } catch (error) {
    // showing error message
    toast.error(error.response.data.message);

    // Throwing an error here so that the promise is rejected with the error message
    throw error;
  }
});


// ......function to create a new course.......
export const createNewCourse = createAsyncThunk(
  "/get/courses",
  async (data) => {
    // showing loading message 
    const loading = toast.loading(
      `Please Wait! creating your course`
    );
    try {

      const response = await axios.post(`${apiUrl}/courses`, data, {
        headers: { 'Content-Type': "multipart/form-data" }, withCredentials: true
      })
      // showing success message 
      toast.update(loading, {
        render: response.data.message,
        isLoading: false,
        autoClose: 1000,
        type: "success",
      });
      return response.data
    } catch (error) {
      // showing error message 
      toast.update(loading, {
        render: error.response.data.message,
        isLoading: false,
        autoClose: 3000,
        type: "error",
      });
      // Throwing an error here so that the promise is rejected with the error message
      throw error;
    }
  }
);

// function to delete the course
export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
  const loadingMessage = toast.loading("Deleting the course...");
  try {
    const response = await axios.delete(`${apiUrl}/courses/${id}`, { withCredentials: true });

    // showing success message
    toast.update(loadingMessage, {
      render: "Course deleted successfully",
      autoClose: 1000,
      type: "success",
      isLoading: false
    })

    return response.data;
  } catch (error) {
    // showing loading message
    toast.update(loadingMessage, {
      render: "Failed to delete course",
      autoClose: 3000,
      closeButton: true,
      type: "error",
      isLoading: false
    })
    // Throwing an error here so that the promise is rejected with the error message
    throw error;
  }
});

// ......function to update the course details.......
export const updateCourse = createAsyncThunk("/course/update", async (data) => {

  // showing loading message 
  const loading = toast.loading(
    `Please Wait! updating your course...`
  );
  try {
    const response = await axios.put(`${apiUrl}/courses/${data.id}`, data.formDataToSend, {
      headers: { 'Content-Type': "multipart/form-data" }, withCredentials: true
    });
    // showing success message 
    toast.update(loading, {
      render: response.data.message,
      isLoading: false,
      autoClose: 1000,
      type: "success",
    });

    return response.data;
  } catch (error) { 
    // showing error message 
    toast.update(loading, {
      render: error.response.data.message,
      isLoading: false,
      autoClose: 3000,
      type: "error",
    });
    // Throwing an error here so that the promise is rejected with the error message
    throw error;
  }
});

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        state.coursesData = [...action.payload];
      }
    });
  },
});

export const { } = courseSlice.actions;
export default courseSlice.reducer;
