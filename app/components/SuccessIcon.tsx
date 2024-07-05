import React from "react";

/**
 * SuccessIcon component
 *
 * Displays an SVG icon indicating success.
 *
 * @returns {JSX.Element} The SuccessIcon component
 */
const SuccessIcon: React.FC = () => (
  <span className="icon-wrapper success">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6 text-custom-success-green"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  </span>
);

export default SuccessIcon;
