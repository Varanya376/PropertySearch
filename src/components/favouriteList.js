import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd"; // Importing the useDrop hook for drag-and-drop functionality
import { useNavigate } from "react-router-dom"; // Hook for navigation between routes
import PropertyCard from "./propertyCard"; // Importing the PropertyCard component to display property details

const FavoritesPage = () => {
  // State to store the list of favorite properties
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Load favorites from local storage when the component mounts
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites); // Initialize the favorites state
  }, []);

  /**
   * Drop zone for removing a single property from favorites.
   * - Accepts items of type "PROPERTY".
   * - When a property is dropped, it's removed from the favorites list.
   */
  const [{ isOverRemove }, dropRemove] = useDrop(() => ({
    accept: "PROPERTY", // The accepted drag type
    drop: (item) => {
      // Remove the dragged property from the favorites list
      setFavorites((prevFavorites) => {
        const updatedFavorites = prevFavorites.filter(
          (fav) => fav.id !== item.property.id
        );
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
        return updatedFavorites;
      });
    },
    collect: (monitor) => ({
      isOverRemove: monitor.isOver(), // Tracks if an item is being dragged over the drop zone
    }),
  }));

  /**
   * Drop zone for adding properties to favorites.
   * - Accepts items of type "PROPERTY".
   * - Prevents duplicate entries when adding a property.
   */
  const [{ isOverFavorites }, dropFavorites] = useDrop(() => ({
    accept: "PROPERTY", // The accepted drag type
    drop: (item) => {
      if (!favorites.some((fav) => fav.id === item.property.id)) {
        // Check if the property is already a favorite
        const newFavorites = [...favorites, item.property];
        setFavorites(newFavorites); // Update the state
        localStorage.setItem("favorites", JSON.stringify(newFavorites)); // Update localStorage
      }
    },
    collect: (monitor) => ({
      isOverFavorites: monitor.isOver(), // Tracks if an item is being dragged over the drop zone
    }),
  }));

  /**
   * Function to remove a property from favorites.
   * - Filters out the property with the given ID.
   * - Updates the favorites state and localStorage.
   */
  const removeFavorite = (propertyId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (fav) => fav.id !== propertyId
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
      return updatedFavorites;
    });
  };

  return (
    <div className="main-content">
      <div className="favorite-page">
        {/* Button to clear all favorites */}
        <div className="button-container">
          <button
            className="clear-button"
            onClick={() => {
              setFavorites([]); // Clear the state
              localStorage.removeItem("favorites"); // Remove from localStorage
            }}
          >
            Clear All Favorites
          </button>

          {/* Back to Main Search Button and Drop Zone for removing properties */}
          <div
            ref={dropRemove} // Attach the drop zone for removing properties
            className={`back-button ${isOverRemove ? "dragging-over" : ""}`} // Add a visual indicator when dragging over
            onClick={() => navigate("/propertySearchPage")} // Navigate to the search page
          >
            {isOverRemove
              ? "Drop here to remove properties from favorites!" // Message when dragging over
              : "Back to Main Search"} 
          </div>
        </div>

        <h1>Favorite Properties</h1>

        {/* Drop Zone for adding properties to favorites */}
        <div
          ref={dropFavorites} // Attach the drop zone for adding favorites
          className={`favorites-grid ${isOverFavorites ? "dragging-over" : ""}`} // Add a visual indicator when dragging over
        >
          {/* Display favorite properties */}
          <div className="property-list-grid">
            {favorites.length > 0 ? (
              favorites.map((property) => (
                <div key={property.id} className="property-card-wrapper">
                  {/* Render PropertyCard with the favorite property details */}
                  <PropertyCard
                    property={property}
                    toggleFavorite={() => removeFavorite(property.id)} // Remove the property when toggled
                    isFavorite={true} // Mark as a favorite
                  />
                </div>
              ))
            ) : (
              <p>
                No favorite properties yet. Drag a property from the search page
                to add it to your favorites!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
