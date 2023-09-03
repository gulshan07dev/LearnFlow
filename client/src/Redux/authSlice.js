import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance } from "../Helper/AxiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  data: JSON.parse(localStorage.getItem("data")) || {},
  role: localStorage.getItem("role") || "",
};

// ......function to handle signup.......
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  // showing loading message
  const loadingMessage = toast.loading(
    "Please wait! signing your account..."
  );
  try {
    const response = await axiosInstance.post(
      `/user/register`,
      data
    );
    // showing success message
    toast.update(loadingMessage, {
      render: response?.data?.message,
      type: "success",
      autoClose: 1000,
      isLoading: false,
    });

    return response.data;
  } catch (error) {
    // showing error message
    toast.update(loadingMessage, {
      render: error?.response?.data?.message,
      type: "error",
      closeButton: true,
      autoClose: 3000,
      isLoading: false,
    });
    // Throwing an error here so that the promise is rejected with the error message
    throw error;
  }
});

// .......function to handle login........
export const login = createAsyncThunk("auth/login", async (data) => {
  // showing loading message
  const loadingMessage = toast.loading("Please Wait! Logging into your account...");

  try {
    const response = await axiosInstance.post(
      `/user/login`,
      data
    );
    // showing success message
    toast.update(loadingMessage, {
      render: response?.data?.message,
      type: "success",
      autoClose: 1000,
      isLoading: false,
    });

    return response.data;
  } catch (error) {
    // showing error message
    toast.update(loadingMessage, {
      render: error?.response?.data?.message,
      type: "error",
      closeButton: true,
      autoClose: 3000,
      isLoading: false,
    });

    // Throwing an error here so that the promise is rejected with the error message
    throw error;
  }
});



// ........function to handle logout........
export const logout = createAsyncThunk("auth/logout", async () => {
  const loadingMessage = toast.loading(
    "Please Wait! Logging out your account..."
  );

  try {
    await axiosInstance.get(`/user/logout`);

    toast.update(loadingMessage, {
      render: "Logged out successfully",
      type: "success",
      autoClose: 1000,
      isLoading: false,
    });
  } catch (error) {
    toast.update(loadingMessage, {
      render: error?.response?.data?.message,
      type: "error",
      closeButton: true,
      autoClose: 2000,
      isLoading: false,
    });
    // Throwing an error here so that the promise is rejected with the error message
    throw error;
  }
});

// .......function to fetch user data.....
export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = await axiosInstance.get(`/user/me`);
    return res?.data;
  } catch (error) {
    toast.error(error.response.data.message);
    // Throwing an error here so that the promise is rejected with the error message
    throw error;
  }

});

// ......function to update user profile......
export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async (data) => {
    // showing loading message
    const loadingMessage = toast.loading(
      "Please Wait! updating your profile..."
    );
    try {
      const response = await axiosInstance.post(
        `/user/update/${data[0]}`,
        data[1]
      );
      // showing success message
      toast.update(loadingMessage, {
        render: response.data.message,
        type: "success",
        autoClose: 1000,
        isLoading: false,
      });
    } catch (error) {
      // showing error message
      toast.update(loadingMessage, {
        render: error.response.data.message,
        type: "error",
        closeButton: true,
        autoClose: 3000,
        isLoading: false,
      });
      // Throwing an error here so that the promise is rejected with the error message
      throw error;
    }
  }
);

// .....function to change user password.......
export const changePassword = createAsyncThunk(
  "/auth/changePassword",
  async (userPassword) => {
    // showing loading message
    const loadingMessage = toast.loading(
      "Please Wait! changing your password..."
    );
    try {
      const response = await axiosInstance.post(
        `/user/change-password`,
        userPassword,
      );
      //  showing success message
      toast.update(loadingMessage, {
        render: response.data.message,
        type: "success",
        autoClose: 2000,
        isLoading: false,
      });

    } catch (error) {
      toast.update(loadingMessage, {
        render: error.response.data.message,
        type: "error",
        closeButton: true,
        autoClose: 3000,
        isLoading: false,
      });
      // Throwing an error here so that the promise is rejected with the error message
      throw error;
    }
  }
);

// .....function to handle forget password......
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (email) => {
    // showing loading message
    const loadingMessage = toast.loading("Please Wait! sending email...");
    try {
      const response = await axiosInstance.post(
        `/user/reset`,
        { email }
      );
      //  showing success message
      toast.update(loadingMessage, {
        render: response.data.message,
        type: "success",
        autoClose: "false",
        closeButton: "true",
        isLoading: false,
      });
      return response.data
    } catch (error) {
      // showing error message
      toast.update(loadingMessage, {
        render: "Failed to send varification email!, please try again",
        type: "error",
        closeButton: true,
        autoClose: 3000,
        isLoading: false,
      });
      // Throwing an error here so that the promise is rejected with the error message
      throw error;
    }
  }
);


// .......function to reset the password......
export const resetPassword = createAsyncThunk("/user/reset", async (data) => {
  // showing loading message
  const loadingMessage = toast.loading("Please Wait! reseting your password...");
  try {
    const response = await axiosInstance.post(
      `/user/reset/${data.resetToken}`,
      { password: data.password }
    );
    // showing success message
    toast.update(loadingMessage, {
      render: response.data.message,
      type: "success",
      autoClose: 5000,
      closeButton: true,
      isLoading: false
    });
  } catch (error) {
    // showing error message
    toast.update(loadingMessage, {
      render: error.response.data.message,
      type: "error",
      closeButton: true,
      autoClose: 3000,
      isLoading: false
    });

    // Throwing an error here so that the promise is rejected with the error message
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // for user login
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })

      // for user signup
      .addCase(createAccount.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })

      // for user logout
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = {};
      })
      // for user details
      .addCase(getUserData.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      // Add this action to update the user data in the Redux store after a successful profile update
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.data = action?.payload?.user;
      })
  },

});

export const { } = authSlice.actions;
export default authSlice.reducer;
