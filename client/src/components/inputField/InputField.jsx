import React from "react";
import "./input.css";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="input-wrapper">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
        required
        disabled={disabled}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default InputField;
