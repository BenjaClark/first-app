import React from "react";
import styles from "./Link.module.scss";

const Link = ({ label }: any) => {
  return (
    <div className={styles.Link}>
      <a href="/welcome">{label}</a>
    </div>
  );
};

export default Link;
