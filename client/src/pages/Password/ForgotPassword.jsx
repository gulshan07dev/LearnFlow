import React from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthForm from "../../components/auth/AuthForm"; 
import { forgetPassword } from "../../Redux/authSlice";
import { useDispatch } from "react-redux";

export default function ForgotPassword() {
  const dispatch = useDispatch();

  const handleForgotPassword = async ({ email }) => {
    await dispatch(forgetPassword(email))
  };

  return (
    <AuthLayout>
      <AuthForm
        title="Forgot Password"
        buttonText="Reset Password"
        onSubmit={handleForgotPassword}
        showAdditionalFields={false}
        showOnlyEmailField={true}
        showOnlyPasswordField={false}
      />
    </AuthLayout>
  );
}
