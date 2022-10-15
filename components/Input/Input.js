import React, { useState } from "react";
import IconMoon from "../../public/Moon";
import IconSun from "../../public/Sun";

const PasswordToggle = ({ type, inType, onToggle, disabled }) => {
  if (type !== "password") return "";
  const iconSun = (
    <div className="swap-on fill-current w-6 h-6">
      <IconSun />
    </div>
  );
  const iconMoon = (
    <div className="swap-on fill-current w-6 h-6">
      <IconMoon />
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

const Input = React.forwardRef(
  ({ label, type = "text", placeholder, ...props }, ref) => {
    const [inType, setInType] = useState(type);

    const classInput =
      "input input-bordered border-base-300 w-full mb-2 focus:input-primary disabled:bg-base-300 disabled:border-base-300";

    const togglePassword = (e) => {
      e.preventDefault();
      console.log({ inType });
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

    if (type !== "password")
      return <div className="form-control">{inputEl}</div>;

    return (
      <div className="form-control">
        <div className="input-group">
          {inputEl}
          <PasswordToggle
            type={type}
            inType={inType}
            onToggle={togglePassword}
            disabled={props.disabled}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

// FOR MORE INPUT CONFIGURATION CAN SEE ON:
// https://daisyui.com/components/input/

export default Input;
