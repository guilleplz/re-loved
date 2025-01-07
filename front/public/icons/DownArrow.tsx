import React from "react";

interface ArrowProps {
  color?: string;
  width?: number;
  heigth?: number;
}

const DownArrow = ({ color, width, heigth }: ArrowProps) => {
  return (
    <svg
      width={width? width: "34"}
      height={heigth? heigth: "18"}
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
