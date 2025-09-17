import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ isLoggedIn }) => {
  return (
    <header style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Title with Icon */}
      <h1 style={{ fontSize: '2.5rem', display: 'inline-flex', alignItems: 'center', color: '#333' }}>
        LibroHub
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40" // Matches the approximate font size of "BOOKIFY"
          height="40" // Matches the approximate font size of "BOOKIFY"
          fill="currentColor"
          className="bi bi-stack"
          viewBox="0 0 16 16"
          style={{ marginLeft: '10px' }} // Adds spacing between the text and the icon
        >
          <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.6.6 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.6.6 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.6.6 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535z" />
          <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.6.6 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0z" />
        </svg>
      </h1>

      {/* Navigation Links */}
      <nav style={{ marginTop: '20px' }}>
        <NavLink
          to="/"
          style={{
            textDecoration: 'none',
            color: '#007BFF',
            margin: '0 15px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
          }}
          activeStyle={{ color: '#0056b3', textDecoration: 'underline' }}
        >
          Home
        </NavLink>

        {/* Conditionally render the "Books" link only if the user is logged in */}
        {isLoggedIn && (
          <NavLink
            to="/books"
            style={{
              textDecoration: 'none',
              color: '#007BFF',
              margin: '0 15px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
            activeStyle={{ color: '#0056b3', textDecoration: 'underline' }}
          >
            Books
          </NavLink>
        )}

        <NavLink
          to="/Login"
          style={{
            textDecoration: 'none',
            color: '#007BFF',
            margin: '0 15px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
          }}
          activeStyle={{ color: '#0056b3', textDecoration: 'underline' }}
        >
          Login
        </NavLink>

        <NavLink
          to="/about"
          style={{
            textDecoration: 'none',
            color: '#007BFF',
            margin: '0 15px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
          }}
          activeStyle={{ color: '#0056b3', textDecoration: 'underline' }}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
