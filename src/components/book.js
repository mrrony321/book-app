import React from 'react';
import { Link } from 'react-router-dom';
// import heart from './assets/heart.png';
// import nonHeart from './assets/heartNon.png';

const BookCard = ({ book, isWishlisted, toggleWishlist }) => {
    return (
        <div className="book">
            <img src={book.formats['image/jpeg'] || 'default-cover.jpg'} alt={book.title} />
            <h3>{book.title}</h3>
            <p>Author: {book.authors.map(a => a.name).join(', ')}</p>
            <p>Genre: {book.subjects.slice(0, 1).join(', ')}</p>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 'auto'
            }}>
                <Link to={`/book/${book.id}`}>View Details</Link>
                <button style={{marginLeft: "30%"}} onClick={() => toggleWishlist(book.id)}>
                    {isWishlisted ? '❤️' : '♡'}
                </button>
            </div>

        </div>
    );
};

export default BookCard;
