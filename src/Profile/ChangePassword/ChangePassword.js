// ChangePassword.js
import React, { useState } from 'react';
import axios from 'axios';
import './ChangePassword.css';

const ChangePassword = ({ onPasswordChangeSuccess, onCancel }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setErrorMessage("New passwords do not match.");
            return;
        }

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('https://apimico.icu/api/change-password', {
                currentPassword,
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert(response.data.message);
            onPasswordChangeSuccess();
        } catch (error) {
            console.error('Error changing password:', error);
            setErrorMessage(error.response ? error.response.data : 'Server error');
        }
    };

    return (
        <div className="change-password-section">
            <h2>Change Password</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleChangePassword}>
                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Change Password</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default ChangePassword;
