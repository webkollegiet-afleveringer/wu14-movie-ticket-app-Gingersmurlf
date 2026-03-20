import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../scss/download.scss";

const Download = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowSuccess(true);
    }, 500);
  }, []);

  return (
    <div className="download-page">
      <div className="ticket-bg">
        <h2>E-Ticket</h2>
      </div>

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-card">

            {/* <div className="success-icon">
              <img src={logo} alt="success" />
            </div> */}

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