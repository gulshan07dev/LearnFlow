import React from "react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthForm from "../components/auth/AuthForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createAccount } from "../Redux/authSlice";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get the dispatch function from react-redux

  const handleSignup = async ({ fullName, email, password, avatar }) => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar instanceof File) {
      formData.append("avatar", avatar);
    }
    // checking the empty fields
    if (!fullName || !email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    // calling create account action
    const res = await dispatch(createAccount(formData));

    // redirect to home page if user successfully signup
    if (res?.payload?.success) navigate("/");
  };

  return (
    <AuthLayout>
      <AuthForm
        title="Create an Account, Register"
        buttonText="Register"
        linkTo="/login"
        linkText="Already have an account? Login"
        onSubmit={handleSignup} // Pass handleSignup for the signup page
        showAdditionalFields={true} // Set to true for the signup page
      />
    </AuthLayout>
  );
}
