import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: [],
};

// ....function to get the api key...
export const getRazorPayId = createAsyncThunk("/razorPayId/get", async () => {
  try {
    const response = await axios.get(`${apiUrl}/payments/razorpay-key`, { withCredentials: true });
    return response.data;
  } catch (error) {
    toast.error("Failed to load data");
  }
});

// .....function to purchase the course bundle....
export const purchaseCourseBundle = createAsyncThunk(
  "/purchaseCourse",
  async () => {
    try {
      const response = await axios.post(`${apiUrl}/payments/subscribe`, { data: {} }, { withCredentials: true });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      // Throw the error again so that it gets propagated to the rejected action
      throw error;
    }
  }
);


// .....function to verify the user payment....
export const verifyUserPayment = createAsyncThunk(
  "/verifyPayment",
  async (paymentDetail) => {
    try {
      const response = await axios.post(`${apiUrl}/payments/verify`, {
        razorpay_payment_id: paymentDetail.razorpay_payment_id,
        razorpay_subscription_id: paymentDetail.razorpay_subscription_id,
        razorpay_signature: paymentDetail.razorpay_signature,
      }, { withCredentials: true, headers: { "Content-Length": "application/json" } });
      return response?.data;
    } catch (error) {
      toast.error("error?.response?.data?.message");
    }
  }
);

// .....function to get all the payment record....
export const getPaymentRecord = createAsyncThunk("paymentrecord", async () => {
  const loadingMessage = toast.loading("Getting the payments record...");
  try {
    const response = await axios.get(`${apiUrl}/payments?count=100`, { withCredentials: true });

    // showing success message
    toast.update(loadingMessage, {
      render: response?.data?.message,
      type: "success",
      autoClose: 500,
      isLoading: false
    })
    console.log(response?.data);
    return response?.data;
  } catch (error) {
    // showing error message
    toast.update(loadingMessage, {
      render: "Failed to get payment records",
      type: "error",
      autoClose: 3000,
      isLoading: false,
      closeButton: true
    })
    // Throw the error again so that it gets propagated to the rejected action
    throw error;
  }
});

// function to cancel the course bundle subscription
export const cancelCourseBundle = createAsyncThunk(
  "/cancelCourse",
  async () => {
    const loadingMessage = toast.loading("Unsubscribing the bundle...");
    try {
      const response = await axios.post(`${apiUrl}/payments/unsubscribe`, {}, {
        withCredentials: true
      });

      // showing success message
      toast.update(loadingMessage, {
        render: "Bundle unsubscibed successfully",
        type: "success",
        autoClose: 500,
        isLoading: false
      })
      return response?.data;
    } catch (error) {    
      // showing error message
      toast.update(loadingMessage, {
        render: error?.response?.data?.message,
        type: "error",
        autoClose: 3000,
        isLoading: false,
        closeButton: true
      })
      // Throw the error again so that it gets propagated to the rejected action
      throw error;
    }
  }
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorPayId.rejected, () => {
        toast.error("Failed to get razor pay id");
      })
      .addCase(getRazorPayId.fulfilled, (state, action) => {
        state.key = action?.payload?.Key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action?.payload?.subscription_id;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(verifyUserPayment.rejected, (state, action) => {
        toast.error(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.allPayments;
        state.finalMonths = action?.payload?.finalMonths;
        state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
      });
  },
});

export const { } = razorpaySlice.actions;
export default razorpaySlice.reducer;
