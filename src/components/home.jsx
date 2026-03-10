import React, { useEffect, useState } from "react";
import "../scss/home.scss";
import { NOW_PLAYING_URL, API_OPTIONS } from "../components/api/tmdb";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(NOW_PLAYING_URL, API_OPTIONS)
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.error("Fejl ved hentning af film:", err));
  }, []);

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

      {/* Coming Soon - Dynamiske film fra API */}
      <div className="section">
        <h3>Coming Soon</h3>

        <div className="coming-cards-container">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div className="coming-card" key={movie.id}>
                <div className="image-placeholder">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>

                <div className="movie-info">
                  <h4>{movie.title}</h4>
                  <p>{movie.release_date}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Loading movies...</p>
          )}
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