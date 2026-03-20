import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../scss/download.scss";

const Download = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowSuccess(true);
    }, 400);
  }, []);

  return (
    <div className="download-page">
      <div className="ticket-bg">
        <div className="ticket-card">
          <div className="ticket-header">
            <strong>Film: Shang-Chi</strong>
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
          </div>

          <div className="divider"></div>
          <div className="barcode"></div>
        </div>
      </div>

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-card">

            <div className="success-icon">
              <img src="../public/images/shield.png" alt="success" />
            </div>

            <h2>Your ticket has been downloaded</h2>

            <p>
              Adele is a Scottish heiress whose extremely <br />
              wealthy family owns estates and grounds. <br />
              When she was a teenager. Read More
            </p>

            <button onClick={() => navigate("/")}>
              Back To Home
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Download;