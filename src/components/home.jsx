import React, { useEffect, useState } from "react";
import "../scss/home.scss";
import { NOW_PLAYING_URL, API_OPTIONS } from "../components/api/tmdb";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const moviesToShow = movies.slice(0, 4);

  const [user] = useState("John Doe");

  useEffect(() => {
    fetch(NOW_PLAYING_URL, API_OPTIONS)
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.error("Fejl ved hentning af film:", err));
  }, []);

  return (
    <div className="home">
      {/* HEADER */}
      <div className="header">
        <div>
          <p className="welcome">Welcome Back,</p>
          <h2>{user}</h2>
        </div>

        <div className="profile-pic">
          <img src="/images/logo.png" alt="profile" />
        </div>
      </div>

      {/* SEARCH */}
      <div className="search-bar">
        <input type="text" placeholder="Search your favourite movie" />
      </div>

      {/* COMING SOON */}
      <div className="section">
        <h3>Coming Soon</h3>

        <div className="coming-cards-container">
          {moviesToShow.length > 0 ? (
            moviesToShow.map((movie) => (
              <div
                className="coming-card"
                key={movie.id}
                style={{
                  backgroundImage: movie.poster_path
                    ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
                    : "none",
                }}
              >
                <div className="card-overlay" />

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

      {/* CINEMAS */}
      <div className="section">
        <div className="section-header">
          <h3>Cinema Near You</h3>
          <span>See all</span>
        </div>

        {/* CARD 1 */}
        <div className="cinema-card">
          <div className="cinema-logo">
            <img src="/images/img-cinema.png" alt="Viva Cinema" />
          </div>

          <div className="cinema-info">
            <p className="distance">📍 5,2 Kilometers</p>
            <h4>Viva Cinema</h4>
            <p className="closed">Closed 10.00 PM</p>
          </div>

          <div className="rating">⭐ 4,9</div>
        </div>

        {/* CARD 2 */}
        <div className="cinema-card">
          <div className="cinema-logo">
            <img src="/images/ebonylife.png" alt="EbonyLife Cinema" />
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