// Sidebar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faArrowRight, faHandHoldingUsd, faMoneyBillWave, faCog } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = ({ onClose }) => {
  const handleOverlayClick = (e) => {
    // Close the sidebar only if the click was on the overlay (not the sidebar itself)
    if (e.target.classList.contains('sidebar-overlay')) {
      onClose();
    }
  };
  return (
    <div className="sidebar-overlay" onClick={handleOverlayClick}>
      <div className="sidebar">
        <div className="sidebar-header">
          <button onClick={onClose} className="close-btn">X</button>
          <h2>Menu</h2>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faWallet} size="lg" />
          <span>Wallet Overview</span>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faArrowRight} size="lg" />
          <span>Deposit</span>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faHandHoldingUsd} size="lg" />
          <span>Withdraw</span>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faMoneyBillWave} size="lg" />
          <span>Sell to Naira</span>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faCog} size="lg" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
