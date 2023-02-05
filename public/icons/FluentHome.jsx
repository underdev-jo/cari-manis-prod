import React from "react";

function FluentHomeIcon({ size = 32 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M14.397 3.82a2.4 2.4 0 013.208 0l8.8 7.908a2.4 2.4 0 01.795 1.784V24.8a2.4 2.4 0 01-2.4 2.4h-4a2.4 2.4 0 01-2.4-2.4v-5.6a.8.8 0 00-.8-.8h-3.2a.8.8 0 00-.8.8v5.6a2.4 2.4 0 01-2.4 2.4h-4a2.4 2.4 0 01-2.4-2.4V13.512c0-.68.288-1.328.797-1.784l8.8-7.907zm2.137 1.191a.8.8 0 00-1.069 0l-8.8 7.907a.8.8 0 00-.265.594V24.8a.8.8 0 00.8.8h4a.8.8 0 00.8-.8v-5.6a2.4 2.4 0 012.4-2.4h3.2a2.4 2.4 0 012.4 2.4v5.6a.8.8 0 00.8.8h4a.8.8 0 00.8-.8V13.512a.798.798 0 00-.266-.594l-8.8-7.907z"
      ></path>
    </svg>
  );
}

export default FluentHomeIcon;
