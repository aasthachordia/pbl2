
import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// Mock data for crypto coins
const initialCoins = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 62354.23,
    change24h: 2.34,
    sentiment: 78,
    prediction: "up"
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 3456.78,
    change24h: -1.2,
    sentiment: 65,
    prediction: "up"
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    price: 142.58,
    change24h: 5.67,
    sentiment: 82,
    prediction: "up"
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    price: 0.543,
    change24h: -0.87,
    sentiment: 48,
    prediction: "down"
  },
  {
    id: "xrp",
    symbol: "XRP",
    name: "XRP",
    price: 0.543,
    change24h: 1.23,
    sentiment: 55,
    prediction: "neutral"
  },
  {
    id: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    price: 7.32,
    change24h: -2.45,
    sentiment: 42,
    prediction: "down"
  },
  {
    id: "avalanche",
    symbol: "AVAX",
    name: "Avalanche",
    price: 35.78,
    change24h: 3.56,
    sentiment: 75,
    prediction: "up"
  },
  {
    id: "binancecoin",
    symbol: "BNB",
    name: "Binance Coin",
    price: 598.45,
    change24h: 0.34,
    sentiment: 60,
    prediction: "neutral"
  }
];

const CryptoTicker = () => {
  const [coins, setCoins] = useState(initialCoins);
  
  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(prevCoins => 
        prevCoins.map(coin => ({
          ...coin,
          price: parseFloat((coin.price * (1 + (Math.random() * 0.01 - 0.005))).toFixed(2)),
          change24h: parseFloat((coin.change24h + (Math.random() * 0.2 - 0.1)).toFixed(2)),
          sentiment: Math.min(100, Math.max(0, coin.sentiment + Math.floor(Math.random() * 5) - 2))
        }))
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden relative bg-black/20 backdrop-blur-sm border-y border-white/10">
      <div className="flex space-x-12 animate-ticker whitespace-nowrap py-3">
        {[...coins, ...coins].map((coin, index) => (
          <div key={`${coin.id}-${index}`} className="flex items-center space-x-2">
            <span className="text-sm font-medium">{coin.symbol}</span>
            <span className="text-sm">${coin.price.toLocaleString()}</span>
            <span 
              className={`flex items-center text-xs ${
                coin.change24h >= 0 ? "text-crypto-positive" : "text-crypto-negative"
              }`}
            >
              {coin.change24h >= 0 ? (
                <ArrowUpRight size={14} className="mr-0.5" />
              ) : (
                <ArrowDownRight size={14} className="mr-0.5" />
              )}
              {Math.abs(coin.change24h)}%
            </span>
            <span 
              className={`px-1.5 py-0.5 rounded text-xs ${
                coin.sentiment > 65 ? "bg-crypto-positive/20 text-crypto-positive" : 
                coin.sentiment < 40 ? "bg-crypto-negative/20 text-crypto-negative" : 
                "bg-crypto-neutral/20 text-crypto-neutral"
              }`}
            >
              Sentiment: {coin.sentiment}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoTicker;
