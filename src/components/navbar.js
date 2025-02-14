import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation between routes
import { FaHome } from "react-icons/fa"; // Import Font Awesome Home Icon

// Navbar functional component
const Navbar = () => {
  // State to manage the toggle of the mobile menu
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to toggle the mobile menu state
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Main container for the navbar */}
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          {/* Link to the property search page */}
          <Link to="/propertySearchPage">
            {/* Font Awesome Home Icon */}
            <FaHome className="home-icon" />
          </Link>
        </div>

        {/* Menu Links Section */}
        <ul className={`navbar-menu ${isMobileMenuOpen ? "open" : ""}`}>
          {/* Contact Page Link */}
          <li>
            <Link to="/contact">CONTACT</Link>
          </li>

          {/* Property Search Page Link */}
          <li>
            <Link to="/propertySearchPage">SEARCH YOUR DREAM HOME HERE!</Link>
          </li>
        </ul>

        {/* Hamburger Icon Section for Mobile View */}
        <div className="navbar-hamburger" onClick={toggleMobileMenu}>
          {/* Display three bars for the hamburger menu */}
          <span className={`bar ${isMobileMenuOpen ? "close" : ""}`}></span>
          <span className={`bar ${isMobileMenuOpen ? "close" : ""}`}></span>
          <span className={`bar ${isMobileMenuOpen ? "close" : ""}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
