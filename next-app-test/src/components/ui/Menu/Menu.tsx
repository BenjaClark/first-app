"use client";

import React, { useState, useContext } from "react";
import styles from "./Menu.module.scss";
import Link from "next/link";
import { useMenu } from "@/store/hooks";

const Menu = () => {
  const { showMenu, setShowMenu } = useMenu();

  const handleItemClick = () => {
    setShowMenu(false);
  };

  const data = [
    {
      title: "Programacion",
      path: "/programming",
      subTitle: [
        { title: "Tortas estándar", path: "/cake" },
        { title: "Productos individuales", path: "/products" },
        { title: "Pedidos (especiales y web)", path: "/order" },
        { title: "Masas especiales", path: "/specials" },
        { title: "Camara de refrigeración", path: "/refrigeration" },
      ],
    },
    {
      title: "Flujo de trabajo",
      path: "/flux",
      subTitle: [
        { title: "Recepción en fábrica", path: "/reception" },
        { title: "Salida de fábrica", path: "/reception" },
        { title: "Revisión en camioneta", path: "/reception" },
        { title: "Despacho", path: "/reception" },
        { title: "Entrega al cliente", path: "/reception" },
      ],
    },

    {
      title: "Registro",
      path: "/register",
      subTitle: [
        { title: "Persona", path: "/person" },
        { title: "Empresa", path: "/company" },
        { title: "Usuario", path: "/user" },
        { title: "Cliente", path: "/customer" },
        { title: "Producto", path: "/product" },
        { title: "Invoice", path: "/invoice" },
      ],
    },
  ];

  return (
    <div className={styles.menu} style={{ left: showMenu ? "0px" : "-250px" }}>
      {data.map((item, index) => (
        <>
          <div key={index} className={styles.item}>
            {item.title}
          </div>

          {item.subTitle.map((subItem, subIndex) => (
            <>
              <Link
                key={subIndex}
                className={styles.linkMenu}
                href={item.path + subItem.path}
              >
                <div
                  key={subIndex}
                  className={styles.subItem}
                  onClick={handleItemClick}
                >
                  {subItem.title}
                </div>
              </Link>
            </>
          ))}
        </>
      ))}
    </div>
  );
};

export default Menu;
