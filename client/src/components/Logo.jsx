import React from "react";
import { NavLink } from "react-router-dom";
import LogoImg from "../assets/logo.png";

export default function Logo() {
  return (
    <NavLink className="logo" to="/">
      <img src={LogoImg} alt="logo" className="scale-150" />
    </NavLink>
  );
}
