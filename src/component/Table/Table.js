import React, { forwardRef } from "react";
import cn from "classnames";
import styles from "./Table.module.scss";

export const Row = (props) => {
  const { className } = props;
  const rowClassName = cn(styles.row, { [className]: Boolean(className) });
  return <div className={rowClassName}>{props.children}</div>;
};

export const RowContain = (props) => {
  const { children, className } = props;
  const RowContainCn = cn(styles.rowContain, {
    [className]: Boolean(className),
  });

  return <div className={RowContainCn}>{children}</div>;
};

export const Cell = forwardRef((props, ref) => {
  const { children, className } = props;
  const cellCn = cn(styles.cell, {
    [className]: Boolean(className),
  });
  return <div className={cellCn}>{children}</div>;
});
