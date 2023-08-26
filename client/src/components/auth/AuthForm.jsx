import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

export default function AuthForm({
  title,
  buttonText,
  linkTo,
  linkText,
  showForgotPasswordLink,
  showAdditionalFields,
  onSubmit,
  showOnlyEmailField,
  showOnlyPasswordField,
  isResetPassword = false,
  showChangePasswordField = false,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // for register user
      if (showAdditionalFields) {
        onSubmit({ email, password, fullName, avatar });
      }
      // for forgot password
      else if (showOnlyEmailField) {
        onSubmit({ email });
      }
      // for reset password
      else if (showOnlyPasswordField && !showChangePasswordField) {
        onSubmit({ password });
      }
      // for change password
      else if (showChangePasswordField) {
        onSubmit({ oldPassword, password });
      }
      // for login user
      else {
        onSubmit({ email, password });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="login-container">
      <Logo />
      <form onSubmit={handleSubmit}>
        <h1 className="section-heading">{title}</h1>
        {isResetPassword ? null : (
          <>
            {showOnlyEmailField ? (
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Enter Your Email.."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            ) : null}
            {showChangePasswordField && (
              <div className="input-field">
                <input
                  type="password"
                  placeholder="Enter Your Old Password.."
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
            )}
            {showOnlyPasswordField ? (
              <div className="input-field">
                <input
                  type="password"
                  placeholder={
                    showChangePasswordField || showOnlyPasswordField
                      ? "Enter Your New Password"
                      : "Enter Your Password"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            ) : null}
            {showAdditionalFields &&
              !showOnlyEmailField &&
              !showOnlyPasswordField && (
                <>
                  <label htmlFor="avatar-input" className="avatar">
                    {avatar ? (
                      <img src={URL.createObjectURL(avatar)} alt="Avatar" />
                    ) : (
                      <FaUserCircle />
                    )}
                    <input
                      type="file"
                      id="avatar-input"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setAvatar(file);
                        }
                      }}
                    />
                  </label>
                  <div className="input-field">
                    <input
                      type="text"
                      placeholder="Enter Your Full Name.."
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </>
              )}
          </>
        )}

        {!isResetPassword && !showOnlyEmailField && !showOnlyPasswordField && (
          <div className="input-field">
            <input
              type="email"
              placeholder="Enter Your Email.."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}

        {!showOnlyEmailField && !showOnlyPasswordField && (
          <div className="input-field">
            <input
              type="password"
              placeholder={
                isResetPassword
                  ? "Enter Your New Password.."
                  : "Enter Your Password.."
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        <button type="submit">{buttonText}</button>
        <div className="jump-user">
          {showForgotPasswordLink && (
            <NavLink to="/forgot-password">Forgot Password</NavLink>
          )}
          {linkTo && (
            <NavLink
              to={linkTo}
              style={{
                marginInline: showAdditionalFields ? "auto" : " ",
              }}
            >
              {linkText}
            </NavLink>
          )}
        </div>
      </form>
    </div>
  );
}
