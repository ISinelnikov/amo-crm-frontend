import React from "react";
import styles from "./Subscription.module.css";
import Packages from "./Packages";

const Subscription = () => {
  return (
    <>
      <Packages className={styles.packages} />
    </>
  );
};

export default Subscription;
