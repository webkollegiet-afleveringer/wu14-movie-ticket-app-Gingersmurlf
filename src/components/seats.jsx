import React, { useState } from "react";
import "../scss/seats.scss";
import { useNavigate } from "react-router";

export default function Seats() {
  const navigate = useNavigate();

  const cinemas = [
    { id: "empire_xxi", name: "Empire XXI Yogyakarta" },
    { id: "cgv", name: "CGV Cinemas" },
    { id: "cinepolis", name: "Cinepolis" },
  ];

  const dates = [
    { id: "2026-11-02", name: "02 Nov 2026" },
    { id: "2026-11-03", name: "03 Nov 2026" },
    { id: "2026-11-04", name: "04 Nov 2026" },
  ];

  const times = [
    { id: "13:00", name: "01.00 PM" },
    { id: "16:00", name: "04.00 PM" },
    { id: "19:00", name: "07.00 PM" },
  ];

  const [cinema, setCinema] = useState(cinemas[0].id);
  const [date, setDate] = useState(dates[0].id);
  const [time, setTime] = useState(times[0].id);

  const handleBookTicket = () => {
    console.log("Ticket booked:", cinema, date, time);
    navigate("/checkout");
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
            {cinemas.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          <div className="field">
            <label>Date</label>
            <select value={date} onChange={(e) => setDate(e.target.value)}>
              {dates.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Time</label>
            <select value={time} onChange={(e) => setTime(e.target.value)}>
              {times.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
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