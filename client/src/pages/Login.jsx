import React from "react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthForm from "../components/auth/AuthForm"; 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Redux/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async ({ email, password }) => {
    // checking the empty fields
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    // calling login action
    const res = await dispatch(login({ email, password }));
    console.log(res);
    // redirect to home page if user successfully login
    if (res?.payload?.success) navigate("/");
  };

  return (
    <AuthLayout>
      <AuthForm
        title="Welcome Back👋🏻, Login"
        buttonText="Login"
        linkTo="/signup"
        linkText="Do not have an account? Register"
        showForgotPasswordLink={true}
        onSubmit={handleLogin}
        showAdditionalFields={false}
      />
    </AuthLayout>
  );
}
