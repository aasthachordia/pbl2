import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import ParticleBackground from "@/components/ui/particle-background";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ArrowDownRight, 
  MessageSquare,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";

const initialCoins = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
  { id: "solana", name: "Solana", symbol: "SOL" },
  { id: "cardano", name: "Cardano", symbol: "ADA" },
  { id: "xrp", name: "XRP", symbol: "XRP" },
  { id: "polkadot", name: "Polkadot", symbol: "DOT" },
  { id: "avalanche", name: "Avalanche", symbol: "AVAX" },
  { id: "binancecoin", name: "Binance Coin", symbol: "BNB" }
];

const generateSentimentData = (days: number) => {
  const data = [];
  const today = new Date();
  let sentiment = Math.random() * 30 + 40; // Start between 40-70
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    sentiment = Math.min(95, Math.max(20, sentiment + (Math.random() * 10 - 5)));
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sentiment: Math.round(sentiment),
      price: Math.round(Math.random() * 5000 + 45000) / 100, // Simulate price between 450-500
    });
  }
  
  return data;
};

const sampleNews = [
  {
    id: 1,
    source: "CryptoNews",
    text: "Bitcoin sees increased institutional adoption as another major bank announces crypto custody services.",
    time: "2 hours ago",
    sentiment: "positive"
  },
  {
    id: 2,
    source: "BlockchainToday",
    text: "Regulatory concerns grow as government officials discuss potential new framework for cryptocurrencies.",
    time: "4 hours ago",
    sentiment: "negative"
  },
  {
    id: 3,
    source: "CoinDesk",
    text: "New Ethereum upgrade scheduled for next month with minor improvements to gas efficiency.",
    time: "5 hours ago",
    sentiment: "neutral"
  },
  {
    id: 4,
    source: "CryptoInsider",
    text: "Major retailer announces plans to accept Bitcoin and other cryptocurrencies for online purchases.",
    time: "6 hours ago",
    sentiment: "positive"
  },
  {
    id: 5,
    source: "TokenNews",
    text: "Market fluctuations continue as traders react to mixed economic signals and uncertain regulatory landscape.",
    time: "7 hours ago",
    sentiment: "neutral"
  }
];

