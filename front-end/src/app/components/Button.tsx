import React from "react";
import styles from "@/styles/Button.module.css";


interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({ text, onClick, type = "button", disabled }: ButtonProps) {
  return (
    <button className={styles.button} onClick={onClick} type={type} disabled={disabled}>
      {text}
    </button>
  );
}
