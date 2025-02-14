import React, { createContext, useState, useContext } from 'react';

// Create the FavoriteContext
// This is a React context that will be used to share the favorites data
// and functionality across the component tree.
const FavoriteContext = createContext();

// Provider component
// This component wraps around parts of the app that need access to the favorites state.
// It manages the favorites state and provides functions to interact with it.
export const FavoriteProvider = ({ children }) => {
  // State to store the list of favorite properties
  const [favorites, setFavorites] = useState([]);

  /**
   * Function to add a property to the favorites list.
   * - Takes a `property` object as input.
   * - Updates the `favorites` state by adding the new property to the current list.
   */
  const addFavorite = (property) => {
    setFavorites((prevFavorites) => [...prevFavorites, property]);
  };

  return (
    // The `FavoriteContext.Provider` component provides the `favorites` state
    // and the `addFavorite` function to all components wrapped by `FavoriteProvider`.
    <FavoriteContext.Provider value={{ favorites, addFavorite }}>
      {children} {/* Render child components that need access to the context */}
    </FavoriteContext.Provider>
  );
};

// Custom hook to use the FavoriteContext
// This simplifies the usage of the context in other components by wrapping
// the `useContext` hook and providing access to the `favorites` and `addFavorite`.
export const useFavorites = () => useContext(FavoriteContext);
