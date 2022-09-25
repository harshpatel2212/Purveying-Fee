import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [data, setData] = useState({
    authenticated: false,
    city: "",
    state: "",
    ngo: {},
  });

  useEffect(() => {
    let ngo = localStorage.getItem("ngo");
    let city = localStorage.getItem("city");
    let state = localStorage.getItem("state");

    if (ngo) {
      ngo = JSON.parse(ngo);

      setData({
        ...data,
        authenticated: true,
        ngo: ngo,
      });
    }

    if (city && state) {
      console.log(city, state);
      setData({
        ...data,
        city,
        state,
      });
    }
  }, []);

  const updateData = (uData) => {
    setData({
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
