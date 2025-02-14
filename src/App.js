import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend'; // Import this to set up DnD
import Navbar from './components/navbar';
import Footer from './components/footer';
import HomePage from './components/homePage';
import ContactPage from './components/contact';
import PropertySearchPage from './components/propertySearchPage';
import FavouritesList from './components/favouriteList';
import PropertyDetailPage from './components/propertyDetailPage';
import './index.css';

const App = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch properties data from the public folder
    fetch('/properties.json')
      .then((response) => response.json())
      .then((data) => setProperties(data))
      .catch((error) => console.error('Error loading properties:', error));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}> {/* Providing DnD context with HTML5Backend */}
        <Router>
          <Navbar />
          <div className="App-content">
            <Routes>
            <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/propertySearchPage" element={<PropertySearchPage />} />
              <Route path="/favorites" element={<FavouritesList />} />
              <Route path="/property/:id" element={<PropertyDetailPage properties={properties} />} />
            </Routes>
          </div>
          <Footer />
        </Router>
    </DndProvider>
  );
};

export default App;
