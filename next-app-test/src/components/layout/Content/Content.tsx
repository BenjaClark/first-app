import React, { ReactNode } from "react";

import styles from "./Content.module.scss";

interface IContentCell {
  children: ReactNode;
  gap?: string;
  align?: string;
}

const ContentCell = ({ children, gap, align }: IContentCell) => {
  return (
    <div style={{ gap, justifyContent: align }} className={styles.contentCell}>
      {children}
    </div>
  );
};

interface IContentRow {
  children: ReactNode;
  gap?: string;
  align?: string;
  marginTop?: string;
}

const ContentRow = ({ children, gap, align, marginTop }: IContentRow) => {
  return (
    <div
      style={{ gap, alignItems: align, marginTop }}
      className={styles.contentRow}
    >
      {children}
    </div>
  );
};

export { ContentCell, ContentRow };
