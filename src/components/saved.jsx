import React, { useState } from "react";
import "../scss/saved.scss";
import { useNavigate } from "react-router";

export default function Saved() {
  const navigate = useNavigate();

  const [persons, setPersons] = useState(2);

  const increase = () => setPersons((p) => p + 1);
  const decrease = () => setPersons((p) => (p > 1 ? p - 1 : 1));

  return (
    <div className="saved">
      <header className="saved-header">
        <button onClick={() => navigate(-1)}>←</button>
        <h1>Saved Plan</h1>
      </header>

      <div className="plan">
        <h2>
          <span>1.</span> 02 November 2021
        </h2>

        <div className="movie-card">
          <div className="poster" />

          <div className="movie-info">
            <span className="tag">Action</span>
            <h3>No Time To Die</h3>
            <p>2h 43m</p>
          </div>

          <div className="rating">⭐ 5,0</div>
        </div>

        <div className="form">
          <div className="field">
            <label>Cinema</label>
            <select>
              <option>EbonyLife</option>
            </select>
          </div>

          <div className="row">
            <div className="field">
              <label>Date</label>
              <select>
                <option>02 Nov 2021</option>
              </select>
            </div>

            <div className="field">
              <label>Time</label>
              <select>
                <option>01.00 PM</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label>Seats</label>
              <select>
                <option>C4, C5, C6</option>
              </select>
            </div>

            <div className="field">
              <label>Person</label>

              <div className="person-control">
                <button onClick={decrease}>−</button>
                <span>{persons}</span>
                <button onClick={increase}>+</button>
              </div>
            </div>
          </div>
        </div>

        <div className="actions">
          <button className="checkout">Checkout</button>
          <button className="delete">🗑</button>
        </div>
      </div>

      <div className="plan">
        <h2>
          <span>2.</span> 17 December 2021
        </h2>

        <div className="movie-card">
          <div className="poster empty" />

          <div className="movie-info">
            <span className="tag blue">Crime</span>
            <h3>Money Heist</h3>
            <p>5 Season, 50 Episode</p>
          </div>

          <div className="rating">⭐ 5,0</div>
        </div>
      </div>
    </div>
  );
}