import React from 'react';
import BookCard from './book';
import './booklist.css'

const BookList = ({ books, wishlist, toggleWishlist }) => {
  return (
    <div className="book-list">
      {books.map(book => (
        <BookCard
          key={book.id}
          book={book}
          isWishlisted={wishlist.includes(book.id)}
          toggleWishlist={toggleWishlist}
        />
      ))}
    </div>
  );
};

export default BookList;
