import { createContext, useState } from "react";

const MenuContext = createContext({});

const MenuProvider = ({ children }: any) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleToggle = () => {
    setShowMenu(!showMenu);
  };

  const data = { showMenu, setShowMenu, handleToggle };

  return <MenuContext.Provider value={data}>{children}</MenuContext.Provider>;
};

export { MenuProvider };
export default MenuContext;
