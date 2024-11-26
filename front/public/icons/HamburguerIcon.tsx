import React from "react";

interface HamburguerIconProps {
  color: string;
}

const HamburguerIcon = ({color}: HamburguerIconProps) => {
  return (
    <svg
      width="27"
      height="25"
      viewBox="0 0 27 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_118_1952)">
        <path
          d="M26.1543 3.41422H0.154297M26.1543 13.0753H0.154297M26.1543 22.7364H0.154297"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_118_1952">
          <rect
            width="26"
            height="24"
            fill="white"
            transform="translate(0.154297 0.422546)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default HamburguerIcon;
