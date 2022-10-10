import React from "react";

export default function Input({ label, type = "text", placeholder, ...props }) {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full"
        {...props}
      />
    </div>
  );
}

// FOR MORE INPUT CONFIGURATION CAN SEE ON:
// https://daisyui.com/components/input/
