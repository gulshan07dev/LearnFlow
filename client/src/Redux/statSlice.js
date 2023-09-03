import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { toast } from "react-toastify";  
import { axiosInstance } from "../Helper/AxiosInstance";

const initialState = {
  allUsersCount: 0,
  subscribedUsersCount: 0,
};

// ....function to get the stats data from backend....
export const getStatsData = createAsyncThunk("getstat", async () => {
  const loadingMessage = toast.loading("Getting the stats...")
  try {
    const response = await axiosInstance.get(`/admin/stats/users`);
    toast.update(loadingMessage, {
      render: response?.data?.message,
      isLoading: false,
      type: "success",
      autoClose: 500
    })
     return response?.data
  } catch (error) {
    // showing error message
    toast.update(loadingMessage, {
      render: error?.response?.data?.message,
      autoClose: 3000,
      closeButton: true,
      type: "error",
      isLoading: false
    })
    // Throwing an error here so that the promise is rejected with the error message
    throw error;
  }
});

const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatsData.fulfilled, (state, action) => {
      state.allUsersCount = action?.payload?.allUsersCount;
      state.subscribedUsersCount = action?.payload?.subscribedUsersCount;
    });
  },
});

export const { } = statSlice.actions;
export default statSlice.reducer;
