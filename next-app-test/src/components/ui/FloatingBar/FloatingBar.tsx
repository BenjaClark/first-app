import React from "react";

import styles from "./FloatingBar.module.scss";

interface IFloatingBar {
  name: string;
}

const FloatingBar = ({ name }: IFloatingBar) => {
  return <div className={styles.floatingBar}>¡Bienvenido, {name}!</div>;
};

export default FloatingBar;
