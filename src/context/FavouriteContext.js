import { createContext, useState } from "react";

export const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favouriteArr, setFavouriteArr] = useState([]);

  return (
    <FavouriteContext.Provider value={{ favouriteArr, setFavouriteArr }}>
      {children}
    </FavouriteContext.Provider>
  );
};