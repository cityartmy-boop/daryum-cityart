"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export function PlanDistribution() {
  const data = [
    { name: "البداية", value: 342, percentage: 26.6, color: "#60a5fa" },
    { name: "المحترف", value: 587, percentage: 45.7, color: "#a78bfa" },
    { name: "الأعمال", value: 289, percentage: 22.5, color: "#34d399" },
    { name: "المؤسسات", value: 66, percentage: 5.2, color: "#fbbf24" }
  ];

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-2xl font-bold mb-6 text-right">توزيع الباقات</h3>
      
      <div className="grid lg:grid-cols-2 gap-6 items-center">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props: any) => `${props.payload.percentage.toFixed(1)}%`}
                outerRadius={100}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  direction: 'rtl'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-4">
          {data.map((plan, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: plan.color }}
                ></div>
                <div className="text-right">
                  <div className="font-bold text-lg">{plan.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {plan.value.toLocaleString('ar-SA')} اشتراك
                  </div>
                </div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-black tabular-nums">{plan.percentage}%</div>
              </div>
            </div>
          ))}
          
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">الإجمالي</span>
              <span className="text-2xl font-black">
                {data.reduce((acc, plan) => acc + plan.value, 0).toLocaleString('ar-SA')} اشتراك
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}