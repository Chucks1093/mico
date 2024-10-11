// Notifications.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Notifications.css';

const Notifications = ({ onGoBack }) => {
  return (
    <div className="notifications-section">
      <div className="top-bar">
        <button onClick={onGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" /> Back
        </button>
        <h2>Notifications</h2>
      </div>

      <div className="notification-item">
        <FontAwesomeIcon icon={faBell} size="lg" />
        <span>New App Update Available!</span>
      </div>

      <div className="notification-item">
        <FontAwesomeIcon icon={faBell} size="lg" />
        <span>Your transaction has been successfully completed.</span>
      </div>

      <div className="notification-item">
        <FontAwesomeIcon icon={faBell} size="lg" />
        <span>System maintenance scheduled for tomorrow at 3:00 AM.</span>
      </div>
    </div>
  );
};

export default Notifications;
