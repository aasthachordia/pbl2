import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import ParticleBackground from "@/components/ui/particle-background";
import CryptoTicker from "@/components/crypto/CryptoTicker";
import SentimentCard from "@/components/crypto/SentimentCard";
import TrendingCoins from "@/components/crypto/TrendingCoins";
import SentimentGraph from "@/components/crypto/SentimentGraph";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowUp, ArrowDown, Minus, MessageSquare } from "lucide-react";

const Index = () => {
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [sentimentScore, setSentimentScore] = useState(78);
  const [prediction, setPrediction] = useState<"up" | "down" | "neutral">("up");
  const [sentimentBreakdown, setSentimentBreakdown] = useState({
    positive: 65,
    neutral: 22,
    negative: 13
  });
  
  // Sample sentiment cards data with prices
  const sentimentCards = [{
    coinName: "Bitcoin",
    coinSymbol: "BTC",
    sentimentScore: 78,
    price: 62354.23,
    prediction: "up" as const
  }, {
    coinName: "Ethereum",
    coinSymbol: "ETH",
    sentimentScore: 65,
    price: 3456.78,
    prediction: "up" as const
  }, {
    coinName: "Cardano",
    coinSymbol: "ADA",
    sentimentScore: 48,
    price: 0.543,
    prediction: "down" as const
  }, {
    coinName: "Solana",
    coinSymbol: "SOL",
    sentimentScore: 82,
    price: 142.58,
    prediction: "up" as const
  }];
  
  // Sample news data
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
    }
  ];
  
  // Coins for dropdown selection
  const coins = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH" },
    { id: "solana", name: "Solana", symbol: "SOL" },
    { id: "cardano", name: "Cardano", symbol: "ADA" },
    { id: "xrp", name: "XRP", symbol: "XRP" },
    { id: "polkadot", name: "Polkadot", symbol: "DOT" }
  ];
  
  const getSentimentColor = (score: number) => {
    if (score >= 70) return "text-crypto-positive";
    if (score <= 30) return "text-crypto-negative";
    return "text-crypto-neutral";
  };

  return (
    <div className="min-h-screen w-full">
      <ParticleBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-crypto-neon-purple via-crypto-neon-blue to-crypto-neon-green text-transparent bg-clip-text">MAAL-X</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">Sentiments Analysis Price prediction Model</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#sentiment-cards">
              <Button className="text-lg px-8 py-6 bg-gradient-to-r from-crypto-neon-purple to-crypto-neon-blue hover:opacity-90 transition-opacity">
                Explore Now <ArrowRight className="ml-2" size={18} />
              </Button>
            </a>
          </div>
        </div>
      </section>
      
      {/* Ticker */}
      <CryptoTicker />
      
      {/* Dashboard Section */}
      <section id="dashboard" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text">
              Sentiment Dashboard
            </h2>
            
            <div className="mb-6">
              <Select
                value={selectedCoin}
                onValueChange={setSelectedCoin}
              >
                <SelectTrigger className="w-full md:w-[250px] glassmorphism border-white/10">
                  <SelectValue placeholder="Select a coin" />
                </SelectTrigger>
                <SelectContent className="glassmorphism border-white/10 z-50 text-white">
                  {coins.map(coin => (
                    <SelectItem key={coin.id} value={coin.symbol}>
                      {coin.name} ({coin.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="glassmorphism border-white/10 lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {selectedCoin} Sentiment
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <div className="relative mb-6">
                    <div className={`text-8xl font-bold ${getSentimentColor(sentimentScore)}`}>
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
                  
                  <div className="mt-8 flex gap-6">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">24h Prediction</div>
                      <div className="flex items-center justify-center text-crypto-positive">
                        <ArrowUp size={16} className="mr-1" />
                        <span className="font-bold">+5.2%</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">7d Prediction</div>
                      <div className="flex items-center justify-center text-crypto-positive">
                        <ArrowUp size={16} className="mr-1" />
                        <span className="font-bold">+12.7%</span>
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
                        <TabsTrigger value="sentiment" className="data-[state=active]:bg-white/20">
                          Sentiment
                        </TabsTrigger>
                        <TabsTrigger value="correlation" className="data-[state=active]:bg-white/20">
                          Price Correlation
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="sentiment" className="h-[300px]">
                        <SentimentGraph coinSymbol={selectedCoin} />
                      </TabsContent>
                      
                      <TabsContent value="correlation" className="h-[300px]">
                        <SentimentGraph coinSymbol={selectedCoin} />
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
                  <CardContent className="max-h-[250px] overflow-y-auto">
                    <div className="space-y-4">
                      {sampleNews.map(item => (
                        <div key={item.id} className="flex gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                          <div className="flex-shrink-0 mt-1">
                            {item.sentiment === 'positive' && (
                              <div className="w-4 h-4 rounded-full bg-crypto-positive" />
                            )}
                            {item.sentiment === 'negative' && (
                              <div className="w-4 h-4 rounded-full bg-crypto-negative" />
                            )}
                            {item.sentiment === 'neutral' && (
                              <div className="w-4 h-4 rounded-full bg-crypto-neutral" />
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
      </section>
      
      {/* Sentiment Cards Section */}
      <section id="sentiment-cards" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text">
                  Live Sentiment Analysis
                </h2>
                <p className="text-muted-foreground">
                  Our AI analyzes thousands of social media posts and news articles to gauge market sentiment.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sentimentCards.map((card, index) => (
              <SentimentCard 
                key={index}
                coinName={card.coinName}
                coinSymbol={card.coinSymbol}
                sentimentScore={card.sentimentScore}
                price={card.price}
                prediction={card.prediction}
                className="transition-transform hover:-translate-y-1"
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-radial from-crypto-dark-blue/30 to-transparent">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <TrendingCoins />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text">
                Make Informed Decisions
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-crypto-neon-purple/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-crypto-neon-purple flex items-center justify-center text-white">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Real-time Sentiment Analysis</h3>
                    <p className="text-muted-foreground">
                      Our AI constantly monitors social media, news, and forums to analyze market sentiment.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-crypto-neon-blue/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-crypto-neon-blue flex items-center justify-center text-white">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Price Predictions</h3>
                    <p className="text-muted-foreground">
                      Get 24-hour and 7-day price forecasts based on historical data and sentiment trends.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-crypto-neon-green/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-crypto-neon-green flex items-center justify-center text-white">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Advanced Visualizations</h3>
                    <p className="text-muted-foreground">
                      Interactive charts and dashboards to visualize sentiment trends and market movements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="glassmorphism rounded-2xl p-10 border border-white/5 shadow-neon-glow">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-crypto-neon-purple to-crypto-neon-blue text-transparent bg-clip-text">
              Stay Ahead of the Market
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get personalized alerts, in-depth analysis, and access to our predictive AI models.
            </p>
            <Button className="px-8 py-6 text-lg bg-gradient-to-r from-crypto-neon-purple to-crypto-neon-blue hover:opacity-90 transition-opacity">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="text-xl font-bold bg-gradient-to-r from-crypto-neon-purple to-crypto-neon-blue text-transparent bg-clip-text">
                MAAL-X
              </span>
              <span className="text-sm text-muted-foreground">© 2025</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition">Home</a>
              <a href="#dashboard" className="text-muted-foreground hover:text-foreground transition">Dashboard</a>
              <a href="#sentiment-cards" className="text-muted-foreground hover:text-foreground transition">Analysis</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition">About</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
