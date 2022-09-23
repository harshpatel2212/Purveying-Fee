import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [data, setData] = useState({
    city: "",
    state: "",
    ngo: {},
  });

  useEffect(() => {
    let ngo = localStorage.getItem("ngo");

    if (ngo) {
      ngo = JSON.parse(ngo);

      setData({
        ...data,
        ngo: ngo,
      });
    }
  }, []);

  const updateData = (uData) => {
    setUserData({
      ...data,
      ...uData,
    });

    if (uData.ngo) localStorage.setItem("ngo", JSON.stringify(uData.ngo));
  };

  return (
    <GlobalContext.Provider
      value={{
        data,
        updateData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// hook for using the global context
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContext, GlobalContextProvider };
