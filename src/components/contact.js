import React, { useState } from "react";

// Define the Contact component
function Contact() {
  // State to store the form data (name, email, and message)
  const [formData, setFormData] = useState({
    name: "", // Initial state for the name field
    email: "", // Initial state for the email field
    message: "", // Initial state for the message field
  });

  // Function to handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    // Update the formData state dynamically based on the input's name attribute
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    alert("Message Sent! We'll get back to you soon."); // Display a confirmation message to the user
    // Reset the form fields to their initial state
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="main-content">
      {/* Container for the contact section */}
      <div className="contact">
        <h1>Contact Us</h1> {/* Heading for the contact form */}

        {/* Form for user input */}
        <form onSubmit={handleSubmit}>
          {/* Input for the user's name */}
          <div className="form-group">
            <label htmlFor="name">Name</label> {/* Label for the name field */}
            <input
              type="text" // Input type for a single-line text
              id="name" // Unique identifier for the input field
              name="name" // Name attribute matches the key in the formData state
              value={formData.name} // Bind the input value to the state
              onChange={handleChange} // Call handleChange when the value changes
              required // Make this field mandatory
            />
          </div>

          {/* Input for the user's email */}
          <div className="form-group">
            <label htmlFor="email">Email</label> {/* Label for the email field */}
            <input
              type="email" // Input type for email (validates email format)
              id="email" // Unique identifier for the input field
              name="email" // Name attribute matches the key in the formData state
              value={formData.email} // Bind the input value to the state
              onChange={handleChange} // Call handleChange when the value changes
              required // Make this field mandatory
            />
          </div>

          {/* Input for the user's message */}
          <div className="form-group">
            <label htmlFor="message">Message</label> {/* Label for the message field */}
            <textarea
              id="message" // Unique identifier for the textarea field
              name="message" // Name attribute matches the key in the formData state
              value={formData.message} // Bind the textarea value to the state
              onChange={handleChange} // Call handleChange when the value changes
              required // Make this field mandatory
            ></textarea>
          </div>

          {/* Button to submit the form */}
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact; // Export the Contact component to be used in other parts of the app
