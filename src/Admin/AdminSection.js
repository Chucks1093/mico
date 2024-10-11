import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSection = () => {
    const [adminData, setAdminData] = useState(null);
    const token = localStorage.getItem("adminToken"); // Retrieve the token from localStorage


    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.get('https://apimico.icu/api/admin/section', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const globalSettingsResponse = await axios.get('https://apimico.icu/api/global-settings', {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  setAdminData({
                    ...response.data,
                    globalSettings: globalSettingsResponse.data,
                  });
            } catch (err) {
                console.error('Error fetching admin data', err);
            }
        };

        fetchAdminData();
    }, [token]);

    if (!adminData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Admin Section</h2>
            <p>{adminData.message}</p>

            {/* Example of displaying user data */}
            {adminData.users && (
                <div>
                    <h3>User List:</h3>
                    <ul>
                        {adminData.users.map(user => (
                            <li key={user._id}>
                                {user.fullName} - {user.email}
                            </li>
                        ))}
                    </ul>
                    <h3>Global Settings</h3>
                    <p>Total Balance: {adminData.globalSettings.totalBalance}</p>
                    <p>Total Withdrawals: {adminData.globalSettings.totalWithdrawals}</p>
                    <p>Exchange Rate (USD to NGN): {adminData.globalSettings.exchangeRateUSDToNGN}</p>
                </div>
            )}
        </div>
    );
};

export default AdminSection;
