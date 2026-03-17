import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts";
import { TrendingUp, TrendingDown, Users, Activity } from "lucide-react";

const salesForecast = [
  { month: "Aug", actual: 68000, forecast: null },
  { month: "Sep", actual: null, forecast: 72000, upper: 78000, lower: 66000 },
  { month: "Oct", actual: null, forecast: 79000, upper: 87000, lower: 71000 },
  { month: "Nov", actual: null, forecast: 91000, upper: 101000, lower: 81000 },
  { month: "Dec", actual: null, forecast: 106000, upper: 118000, lower: 94000 },
];

const combinedForecast = [
  { month: "May", actual: 58000 },
  { month: "Jun", actual: 62000 },
  { month: "Jul", actual: 55000 },
  { month: "Aug", actual: 68000 },
  { month: "Sep", forecast: 72000 },
  { month: "Oct", forecast: 79000 },
  { month: "Nov", forecast: 91000 },
  { month: "Dec", forecast: 106000 },
];

const demandData = [
  { week: "W1", electronics: 340, clothing: 210, food: 480 },
  { week: "W2", electronics: 380, clothing: 195, food: 510 },
  { week: "W3", electronics: 420, clothing: 230, food: 490 },
  { week: "W4", electronics: 460, clothing: 215, food: 525 },
  { week: "W5", electronics: 390, clothing: 248, food: 550 },
  { week: "W6", electronics: 510, clothing: 260, food: 535 },
];

const churnData = [
  { month: "Mar", churnRate: 3.2, atRisk: 142 },
  { month: "Apr", churnRate: 2.9, atRisk: 128 },
  { month: "May", churnRate: 3.5, atRisk: 155 },
  { month: "Jun", churnRate: 4.1, atRisk: 182 },
  { month: "Jul", churnRate: 3.8, atRisk: 169 },
  { month: "Aug", churnRate: 3.4, atRisk: 151 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 text-xs shadow-elevated">
        <p className="text-muted-foreground mb-1.5 font-medium">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="font-semibold">
            {p.name}: {typeof p.value === "number" && p.value > 1000 ? `$${(p.value / 1000).toFixed(0)}K` : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const forecastCards = [
  { label: "Sep Revenue Forecast", value: "$72K", change: "+5.9%", up: true },
  { label: "Demand Peak (Nov)", value: "$91K", change: "+33%", up: true },
  { label: "Churn Rate (Est.)", value: "3.4%", change: "-0.4%", up: true },
  { label: "At-Risk Customers", value: "151", change: "-18", up: true },
];

export default function Predictive() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h2 className="text-base font-semibold text-foreground mb-0.5">Predictive Analytics</h2>
        <p className="text-xs text-muted-foreground">AI-powered forecasts based on historical trends</p>
      </div>

      {/* Forecast summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {forecastCards.map((c) => (
          <div key={c.label} className="card-surface rounded-xl p-4 border border-border/50">
            <p className="text-lg font-bold text-foreground mb-0.5">{c.value}</p>
            <p className="text-[10px] text-muted-foreground mb-2 leading-tight">{c.label}</p>
            <span className="flex items-center gap-1 text-xs text-teal-soft font-medium">
              <TrendingUp className="w-3 h-3" />
              {c.change}
            </span>
          </div>
        ))}
      </div>

      {/* Sales Forecast Chart */}
      <div className="card-surface rounded-xl p-5 border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground text-sm">Sales Forecast</h3>
            <p className="text-xs text-muted-foreground">Historical data + 4-month AI projection</p>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/15 text-primary font-medium border border-primary/20">
            AI Predicted
          </span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={combinedForecast}>
            <defs>
              <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(263 42% 68%)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="hsl(263 42% 68%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(337 32% 62%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(337 32% 62%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(260 10% 20%)" />
            <XAxis dataKey="month" tick={{ fill: "hsl(260 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(260 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x="Aug" stroke="hsl(260 10% 35%)" strokeDasharray="4 4" label={{ value: "Now", fill: "hsl(260 10% 55%)", fontSize: 10 }} />
            <Area type="monotone" dataKey="actual" name="Actual" stroke="hsl(263 42% 68%)" fill="url(#actualGrad)" strokeWidth={2} connectNulls={false} />
            <Area type="monotone" dataKey="forecast" name="Forecast" stroke="hsl(337 32% 62%)" fill="url(#forecastGrad)" strokeWidth={2} strokeDasharray="6 3" connectNulls={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Demand + Churn */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card-surface rounded-xl p-5 border border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-lavender" />
            <div>
              <h3 className="font-semibold text-foreground text-sm">Demand Trends by Category</h3>
              <p className="text-xs text-muted-foreground">Weekly units demand</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={demandData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(260 10% 20%)" />
              <XAxis dataKey="week" tick={{ fill: "hsl(260 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(260 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="electronics" name="Electronics" stroke="hsl(263 42% 68%)" strokeWidth={2} dot={{ fill: "hsl(263 42% 68%)", r: 3 }} />
              <Line type="monotone" dataKey="clothing" name="Clothing" stroke="hsl(337 32% 62%)" strokeWidth={2} dot={{ fill: "hsl(337 32% 62%)", r: 3 }} />
              <Line type="monotone" dataKey="food" name="Food & Bev" stroke="hsl(30 35% 62%)" strokeWidth={2} dot={{ fill: "hsl(30 35% 62%)", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3">
            {[["Electronics", "hsl(263 42% 68%)"], ["Clothing", "hsl(337 32% 62%)"], ["Food & Bev", "hsl(30 35% 62%)"]].map(([l, c]) => (
              <div key={l} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: c }} />
                <span className="text-[10px] text-muted-foreground">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface rounded-xl p-5 border border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-accent" />
            <div>
              <h3 className="font-semibold text-foreground text-sm">Customer Churn Prediction</h3>
              <p className="text-xs text-muted-foreground">Churn rate % & at-risk count</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={churnData} barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(260 10% 20%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "hsl(260 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill: "hsl(260 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "hsl(260 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="left" dataKey="churnRate" name="Churn %" fill="hsl(337 32% 62%)" radius={[3, 3, 0, 0]} />
              <Bar yAxisId="right" dataKey="atRisk" name="At Risk" fill="hsl(263 42% 68% / 0.5)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground mt-3 p-3 rounded-lg bg-accent/5 border border-accent/15">
            <span className="text-accent font-semibold">⚠ Alert:</span> 151 customers are showing churn signals. Launching a re-engagement email campaign is recommended within 7 days.
          </p>
        </div>
      </div>
    </div>
  );
}
