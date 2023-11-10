import { ReactNode, createContext, useState } from "react";

export const ShapeContext = createContext<any>({});

interface IShapeProvider {
  children: ReactNode;
}
const dataSelectShape = [
  { value: "opcion1", text: "Cuadrada", color: "purple" },
  { value: "opcion2", text: "Redonda", color: "white" },
  { value: "opcion3", text: "Rectangular", color: "cyan" },
  { value: "opcion4", text: "Triangular", color: "gray" },
];

const ShapeProvider = ({ children }: IShapeProvider) => {
  const [shape, setShape] = useState("Forma");
  const [colorShape, setColorShape] = useState("red");

  return (
    <ShapeContext.Provider
      value={{ shape, setShape, colorShape, setColorShape, dataSelectShape }}
    >
      {children}
    </ShapeContext.Provider>
  );
};
export { ShapeProvider };
export default ShapeContext;
