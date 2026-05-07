"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function OccupancyChart() {
  const data = [
    { month: "يناير", occupancy: 71.2 },
    { month: "فبراير", occupancy: 74.6 },
    { month: "مارس", occupancy: 76.8 },
    { month: "أبريل", occupancy: 79.3 },
    { month: "مايو", occupancy: 82.1 },
    { month: "يونيو", occupancy: 84.2 },
  ];

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in-up delay-300">
      <div className="mb-6">
        <h3 className="text-xl font-bold">معدل الإشغال</h3>
        <p className="text-sm text-muted-foreground mt-1">الاتجاه الشهري للإشغال</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="occupancyGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(260, 60%, 55%)" />
              <stop offset="100%" stopColor="hsl(280, 65%, 60%)" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="month" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              direction: 'rtl'
            }}
            formatter={(value: number) => [`${value.toFixed(1)}%`, 'الإشغال']}
          />
          <Line 
            type="monotone" 
            dataKey="occupancy" 
            stroke="url(#occupancyGradient)" 
            strokeWidth={3}
            dot={{ fill: 'hsl(260, 60%, 55%)', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}