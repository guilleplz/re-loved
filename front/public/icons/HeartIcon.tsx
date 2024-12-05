import React from "react";

interface HeartProps {
  color?: string
  fill?: string
}

const HeartIcon = ({color, fill} : HeartProps) => {
  return (
    <svg
      width="24"
      height="23"
      viewBox="0 0 24 23"
      fill={fill? fill : "#000000"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0072 3.29866C4.47775 -3.38221 -3.03808 5.96913 3.49659 12.65L12.0086 22L20.522 12.6487C27.0252 5.96913 19.5094 -3.38354 12.0072 3.29866Z"
        fill="#182237"
        stroke={color? color : "#000000"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HeartIcon;
