import { ReactNode, createContext, useState } from "react";

export const StoreContext = createContext<any>({});

interface IStoreProvider {
  children: ReactNode;
}

const dataSelect = [
  { value: "opcion1", text: "Sucursal 1", color: "red" },
  { value: "opcion2", text: "Sucursal 2", color: "green" },
  { value: "opcion3", text: "Sucursal 3", color: "blue" },
  { value: "opcion4", text: "Sucursal 4", color: "orange" },
];

const StoreProvider = ({ children }: IStoreProvider) => {
  const [store, setStore] = useState("Sucursal");
  const [color, setColor] = useState("yellow");

  return (
    <StoreContext.Provider
      value={{ store, setStore, color, setColor, dataSelect }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export { StoreProvider };
export default StoreContext;
