import React from "react";

import styles from "./Loader.module.scss";

import "bootstrap/dist/css/bootstrap.min.css";

interface IImage {
  width?: number;
}

const Loader = ({ width }: IImage) => {
  return (
    <div className={styles.loader} style={{ width, height: width }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
