import React, { useState, useContext } from "react";
import styles from "./NavBar.module.scss";
import MenuContext from "../Menu/MenuContext";

const NavBar = () => {
  const handleToggle = useContext(MenuContext);

  return (
    <div className={styles.navBar}>
      <nav>
        <ul className={styles.left}>
          <li className={styles.button}>
            <button id="menu-button" onClick={handleToggle}>
              <span className="material-symbols-outlined">
                <span className="material-symbols-outlined">menu</span>
              </span>
            </button>
          </li>
        </ul>

        <ul className={styles.right}>
          <span className="material-symbols-outlined"> monitoring</span>
        </ul>

        <ul className={styles.right}>
          <span className="material-symbols-outlined"> qr_code_2 </span>
        </ul>

        <ul className={styles.right}>
          <span className="material-symbols-outlined"> inbox </span>
        </ul>

        <ul className={styles.right}>
          <span className="material-symbols-outlined"> person </span>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
