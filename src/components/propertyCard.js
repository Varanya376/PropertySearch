import React from "react";
import { useDrag } from "react-dnd"; // React DnD hook for drag-and-drop functionality
import { Link } from 'react-router-dom'; // For navigation between routes

// PropertyCard component
const PropertyCard = ({ property, isFavorite, toggleFavorite }) => {
  // React DnD useDrag hook for enabling drag behavior
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PROPERTY", // Specifies the type of item being dragged
    item: { property }, // Pass the entire property object as the drag item
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Tracks whether the item is currently being dragged
    }),
  }));

  return (
    <div
      className="property-card" // Container for the property card
      ref={drag} // Attach the ref from React DnD to enable drag functionality
      style={{ opacity: isDragging ? 0.5 : 1 }} // Adjust the opacity while dragging for visual feedback
    >
      {/* Property Image Section */}
      <div className="property-image-wrapper">
        <img
          src={require(`../image/${property.picture}`)} // Dynamically require the property image
          alt={property.location} // Alt text for the image
          className="property-image" // Image styling class
        />
      </div>

      {/* Property Details Section */}
      <div className="property-details">
        <h3>{property.location}</h3> {/* Display the property location */}
        <p>Type: {property.type}</p> {/* Display the property type */}
        <p>Bedrooms: {property.bedrooms}</p> {/* Display the number of bedrooms */}
        <p>Price: £{property.price}</p> {/* Display the property price */}
        <p>{property.description.substring(0, 100)}...</p> {/* Display a short description with ellipsis */}

        {/* Action Buttons Section */}
        <div className="button-flex">
          {/* Link to the property details page */}
          <Link to={`/property/${property.id}`}>
            <button className="property-btn">View Details</button> {/* Button to navigate to details */}
          </Link>

          {/* Toggle Favorite Button */}
          <button
            className="property-btn"
            onClick={() => toggleFavorite(property)} // Call the toggleFavorite function on click
          >
            {/* Conditional rendering for favorite button text */}
            {isFavorite ? "❤️ Remove from Favorites" : "♡ Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
