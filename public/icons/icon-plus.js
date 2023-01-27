import React from "react";

function IconPlus({ size = 12 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
    >
      <path
        fill="currentColor"
        d="M11 6.832H6.834v4.166a.833.833 0 01-1.667 0V6.832H1a.833.833 0 010-1.667h4.167V.998a.833.833 0 011.667 0v4.167H11a.833.833 0 010 1.667z"
      ></path>
    </svg>
  );
}

export default IconPlus;
