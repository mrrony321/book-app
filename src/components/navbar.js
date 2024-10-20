import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'

const Navbar = () => {
  return (
    <nav>
      <Link to="/" style={{textDecoration: 'none', color:'white'}}><h1>Book Store</h1></Link>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/wishlist">Wishlist</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
