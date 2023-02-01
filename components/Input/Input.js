import { Moon, Sun } from "public/icons";
import React, { useState } from "react";

const PasswordToggle = ({ type, inType, onToggle, disabled }) => {
  if (type !== "password") return "";
  const iconSun = (
    <div className="swap-on fill-current w-6 h-6">
      <Sun />
    </div>
  );
  const iconMoon = (
    <div className="swap-on fill-current w-6 h-6">
      <Moon />
    </div>
  );

  return (
    <button
      className="btn btn-square btn-outline border-base-300 disabled:border-base-300 disabled:bg-base-300"
      type="button"
      onClick={onToggle}
      disabled={disabled}
    >
      {inType === "password" ? iconSun : iconMoon}
    </button>
  );
};

const Error = ({ error }) => {
  if (!error) return "";
  return (
    <div className="badge badge-error gap-2 mt-2 h-auto text-xs">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block w-4 h-4 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
      {error}
    </div>
  );
};

const Input = React.forwardRef(
  ({ label, type = "text", placeholder, error, after, ...props }, ref) => {
    const [inType, setInType] = useState(type);

    const classInput =
      "input input-bordered border-base-300 w-full focus:input-primary disabled:bg-base-300 disabled:border-base-300";

    const togglePassword = (e) => {
      e.preventDefault();
      if (inType === "password") setInType("text");
      else setInType("password");
    };

    let inputEl = (
      <input
        {...props}
        ref={ref}
        type={inType}
        placeholder={placeholder}
        className={classInput}
      />
    );

    const labelView = (
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
    );

    const passwordToggle = (
      <PasswordToggle
        type={type}
        inType={inType}
        onToggle={togglePassword}
        disabled={props.disabled}
      />
    );

    let afterView = "";
    if (type === "password") afterView = passwordToggle;
    else if (after) afterView = <span>{after}</span>;

    return (
      <div className="form-control mb-2">
        {label && labelView}
        <label className={after || type === "password" ? "input-group" : ""}>
          {inputEl}
          {afterView}
        </label>
        <Error error={error} />
      </div>
    );
  }
);

Input.displayName = "Input";

// FOR MORE INPUT CONFIGURATION CAN SEE ON:
// https://daisyui.com/components/input/

export default Input;
