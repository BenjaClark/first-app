import React from "react";
import styles from "./Link.module.scss";

const Link = () => {
  return (
    <div className={styles.Link}>
      <a href="/welcome">Ir a otra página</a>
    </div>
  );
};

export default Link;
