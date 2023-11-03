import React from "react";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <nav className={styles.NavBar}>
      <ul className="cont-ul">
        <li className="button">
          <button id="menu-button">
            <span className="material-symbols-outlined"> menu </span>
          </button>

          <ul className="menu" id="menu">
            <div className="item">Programación</div>
            <div className="sub-item">Tortas estándar</div>
            <div className="sub-item">Productos individuales</div>
            <div className="sub-item">
              <a href="C:\Users\benja\Documents\proyectos\Ejercicio práctico - El Parrón\form.html">
                Pedidos (especiales y web)
              </a>
            </div>

            <div className="sub-item">Masas especiales</div>
            <div className="sub-item">Camara de refrigeración</div>

            <div className="item">Flujo de trabajo</div>
            <div className="sub-item">Recepción en fábrica</div>
            <div className="sub-item">Salida de fábrica</div>
            <div className="sub-item">Revisión en camioneta</div>
            <div className="sub-item">Despacho</div>
            <div className="sub-item">Entrega al cliente</div>

            <div className="item">Procesos</div>
            <div className="sub-item">Pedidos especiales</div>
            <div className="sub-item">Registro de sobrantes</div>
            <div className="sub-item">Revisión de Stock</div>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
