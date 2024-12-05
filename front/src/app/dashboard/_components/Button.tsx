import React from "react";
import styles from "./Button.module.css";
import Link from "next/link";
import { text } from "stream/consumers";

interface buttonProps {
  href: string;
  type: "yellow" | "normal";
  children: React.ReactNode;
}

const Button = ({ children, type, href }: buttonProps) => {
  return (
    <Link
      className={type == "normal" ? styles.normal : styles.accent}
      href={href}
    >
      {children}
    </Link>
  );
};

export default Button;
