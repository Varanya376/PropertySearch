import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link component for routing
import { useDrop } from "react-dnd"; // Import React DnD hook for drag-and-drop functionality
import PropertyList from "./propertyList"; // Import PropertyList component
import FilterForm from "./filterForm"; // Import FilterForm component for filtering properties

// Main component for the property search page
const PropertySearchPage = () => {
  // State hooks for managing various aspects of the component
  const [properties, setProperties] = useState([]); // Store all fetched properties
  const [filteredProperties, setFilteredProperties] = useState([]); // Store properties after applying filters
  const [favorites, setFavorites] = useState([]); // Store the favorite properties
  const [showFilterForm, setShowFilterForm] = useState(false); // Toggle filter form visibility
  const [viewingFiltered, setViewingFiltered] = useState(false); // Track whether the user is viewing filtered properties
  const [searchQuery, setSearchQuery] = useState(""); // Store search query for location-based search
  const [searchResult, setSearchResult] = useState([]); // Store properties that match search query

  // Fetch properties data from the properties.json file when the component mounts
  useEffect(() => {
    fetch("/properties.json") // Fetch the properties from JSON file
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load properties data"); // Throw error if the request fails
        }
        return res.json(); // Parse the JSON response
      })
      .then((data) => {
        setProperties(data.properties); // Set all properties in state
        setFilteredProperties(data.properties); // By default, show all properties
      })
      .catch((err) => console.error("Error fetching properties:", err)); // Log error if fetching fails
  }, []);

  // Handle filtering of properties based on user-selected filters
  const handleFilter = (filters) => {
    // Apply filters to the properties list based on user selection
    const filtered = properties.filter((property) => {
      const matchesType = filters.type === "Any" || property.type === filters.type;
      const matchesPrice =
        (!filters.minPrice || property.price >= parseInt(filters.minPrice)) &&
        (!filters.maxPrice || property.price <= parseInt(filters.maxPrice));
      const matchesBedrooms =
        (!filters.minBedrooms || property.bedrooms >= parseInt(filters.minBedrooms)) &&
        (!filters.maxBedrooms || property.bedrooms <= parseInt(filters.maxBedrooms));
      const matchesDate =
        (!filters.dateFrom || property.date >= parseInt(filters.dateFrom)) &&
        (!filters.dateTo || property.date <= parseInt(filters.dateTo));
      const matchesPostCode = filters.postCode === "Any" || property.postCode === filters.postCode;

      return matchesType && matchesPrice && matchesBedrooms && matchesDate && matchesPostCode;
    });

    // Update filtered properties if there are any matches, otherwise show an empty list
    if (filtered.length > 0) {
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties([]); // Clear filtered properties if no matches
    }

    setViewingFiltered(true); // Indicate that user is viewing filtered results
    setShowFilterForm(false); // Close the filter form after applying the filters
  };

  // Handle the "Back" button to return to the full property list
  const handleBack = () => {
    setFilteredProperties(properties); // Reset to show all properties
    setViewingFiltered(false); // Indicate that user is no longer viewing filtered properties
    setSearchResult([]); // Clear the search result
    setSearchQuery(""); // Reset the search query
  };

  // Handle adding/removing a property from the favorites list
  const handleFavorite = (property) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === property.id);
      if (isAlreadyFavorite) {
        return prevFavorites.filter((fav) => fav.id !== property.id); // Remove property from favorites
      } else {
        return [...prevFavorites, property]; // Add property to favorites
      }
    });
  };

  // Add property to favorites and persist it in localStorage
  const addFavorite = (property) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === property.id);
      if (!isAlreadyFavorite) {
        const updatedFavorites = [...prevFavorites, property]; // Add new property to favorites
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save updated favorites to localStorage
        return updatedFavorites; // Update favorites state
      }
      return prevFavorites; // Return previous state if already a favorite
    });
  };

  // Initialize favorites from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites); // Set favorites state from localStorage
    }
  }, []);

  // Setup drop zone for the favorite button using react-dnd
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PROPERTY", // Accept items with type "PROPERTY" (dragged properties)
    drop: (item) => addFavorite(item.property), // Add dropped property to favorites
    collect: (monitor) => ({
      isOver: monitor.isOver(), // Track hover state for visual feedback
    }),
  }));

  return (
    <div className="main-content">
      <div className="property-search-page">
        {/* Button container with filter, favorites, and back buttons */}
        <div className="button-container">
          {/* Filter Button */}
          {!viewingFiltered && !searchResult.length && (
            <button className="filter_button" onClick={() => setShowFilterForm(!showFilterForm)}>
              {showFilterForm ? "Close Filters" : "Open Filters"} {/* Toggle filter form visibility */}
            </button>
          )}

          {/* Favorites Button as Drop Zone */}
          <Link to="/favorites">
            <button
              className="favorite_button"
              ref={drop} // Attach drop functionality to the button
            >
              {isOver ? "Drop here to add to Favorites!" : "Favorites"} {/* Provide visual feedback during drop */}
            </button>
          </Link>

          {/* "Back to Main Search" Button */}
          {(viewingFiltered || searchResult.length > 0) && (
            <button className="back-button" onClick={handleBack}>
              Back to Main Search
            </button>
          )}
        </div>

        {/* Show filter form if toggled */}
        {showFilterForm && <FilterForm onFilter={handleFilter} />}

        {/* Render PropertyList with either filtered properties or search results */}
        <PropertyList
          properties={searchResult.length > 0 ? searchResult : filteredProperties} // Show search result if available
          favorites={favorites} // Pass favorites to PropertyList
          toggleFavorite={handleFavorite} // Pass handleFavorite to PropertyList
        />
      </div>
    </div>
  );
};

export default PropertySearchPage; // Export the component
