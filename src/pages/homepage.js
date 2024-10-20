import React, { useState, useEffect, useRef } from 'react';
import BookList from '../components/booklist';
import Pagination from '../components/pagination';
import Loader from '../components/Loader';  
import './homepage.css'


const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10);
    const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || []);
    const [loading, setLoading] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]); 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
    const apiUrl = `https://gutendex.com/books/`;
    const dropdownRef = useRef(null); 
  
    useEffect(() => {
      fetchBooks(); 
    }, []);
  
    useEffect(() => {
      function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [dropdownRef]);
  
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setBooks(data.results);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1); 
    };
  
    const handleGenreChange = (genre) => {
      const updatedGenres = selectedGenres.includes(genre)
        ? selectedGenres.filter(g => g !== genre) 
        : [...selectedGenres, genre]; 
      setSelectedGenres(updatedGenres);
      setCurrentPage(1); 
    };
  
    const toggleWishlist = (bookId) => {
      let updatedWishlist;
  
      if (Array.isArray(wishlist)) {
        updatedWishlist = wishlist.includes(bookId)
          ? wishlist.filter(id => id !== bookId)
          : [...wishlist, bookId];
      } else {
        updatedWishlist = [bookId];
      }
  
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };
  
    const genres = Array.from(
      new Set(books.flatMap(book => book.subjects || [])) 
    );
  
    const filteredBooks = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenres = selectedGenres.length > 0 
        ? selectedGenres.some(genre => book.subjects.includes(genre))  
        : true;  
  
      return matchesSearch && matchesGenres;
    });
  
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  
    return (
      <div className='homePage'>
        <div className="filters">
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={handleSearch}  
          />
  
          <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-toggle" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {selectedGenres.length > 0
                ? selectedGenres.join(', ')
                : 'Select Genres'}
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {genres.map((genre, index) => (
                  <div
                    key={index}
                    className={`dropdown-item ${selectedGenres.includes(genre) ? 'selected' : ''}`}
                    onClick={() => handleGenreChange(genre)}
                  >
                    {genre}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
  
        {loading ? (
          <Loader />
        ) : (
          <BookList
            books={currentBooks}  
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        )}
  
        {!loading && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalBooks={filteredBooks.length} 
            booksPerPage={booksPerPage}
          />
        )}
      </div>
    );
  };

export default HomePage;
