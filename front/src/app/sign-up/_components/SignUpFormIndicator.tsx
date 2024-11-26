import React from "react";
import styles from "./SignUpFormIndicator.module.css";

interface IndicatorProps {
  step: number;
}

const setColor = (step: number, currenStep: number) => {
  return step >= currenStep ? styles.active : null
};

const SignUpFormIndicator = ({ step }: IndicatorProps) => {
  return (
    <div className={styles.indicator}>
      <div className={`${styles.step} ${setColor(step, 0)}`}>1</div>

      <div className={`${styles.line} ${setColor(step, 1)}`}></div>

      <div className={`${styles.step} ${setColor(step, 1)}`}>2</div>

      <div className={`${styles.line} ${setColor(step, 2)}`}></div>

      <div className={`${styles.step} ${setColor(step, 2)}`}>3</div>
    </div>
  );
};

export default SignUpFormIndicator;
