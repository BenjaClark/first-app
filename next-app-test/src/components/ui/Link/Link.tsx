import React from "react";
import styles from "./Link.module.scss";

interface ILink {
  label?: string;
}

const Link = ({ label }: ILink) => {
  return (
    <div className={styles.Link}>
      <a href="/welcome">{label}</a>
    </div>
  );
};

export default Link;
