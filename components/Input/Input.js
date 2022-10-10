import React from "react";

const Input = React.forwardRef(
  ({ label, type = "text", placeholder, ...props }, ref) => (
    <input
      {...props}
      ref={ref}
      type={type}
      placeholder={placeholder}
      className="input input-bordered w-full mb-2 focus:input-primary"
    />
  )
);

Input.displayName = "Input";

// FOR MORE INPUT CONFIGURATION CAN SEE ON:
// https://daisyui.com/components/input/

export default Input;
