import React, { useState } from "react";
import "../scss/ticket.scss";
import { useNavigate } from "react-router";

export default function Ticket() {
  const navigate = useNavigate();

  const [cinema, setCinema] = useState("Empire XXI Yogyakarta");
  const [date, setDate] = useState("02 Nov 2026");
  const [time, setTime] = useState("01.00 PM");

  const handleBookTicket = () => {
    console.log("Ticket booked:", cinema, date, time);

    // eksempel: naviger til næste side
    navigate("/seats");
  };

  return (
    <div className="ticket">
      <header className="ticket-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>

        <h1>Select Seats</h1>
      </header>

      <div className="ticket-form">
        <div className="field">
          <label>Cinema</label>
          <select value={cinema} onChange={(e) => setCinema(e.target.value)}>
            <option>Empire XXI Yogyakarta</option>
            <option>CGV Cinemas</option>
            <option>Cinepolis</option>
          </select>
        </div>

        <div className="row">
          <div className="field">
            <label>Date</label>
            <select value={date} onChange={(e) => setDate(e.target.value)}>
              <option>02 Nov 2026</option>
              <option>03 Nov 2026</option>
              <option>04 Nov 2026</option>
            </select>
          </div>

          <div className="field">
            <label>Time</label>
            <select value={time} onChange={(e) => setTime(e.target.value)}>
              <option>01.00 PM</option>
              <option>04.00 PM</option>
              <option>07.00 PM</option>
            </select>
          </div>
        </div>
      </div>

      <section className="btn">
        <button className="primary-btn" onClick={handleBookTicket}>
          Checkout
        </button>
      </section>
    </div>
  );
}