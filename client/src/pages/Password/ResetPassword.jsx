import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthForm from "../../components/auth/AuthForm";
import { resetPassword } from "../../Redux/authSlice";
import { useDispatch } from "react-redux";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const { resetToken } = useParams();
  console.log(resetToken);

  const handleResetPassword = async ({ password }) => {
    const data = {password, resetToken};
    await dispatch(resetPassword(data));
  };

  return (
    <AuthLayout>
      <AuthForm
        title="Reset Password"
        buttonText="Change Password"
        linkTo="/login"
        linkText="Back To Login"
        onSubmit={handleResetPassword}
        showAdditionalFields={false}
        showOnlyPasswordField={true}
      />
    </AuthLayout>
  );
}
