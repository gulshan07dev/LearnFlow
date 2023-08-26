import React from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthForm from "../../components/auth/AuthForm"; 
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changePassword } from "../../Redux/authSlice";

export default function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangePassword = async ({ oldPassword, password }) => {
    const userPassword = {
      oldPassword,
      newPassword: password
    }
    await dispatch(changePassword(userPassword))
  };

  return (
    <AuthLayout>
      <AuthForm
        title="Change Password"
        buttonText="Change Password"
        onSubmit={handleChangePassword}
        showForgotPasswordLink
        showOnlyPasswordField
        showChangePasswordField
      />
    </AuthLayout>
  );
}
