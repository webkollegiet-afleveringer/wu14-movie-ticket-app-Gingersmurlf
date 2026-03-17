import React, { useState } from "react";
import "../scss/checkout.scss";
import { useNavigate } from "react-router";

export default function Checkout() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleNumericInput = (value, maxLength) => {
    return value.replace(/\D/g, "").slice(0, maxLength);
  };

  const handlePayNow = () => {
    console.log("Payment info:", { email, cardHolder, cardNumber, cardDate, cvv });
    navigate("/payment");
  };

  return (
    <div className="checkout">
      <header className="checkout-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <h1>Checkout</h1>
      </header>

      <div className="payment-method-card">
        <div className="card-top">
          <div className="card-logo" />
          <div className="card-logo2" />
          <span className="change">Change</span>
        </div>
        
        <div className="card-balance">$********</div>
        <div className="card-holder">*********</div>
        <div className="card-number">**** **** **** ****</div>
      </div>

      <div className="payment-details">
        <h2>Payment Details</h2>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
          />
        </div>
        <div className="field">
          <label>Cardholder Name</label>
          <input
            type="text"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            placeholder="Cardholder Name"
          />
        </div>
        <div className="field">
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(handleNumericInput(e.target.value, 16))}
            placeholder="1234 1234 1234 1234"
          />
        </div>

        <div className="row">
          <div className="field small">
            <label>Date</label>
            <input
              type="text"
              value={cardDate}
              onChange={(e) => setCardDate(handleNumericInput(e.target.value, 4))}
              placeholder="MMYY"
            />
          </div>
          <div className="field small">
            <label>CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(handleNumericInput(e.target.value, 4))}
              placeholder="123"
            />
          </div>
        </div>
      </div>

      <div className="pay-now-section">
        <button className="pay-now-btn" onClick={handlePayNow}>
          Pay Now <span className="amount">$99.8</span>
        </button>
      </div>
    </div>
  );
}