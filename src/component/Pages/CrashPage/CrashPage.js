import React from "react";
import styles from "./CrashPage.module.scss";

const CrashPage = () => (
  <div className={styles.page}>
    <div className={styles.content}>
      <div className={styles.wrap}>
        <h1 className={styles.title}>Sorry, something is wrong</h1>
        <div className={styles.text}>
          Please, refresh page or try again later.
        </div>
      </div>
    </div>
  </div>
);

export default CrashPage;
