import React from "react";

import styles from "./Content.module.scss";

const ContentCell = ({ children, gap, align }: any) => {
  return (
  <div style={{ gap, justifyContent: align }} className={styles.ContentCell}>
    {children}
    </div>
  );
  
};

const ContentRow = ({ children, gap, align }: any) => {
  return (
    <div style={{ gap, alignItems: align }} className={styles.ContentRow}>
      {children}
    </div>
  );
};

export { ContentCell, ContentRow };
