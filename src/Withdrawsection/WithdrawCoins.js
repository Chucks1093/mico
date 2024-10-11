import React from 'react';
import './WithdrawCoins.css'; // Create styles specific to this component

const coins = [
    {
        symbol: 'BTC',
        name: 'Bitcoin',
        imageUrl: 'https://apimico.icu/Bitcoin.png',
        networks: [
            { name: 'BTC', enabled: true, address: 'btc_address' },
            { name: 'BSC (BEP20)', enabled: true, address: 'btc_bep20_address' },
        ],
    },
    {
        symbol: 'ETH',
        name: 'Ethereum',
        imageUrl: 'https://apimico.icu/Eth.png',
        networks: [
            { name: 'ERC20', enabled: true, address: 'eth_erc20_address' },
            { name: 'Arbitrum One', enabled: true, address: 'eth_arbitrum_address' },
            { name: 'Optimism', enabled: true, address: 'eth_optimism_address' },
        ],
    },
    {
        symbol: 'USDT',
        name: 'Tether (USDT)',
        imageUrl: 'https://apimico.icu/USDT.png',
        networks: [
            { name: 'ERC20', enabled: true, address: 'usdt_erc20_address' },
            { name: 'TRC20', enabled: true, address: 'usdt_trc20_address' },
            { name: 'BSC (BEP20)', enabled: true, address: 'usdt_bep20_address' },
            { name: 'Polygon PoS', enabled: true, address: 'usdt_polygon_address' },
            { name: 'Solana', enabled: true, address: 'usdt_solana_address' },
        ],
    },
    {
        symbol: 'TRX',
        name: 'Tron',
        imageUrl: 'https://apimico.icu/Trx.png',
        networks: [
            { name: 'TRC20', enabled: true, address: 'trx_trc20_address' },
        ],
    },
    {
        symbol: 'TON',
        name: 'TON',
        imageUrl: 'https://apimico.icu/Ton.png',
        networks: [
            { name: 'TON', enabled: true, address: 'ton_address' },
        ],
    },
    {
        symbol: 'DAI',
        name: 'DAI',
        imageUrl: 'https://apimico.icu/Dai.png',
        networks: [
            { name: 'ERC20', enabled: true, address: 'dai_erc20_address' },
            { name: 'BSC (BEP20)', enabled: true, address: 'dai_bep20_address' },
            { name: 'Polygon PoS', enabled: true, address: 'dai_polygon_address' },
        ],
    },
    {
        symbol: 'SOL',
        name: 'Solana',
        imageUrl: 'https://apimico.icu/Sol.png',
        networks: [
            { name: 'Solana', enabled: true, address: 'sol_solana_address' },
        ],
    },
    {
        symbol: 'MATIC',
        name: 'Polygon (MATIC)',
        imageUrl: 'https://apimico.icu/Matic.png',
        networks: [
            { name: 'Polygon PoS', enabled: true, address: 'matic_polygon_address' },
            { name: 'ERC20', enabled: true, address: 'matic_erc20_address' },
            { name: 'BSC (BEP20)', enabled: true, address: 'matic_bep20_address' },
        ],
    },
    {
        symbol: 'BNB',
        name: 'Binance Coin (BNB)',
        imageUrl: 'https://apimico.icu/Bnb.png',
        networks: [
            { name: 'BSC (BEP20)', enabled: true, address: 'bnb_bep20_address' },
            { name: 'ERC20', enabled: true, address: 'bnb_erc20_address' },
        ],
    },
];

const WithdrawCoins = ({ onCoinSelect }) => {
    return (
        <div className="withdraw-coins-container">
            <h2>Select a Coin to Withdraw</h2>
            <div className="coin-list">
                {coins.map((coin) => (
                    <div key={coin.symbol} className="coin-item" onClick={() => onCoinSelect(coin)}>
                        {/* Coin Image */}
                        <div className="coin-image-container">
                            <img src={coin.imageUrl} alt={`${coin.name} logo`} className="coin-image" />
                        </div>
                        {/* Coin Symbol and Name */}
                        <div className="coin-details">
                            <span className="coin-symbol">{coin.symbol}</span>
                            <span className="coin-name">{coin.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WithdrawCoins;