const Dashboard = () => {
  const [selectedCoin, setSelectedCoin] = useState(initialCoins[0]);
  const [sentimentData, setSentimentData] = useState(generateSentimentData(30));
  const [sentimentScore, setSentimentScore] = useState(78);
  const [prediction, setPrediction] = useState<"up" | "down" | "neutral">("up");
  const [sentimentBreakdown, setSentimentBreakdown] = useState({
    positive: 65,
    neutral: 22,
    negative: 13
  });
  
  useEffect(() => {
    setSentimentData(generateSentimentData(30));
    
    const newScore = Math.floor(Math.random() * 30 + 50);
    setSentimentScore(newScore);
    
    setPrediction(newScore > 70 ? "up" : newScore < 40 ? "down" : "neutral");
    
    const positive = Math.floor(Math.random() * 30 + 50);
    const negative = Math.floor(Math.random() * 20);
    setSentimentBreakdown({
      positive,
      negative,
      neutral: 100 - positive - negative
    });
  }, [selectedCoin]);
  
  const getSentimentColor = (score: number) => {
    if (score >= 70) return "text-crypto-positive";
    if (score <= 30) return "text-crypto-negative";
    return "text-crypto-neutral";
  };

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <Navbar />
      
      <div className="container mx-auto pt-24 pb-16 px-4">
        <h1 className="text-3xl font-bold mb-8 mt-4 bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text">
          Sentiment Dashboard
        </h1>
        
        <div className="mb-8">
          <Select
            value={selectedCoin.id}
            onValueChange={(value) => {
              const coin = initialCoins.find(c => c.id === value);
              if (coin) setSelectedCoin(coin);
            }}
          >
            <SelectTrigger className="w-full md:w-[250px] glassmorphism border-white/10">
              <SelectValue placeholder="Select a coin" />
            </SelectTrigger>
            <SelectContent className="glassmorphism border-white/10 z-50 text-white">
              {initialCoins.map(coin => (
                <SelectItem key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="glassmorphism border-white/10 lg:col-span-1 h-full">
            <CardHeader>
              <CardTitle className="text-xl">
                {selectedCoin.name} Sentiment
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="relative mb-6">
                <div className={`text-8xl font-bold ${getSentimentColor(sentimentScore)} text-glow`}>
                  {sentimentScore}
                </div>
                <div className="absolute -top-2 -right-2">
                  {prediction === "up" && (
                    <div className="bg-crypto-positive/20 text-crypto-positive p-1 rounded-md flex items-center text-sm">
                      <ArrowUp size={16} className="mr-1" /> Bullish
                    </div>
                  )}
                  {prediction === "down" && (
                    <div className="bg-crypto-negative/20 text-crypto-negative p-1 rounded-md flex items-center text-sm">
                      <ArrowDown size={16} className="mr-1" /> Bearish
                    </div>
                  )}
                  {prediction === "neutral" && (
                    <div className="bg-crypto-neutral/20 text-crypto-neutral p-1 rounded-md flex items-center text-sm">
                      <Minus size={16} className="mr-1" /> Neutral
                    </div>
                  )}
                </div>
              </div>
              
              <div className="w-full max-w-xs">
                <div className="flex justify-between mb-1 text-sm">
                  <span>Sentiment Breakdown</span>
                  <span>100%</span>
                </div>
                <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-4 flex">
                  <div 
                    className="bg-crypto-positive h-full" 
                    style={{ width: `${sentimentBreakdown.positive}%` }}
                  ></div>
                  <div 
                    className="bg-crypto-neutral h-full" 
                    style={{ width: `${sentimentBreakdown.neutral}%` }}
                  ></div>
                  <div 
                    className="bg-crypto-negative h-full" 
                    style={{ width: `${sentimentBreakdown.negative}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-crypto-positive rounded-full mr-2"></div>
                    <span>Positive {sentimentBreakdown.positive}%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-crypto-neutral rounded-full mr-2"></div>
                    <span>Neutral {sentimentBreakdown.neutral}%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-crypto-negative rounded-full mr-2"></div>
                    <span>Negative {sentimentBreakdown.negative}%</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 flex gap-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">24h Prediction</div>
                  <div className="flex items-center justify-center">
                    {prediction === "up" ? (
                      <div className="flex items-center text-crypto-positive">
                        <TrendingUp size={20} className="mr-1" />
                        <span className="font-bold">+5.2%</span>
                      </div>
                    ) : prediction === "down" ? (
                      <div className="flex items-center text-crypto-negative">
                        <TrendingDown size={20} className="mr-1" />
                        <span className="font-bold">-3.1%</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-crypto-neutral">
                        <ArrowRight size={20} className="mr-1" />
                        <span className="font-bold">±0.5%</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">7d Prediction</div>
                  <div className="flex items-center justify-center">
                    {prediction === "up" ? (
                      <div className="flex items-center text-crypto-positive">
                        <TrendingUp size={20} className="mr-1" />
                        <span className="font-bold">+12.7%</span>
                      </div>
                    ) : prediction === "down" ? (
                      <div className="flex items-center text-crypto-negative">
                        <TrendingDown size={20} className="mr-1" />
                        <span className="font-bold">-8.3%</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-crypto-neutral">
                        <ArrowRight size={20} className="mr-1" />
                        <span className="font-bold">±2.1%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="lg:col-span-2 space-y-6">
            <Card className="glassmorphism border-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Sentiment Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="sentiment">
                  <TabsList className="mb-4 bg-white/10">
                    <TabsTrigger value="sentiment" className="data-[state=active]:bg-crypto-neon-purple">
                      Sentiment
                    </TabsTrigger>
                    <TabsTrigger value="correlation" className="data-[state=active]:bg-crypto-neon-purple">
                      Price Correlation
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="sentiment" className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sentimentData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="date" 
                          stroke="rgba(255,255,255,0.5)"
                          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                        />
                        <YAxis 
                          domain={[0, 100]} 
                          stroke="rgba(255,255,255,0.5)"
                          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            background: 'rgba(17, 24, 39, 0.8)', 
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '8px',
                            color: 'white'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="sentiment" 
                          stroke="rgba(139, 92, 246, 1)" 
                          strokeWidth={3}
                          dot={{ fill: 'rgba(139, 92, 246, 1)', r: 4 }}
                          activeDot={{ r: 6, fill: 'rgba(139, 92, 246, 1)', stroke: 'white', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  
                  <TabsContent value="correlation" className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={sentimentData}>
                        <defs>
                          <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="rgba(139, 92, 246, 0.8)" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="rgba(139, 92, 246, 0.1)" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="rgba(14, 165, 233, 0.8)" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="rgba(14, 165, 233, 0.1)" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="date" 
                          stroke="rgba(255,255,255,0.5)"
                          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                        />
                        <YAxis 
                          yAxisId="left"
                          orientation="left"
                          domain={[0, 100]} 
                          stroke="rgba(139, 92, 246, 0.7)"
                          tick={{ fill: 'rgba(139, 92, 246, 0.7)', fontSize: 12 }}
                        />
                        <YAxis 
                          yAxisId="right"
                          orientation="right"
                          domain={['auto', 'auto']} 
                          stroke="rgba(14, 165, 233, 0.7)"
                          tick={{ fill: 'rgba(14, 165, 233, 0.7)', fontSize: 12 }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            background: 'rgba(17, 24, 39, 0.8)', 
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '8px',
                            color: 'white'
                          }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="sentiment" 
                          stroke="rgba(139, 92, 246, 1)" 
                          fillOpacity={1}
                          fill="url(#sentimentGradient)"
                          yAxisId="left"
                          strokeWidth={2}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="price" 
                          stroke="rgba(14, 165, 233, 1)" 
                          fillOpacity={1}
                          fill="url(#priceGradient)"
                          yAxisId="right"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card className="glassmorphism border-white/10">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <MessageSquare size={18} className="mr-2" />
                  News & Social Mentions
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-[300px] overflow-y-auto">
                <div className="space-y-4">
                  {sampleNews.map(item => (
                    <div key={item.id} className="flex gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        {item.sentiment === 'positive' && (
                          <div className="w-4 h-4 rounded-full bg-crypto-positive flex items-center justify-center">
                            <ArrowUpRight size={12} className="text-white" />
                          </div>
                        )}
                        {item.sentiment === 'negative' && (
                          <div className="w-4 h-4 rounded-full bg-crypto-negative flex items-center justify-center">
                            <ArrowDownRight size={12} className="text-white" />
                          </div>
                        )}
                        {item.sentiment === 'neutral' && (
                          <div className="w-4 h-4 rounded-full bg-crypto-neutral flex items-center justify-center">
                            <ArrowRight size={12} className="text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center text-sm mb-1">
                          <span className="font-medium">{item.source}</span>
                          <span className="mx-2 text-white/30">•</span>
                          <span className="text-muted-foreground">{item.time}</span>
                        </div>
                        <p className="text-sm">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
