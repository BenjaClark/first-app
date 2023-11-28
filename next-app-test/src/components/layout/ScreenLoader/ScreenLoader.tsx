import React, { ReactNode } from "react";

import styles from "./ScreenLoader.module.scss";
import Loader from "@/components/ui/Loader";

const ScreenLoader = () => {
  return (
    <div className={styles.screenLoader}>
      <Loader />
    </div>
  );
};

export default ScreenLoader;
