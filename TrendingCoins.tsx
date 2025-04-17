
import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

// Mock data for trending coins
const initialTrendingCoins = [
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
  }
];

const TrendingCoins = () => {
  const [trendingCoins, setTrendingCoins] = useState(initialTrendingCoins);
  
  // Simulate sentiment updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrendingCoins(prevCoins => 
        prevCoins.map(coin => ({
          ...coin,
          sentiment: Math.min(100, Math.max(0, coin.sentiment + Math.floor(Math.random() * 5) - 2))
        }))
      );
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glassmorphism border-white/10">
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Trending Coins</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="px-6">
        <div className="space-y-4">
          {trendingCoins.map(coin => (
            <div key={coin.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-none">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                  <span className="text-xs font-semibold">{coin.symbol.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="font-medium">{coin.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{coin.symbol}</span>
                    <span className={coin.change24h >= 0 ? "text-crypto-positive" : "text-crypto-negative"}>
                      {coin.change24h >= 0 ? (
                        <ArrowUpRight size={12} className="inline mr-0.5" />
                      ) : (
                        <ArrowDownRight size={12} className="inline mr-0.5" />
                      )}
                      {Math.abs(coin.change24h)}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="font-medium">${coin.price.toLocaleString()}</span>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs">Sentiment:</span>
                  <div className="flex items-center">
                    {coin.prediction === "up" && <ArrowUpRight size={12} className="text-crypto-positive" />}
                    {coin.prediction === "down" && <ArrowDownRight size={12} className="text-crypto-negative" />}
                    {coin.prediction === "neutral" && <Minus size={12} className="text-crypto-neutral" />}
                    <span 
                      className={`text-xs font-medium ${
                        coin.sentiment > 65 ? "text-crypto-positive" : 
                        coin.sentiment < 40 ? "text-crypto-negative" : 
                        "text-crypto-neutral"
                      }`}
                    >
                      {coin.sentiment}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingCoins;
