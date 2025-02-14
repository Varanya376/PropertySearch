import React, { useState, useEffect } from "react";
import PropertyCard from "./propertyCard"; // Import the PropertyCard component

// Parent component that manages properties, favorites, and the logic
const PropertyListContainer = () => {
  // State for storing the list of properties fetched from the server
  const [properties, setProperties] = useState([]);
  
  // State for storing favorite properties
  const [favorites, setFavorites] = useState([]);
  
  // State for handling the search query input by the user
  const [searchQuery, setSearchQuery] = useState("");
  
  // State for holding the filtered properties based on the search query
  const [filteredProperties, setFilteredProperties] = useState([]);

  // Fetch properties from a JSON file when the component mounts
  useEffect(() => {
    fetch("/properties.json") // Fetch properties data from JSON file
      .then((response) => response.json()) // Convert response to JSON format
      .then((data) => {
        setProperties(data.properties); // Set the fetched properties in state
        setFilteredProperties(data.properties); // Initially, display all properties
      })
      .catch((error) => console.error("Error fetching properties:", error)); // Handle fetch errors

    // Load favorites from local storage when the component mounts
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites); // Set the loaded favorites in state
  }, []);

  // Function to toggle a property as a favorite
  const toggleFavorite = (property) => {
    // Check if the property is already a favorite
    const isFavorite = favorites.some((fav) => fav.id === property.id);

    // Update the list of favorites based on whether the property is already a favorite
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== property.id) // Remove property if it's a favorite
      : [...favorites, property]; // Add property to favorites if it's not already

    setFavorites(updatedFavorites); // Update the favorites state
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save updated favorites in local storage
  };

  // Function to filter properties based on the search query
  const handleSearch = (event) => {
    const query = event.target.value; // Get the search query from the input field
    setSearchQuery(query); // Update the searchQuery state with the input value
    
    if (query.trim() === "") {
      // If search query is empty, show all properties
      setFilteredProperties(properties);
    } else {
      // Otherwise, filter properties based on the location (case-insensitive)
      const filtered = properties.filter((property) =>
        property.location.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProperties(filtered); // Update filtered properties state
    }
  };

  // Return the JSX for the Property List Container component
  return (
    <div>
      <h1>Property List</h1>
      {/* Input field for search */}
      <input
        type="text"
        placeholder="Search by location"
        value={searchQuery} // Controlled input with the current search query
        onChange={handleSearch} // Call handleSearch on input change to filter properties
      />
      {/* Pass filtered properties and favorites to the PropertyList component */}
      <PropertyList
        properties={filteredProperties} // Pass filtered properties
        favorites={favorites} // Pass favorites list
        toggleFavorite={toggleFavorite} // Pass the toggleFavorite function
      />
    </div>
  );
};

// Child component that renders the list of properties and handles UI interactions
const PropertyList = ({ properties, favorites, toggleFavorite }) => {
  return (
    <div className="property-list-grid">
      {properties.length > 0 ? (
        // Render PropertyCard component for each property
        properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property} // Pass property details to PropertyCard
            isFavorite={favorites.some((fav) => fav.id === property.id)} // Check if the property is in favorites
            toggleFavorite={toggleFavorite} // Pass toggleFavorite function to handle favorite actions
          />
        ))
      ) : (
        <p>No properties found</p> // Display a message if no properties match the search query
      )}
    </div>
  );
};

export default PropertyListContainer; // Export the PropertyListContainer component
