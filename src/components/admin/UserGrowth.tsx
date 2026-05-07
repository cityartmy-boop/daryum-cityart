"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function UserGrowth() {
  const data = [
    { month: "يناير", total: 1842, active: 1654, trial: 188 },
    { month: "فبراير", total: 2034, active: 1821, trial: 213 },
    { month: "مارس", total: 2256, active: 2018, trial: 238 },
    { month: "أبريل", total: 2489, active: 2231, trial: 258 },
    { month: "مايو", total: 2714, active: 2436, trial: 278 },
    { month: "يونيو", total: 2847, active: 2631, trial: 347 }
  ];

  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2 text-right">نمو المستخدمين</h3>
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">إجمالي المستخدمين</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-muted-foreground">المشتركين النشطين</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-muted-foreground">التجارب المجانية</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              stroke="#9ca3af"
              style={{ fontSize: '12px', fontFamily: 'Tajawal' }}
            />
            <YAxis 
              stroke="#9ca3af"
              style={{ fontSize: '12px', direction: 'ltr' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                direction: 'rtl'
              }}
              labelStyle={{ fontFamily: 'Tajawal', fontWeight: 'bold' }}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ r: 6, fill: 'hsl(var(--primary))' }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="active"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 6, fill: '#10b981' }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="trial"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ r: 6, fill: '#f59e0b' }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}