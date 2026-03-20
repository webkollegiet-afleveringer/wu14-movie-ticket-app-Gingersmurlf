import React, { useState } from "react";
import "../scss/payment.scss";
import { useNavigate } from "react-router";

export default function Payment() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="payment-page">
      <header className="payment-header">
        <button onClick={() => navigate(-1)}>←</button>
        <h1>Checkout</h1>
      </header>

      <section className="section">
        <div className="section-title">
          <h3>Payment Method</h3>
          <span>Change</span>
        </div>

        <div className="card">
          <div className="card-top">
            <div className="card-logo" />
            <span className="balance">Balance</span>
            <h2>$120,580.00</h2>
          </div>

          <div className="card-bottom">
            <p>Card Holder</p>
            <h4>Miles Morales</h4>
            <span>**** **** **** 5146</span>
          </div>
        </div>
      </section>

      <section className="section">
        <h3>Payment Details</h3>

        <input placeholder="Your Email" />
        <input placeholder="Cardholder Name" />
      </section>

      <button className="pay-btn" onClick={() => setShowSuccess(true)}>
        Pay Now
      </button>

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-card">

            <div className="success-icon">
              <img src="../public/images/shield.png" alt="success" />
            </div>

            <h2>Your payment was successful</h2>

            <p>
              Adele is a Scottish heiress whose extremely <br /> wealthy family owns estates and grounds. <br />
              When she was a teenager. Read More
            </p>

            <button onClick={() => navigate("/ticket")}>
              See E-Ticket
            </button>

          </div>
        </div>
      )}
    </div>
  );
}