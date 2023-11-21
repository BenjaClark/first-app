"use client";

import React, { useState, useContext } from "react";
import styles from "./Menu.module.scss";
import Link from "next/link";
import { useMenu } from "@/store/hooks";

const Menu = () => {
  const { showMenu } = useMenu();
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
        { title: "Registro de Persona", path: "/Person" },
        { title: "Obtener Persona", path: "/getPerson" },
        { title: "Registro de Empresa", path: "/Company" },
        { title: "Obtener Empresa", path: "/getCompany" },
        { title: "Registro de Usuario", path: "/User" },
        { title: "Obtener Usuario", path: "/getUser" },
        { title: "Registro de Customer", path: "/Customer" },
        { title: "Obtener Customer", path: "/getCustomer" },
        { title: "Registro de Producto", path: "/Product" },
        { title: "Obtener Producto", path: "/getProduct" },
        { title: "Registro de Invoice", path: "/Invoice" },
        { title: "Obtener Invoice", path: "/getInvoice" },
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
