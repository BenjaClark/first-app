import React from "react";
import styles from "./Header.module.scss";

const Header = ({ label }: any) => {
  return (
    <div className={styles.Header}>
      <ul>
        <li>
          <label>{label}</label>
        </li>
      </ul>
    </div>
  );
};

export default Header;
