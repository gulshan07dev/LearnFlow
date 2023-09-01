import React from "react";

export default function TextAreaField({
  rows,
  cols,
  name,
  label,
  value,
  onChange, 
}) {
  return (
    <div className="relative">
      <textarea
        className="mytextarea py-[11px] px-[10px]"
        rows={rows}
        cols={cols}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
        required
      />
      <label
        className={`absolute left-2.5 transition-all  text-[17px] pointer-events-none origin-[0%] text-[#8f8f8f]
        }`}
        id={name}
      >
        {label}
      </label>
    </div>
  );
}
