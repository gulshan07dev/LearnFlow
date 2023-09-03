import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"; 
import { axiosInstance } from "../Helper/AxiosInstance";

const initialState = {
  lectures: [],
  isLoading: true
};

// ....function to get all the lectures......
export const getCourseLecture = createAsyncThunk(
  "/course/lecture/get",
  async (courseId) => {
    // showing loading message
    const loadingMessage = toast.loading("Fetching the lectures...");
    try {
      const response = await axiosInstance.get(`/courses/${courseId}`);

      // showing success message
      toast.update(loadingMessage, {
        render: "Lectures fetched successfully",
        type: "success",
        autoClose: 1000,
        isLoading: false
      }) 
      return response?.data;
    } catch (error) {
      // showing error message
      toast.update(loadingMessage, {
        render: error?.response?.data?.message,
        type: "error",
        autoClose: 3000,
        closeButton: true,
        isLoading: false
      })
      // Throwing an error here so that the promise is rejected with the error message
      throw error;
    }
  }
);

// ....function to add new lecture to the course......
export const addCourseLecture = createAsyncThunk(
  "/course/lecture/add",
  async (data) => {
    const loadingMessage = toast.loading("Adding the lecture...");
    try {
      const response = await axiosInstance.post(`/courses/${data.id}`, data.formDataToSend);

      // showing success message
      toast.update(loadingMessage, {
        render: "Lecture added successfully",
        type: "success",
        autoClose: 1000,
        isLoading: false
      })

      return response?.data;
    } catch (error) {
      // showing error message
      toast.update(loadingMessage, {
        render: error?.response?.data?.message,
        type: "error",
        autoClose: 3000,
        closeButton: true,
        isLoading: false
      })
      // Throwing an error here so that the promise is rejected with the error message
      throw error;
    }
  }
);

// ...function to delete the lecture from the course......
export const deleteCourseLecture = createAsyncThunk(
  "/course/lecture/delete",
  async (data) => {
    const loadingMessage = toast.loading("Deleting the lecture...");
    try {
      const response = await axiosInstance.delete(
        `/courses/?courseId=${data.courseId}&lectureId=${data.lectureId}`);

      // showing success message
      toast.update(loadingMessage, {
        render: "Lecture deleted successfully",
        type: "success",
        autoClose: 1000,
        isLoading: false
      })
      return response?.data;
    } catch (error) {
      // showing error message
      toast.update(loadingMessage, {
        render: error?.response?.data?.message,
        type: "error",
        autoClose: 3000,
        closeButton: true,
        isLoading: false
      })
      // Throwing an error here so that the promise is rejected with the error message
      throw error;
    }
  }
);


// ......function to update the lecture from the course
export const updateCourseLecture = createAsyncThunk(
  "course/lecture/update",
  async (data) => {
    const loadingMessage = toast.loading("Updating the lecture...");
    try {
      const response = await axiosInstance.put(
        `/courses/?courseId=${data.courseId}&lectureId=${data.lectureId}`, data.formDataToSend);

      // showing success message
      toast.update(loadingMessage, {
        render: "Lecture updated successfully",
        type: "success",
        autoClose: 1000,
        isLoading: false
      })
      return response?.data;
    } catch (error) {
      // showing error message
      toast.update(loadingMessage, {
        render: error?.response?.data?.message,
        type: "error",
        autoClose: 3000,
        closeButton: true,
        isLoading: false
      })
      // Throwing an error here so that the promise is rejected with the error message
      throw error;
    }
  }
)


const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLecture.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lectures;
        state.isLoading = false
      })
      .addCase(addCourseLecture.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lectures;
      })
      .addCase(updateCourseLecture.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lectures
      })
  },
});

export const { } = lectureSlice.actions;
export default lectureSlice.reducer;
