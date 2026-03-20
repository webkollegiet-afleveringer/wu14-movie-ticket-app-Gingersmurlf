import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../scss/details.scss";
import { API_OPTIONS } from "./api/tmdb";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function formatStars(voteAverage) {
  const fullStars = Math.round(voteAverage / 2);
  const emptyStars = 5 - fullStars;
  return "★".repeat(fullStars) + "☆".repeat(emptyStars);
}

export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`https://api.themoviedb.org/3/movie/${id}`, API_OPTIONS)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error("Fejl ved hentning af film:", err));
  }, [id]);

  const synopsisPreview = useMemo(() => {
    if (!movie) return "";

    if (showFullSynopsis) return movie.overview;

    return movie.overview?.length > 120
      ? `${movie.overview.slice(0, 120)}...`
      : movie.overview;
  }, [showFullSynopsis, movie]);

  if (!movie) {
    return (
      <div className="details loading">
        <div className="details-loading">Loading...</div>
      </div>
    );
  }

  const backdrop = `${IMAGE_BASE}${movie.backdrop_path}`;
  const poster = `${IMAGE_BASE}${movie.poster_path}`;

  const handleBookTicket = () => {
    navigate(`/ticket/${movie.id}`);
  };

  return (
    <div className="details" style={{ "--details-bg": `url(${backdrop})` }}>
      <header className="details-header">
        <button
          type="button"
          className="icon-btn back"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </header>

      <main className="details-main">
        <div className="poster-wrapper">
          <img className="poster" src={poster} alt={movie.title} />
        </div>

        <div className="info">
          <h1 className="title">{movie.title}</h1>

          <div className="meta">
            <div className="rating">
              <span className="stars">{formatStars(movie.vote_average)}</span>
              <span className="rating-number">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="tags">
            {movie.genres?.map((genre) => (
              <span key={genre.id} className="tag">
                {genre.name}
              </span>
            ))}

            <span className="tag runtime">
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </span>
          </div>

          <div className="synopsis">
            <h2>Synopsis</h2>
            <p>
              {synopsisPreview}

              {movie.overview?.length > 120 && (
                <button
                  className="read-more"
                  onClick={() => setShowFullSynopsis((v) => !v)}
                >
                  {showFullSynopsis ? " Show Less" : " Read More"}
                </button>
              )}
            </p>
          </div>

          <button className="primary-btn" onClick={handleBookTicket}>
            Book Ticket
          </button>
        </div>
      </main>
    </div>
  );
}