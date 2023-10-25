import React from "react";
import cn from "classnames";
import styles from "./Switch.module.css";

const Switch = ({ className, value, onChange, disabled = false }) => {
  return (
    <label className={cn(styles.switch, className)}>
      <input
        className={styles.input}
        type="checkbox"
        checked={value}
        onChange={onChange}
        disabled={disabled}
      />
      <span className={styles.inner}>
        <span className={styles.box}></span>
      </span>
    </label>
  );
};

export default Switch;
