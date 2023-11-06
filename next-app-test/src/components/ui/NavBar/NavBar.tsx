import React, { useState } from "react";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleToggle = () => {
    setShowMenu(!showMenu);
  };

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
      <div
        className={styles.menu}
        style={{ left: showMenu ? "0px" : "-250px" }}
      >
        <div className={styles.item}>Programación</div>
        <div className={styles.subItem}>Tortas estándar</div>
        <div className={styles.subItem}>Productos individuales</div>
        <div className={styles.subItem}>
          <a href="/order">Pedidos (especiales y web)</a>
        </div>

        <div className={styles.subItem}>Masas especiales</div>
        <div className={styles.subItem}>Camara de refrigeración</div>

        <div className={styles.item}>Flujo de trabajo</div>
        <div className={styles.subItem}>Recepción en fábrica</div>
        <div className={styles.subItem}>Salida de fábrica</div>
        <div className={styles.subItem}>Revisión en camioneta</div>
        <div className={styles.subItem}>Despacho</div>
        <div className={styles.subItem}>Entrega al cliente</div>

        <div className={styles.item}>Procesos</div>
        <div className={styles.subItem}>Pedidos especiales</div>
        <div className={styles.subItem}>Registro de sobrantes</div>
        <div className={styles.subItem}>Revisión de Stock</div>
      </div>
    </div>
  );
};

export default NavBar;
