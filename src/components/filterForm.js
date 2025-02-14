import React, { useState } from "react";

// FilterForm component for capturing and managing filter inputs
const FilterForm = ({ onFilter }) => {
  // State variables for each filter input
  const [type, setType] = useState("Any"); // Property type (House, Apartment, or Any)
  const [minPrice, setMinPrice] = useState(""); // Minimum price
  const [maxPrice, setMaxPrice] = useState(""); // Maximum price
  const [minBedrooms, setMinBedrooms] = useState(""); // Minimum number of bedrooms
  const [maxBedrooms, setMaxBedrooms] = useState(""); // Maximum number of bedrooms
  const [postCode, setPostCode] = useState("Any"); // Postcode filter
  const [dateFrom, setDateFrom] = useState(""); // Starting date for filtering
  const [dateTo, setDateTo] = useState(""); // Ending date for filtering

  /**
   * Handles the submission of the filter form.
   * - Prevents default form behavior (page reload).
   * - Creates a `filters` object with the current filter criteria.
   * - Passes the `filters` object to the `onFilter` callback provided by the parent component.
   */
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission from reloading the page
    const filters = {
      type,
      minPrice,
      maxPrice,
      minBedrooms,
      maxBedrooms,
      postCode,
      dateFrom,
      dateTo,
    };
    onFilter(filters); // Send the filter data to the parent component
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      {/* Dropdown for selecting property type */}
      <label>
        Property Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Any">Any</option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
        </select>
      </label>

      {/* Input for minimum price */}
      <label>
        Min Price:
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min Price"
          min="300000" // Minimum allowed price
          step="1000" // Increment step
        />
      </label>

      {/* Input for maximum price */}
      <label>
        Max Price:
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max Price"
          min="300000" // Minimum allowed price
          step="1000" // Increment step
        />
      </label>

      {/* Input for minimum number of bedrooms */}
      <label>
        Min Bedrooms:
        <input
          type="number"
          value={minBedrooms}
          onChange={(e) => setMinBedrooms(e.target.value)}
          placeholder="Min Bedrooms"
          min="0" // Minimum allowed number of bedrooms
          max="10" // Maximum allowed number of bedrooms
        />
      </label>

      {/* Input for maximum number of bedrooms */}
      <label>
        Max Bedrooms:
        <input
          type="number"
          value={maxBedrooms}
          onChange={(e) => setMaxBedrooms(e.target.value)}
          placeholder="Max Bedrooms"
          min="0" // Minimum allowed number of bedrooms
          max="10" // Maximum allowed number of bedrooms
        />
      </label>

      {/* Input for postcode */}
      <label>
        Post Code:
        <input
          type="text"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)} // Updates the state
          placeholder="E.g: NW1" // Example placeholder
        />
      </label>

      {/* Date picker for selecting the start date */}
      <label>
        Date From:
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)} // Updates the state
        />
      </label>

      {/* Date picker for selecting the end date */}
      <label>
        Date To:
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)} // Updates the state
        />
      </label>

      {/* Submit button for applying filters */}
      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default FilterForm;
