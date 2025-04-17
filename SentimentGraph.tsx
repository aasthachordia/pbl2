
import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SentimentDataPoint {
  timestamp: string;
  value: number;
}

interface SentimentGraphProps {
  coinSymbol: string;
}

const SentimentGraph = ({ coinSymbol }: SentimentGraphProps) => {
  const [data, setData] = useState<SentimentDataPoint[]>([]);

  useEffect(() => {
    // Simulate real-time data updates
    const generateData = () => {
      const now = new Date();
      const newData: SentimentDataPoint[] = [];
      
      for (let i = 24; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 3600000);
        newData.push({
          timestamp: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          value: Math.floor(Math.random() * 40) + 30 // Random value between 30-70
        });
      }
      
      setData(newData);
    };

    generateData();
    const interval = setInterval(generateData, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [coinSymbol]);

  return (
    <Card className="glassmorphism border-white/10">
      <CardHeader>
        <CardTitle className="text-xl">
          {coinSymbol} Sentiment Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="timestamp"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Time
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].payload.timestamp}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Score
                            </span>
                            <span className="font-bold">
                              {payload[0].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#9b87f5"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentGraph;
