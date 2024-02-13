"use client";
import { usePathname } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
export const Values = createContext();
const Context = ({ children }) => {
  const [currency, setCurrency] = useState("default");
  const [shopping, setShopping] = useState([]);
  const path = usePathname();
  const [pathLink, setPathLink] = useState();

  useEffect(() => {}, []);
  return (
    <Values.Provider
      value={{
        currency,
        setCurrency,
        shopping,
        setShopping,
        path,
        pathLink,
        setPathLink,
      }}
    >
      {children}
    </Values.Provider>
  );
};

export default Context;
