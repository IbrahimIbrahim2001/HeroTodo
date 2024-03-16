import { createContext } from "react";
import { useState } from "react";

export const VisibilityContext = createContext();

export default function VisibilityContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = (val = false) => {
    setIsOpen(val);
  };

  return (
    <VisibilityContext.Provider value={{ isOpen, toggle, setIsOpen }}>
      {children}
    </VisibilityContext.Provider>
  );
}
