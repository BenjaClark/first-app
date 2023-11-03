import React from "react";

const Menu = ({ isOpen, toggleMenu }: any) => {
  return (
    <div className={`burger-menu ${isOpen ? "open" : ""}`}>
      <ul>
        <li>
          <a href="#">Inicio</a>
        </li>
        <li>
          <a href="#">Acerca de</a>
        </li>
        <li>
          <a href="#">Servicios</a>
        </li>
        <li>
          <a href="#">Contacto</a>
        </li>
      </ul>
      <button onClick={toggleMenu}>Cerrar</button>
    </div>
  );
};

export default Menu;
