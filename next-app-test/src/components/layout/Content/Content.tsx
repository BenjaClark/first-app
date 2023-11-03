import React from "react";

import styles from "./Content.module.scss";

const ContentCell = ({ children, gap, align, marginTop }: any) => {
  return (
    <div style={{ gap, justifyContent: align }} className={styles.contentCell}>
      {children}
    </div>
  );
};

const ContentRow = ({ children, gap, align, marginTop }: any) => {
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
