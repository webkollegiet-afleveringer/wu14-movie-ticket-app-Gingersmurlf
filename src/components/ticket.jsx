import React from "react";
import "../scss/ticket.scss";

const Ticket = () => {
  return (
    <div className="ticket-page">
      <div className="header">
        <span className="back">←</span>
        <h2>E-Ticket</h2>
      </div>

      <div className="instructions">
        <h3>Instruction</h3>
        <p>
          Come to the cinema, show and scan the barcode to the space provided.
          Continue to comply with health protocols.
        </p>
      </div>

      <div className="ticket-card">
        <div className="ticket-header">
          <div>
            <strong>Film: Shang-Chi</strong>
          </div>
          <span className="e-ticket">e-ticket</span>
        </div>

        <div className="ticket-body">
          <div className="row">
            <div>
              <span>Date</span>
              <strong>06/09/2021</strong>
            </div>
            <div>
              <span>Seats</span>
              <strong>c4, c5</strong>
            </div>
          </div>

          <div className="row">
            <div>
              <span>Location</span>
              <strong>Viva Cinema</strong>
            </div>
            <div>
              <span>Time</span>
              <strong>01.00 PM</strong>
            </div>
          </div>

          <div className="row">
            <div>
              <span>Payment</span>
              <strong>Successful</strong>
            </div>
            <div>
              <span>Order</span>
              <strong>1904566</strong>
            </div>
          </div>
        </div>

        <div className="divider">
          <span></span>
        </div>

        <div className="barcode"></div>
      </div>

        {/* <button onClick={() => navigate("/download")}>
              Download E-Ticket
            </button> */}

            <button className="download-btn">Download E-Ticket</button>

            {/* <button className="download-btn" onClick={() => navigate("/download")}>
              Download E-Ticket
            </button> */}
    </div>
  );
};

export default Ticket;