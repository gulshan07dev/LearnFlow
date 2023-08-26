import React from "react";
import './auth.css'
import authBg from "../../assets/auth-bg.jpg";
import AuthForm from "./AuthForm";

export default function AuthLayout({ children }) {
  return (
    <section className="auth-section">
      <div className="image">
        <img src={authBg} alt="auth-bg" />
      </div>
      {children}
    </section>
  );
}
