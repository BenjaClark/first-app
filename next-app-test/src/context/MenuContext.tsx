import { ReactNode, createContext, useState } from "react";

const MenuContext = createContext<any>({});

interface IMenuProvider {
  children: ReactNode;
}

const MenuProvider = ({ children }: IMenuProvider) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <MenuContext.Provider value={{ showMenu, setShowMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export { MenuProvider };
export default MenuContext;
