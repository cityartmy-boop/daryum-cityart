"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function ChannelPerformance() {
  const data = [
    { channel: "Airbnb", bookings: 342, revenue: 843200 },
    { channel: "Booking.com", bookings: 289, revenue: 718900 },
    { channel: "مباشر", bookings: 156, revenue: 467100 },
    { channel: "Agoda", bookings: 98, revenue: 264300 },
    { channel: "Vrbo", bookings: 67, revenue: 186500 },
  ];

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in-up delay-400">
      <div className="mb-6">
        <h3 className="text-xl font-bold">أداء القنوات</h3>
        <p className="text-sm text-muted-foreground mt-1">عدد الحجوزات والإيرادات حسب المنصة</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(200, 95%, 55%)" />
              <stop offset="100%" stopColor="hsl(260, 60%, 55%)" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="channel" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              direction: 'rtl'
            }}
            formatter={(value: number, name: string) => {
              if (name === 'bookings') return [`${value} حجز`, 'عدد الحجوزات'];
              return [`${(value / 1000).toFixed(0)}K ر.س`, 'الإيراد'];
            }}
          />
          <Bar dataKey="bookings" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}