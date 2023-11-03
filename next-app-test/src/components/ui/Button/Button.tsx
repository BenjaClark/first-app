import React from "react";

import styles from "./Button.module.scss";

const Button = (text: any) => {
  return (
    <div className={styles.Button}>
      <button type="submit">Ingresar</button>
    </div>
  );
};

export default Button;
