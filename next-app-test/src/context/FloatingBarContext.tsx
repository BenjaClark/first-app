import { ReactNode, createContext, useState } from "react";

const FloatingBarContext = createContext<any>({});

interface IStoreProvider {
  children: ReactNode;
}

const FloatingBarProvider = ({ children }: IStoreProvider) => {
  const [name, setName] = useState("Usuario");

  return (
    <FloatingBarContext.Provider value={{ name, setName }}>
      {children}
    </FloatingBarContext.Provider>
  );
};
export { FloatingBarProvider };
export default FloatingBarContext;
