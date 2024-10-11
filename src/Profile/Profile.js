import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faHistory, faGlobe, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import ChangePassword from './ChangePassword/ChangePassword';
import './Profile.css'

const Profile = ({ onLogout, onGoBack}) => {
  const fullName = localStorage.getItem('fullName');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleLogout = () => {
    onLogout(); // Call the logout function passed from App.js
  };
  //console.log('Logged in user full name:', fullName); // Log the full name
  const handlePasswordChangeSuccess = () => {
    setIsChangingPassword(false); // Close the change password form
  };

  return (
    <div className="profile-section">
      <h2>Profile</h2>
      <div className="profile-item">
        <FontAwesomeIcon icon={faUser} size="lg" />
        <span>Name: {fullName}</span> {/* Display full name */}
      </div>
      <div className="profile-item">
        <FontAwesomeIcon icon={faGlobe} size="lg" />
        <span>Preferred Currency: USD</span>
      </div>
      <div className="profile-item" onClick={() => setIsChangingPassword(true)}>
        <FontAwesomeIcon icon={faLock} size="lg" />
        <span>Change Password</span>
      </div>
      <div className="profile-item">
        <FontAwesomeIcon icon={faHistory} size="lg" />
        <span>Transaction History</span>
      </div>
      <div className="profile-item">
        <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
        <span onClick={handleLogout} style={{ cursor: 'pointer' }}>Log Out</span>
      </div>
      <button onClick={onGoBack}>Go Back</button>
      {/* Conditionally render the ChangePassword component */}
      {isChangingPassword && (
        <ChangePassword
          onPasswordChangeSuccess={handlePasswordChangeSuccess}
          onCancel={() => setIsChangingPassword(false)}
        />
      )}
    </div>
  );
};

export default Profile;
