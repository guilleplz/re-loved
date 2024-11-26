import React from "react";

interface HeartProps {
  color?: string;
  fill?: string;
} 

const Heart = ({color, fill}: HeartProps) => {
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill={fill? fill : "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.05498 2.72067C3.54498 -2.28033 -1.95502 4.71967 2.82698 9.72067L9.05598 16.7197L15.286 9.71967C20.045 4.71967 14.545 -2.28133 9.05498 2.72067Z"
        stroke={color? color : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Heart;
