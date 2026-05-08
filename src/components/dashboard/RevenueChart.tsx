"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

export function RevenueChart() {
  const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"];
  const revenue = ["﷼ 286K", "﷼ 301K", "﷼ 328K", "﷼ 355K", "﷼ 389K", "﷼ 421K"];

  return (
    <div className="glass rounded-xl p-6 border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">الإيرادات الشهرية</h3>
          <p className="text-sm text-muted-foreground">نمو مستمر خلال 6 أشهر</p>
        </div>
        <div className="flex items-center gap-2 text-available">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm font-semibold">+47%</span>
        </div>
      </div>
      
      <div className="h-64 flex items-end justify-between gap-2">
        {revenue.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all hover:opacity-80"
                 style={{ height: `${((index + 1) / revenue.length) * 100}%` }}>
            </div>
            <div className="text-xs font-semibold text-foreground">{value}</div>
            <div className="text-xs text-muted-foreground">{months[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}