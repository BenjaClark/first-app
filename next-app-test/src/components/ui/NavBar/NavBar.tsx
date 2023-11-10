import React, { useState, useContext } from "react";
import styles from "./NavBar.module.scss";
import MenuContext from "../../../context/MenuContext";
import ButtonIcon from "../ButtonIcon";

const NavBar = () => {
  const { showMenu, setShowMenu } = useContext(MenuContext);

  const handleToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={styles.navBar}>
      <nav>
        <ul className={styles.left}>
          <li className={styles.button}>
            <ButtonIcon onClick={handleToggle} icon="menu" />
          </li>
        </ul>

        <ul className={styles.right}>
          <ButtonIcon icon="monitoring" />
        </ul>

        <ul className={styles.right}>
          <ButtonIcon icon="qr_code_2" />
        </ul>

        <ul className={styles.right}>
          <ButtonIcon icon="inbox" />
        </ul>

        <ul className={styles.right}>
          <ButtonIcon icon="person" />
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
