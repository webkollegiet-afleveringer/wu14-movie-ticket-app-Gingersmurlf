import React from "react";
import "../scss/explore.scss";

export default function Explore() {
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
        <button type="button" className="tab active">
          Now Showing
        </button>
        <button type="button" className="tab">
          Upcoming
        </button>
      </div>

      <section className="section">
        <div className="section-header">
          <h2>Top Movies</h2>
          <span>See more</span>
        </div>

        <div className="card-row">
          <div className="card">
            <div className="card-poster" />
            <div className="card-content">
              <h3>No Time To Die</h3>
              <div className="rating">⭐⭐⭐⭐☆</div>
            </div>
          </div>

          <div className="card">
            <div className="card-poster" />
            <div className="card-content">
              <h3>Shang‑Chi</h3>
              <div className="rating">⭐⭐⭐⭐☆</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Recommended</h2>
          <span>See more</span>
        </div>

        <div className="card-row">
          <div className="card">
            <div className="card-poster" />
            <div className="card-content">
              <h3>Title Placeholder</h3>
              <div className="rating">⭐⭐⭐⭐☆</div>
            </div>
          </div>

          <div className="card">
            <div className="card-poster" />
            <div className="card-content">
              <h3>Title Placeholder</h3>
              <div className="rating">⭐⭐⭐⭐☆</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
