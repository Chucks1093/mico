import React, { useState, useEffect } from "react";
import "./App.css"; // Import custom styles
import { BrowserRouter as Router, Route, Switch, Routes, Navigate } from "react-router-dom"; // Import Router features
//import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faEye,
  faEyeSlash,
  faWallet,
  faArrowRight,
  faHandHoldingUsd,
  faMoneyBillWave,
  faCoins,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import LoginPage from "./Login/LoginPage"; // Import the LoginPage component
import Profile from "./Profile/Profile";
import Notifications from "./Notifications/Notifications"; // Import the Notifications component
import Sidebar from "./Sidebar/Sidebar"; // Import the Sidebar component
import DepositCrypto from "./DepositCrypto/DepositCrypto"; // Import the DepositCrypto component
import WithdrawCoins from "./Withdrawsection/WithdrawCoins"; // New component to display coins list for withdrawal
import WithdrawForm from "./Withdrawsection/WithdrawForm"; // New component for withdrawal form
import Portfolio from "./Portfolio/Portfolio";
import AdminLogin from "./Admin/AdminLogin"; // Admin Login Component
import AdminDashboard from "./Admin/AdminSection"; // Admin Dashboard Component
const INACTIVITY_TIMEOUT = 20 * 60 * 1000; // 20 minutes

