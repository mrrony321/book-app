import React from 'react';
import './wishlistpage.css'; 

const WishlistPage = ({ books, wishlist, toggleWishlist }) => {
  const wishlistBooks = books.filter(book => wishlist.includes(book.id));
  

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>
      {wishlistBooks.length === 0 ? (
        <p>No books in your wishlist.</p>
      ) : (
        <div className="book-list-wishlist">
          {wishlistBooks.map(book => (
            <div key={book.id} className="book-item">
              <img src={book.formats['image/jpeg']} alt={book.title} className="book-cover" />
              <div className="book-details">
                <h3>{book.title}</h3>
                <p>By: {book.authors.map(author => author.name).join(', ')}</p>
                <p>Genre: {book.subjects ? book.subjects.join(', ') : 'N/A'}</p>
                <button className="wishlist-btn" onClick={() => toggleWishlist(book.id)}>
                  {wishlist.includes(book.id) ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
