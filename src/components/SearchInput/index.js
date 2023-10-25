import React from "react";
import cn from "classnames";
import styles from "./Form.module.css";
import Icon from "../Icon";

const Form = ({
  className,
  onSubmit,
  placeholder,
  value,
  setValue,
  type,
  name,
  icon,
}) => {
  return (
    <form className={cn(className, styles.form)} action="" onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
    }}>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={(event) => {
            setValue(event.target.value);
        }}
        name={name}
        placeholder={placeholder}
      />
      <button className={styles.result}>
        <Icon name={icon} size="24" />
      </button>
    </form>
  );
};

export default Form;
