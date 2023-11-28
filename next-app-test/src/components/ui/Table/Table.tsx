import styles from "./Table.module.scss";

const Table = ({ height, width, children }: any) => {
  return (
    <div
      className={styles.table}
      style={{ height: height ? height : "calc(100vh - 100px)", width }}
    >
      {children}
    </div>
  );
};

const TableHeader = ({ children }: any) => {
  return <div className={styles.tableHeader}>{children}</div>;
};

const TableDetail = ({ children }: any) => {
  return <div className={styles.tableDetail}>{children}</div>;
};

const TableRow = ({ onClick, children }: any) => {
  return (
    <div className={styles.tableRow} onClick={onClick}>
      {children}
    </div>
  );
};

const TableCell = ({ width, align, children }: any) => {
  return (
    <div className={styles.tableCell} style={{ width, justifyContent: align }}>
      <p>{children}</p>
    </div>
  );
};

export { Table, TableHeader, TableDetail, TableRow, TableCell };
