import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const apiUrl = `https://gutendex.com/books/${id}`;

  useEffect(() => {
    fetchBookDetails();
  }, []);

  const fetchBookDetails = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setBook(data);
  };

  if (!book) return <Loader />;

  return (
    <div style={{
      padding: "20px"
    }}>
      <img src={book.formats['image/jpeg']} alt={book.title} />
      <h1>{book.title}</h1>
      <p ><span style={{fontWeight: "600"}}>Author: </span>{book.authors.map(a => a.name).join(', ')}</p>
      <p style={{width: "50%"}}><span style={{fontWeight: "600"}}>Genre: </span>{book.subjects.join(', ')}</p>
      
    </div>
  );
};

export default BookDetailsPage;
