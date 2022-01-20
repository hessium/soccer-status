import React from "react";
import Button from "../../Button/Button";

import styles from "./Error403.module.scss";

const Error403 = () => (
  <div className={styles.content}>
    <div className={styles.wrap}>
      <h2 className={styles.title}>
        Sorry, this page is temporarily unavilable
      </h2>
      <a href="/">
        <Button className={styles.mainBtn} variant="rounded">
          Main page
        </Button>
      </a>
      <div className={styles.text}>Not a valid API token</div>
    </div>
  </div>
);

export default Error403;
