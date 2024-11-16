// components/Home/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css';
import Button from '../components/button'; // Import the reusable Button component

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Car Rental Service</h1>
      <p>
        Find the best car rental deals, convenient pick-up and drop-off locations,
        and various car options to suit your needs. Affordable and reliable car
        rentals with flexible booking options.
      </p>
      <div className="home-buttons">
        <Link to="/login">
          <Button text="Login" /> {/* Reusable Button with "Login" text */}
        </Link>
        <Link to="/signup">
          <Button text="Sign Up" /> {/* Reusable Button with "Sign Up" text */}
        </Link>
      </div>
    </div>
  );
}

export default Home;
