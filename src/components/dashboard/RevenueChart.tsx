"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function RevenueChart() {
  const data = [
    { month: "يناير", revenue: 1842000, target: 1800000 },
    { month: "فبراير", revenue: 1956000, target: 1850000 },
    { month: "مارس", revenue: 2104000, target: 1900000 },
    { month: "أبريل", revenue: 2287000, target: 2000000 },
    { month: "مايو", revenue: 2451000, target: 2100000 },
    { month: "يونيو", revenue: 2480000, target: 2200000 },
  ];

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in-up delay-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold">اتجاه الإيرادات</h3>
          <p className="text-sm text-muted-foreground mt-1">المقارنة مع الهدف الشهري</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <span>الإيراد الفعلي</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted"></div>
            <span>الهدف</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(200, 95%, 55%)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(260, 60%, 55%)" stopOpacity={0.05}/>
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
            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              direction: 'rtl'
            }}
            formatter={(value: number) => [`${(value / 1000).toFixed(0)}K ر.س`, '']}
          />
          <Area 
            type="monotone" 
            dataKey="target" 
            stroke="hsl(var(--muted))" 
            fill="hsl(var(--muted))" 
            strokeWidth={2}
            fillOpacity={0.2}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="hsl(200, 95%, 55%)" 
            fill="url(#revenueGradient)" 
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}