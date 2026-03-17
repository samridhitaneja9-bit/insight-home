import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import {
  TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart,
  Target, Zap, AlertTriangle, CheckCircle, ArrowUpRight, ArrowDownRight, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const revenueData = [
  { month: "Jan", revenue: 42000, target: 38000 },
  { month: "Feb", revenue: 38000, target: 40000 },
  { month: "Mar", revenue: 51000, target: 42000 },
  { month: "Apr", revenue: 47000, target: 44000 },
  { month: "May", revenue: 58000, target: 46000 },
  { month: "Jun", revenue: 62000, target: 50000 },
  { month: "Jul", revenue: 55000, target: 52000 },
  { month: "Aug", revenue: 68000, target: 54000 },
];

const salesData = [
  { name: "Electronics", value: 35, color: "hsl(263 42% 68%)" },
  { name: "Clothing", value: 25, color: "hsl(337 32% 62%)" },
  { name: "Food & Bev", value: 20, color: "hsl(30 35% 62%)" },
  { name: "Others", value: 20, color: "hsl(180 28% 55%)" },
];

const customerData = [
  { month: "Jan", new: 120, returning: 340 },
  { month: "Feb", new: 145, returning: 360 },
  { month: "Mar", new: 180, returning: 390 },
  { month: "Apr", new: 160, returning: 415 },
  { month: "May", new: 210, returning: 440 },
  { month: "Jun", new: 240, returning: 480 },
  { month: "Jul", new: 220, returning: 510 },
  { month: "Aug", new: 265, returning: 540 },
];

const kpis = [
  { label: "Total Revenue", value: "$421K", change: "+12.4%", up: true, icon: DollarSign, color: "text-lavender" },
  { label: "Total Orders", value: "8,294", change: "+7.2%", up: true, icon: ShoppingCart, color: "text-accent" },
  { label: "Customers", value: "3,841", change: "+18.6%", up: true, icon: Users, color: "text-teal-soft" },
  { label: "Conversion", value: "3.82%", change: "-0.4%", up: false, icon: Target, color: "text-warm-beige" },
];

function HealthScore({ score }: { score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? "hsl(263 42% 68%)" : score >= 50 ? "hsl(30 35% 62%)" : "hsl(337 32% 62%)";

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="hsl(260 10% 20%)" strokeWidth="10" />
          <circle
            cx="60" cy="60" r={radius} fill="none" stroke={color} strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground">{score}</span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <p className="text-sm font-semibold text-foreground">Business Health</p>
      <span className="text-xs px-2.5 py-1 rounded-full bg-primary/15 text-primary font-medium">
        {score >= 75 ? "Excellent" : score >= 50 ? "Good" : "Needs Work"}
      </span>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-elevated text-xs">
        <p className="text-muted-foreground mb-1.5 font-medium">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="font-semibold">
            {p.name}: {typeof p.value === "number" && p.name.includes("revenue")
              ? `$${(p.value / 1000).toFixed(0)}K`
              : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [showCeoMode, setShowCeoMode] = useState(false);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="card-surface rounded-xl p-4 border border-border/50">
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center">
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${kpi.up ? "text-teal-soft" : "text-accent"}`}>
                {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {kpi.change}
              </span>
            </div>
            <p className="text-xl font-bold text-foreground">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart + Health Score */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card-surface rounded-xl p-5 border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground text-sm">Revenue vs Target</h3>
              <p className="text-xs text-muted-foreground">Jan – Aug 2025</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-teal-soft/15 text-teal-soft font-medium">+12.4%</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(263 42% 68%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(263 42% 68%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="tgtGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(337 32% 62%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(337 32% 62%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(260 10% 20%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(260 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(260 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="hsl(263 42% 68%)" fill="url(#revGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="target" name="Target" stroke="hsl(337 32% 62%)" fill="url(#tgtGrad)" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card-surface rounded-xl p-5 border border-border/50">
          <HealthScore score={78} />
        </div>
      </div>

      {/* Sales Breakdown + Customer Growth */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card-surface rounded-xl p-5 border border-border/50">
          <h3 className="font-semibold text-foreground text-sm mb-1">Sales by Category</h3>
          <p className="text-xs text-muted-foreground mb-4">Current month breakdown</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={130} height={130}>
              <PieChart>
                <Pie data={salesData} cx="50%" cy="50%" innerRadius={38} outerRadius={58} dataKey="value" paddingAngle={3}>
                  {salesData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2.5 flex-1">
              {salesData.map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                    <span className="text-xs text-muted-foreground">{s.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-foreground">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card-surface rounded-xl p-5 border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground text-sm">Customer Growth</h3>
              <p className="text-xs text-muted-foreground">New vs Returning</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={customerData} barSize={8} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(260 10% 20%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "hsl(260 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(260 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="new" name="New" fill="hsl(263 42% 68%)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="returning" name="Returning" fill="hsl(337 32% 62%)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI CEO Mode */}
      <div className="card-surface rounded-xl p-5 border border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">AI CEO Mode</h3>
              <p className="text-xs text-muted-foreground">Executive intelligence at your fingertips</p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => setShowCeoMode(!showCeoMode)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs rounded-lg shadow-glow-lavender"
          >
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            Generate AI Business Strategy
          </Button>
        </div>

        {showCeoMode && (
          <div className="grid md:grid-cols-3 gap-4 mt-4 animate-fade-in">
            <div className="rounded-lg bg-surface border border-border/60 p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <BarChart3 className="w-3.5 h-3.5 text-lavender" />
                <span className="text-xs font-semibold text-foreground">Executive Summary</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                InsightAI's business shows strong revenue growth of 12.4% YTD. Customer acquisition is accelerating,
                and conversion metrics are near industry average. Q3 trajectory looks positive with seasonal uplift expected.
              </p>
            </div>
            <div className="rounded-lg bg-surface border border-border/60 p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <CheckCircle className="w-3.5 h-3.5 text-teal-soft" />
                <span className="text-xs font-semibold text-foreground">Recommendations</span>
              </div>
              <ul className="space-y-2">
                <li className="text-xs text-muted-foreground flex gap-2"><span className="text-teal-soft mt-0.5">→</span> Invest 15% more in Electronics — top-performing category.</li>
                <li className="text-xs text-muted-foreground flex gap-2"><span className="text-teal-soft mt-0.5">→</span> Launch a retention campaign for returning customers to offset churn.</li>
                <li className="text-xs text-muted-foreground flex gap-2"><span className="text-teal-soft mt-0.5">→</span> Improve conversion funnel — small gains here have outsized revenue impact.</li>
              </ul>
            </div>
            <div className="rounded-lg bg-surface border border-border/60 p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <AlertTriangle className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-semibold text-foreground">Risk Flags</span>
              </div>
              <ul className="space-y-2">
                <li className="text-xs text-muted-foreground flex gap-2"><span className="text-accent mt-0.5">⚠</span> Conversion rate declined 0.4% — monitor closely next quarter.</li>
                <li className="text-xs text-muted-foreground flex gap-2"><span className="text-accent mt-0.5">⚠</span> Revenue exceeded targets in 6/8 months — risk of supply constraints.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
