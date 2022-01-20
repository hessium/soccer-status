import React from "react";
import cn from "classnames";
import styles from "./Button.module.scss";

const Button = (props) => {
  const { children, className, onClick, variant } = props;

  const btnCN = cn(styles.button, {
    [styles[variant]]: Boolean(variant),
    [className]: Boolean(className),
  });
  return (
    <button className={btnCN} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
