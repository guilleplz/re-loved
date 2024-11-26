import React from "react";

interface ArrowProps {
  color?: string;
}

const DownArrow = ({ color }: ArrowProps) => {
  return (
    <svg
      width="34"
      height="18"
      viewBox="0 0 34 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32.1668 1.5L17.0002 16.6667L1.8335 1.5"
        stroke={color? color : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownArrow;
