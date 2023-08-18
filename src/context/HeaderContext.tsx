import React, { createContext, useContext, useState } from "react";

// Tạo context
interface HeaderContextProps {
  active: boolean;
  setActive: (active: boolean) => void;
}

const HeaderContext = createContext<HeaderContextProps>({
  active: true,
  setActive: () => {},
});

// Tạo Provider
interface HeaderProviderProps {
  children: React.ReactNode;
}

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [active, setActive] = useState(false);

  return (
    <HeaderContext.Provider value={{ active, setActive }}>
      {children}
    </HeaderContext.Provider>
  );
};

// Hook để truy cập vào giá trị `active` từ thành phần con
export const useHeaderContext = () => useContext(HeaderContext);
