import React, { useEffect, useMemo, useState } from "react";
import "../scss/explore.scss";
import { NOW_PLAYING_URL, API_OPTIONS } from "./api/tmdb";

const UPCOMING_URL = "https://api.themoviedb.org/3/movie/upcoming";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function formatStars(voteAverage) {
  const fullStars = Math.round(voteAverage / 2);
  const emptyStars = 5 - fullStars;
  return "★".repeat(fullStars) + "☆".repeat(emptyStars);
}

export default function Explore() {
  const [activeTab, setActiveTab] = useState("now");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = activeTab === "now" ? NOW_PLAYING_URL : UPCOMING_URL;

    fetch(url, API_OPTIONS)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results ?? []);
      })
      .catch((err) => {
        console.error("Fejl ved hentning af film:", err);
        setMovies([]);
      })
      .finally(() => setLoading(false));
  }, [activeTab]);

  const topMovies = useMemo(() => movies.slice(0, 4), [movies]);
  const recommendedMovies = useMemo(() => movies.slice(4, 8), [movies]);

  return (
    <div className="explore">
      <header className="explore-header">
        <button type="button" className="icon-btn back" aria-label="Back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="title">
          <h1>Explore Movie</h1>
        </div>

        <button type="button" className="icon-btn search" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      <div className="tabs">
        <button type="button" className={`tab ${activeTab === "now" ? "active" : ""}`} onClick={() => setActiveTab("now")}>
          Now Showing
        </button>
        <button type="button" className={`tab ${activeTab === "upcoming" ? "active" : ""}`} onClick={() => setActiveTab("upcoming")}> 
          Upcoming
        </button>
      </div>

      <section className="section">
        <div className="section-header">
          <h2>Top Movies</h2>
          <span>See more</span>
        </div>

        <div className="card-row">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            topMovies.map((movie) => (
              <div className="card" key={movie.id}>
                <div
                  className="card-poster"
                  style={{
                    backgroundImage: movie.poster_path
                      ? `url(${IMAGE_BASE}${movie.poster_path})`
                      : "none",
                  }}
                />
                <div className="card-content">
                  <h3>{movie.title}</h3>
                  <div className="rating">{formatStars(movie.vote_average)}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Recommended</h2>
          <span>See more</span>
        </div>

        <div className="card-row">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            recommendedMovies.map((movie) => (
              <div className="card" key={movie.id}>
                <div
                  className="card-poster"
                  style={{
                    backgroundImage: movie.poster_path
                      ? `url(${IMAGE_BASE}${movie.poster_path})`
                      : "none",
                  }}
                />
                <div className="card-content">
                  <h3>{movie.title}</h3>
                  <div className="rating">{formatStars(movie.vote_average)}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
