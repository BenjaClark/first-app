import React from "react";
import Images from "next/image";
import styles from "./Image.module.scss";

interface IImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const Image = ({ src, alt, width, height }: IImage) => {
  return (
    <div className={styles.Image}>
      <Images src={src} alt={alt} width={width} height={height} />
    </div>
  );
};

export default Image;
