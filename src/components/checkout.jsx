import React from "react";
import "../scss/checkout.scss";

const Checkout = () => {
  return (
    <div className="checkout">
      <div className="header">
        <span className="back">←</span>
        <h2>Checkout</h2>
      </div>

      <div className="section">
        <div className="section-header">
          <h3>Payment Method</h3>
          <span className="change">Change</span>
        </div>

        <div className="card">
          <div className="card-top">
            <div className="logo"></div>
            <span className="balance">Balance</span>
            <h2>$120,580.00</h2>
          </div>

          <div className="card-bottom">
            <p>Card Holder</p>
            <h4>Miles Morales</h4>

            <p className="card-number">**** **** **** 51446</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Payment Details</h3>

        <label>Your Email</label>
        <input type="text" value="Milesmorales@gmail.com" readOnly />

        <label>Cardholder Name</label>
        <input type="text" value="Miles Morales" readOnly />

        <label>Card Number</label>
        <input type="text" value="**** **** **** 51446" readOnly />

        <div className="row">
          <div>
            <label>Date</label>
            <input type="text" value="02 Nov 2021" readOnly />
          </div>

          <div>
            <label>CVV</label>
            <input type="text" value="123" readOnly />
          </div>
        </div>
      </div>

      <button className="pay-btn">
        <span>Pay Now</span>
        <span className="price">$99.8</span>
      </button>
    </div>
  );
};

export default Checkout;