import React from "react";
import "../scss/home.scss";

const Home = () => {
  return (
    <div className="home">

      {/* Header */}
      <div className="header">
        <div>
          <p className="welcome">Welcome Back,</p>
          <h2>Osyyy</h2>
        </div>

        <div className="profile-pic">
          {/* profile image here */}
        </div>
      </div>


      {/* Search */}
      <div className="search-bar">
        <input type="text" placeholder="Search your favourite movie" />
      </div>


      {/* Coming Soon */}
      <div className="section">
        <h3>Coming Soon</h3>

        <div className="coming-card">

          <div className="image-placeholder">
            {/* movie image here */}
          </div>

          <div className="movie-info">
            <h4>Resident Evil - Racoon City</h4>
            <p>November 2021</p>
          </div>

        </div>
      </div>


      {/* Cinema Near You */}
      <div className="section">

        <div className="section-header">
          <h3>Cinema Near You</h3>
          <span>See all</span>
        </div>

        <div className="cinema-card">

          <div className="cinema-logo">
            {/* cinema logo here */}
          </div>

          <div className="cinema-info">
            <p className="distance">📍 5,2 Kilometers</p>
            <h4>Viva Cinema</h4>
            <p className="closed">Closed 10.00 PM</p>
          </div>

          <div className="rating">⭐ 4,9</div>

        </div>


        <div className="cinema-card">

          <div className="cinema-logo">
            {/* cinema logo here */}
          </div>

          <div className="cinema-info">
            <p className="distance">📍 6,5 Kilometers</p>
            <h4>EbonyLife Cinema</h4>
            <p className="closed">Closed 09.00 PM</p>
          </div>

          <div className="rating">⭐ 5,0</div>

        </div>

      </div>

    </div>
  );
};

export default Home;