import React, { ReactNode } from "react";

import styles from "./OptionHeader.module.scss";

interface IOptionOverlay {
  children: ReactNode;
}
interface IOptionHeader {
  children: ReactNode;
  tittle: string;
}
interface IOptionBody {
  children: ReactNode;
}

const OptionOverlay = ({ children }: IOptionOverlay) => {
  return <div className={styles.overlay}>{children}</div>;
};

const OptionHeader = ({ children, tittle }: IOptionHeader) => {
  return (
    <div className={styles.header}>
      <h1>{tittle}</h1>
      <div className={styles.contentHeader}>{children}</div>
    </div>
  );
};

const OptionBody = ({ children }: IOptionBody) => {
  return <div className={styles.body}>{children}</div>;
};

export { OptionBody, OptionHeader, OptionOverlay };
