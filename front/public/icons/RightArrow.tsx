import React from "react";

interface ArrowProps {
  color?: string;
}

const RightArrow = ({color}: ArrowProps) => {
  return (
    <svg
      width="19"
      height="12"
      viewBox="0 0 19 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6H1M18 6L13.1429 11M18 6L13.1429 1"
        stroke={color? color : "#0000"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RightArrow;
