"use client";

import React, { useState, useContext } from "react";
import styles from "./Menu.module.scss";
import MenuContext from "../../../context/MenuContext";
import Link from "next/link";

const Menu = () => {
  const { showMenu } = useContext(MenuContext);
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
      title: "Procesos",
      path: "/process",
      subTitle: [
        { title: "Pedidos especiales", path: "/order" },
        { title: "Registro de sobrantes", path: "/order" },
        { title: "Revisión de Stock", path: "/order" },
      ],
    },
  ];

  return (
    <div className={styles.menu} style={{ left: showMenu ? "0px" : "-250px" }}>
      {data.map((item, key) => (
        <>
          <div key={key} className={styles.item}>
            {item.title}
          </div>

          {item.subTitle.map((subItem, key) => (
            <>
              <Link className={styles.linkMenu} href={item.path + subItem.path}>
                <div key={key} className={styles.subItem}>
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
