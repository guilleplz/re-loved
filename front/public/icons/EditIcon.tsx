import React from "react";

interface EditIconProps {
  color?: string;
  width?: number;
  heigth?: number;
}

const EditIcon = ({color, width, heigth} : EditIconProps) => {
  return (
    <svg
      width={width? width : "18"}
      height={heigth? heigth : "18"}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.304 2.84399L15.156 5.69599M5 4.99999H2C1.73478 4.99999 1.48043 5.10535 1.29289 5.29289C1.10536 5.48042 1 5.73478 1 5.99999V16C1 16.2652 1.10536 16.5196 1.29289 16.7071C1.48043 16.8946 1.73478 17 2 17H13C13.2652 17 13.5196 16.8946 13.7071 16.7071C13.8946 16.5196 14 16.2652 14 16V11.5M16.409 1.58999C16.5964 1.7773 16.745 1.99969 16.8464 2.24445C16.9478 2.48921 17 2.75156 17 3.01649C17 3.28143 16.9478 3.54378 16.8464 3.78854C16.745 4.0333 16.5964 4.25569 16.409 4.44299L9.565 11.287L6 12L6.713 8.43499L13.557 1.59099C13.7442 1.40353 13.9664 1.25481 14.2111 1.15334C14.4558 1.05186 14.7181 0.999634 14.983 0.999634C15.2479 0.999634 15.5102 1.05186 15.7549 1.15334C15.9996 1.25481 16.2218 1.40353 16.409 1.59099V1.58999Z"
        stroke= {color ? color : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EditIcon;
