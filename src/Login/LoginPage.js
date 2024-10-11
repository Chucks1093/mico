import React, { useState } from 'react';
import './LoginPage.css'; // Import custom styles for login page
import axios from 'axios'; // Import Axios for HTTP requests

function LoginPage({ onLoginSuccess }) {
    const [currentPage, setCurrentPage] = useState('login'); // Handles current form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState(''); // Added phone state
    const [fullName, setFullName] = useState(''); // Added full name state


    // Dummy user data for simulation purposes
    const registeredUsers = [
        { email: 'user@example.com', password: 'password123' },
    ];

    const handleLogin = (e) => {
        e.preventDefault();
        // Make a POST request to your backend API for login
        axios.post('https://apimico.icu/api/login', {
            email,
            password
        }).then(response => {
            // Handle successful login
            //console.log('Login response:', response.data); // Check the full response
            alert('Login successful!');
            const { token, fullName } = response.data; // Extract the JWT token from response
            localStorage.setItem('token', token); // Store the JWT token in localStorage
            //document.cookie = `token=${token}; Secure; HttpOnly; SameSite=Strict`; // Set cookie with flags
            localStorage.setItem('fullName', fullName); // Store the full name in localStorage
            //console.log('Logged in user full name222:', fullName); // Log the full name
            onLoginSuccess(fullName); // Callback to notify App.js of successful login
        })
            .catch(error => {
                console.error('There was an error logging in:', error);
                alert('Error: ' + (error.response ? error.response.data : 'Server error'));
            });
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (!username || !email || !password || !phone || !fullName) {
            alert('All fields are required.');
            return;
        }
        // Make a POST request to your backend API
        axios.post('https://apimico.icu/api/register', {
            username,
            email,
            password,
            phone,
            fullName // Include full name in the signup request
        })
            .then(response => {
                console.log('Server response:', response); // Check what the server sends
                alert('Account created successfully!');
                setCurrentPage('login');
            })
            .catch(error => {
                console.error('There was an error creating the account:', error);

                // Handle different error scenarios
                if (error.response && error.response.data && error.response.data.message) {
                    alert('Error: ' + error.response.data.message);
                } else {
                    alert('An error occurred. Please try again later.');
                }
            });
    };

    // Switch between login, sign-up, and forgot password
    const showPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="form-container">
            {currentPage === 'login' && (
                <div>
                    <h2>Sign In</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Sign In</button>
                    </form>
                    <div className="link-container">
                        <span onClick={() => showPage('signup')}>Create Account</span> |{' '}
                        <span onClick={() => showPage('forgot')}>Forgot Password?</span>
                    </div>
                </div>
            )}

            {currentPage === 'signup' && (
                <div>
                    <h2>Create Account</h2>
                    <form onSubmit={handleSignUp}>
                        <input
                            type="text"
                            placeholder="Full Name" // Full name field
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                    <div className="link-container">
                        <span onClick={() => showPage('login')}>Back to Sign In</span>
                    </div>
                </div>
            )}

            {currentPage === 'forgot' && (
                <div>
                    <h2>Reset Password</h2>
                    <form>
                        <input type="email" placeholder="Enter your email" required />
                        <button type="submit">Reset Password</button>
                    </form>
                    <div className="link-container">
                        <span onClick={() => showPage('login')}>Back to Sign In</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginPage;
