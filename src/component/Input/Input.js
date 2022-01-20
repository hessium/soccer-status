import React from "react";
import styles from "./Input.module.scss";

const Input = (props) => {
  const { onChange, placeholder } = props;

  return (
    <input
      onChange={onChange}
      placeholder={placeholder}
      className={styles.input}
    />
  );
};

export default Input;
