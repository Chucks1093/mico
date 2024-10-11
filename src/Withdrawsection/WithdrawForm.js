import React, { useState } from 'react';

const WithdrawForm = ({ coin, onGoBack }) => {
  const [address, setAddress] = useState('');
  const [network, setNetwork] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (network === '') {
      alert('Please select a network');
      return;
    }
    console.log('Withdraw initiated for:', coin.symbol, address, network, amount);
    // Add your logic to process the withdrawal here.
  };

  return (
    <div className="withdraw-form">
      <button className="go-back" onClick={onGoBack}>Go Back</button>
      <h2>Withdraw {coin.name}</h2>
      <form onSubmit={handleSubmit}>
        {/* Address Input */}
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            required
          />
        </label>

        {/* Network Selection */}
        <label>
          Network:
          <select value={network} onChange={(e) => setNetwork(e.target.value)} required>
            <option value="" disabled>Select network</option>
            {coin.networks.map((networkOption) => (
              <option
                key={networkOption.name}
                value={networkOption.name}
                disabled={!networkOption.enabled}
              >
                {networkOption.name}
              </option>
            ))}
          </select>
        </label>

        {/* Amount Input */}
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Enter amount in ${coin.symbol}`}
            min="0"
            required
          />
        </label>

        {/* Submit Button */}
        <button className="submit-btn" type="submit">Withdraw</button>
      </form>
    </div>
  );
};

export default WithdrawForm;
