import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";
import {
  FileText, Download, Eye, CheckCircle, TrendingUp,
  Users, DollarSign, ShoppingCart, BarChart3, AlertTriangle
} from "lucide-react";

const revenueData = [
  { month: "Jan", revenue: 42000 }, { month: "Feb", revenue: 38000 },
  { month: "Mar", revenue: 51000 }, { month: "Apr", revenue: 47000 },
  { month: "May", revenue: 58000 }, { month: "Jun", revenue: 62000 },
  { month: "Jul", revenue: 55000 }, { month: "Aug", revenue: 68000 },
];

const categoryData = [
  { name: "Electronics", revenue: 124000 }, { name: "Smart Watch", revenue: 81000 },
  { name: "Clothing", revenue: 38000 }, { name: "Food & Bev", revenue: 21000 },
];

const reportSections = [
  { icon: DollarSign, color: "text-lavender", bg: "bg-primary/10", title: "Revenue Summary", value: "$421K", change: "+12.4%", up: true },
  { icon: ShoppingCart, color: "text-accent", bg: "bg-accent/10", title: "Total Orders", value: "8,294", change: "+7.2%", up: true },
  { icon: Users, color: "text-teal-soft", bg: "bg-teal-soft/10", title: "Total Customers", value: "3,841", change: "+18.6%", up: true },
  { icon: TrendingUp, color: "text-warm-beige", bg: "bg-warm-beige/10", title: "Avg Order Value", value: "$50.76", change: "+4.8%", up: true },
];

const recommendations = [
  { icon: "✅", text: "Increase Electronics inventory ahead of Q4 to meet projected demand spike.", priority: "High" },
  { icon: "🎯", text: "Launch a personalized re-engagement campaign for 151 at-risk customers.", priority: "High" },
  { icon: "💡", text: "Improve checkout flow — fix conversion drop-off to recover ~$8K/month.", priority: "Medium" },
  { icon: "📊", text: "Introduce loyalty program for Clothing category to reverse retention decline.", priority: "Medium" },
  { icon: "🔄", text: "Automate monthly reporting to reduce analyst hours and improve data freshness.", priority: "Low" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 text-xs shadow-elevated">
        <p className="text-muted-foreground mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="font-semibold">
            {typeof p.value === "number" && p.value > 1000 ? `$${(p.value / 1000).toFixed(0)}K` : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Reports() {
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setGenerated(true); }, 1500);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground mb-0.5">Automated Reports</h2>
          <p className="text-xs text-muted-foreground">Generate comprehensive business reports with AI-powered insights</p>
        </div>
        <div className="flex gap-2">
          {generated && (
            <Button
              variant="outline"
              size="sm"
              className="border-border/60 text-muted-foreground hover:text-foreground hover:bg-surface gap-2 rounded-lg text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              Export PDF
            </Button>
          )}
          <Button
            size="sm"
            onClick={generate}
            disabled={loading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-lg text-xs shadow-glow-lavender"
          >
            {loading ? (
              <>
                <BarChart3 className="w-3.5 h-3.5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="w-3.5 h-3.5" />
                {generated ? "Regenerate Report" : "Generate Report"}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Not generated state */}
      {!generated && !loading && (
        <div className="rounded-2xl border border-dashed border-border/60 bg-surface/30 p-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-2">No Report Generated Yet</h3>
          <p className="text-xs text-muted-foreground mb-5 max-w-xs mx-auto leading-relaxed">
            Click "Generate Report" to create a full business intelligence report with charts, insights, and recommendations.
          </p>
          <Button onClick={generate} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl gap-2 text-sm">
            <FileText className="w-4 h-4" />
            Generate Report
          </Button>
        </div>
      )}

      {loading && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-12 text-center">
          <div className="flex gap-2 justify-center mb-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
          <p className="text-sm font-medium text-foreground mb-1">Generating your report...</p>
          <p className="text-xs text-muted-foreground">Analyzing data, creating charts, compiling insights</p>
        </div>
      )}

      {/* Generated report */}
      {generated && (
        <div className="space-y-6 animate-fade-in">
          {/* Report header */}
          <div className="card-surface rounded-xl p-5 border border-primary/20">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-teal-soft/15 text-teal-soft font-medium border border-teal-soft/20">
                    <CheckCircle className="w-3 h-3 inline mr-1" />Generated
                  </span>
                  <span className="text-xs text-muted-foreground">Q3 2025 Business Report</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">InsightAI Business Intelligence Report</h3>
                <p className="text-xs text-muted-foreground mt-1">Period: January – August 2025 · Generated by AI</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">78</p>
                <p className="text-xs text-muted-foreground">Health Score</p>
              </div>
            </div>
          </div>

          {/* KPI Summary */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {reportSections.map((s) => (
              <div key={s.title} className="card-surface rounded-xl p-4 border border-border/50">
                <div className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                  <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
                </div>
                <p className="text-lg font-bold text-foreground">{s.value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 mb-1">{s.title}</p>
                <span className="text-[10px] text-teal-soft font-medium flex items-center gap-0.5">
                  <TrendingUp className="w-2.5 h-2.5" />{s.change}
                </span>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="card-surface rounded-xl p-5 border border-border/50">
              <h4 className="text-sm font-semibold text-foreground mb-1">Monthly Revenue</h4>
              <p className="text-xs text-muted-foreground mb-4">Jan–Aug 2025</p>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="rptGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(263 42% 68%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(263 42% 68%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(260 10% 20%)" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(260 10% 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(260 10% 55%)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(263 42% 68%)" fill="url(#rptGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="card-surface rounded-xl p-5 border border-border/50">
              <h4 className="text-sm font-semibold text-foreground mb-1">Revenue by Category</h4>
              <p className="text-xs text-muted-foreground mb-4">Total YTD</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={categoryData} barSize={24}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(260 10% 20%)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "hsl(260 10% 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(260 10% 55%)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" fill="hsl(337 32% 62%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommendations */}
          <div className="card-surface rounded-xl p-5 border border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-semibold text-foreground">AI Recommendations</h4>
            </div>
            <div className="space-y-2.5">
              {recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-surface border border-border/40">
                  <span className="text-base flex-shrink-0 leading-none mt-0.5">{rec.icon}</span>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">{rec.text}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                    rec.priority === "High" ? "bg-accent/15 text-accent" :
                    rec.priority === "Medium" ? "bg-warm-beige/15 text-warm-beige" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {rec.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Risk summary */}
          <div className="rounded-xl bg-accent/5 border border-accent/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-accent" />
              <h4 className="text-sm font-semibold text-foreground">Risk Summary</h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { risk: "Inventory shortage risk on 3 top SKUs before December", level: "High" },
                { risk: "Conversion funnel decline may compound if unchecked in Q4", level: "Medium" },
                { risk: "Seasonal slowdown expected in February — plan ahead", level: "Low" },
                { risk: "Clothing segment churn if loyalty program delayed", level: "Medium" },
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                    r.level === "High" ? "bg-accent" : r.level === "Medium" ? "bg-warm-beige" : "bg-muted-foreground"
                  }`} />
                  <p className="text-xs text-muted-foreground leading-relaxed">{r.risk}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
