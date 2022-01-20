import React from "react";
import cn from "classnames";
import styles from "./RadioButton.module.scss";

const Radio = (props) => {
  const { className, id, name, children, checked, onChange, data, ...rest } =
    props;
  const radioClcassNames = cn(styles.label, styles.roundGreen, {
    [className]: Boolean(className),
  });

  const handleChange = (event) => {
    if (onChange) onChange(event, data);
  };

  return (
    <label className={radioClcassNames} htmlFor={id}>
      <input
        className={styles.input}
        id={id}
        type="radio"
        name={name}
        checked={checked}
        onChange={handleChange}
        {...rest}
      />
      <span className={styles.text}>{children}</span>
    </label>
  );
};

export default Radio;
