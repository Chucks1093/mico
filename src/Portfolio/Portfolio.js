import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const Portfolio = ({ coins, onGoBack }) => {
    const [selectedCoin, setSelectedCoin] = useState(null);
    const handleCoinClick = (coin) => {
        setSelectedCoin(coin);
    };

    const handleGoBack = () => {
        setSelectedCoin(null);
    };
    return (
        <div className="portfolio-container">
            <h2>Portfolio</h2>
            {!selectedCoin ? (
                <ul className="coin-list">
                    {coins.map((coin) => (
                        <li key={coin.symbol} className="coin-item" onClick={() => handleCoinClick(coin)}>
                            <div className="coin-image-container">
                                <img src={coin.imageUrl} alt={`${coin.name} logo`} className="coin-image" />
                            </div>
                            <div className="coin-details">
                                <span className="coin-name">{coin.name}</span>
                                <span className="coin-balance">Balance: {coin.balance} {coin.symbol}</span>
                                <span className="coin-value">USD Value: ${coin.usdValue.toFixed(2)}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>
                <div className="balance-card">
                    <button className="go-back-button" onClick={handleGoBack}>Go Back</button>
                    <div className="balance-card-content">
                        <h3>{selectedCoin.name}</h3>
                        <p>Balance: {selectedCoin.balance} {selectedCoin.symbol}</p>
                        <p>USD Value: ${selectedCoin.usdValue.toFixed(2)}</p>

                        {/* Buttons: Sell, Send, Receive */}
                        <div className="balance-card-actions">
                            <button className="balance-card-button">
                                <FontAwesomeIcon icon={faArrowUp} /> Sell
                            </button>
                            <button className="balance-card-button">
                                <FontAwesomeIcon icon={faPaperPlane} /> Send
                            </button>
                            <button className="balance-card-button">
                                <FontAwesomeIcon icon={faArrowDown} /> Receive
                            </button>
                        </div>
                        </div>
                        </div>

                        {/* Transaction History */}
                        <div className="transaction-history">
                            <h4>Transaction History</h4>
                            {/* Placeholder transaction data */}
                            <ul className="transaction-list">
                                <li>Received 0.1 {selectedCoin.symbol} on Sep 1, 2024</li>
                                <li>Sent 0.05 {selectedCoin.symbol} on Sep 5, 2024</li>
                                <li>Received 0.2 {selectedCoin.symbol} on Sep 10, 2024</li>
                            </ul>
                        </div>
                    </div>
            )}

            {!selectedCoin && <button className="go-back-button" onClick={onGoBack}>Go Back</button>}
        </div>
    );
};

export default Portfolio;
