import React, { useState, useContext } from "react";
import styles from "./Menu.module.scss";
import MenuContext from "../Menu/MenuContext";

const Menu = () => {
  const showMenu = useContext(MenuContext);
  return (
    <div className={styles.menu} style={{ left: showMenu ? "0px" : "-250px" }}>
      <div className={styles.menu}>
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

export default Menu;
