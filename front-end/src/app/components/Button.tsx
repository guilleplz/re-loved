import React from "react";

interface ButtonProps {
  text: string;
  variant?: "default" | "google";
}

const Button: React.FC<ButtonProps> = ({ text, variant = "default" }) => {
  const buttonClass = variant === "google" ? "btn-google" : "btn-default";
  return <button className={buttonClass}>{text}</button>;
};

export default Button;
