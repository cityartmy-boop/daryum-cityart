"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function RevenueGrowth() {
  const data = [
    { month: "يناير", mrr: 286000, arr: 3432000 },
    { month: "فبراير", mrr: 301000, arr: 3612000 },
    { month: "مارس", mrr: 328000, arr: 3936000 },
    { month: "أبريل", mrr: 355000, arr: 4260000 },
    { month: "مايو", mrr: 389000, arr: 4668000 },
    { month: "يونيو", mrr: 428900, arr: 5146800 }
  ];

  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2 text-right">نمو الإيرادات</h3>
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">الإيرادات الشهرية (MRR)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="text-muted-foreground">الإيرادات السنوية (ARR)</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMRR" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorARR" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              stroke="#9ca3af"
              style={{ fontSize: '12px', fontFamily: 'Tajawal' }}
            />
            <YAxis 
              stroke="#9ca3af"
              style={{ fontSize: '12px', direction: 'ltr' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                direction: 'rtl'
              }}
              formatter={(value: number) => `${value.toLocaleString('ar-SA')} ر.س`}
              labelStyle={{ fontFamily: 'Tajawal', fontWeight: 'bold' }}
            />
            <Area
              type="monotone"
              dataKey="mrr"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorMRR)"
              strokeWidth={3}
            />
            <Area
              type="monotone"
              dataKey="arr"
              stroke="hsl(var(--secondary))"
              fillOpacity={1}
              fill="url(#colorARR)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}