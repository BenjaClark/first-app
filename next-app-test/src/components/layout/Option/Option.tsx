import React, { ReactNode } from "react";

import NavBar from "@/components/ui/NavBar";
import Menu from "@/components/ui/Menu/Menu";

import styles from "./Option.module.scss";
import FloatingBar from "@/components/ui/FloatingBar";
import { useFloatingBar } from "@/store/hooks";

interface IOption {
  children: ReactNode;
  userName?: string;
}

const Option = ({ children }: IOption) => {
  const { name } = useFloatingBar();

  return (
    <div className={styles.option}>
      <NavBar />
      <Menu />
      <FloatingBar name={name} />
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default Option;
