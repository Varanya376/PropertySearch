import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // For accessing route parameters
import { Tabs, TabList, Tab, TabPanel } from "react-tabs"; // React Tabs library for tabbed UI
import "react-tabs/style/react-tabs.css"; // Default styles for the tabs

// PropertyDetails component
const PropertyDetails = () => {
  const { id } = useParams(); // Extract the property ID from the route parameters
  const [properties, setProperties] = useState([]); // State to hold the list of properties
  const [loading, setLoading] = useState(true); // State to track loading status
  const [currentIndex, setCurrentIndex] = useState(0); // State for carousel's current image index

  // Fetch property data on component mount
  useEffect(() => {
    fetch("/properties.json") // Fetch data from a JSON file
      .then((response) => response.json())
      .then((data) => {
        setProperties(data.properties || []); // Store properties in state
        setLoading(false); // Set loading to false once data is loaded
      })
      .catch((error) => {
        console.error("Error loading properties:", error); // Log any errors
        setLoading(false);
      });
  }, []);

  // Find the property matching the ID from the route
  const property = properties.find((p) => p.id === id);

  // Handle next button click for the carousel
  const handleNext = () => {
    if (property?.images) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % property.images.length);
    }
  };

  // Handle previous button click for the carousel
  const handlePrev = () => {
    if (property?.images) {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + property.images.length) % property.images.length
      );
    }
  };

  // Handle thumbnail click to jump to a specific image in the carousel
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  // Show loading message while data is being fetched
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Show a message if the property is not found
  if (!property) {
    return <div className="loading">Property not found.</div>;
  }

  // Construct Google Maps embed URL if coordinates are available
  const embedMapUrl = property.coordinates
    ? `https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&hl=en&z=14&output=embed`
    : null;

  return (
    <div className="property-detail-page">
      {/* Header Section */}
      <div className="property-header">
        {/* Carousel Section */}
        <div className="carousel-container">
          <div className="carousel">
            {/* Display the current image in the carousel */}
            {property.images && property.images.length > 0 ? (
              <img
                className="carousel-image"
                src={require(`../image/${property.images[currentIndex]}`)} // Dynamically require image
                alt={`Property Image ${currentIndex + 1}`}
              />
            ) : (
              <img
                className="carousel-image"
                src="https://via.placeholder.com/500" // Placeholder for missing images
                alt="Placeholder"
              />
            )}
          </div>
          <div className="carousel-controls">
            {/* Carousel navigation buttons */}
            <button onClick={handlePrev}>&lt;</button>
            <button onClick={handleNext}>&gt;</button>
          </div>
          {/* Thumbnails for carousel */}
          <div className="thumbnails">
            {property.images && property.images.length > 0
              ? property.images.map((image, index) => (
                  <img
                    key={index}
                    className={`thumbnail ${
                      currentIndex === index ? "active-thumbnail" : ""
                    }`} // Highlight active thumbnail
                    src={require(`../image/${image}`)}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => handleThumbnailClick(index)} // Set the current index on click
                  />
                ))
              : null}
          </div>
        </div>

        {/* Property Info Section */}
        <div className="property-info">
          <h1 className="property-title">{property.type || "Unknown Type"}</h1>
          <p className="price">£{property.price?.toLocaleString() || "N/A"}</p>
          <p className="location">{property.location || "Unknown Location"}</p>
          <p className="short-description">
            {property.description || "No description available."}
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs className="react-tabs">
        <TabList>
          <Tab>Description</Tab> {/* Tab for detailed description */}
          <Tab>Floor Plan</Tab> {/* Tab for floor plan */}
          <Tab>Map</Tab> {/* Tab for map */}
        </TabList>

        {/* Tab Content */}
        <TabPanel>
          {/* Long description displayed as paragraphs */}
          {property.longDescription ? (
            property.longDescription
              .split("\n") // Split long description into paragraphs
              .filter((paragraph) => paragraph.trim() !== "") // Filter out empty paragraphs
              .map((paragraph, index) => <p key={index}>{paragraph}</p>) // Render each paragraph
          ) : (
            <p>No detailed description available.</p>
          )}
        </TabPanel>

        <TabPanel>
          {/* Floor Plan Section */}
          {property.floorPlan ? (
            <img
              className="floor-plan"
              src={require(`../image/${property.floorPlan}`)} // Dynamically require floor plan
              alt="Floor Plan"
            />
          ) : (
            <p>No floor plan available.</p>
          )}
        </TabPanel>

        <TabPanel>
          {/* Map Section */}
          {embedMapUrl ? (
            <iframe
              src={embedMapUrl} // Embed Google Maps iframe
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Property Map"
            ></iframe>
          ) : (
            <p>No map available for this location.</p>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyDetails;
