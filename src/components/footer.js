import React from "react";

// Footer functional component
function Footer() {
  return (
    <footer className="footer">
      {/* Wrapper for the footer content */}
      <div className="footer-content">
        {/* Copyright information */}
        <p>&copy; 2024 PropertyFinder. All Rights Reserved.</p>

        {/* Social media links */}
        <div className="social-media">
          {/* Link to the Facebook page */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer" // Ensures secure behavior when opening external links
          >
            <i className="fab fa-facebook"></i> {/* Font Awesome icon for Facebook */}
          </a>

          {/* Link to the Twitter page */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i> {/* Font Awesome icon for Twitter */}
          </a>

          {/* Link to the Instagram page */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i> {/* Font Awesome icon for Instagram */}
          </a>
        </div>

        {/* Contact information */}
        <p>
          <b>Contact us:</b> info@propertyfinder.com
        </p>
      </div>
    </footer>
  );
}

export default Footer;
