import { ReactNode, createContext, useContext, useState } from "react";

const StoreContext = createContext<any>({});

interface IStoreProvider {
  children: ReactNode;
}

const colors = {
  blue: "blue",
  red: "red",
  white: "white",
  green: "green",
};

const stores = {
  Antofagasta: "Antofagasta",
  Valparaíso: "Valparaíso",
  Santiago: "Santiago",
  Arica: "green",
};

export const StoreProvider = ({ children }: IStoreProvider) => {
  const [label, setLabel] = useState("Sucursal");
  const [bgColor, setBgColor] = useState("white");

  return (
    <StoreContext.Provider value={{ label, setLabel, bgColor, setBgColor }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore debe ser usado dentro de un StoreProvider");
  }

  return context;
};
