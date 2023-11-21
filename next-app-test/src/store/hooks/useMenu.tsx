import { shallow } from "zustand/shallow";

import { menuStore } from "@/store/zustand/menuStore";

export const useMenu = () => {
  const { showMenu, setShowMenu } = menuStore(
    (state) => ({
      showMenu: state.showMenu,
      setShowMenu: state.setShowMenu,
    }),
    shallow
  );

  return {
    showMenu,
    setShowMenu,
  };
};
