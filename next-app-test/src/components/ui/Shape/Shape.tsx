"use client";

import React, { useContext } from "react";

import styles from "./Shape.module.scss";
import ShapeContext from "@/context/ShapeContext";

interface IButton {
  label?: string;
  bgColor?: string;
}

const Shape = ({ label, bgColor }: IButton) => {
  const { shape, colorShape } = useContext(ShapeContext);

  return (
    <div className={styles.button}>
      <button style={{ backgroundColor: colorShape }}>{shape}</button>
    </div>
  );
};

export default Shape;
