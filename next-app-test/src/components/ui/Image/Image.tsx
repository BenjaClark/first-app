import React from "react";
import Images from 'next/image'
import styles from "./Image.module.scss";

const Image = ({src, alt, width, height}: any) => {
  return (
    <div className={styles.Image}>
      <Images src={src} alt={alt} width={width} height={height}/>
    </div>
  );
};

export default Image;