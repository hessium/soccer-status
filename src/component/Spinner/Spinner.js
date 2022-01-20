import React from "react";
import cn from "classnames";
import styles from "./Spinner.module.scss";

const Spinner = ({ size, variant, center }) => {
  const className = cn(styles.spinner, {
    [styles[variant]]: !!variant,
  });
  const containerClassName = cn({
    [styles.center]: center,
  });

  return (
    <div className={containerClassName}>
      <div style={{ fontSize: size }} className={className} />
    </div>
  );
};

export default Spinner;
