import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './pages/homepage';
import WishlistPage from './pages/wishlist';
import BookDetailsPage from './pages/bookdetails';
import './styles.css';

function App() {
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || []);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://gutendex.com/books');
        const data = await response.json();
        setBooks(data.results); 
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const toggleWishlist = (bookId) => {
    let updatedWishlist = wishlist.includes(bookId)
      ? wishlist.filter(id => id !== bookId) 
      : [...wishlist, bookId]; 

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // save to localStorage
  };
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wishlist" element={<WishlistPage books={books} wishlist={wishlist} toggleWishlist={toggleWishlist}/>} />
        <Route path="/book/:id" element={<BookDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
