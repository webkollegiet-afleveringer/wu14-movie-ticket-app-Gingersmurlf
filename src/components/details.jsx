import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import "../scss/details.scss";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const MOVIE = {
  title: "Shang - Chi",
  director: "Destin Daniel Cretton",
  rating: 4.9,
  genres: ["Action", "Fiction Fantasy"],
  runtime: "02h 43m",
  synopsis:
    "Martial-arts master Shang-Chi confronts the past he thought he left behind when he's drawn into the Ten Rings organization and forced to face his father.",
  poster_path: "/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg",
  backdrop_path: "/xcI4NprR0Rjrs4DIS4K0XrbA0xQ.jpg",
};

function formatStars(voteAverage) {
  const fullStars = Math.round(voteAverage);
  const emptyStars = 5 - fullStars;
  return "★".repeat(fullStars) + "☆".repeat(emptyStars);
}

export default function Details() {
  const navigate = useNavigate();
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  const backdrop = `${IMAGE_BASE}${MOVIE.backdrop_path}`;
  const poster = `${IMAGE_BASE}${MOVIE.poster_path}`;

  const synopsisPreview = useMemo(() => {
    if (showFullSynopsis) return MOVIE.synopsis;
    return MOVIE.synopsis.length > 120 ? `${MOVIE.synopsis.slice(0, 120)}...` : MOVIE.synopsis;
  }, [showFullSynopsis]);

  return (
    <div className="details" style={{ "--details-bg": `url(${backdrop})` }}>
      <header className="details-header">
        <button type="button" className="icon-btn back" onClick={() => navigate(-1)} aria-label="Back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button type="button" className="icon-btn bookmark" aria-label="Bookmark">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 3h12a1 1 0 011 1v18l-7-5-7 5V4a1 1 0 011-1z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </header>

      <main className="details-main">
        <div className="poster-wrapper">
          <img className="poster" src={poster} alt={MOVIE.title} />
        </div>

        <div className="info">
          <h1 className="title">{MOVIE.title}</h1>

          <div className="meta">
            <div className="director">
              Director: <span>{MOVIE.director}</span>
            </div>
            <div className="rating">
              <span className="stars">{formatStars(MOVIE.rating)}</span>
              <span className="rating-number">{MOVIE.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="tags">
            {MOVIE.genres.map((genre) => (
              <span key={genre} className="tag">
                {genre}
              </span>
            ))}
            <span className="tag runtime">{MOVIE.runtime}</span>
          </div>

          <div className="synopsis">
            <h2>Synopsis</h2>
            <p>
              {synopsisPreview}
              {MOVIE.synopsis.length > 120 ? (
                <button type="button" className="read-more" onClick={() => setShowFullSynopsis((v) => !v)}>
                  {showFullSynopsis ? " Show Less" : " Read More"}
                </button>
              ) : null}
            </p>
          </div>

          <button type="button" className="primary-btn">
            Book Ticket
          </button>
        </div>
      </main>
    </div>
  );
}