const portfolioData = [
  { symbol: 'BTC', name: 'Bitcoin', balance: 0.5, usdValue: 25000, imageUrl: 'https://apimico.icu/Bitcoin.png' },
  { symbol: 'ETH', name: 'Ethereum', balance: 2.5, usdValue: 7500, imageUrl: 'https://apimico.icu/Eth.png' },
  { symbol: 'USDT', name: 'Tether (USDT)', balance: 1000, usdValue: 1000, imageUrl: 'https://apimico.icu/USDT.png' },
  { symbol: 'BNB', name: 'Binance Coin', balance: 1, usdValue: 300, imageUrl: 'https://apimico.icu/Bnb.png' },
  { symbol: 'TRX', name: 'Tron', balance: 5000, usdValue: 250, imageUrl: 'https://apimico.icu/Trx.png' },
  { symbol: 'TON', name: 'TON', balance: 150, usdValue: 450, imageUrl: 'https://apimico.icu/Ton.png' },
  { symbol: 'DAI', name: 'DAI', balance: 200, usdValue: 200, imageUrl: 'https://apimico.icu/Dai.png' },
  { symbol: 'SOL', name: 'Solana', balance: 10, usdValue: 300, imageUrl: 'https://apimico.icu/Sol.png' },
  { symbol: 'MATIC', name: 'Polygon (MATIC)', balance: 250, usdValue: 500, imageUrl: 'https://apimico.icu/Matic.png' },
];


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [isAdmin, setIsAdmin] = useState(false); // Track admin state
  const [fullName, setFullName] = useState(""); // State to store full name
  const [isBalanceVisible, setBalanceVisible] = useState(true);
  const [currentSection, setCurrentSection] = useState("home"); // Track current section (home or profile)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false); // For Deposit Modal
  const [selectedCoin, setSelectedCoin] = useState(null); // Store selected coin

  // Add the Smartsupp live chat script
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      var _smartsupp = _smartsupp || {};
      _smartsupp.key = '37b854232bf6be490ef5e1344c198ed02716a3c1';
      window.smartsupp||(function(d) {
        var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
        s=d.getElementsByTagName('script')[0];c=d.createElement('script');
        c.type='text/javascript';c.charset='utf-8';c.async=true;
        c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
      })(document);
    `;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  // Add the Smartsupp live chat script

  useEffect(() => {
    // Check localStorage for login status on page load
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedFullName = localStorage.getItem("fullName");
    const storedAdmin = localStorage.getItem("isAdmin");
    const adminToken = localStorage.getItem("adminToken");

    if (storedLogin === "true") {
      setIsLoggedIn(true);
      setFullName(storedFullName || ""); // Set the full name if available
    }

     if (adminToken && storedAdmin === "true") {
      setIsAdmin(true);
    }

    // Set up inactivity detection
    let inactivityTimer = setTimeout(logoutUser, INACTIVITY_TIMEOUT);

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(logoutUser, INACTIVITY_TIMEOUT); // Reset inactivity timer
    };

    // Detect user activity
    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("keypress", resetInactivityTimer);
    window.addEventListener("click", resetInactivityTimer);
    window.addEventListener("touchstart", resetInactivityTimer); // For mobile touch
    window.addEventListener("touchmove", resetInactivityTimer); // For mobile touch move

    // Cleanup listeners on unmount
    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("keypress", resetInactivityTimer);
      window.removeEventListener("click", resetInactivityTimer);
      window.removeEventListener("touchstart", resetInactivityTimer);
      window.removeEventListener("touchmove", resetInactivityTimer);
    };
  }, []);

  const toggleBalanceVisibility = () => {
    setBalanceVisible(!isBalanceVisible);
  };

  const handleLoginSuccess = (fullName) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // Store login status in localStorage
    // localStorage.setItem('fullName', fullName); // Store full name in localStorage
    if (isAdmin) {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true"); // Store admin status in localStorage
    }
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setFullName(""); // Clear full name on logout
    localStorage.removeItem("isLoggedIn"); // Remove login status from localStorage
    localStorage.removeItem("fullName"); // Remove full name from localStorage
    localStorage.removeItem("isAdmin"); // Remove admin status
    alert("You have been logged out");
  };

  const renderProfileSection = () => (
    <Profile onLogout={logoutUser} onGoBack={() => setCurrentSection("home")} />
  );

  const renderNotificationsSection = () => (
    <Notifications onGoBack={() => setCurrentSection("home")} />
  );

  const openDepositModal = () => {
    setIsDepositModalOpen(true);
  };

  const closeDepositModal = () => {
    setIsDepositModalOpen(false);
  };

  const goToCryptoDepositPage = () => {
    setIsDepositModalOpen(false); // Close the modal
    setCurrentSection("depositCrypto"); // Switch to the crypto deposit page
  };

  const goToWithdrawCoins = () => {
    setCurrentSection("withdrawCoins");
  };

  const handleCoinSelect = (coin) => {
    setSelectedCoin(coin); // Store selected coin
    setCurrentSection("withdrawForm"); // Navigate to withdrawal form
  };
  const viewPortfolio = () => {
    setCurrentSection("portfolio"); // Switch to portfolio section
  };

  const handleAdminLoginSuccess = (token) => {
    
    if (isAdmin) {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true"); // Store admin status in localStorage
      //localStorage.setItem("adminToken", token);
    }
  };

  const ProtectedRoute = ({ element }) => {
    const adminToken = localStorage.getItem("adminToken");
    return adminToken ? element : <Navigate to="/admin/login" />;
  };
  return (
    <Router>
      <div className="phone">
        {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}{" "}
        {/* Sidebar */}
        <div className="screen">
          <div className="top-bar">
            <FontAwesomeIcon
              icon={faBars}
              size="lg"
              onClick={() => setIsSidebarOpen(true)}
              style={{ cursor: "pointer" }}
            />{" "}
            {/* Toggle Sidebar */}
            <FontAwesomeIcon
              icon={faBell}
              size="lg"
              onClick={() => setCurrentSection("notifications")}
              style={{ cursor: "pointer" }}
            />
          </div>

          {/* Show login page only if not logged in */}
          <Routes>
              <Route
                path="/"
                element={!isLoggedIn ? (
                  <LoginPage onLoginSuccess={handleLoginSuccess} />
                ) : // Show homepage or profile based on the current section
                  currentSection === "profile" ? (
                    <Profile
                      onLogout={logoutUser}
                      onGoBack={() => setCurrentSection("home")}
                    />
                  ) : currentSection === "notifications" ? (
                    <Notifications onGoBack={() => setCurrentSection("home")} />
                  ) : currentSection === "depositCrypto" ? (
                    <DepositCrypto onGoBack={() => setCurrentSection("home")} />
                  ) : currentSection === "withdrawCoins" ? (
                    <WithdrawCoins onCoinSelect={handleCoinSelect} />
                  ) : currentSection === "withdrawForm" && selectedCoin ? (
                    <WithdrawForm
                      coin={selectedCoin}
                      onGoBack={() => setCurrentSection("withdrawCoins")}
                    />
                  ) : currentSection === "portfolio" ? (
                    <Portfolio coins={portfolioData} onGoBack={() => setCurrentSection("home")} />
                  ) : (
                    // Show homepage if logged in
                    <>
                      <div className="balance-card">
                        <FontAwesomeIcon
                          icon={isBalanceVisible ? faEye : faEyeSlash}
                          size="lg"
                          className="eye-icon"
                          onClick={toggleBalanceVisibility}
                          style={{
                            cursor: "pointer",
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                          }}
                        />
                        <div className="balance-title">Total Balance</div>
                        <div className="balance-amount">
                          {isBalanceVisible ? "$12,500.00" : "*****"}
                        </div>
                        <div className="balance-subtext">In BTC & USD</div>
                      </div>

                      <div className="title"></div>

                      {/*<div className="button" onClick={viewPortfolio}>
              
              <FontAwesomeIcon icon={faCoins} size="2x" />
              <span>View Portfolio</span> 
              <FontAwesomeIcon icon={faArrowRight} size="lg" />
            </div>*/}

                      <div className="button" onClick={openDepositModal}>
                        <FontAwesomeIcon icon={faWallet} size="2x" />
                        <span>Deposit</span>
                        <FontAwesomeIcon icon={faArrowRight} size="lg" />
                      </div>

                      <div className="button" onClick={goToWithdrawCoins}>
                        <FontAwesomeIcon icon={faHandHoldingUsd} size="2x" />
                        <span>Withdraw</span>
                        <FontAwesomeIcon icon={faArrowRight} size="lg" />
                      </div>

                      <div className="button">
                        <FontAwesomeIcon icon={faMoneyBillWave} size="2x" />
                        <span>Sell to Naira</span>
                        <FontAwesomeIcon icon={faArrowRight} size="lg" />
                      </div>

                      {/*<div className="title2"></div>*/}

                      <div className="bottom-bar">
                        <button onClick={viewPortfolio}>
                          <FontAwesomeIcon icon={faCoins} size="lg" /> Coins
                        </button>
                        <button onClick={() => setCurrentSection("profile")}>
                          <FontAwesomeIcon icon={faUser} size="lg" /> Profile
                        </button>
                      </div>

                      {/* Modal overlay for deposit options */}
                      {isDepositModalOpen && (
                        <div className="modal-overlay" onClick={closeDepositModal}>
                          <div
                            className="modal modal-visible"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <h2>Select Payment Method</h2>
                            {/*<div className="modal-option">
                        <FontAwesomeIcon icon={faWallet} size="lg" />
                        <span>P2P Trading (0 Fees)</span>
                        <p>Bank Transfer, Opay, PalmPay and more</p>
                      </div>*/}
                            <div className="modal-option" onClick={goToCryptoDepositPage}>
                              <FontAwesomeIcon icon={faMoneyBillWave} size="lg" />
                              <div className="modal-option-content">
                                <span>Deposit Crypto</span>
                                <p>Already have crypto? Deposit directly</p>
                              </div>
                            </div>
                            <div className="modal-option">
                              <FontAwesomeIcon icon={faHandHoldingUsd} size="lg" />
                              <div className="modal-option-content">
                                <span>Deposit Naira</span>
                                <p>Only Bank transfers are supported</p>
                              </div>
                            </div>
                            <button onClick={closeDepositModal}>Close</button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
              />
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin onLoginSuccess={handleAdminLoginSuccess} />} />
              <Route
                path="/admin/dashboard"
                element={<ProtectedRoute element={<AdminDashboard />} />}
              />
            </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
