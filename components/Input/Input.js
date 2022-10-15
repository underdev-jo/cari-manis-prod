import React, { useState } from "react";
import IconMoon from "../../public/Moon";
import IconSun from "../../public/Sun";

const PasswordToggle = ({ type, inType, onToggle }) => {
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
      className="btn btn-square btn-outline"
      type="button"
      onClick={onToggle}
    >
      {inType === "password" ? iconSun : iconMoon}
    </button>
  );
};

const Input = React.forwardRef(
  ({ label, type = "text", placeholder, ...props }, ref) => {
    const [inType, setInType] = useState(type);

    const classInput = "input input-bordered w-full mb-2 focus:input-primary";

    const togglePassword = (e) => {
      e.preventDefault();
      console.log({ inType });
      if (inType === "password") setInType("text");
      else setInType("password");
    };

    return (
      <div className="form-control">
        <div className="input-group">
          <input
            {...props}
            ref={ref}
            type={inType}
            placeholder={placeholder}
            className={classInput}
          />
          <PasswordToggle
            type={type}
            inType={inType}
            onToggle={togglePassword}
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
