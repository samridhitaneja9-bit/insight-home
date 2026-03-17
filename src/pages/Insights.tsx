import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Lightbulb,
  BarChart3, Users, DollarSign, Zap, Eye, ArrowUpRight
} from "lucide-react";

const insights = [
  {
    type: "positive",
    icon: TrendingUp,
    iconColor: "text-teal-soft",
    bg: "bg-teal-soft/10",
    border: "border-teal-soft/20",
    badge: "Growth",
    badgeColor: "bg-teal-soft/15 text-teal-soft",
    title: "Electronics Revenue Surging",
    desc: "Electronics category grew 28% this quarter, outpacing all other segments. Wireless accessories are driving the most volume growth.",
    stat: "+28%",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    iconColor: "text-warm-beige",
    bg: "bg-warm-beige/10",
    border: "border-warm-beige/20",
    badge: "Watch",
    badgeColor: "bg-warm-beige/15 text-warm-beige",
    title: "Conversion Rate Softening",
    desc: "Conversion rate dropped from 4.2% to 3.8% over 60 days. Checkout UX improvements could recover ~$8K/month in lost revenue.",
    stat: "-0.4%",
  },
  {
    type: "negative",
    icon: TrendingDown,
    iconColor: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
    badge: "Risk",
    badgeColor: "bg-accent/15 text-accent",
    title: "Customer Churn in Clothing",
    desc: "Repeat purchase rate for Clothing fell 11% since Q2. Consider a targeted loyalty campaign for this segment.",
    stat: "-11%",
  },
  {
    type: "positive",
    icon: CheckCircle,
    iconColor: "text-teal-soft",
    bg: "bg-teal-soft/10",
    border: "border-teal-soft/20",
    badge: "Highlight",
    badgeColor: "bg-teal-soft/15 text-teal-soft",
    title: "Customer Acquisition Accelerating",
    desc: "New customer acquisition is up 18.6% YoY. Social and referral channels are leading — double down on referral incentives.",
    stat: "+18.6%",
  },
  {
    type: "idea",
    icon: Lightbulb,
    iconColor: "text-lavender",
    bg: "bg-primary/10",
    border: "border-primary/20",
    badge: "Opportunity",
    badgeColor: "bg-primary/15 text-primary",
    title: "Upsell Potential in Smart Devices",
    desc: "Customers who purchased Smart Watch have a 43% higher lifetime value. Bundle offers with accessories could increase AOV by ~$25.",
    stat: "+43% LTV",
  },
  {
    type: "warning",
    icon: BarChart3,
    iconColor: "text-warm-beige",
    bg: "bg-warm-beige/10",
    border: "border-warm-beige/20",
    badge: "Monitor",
    badgeColor: "bg-warm-beige/15 text-warm-beige",
    title: "Inventory Risk in Q4",
    desc: "At current sell-through velocity, 3 top SKUs will stock out before Dec. Initiate reorder before October to avoid lost sales.",
    stat: "3 SKUs",
  },
];

const performancePillars = [
  { label: "Revenue Growth", score: 82, color: "bg-lavender" },
  { label: "Customer Retention", score: 67, color: "bg-accent" },
  { label: "Operational Efficiency", score: 74, color: "bg-teal-soft" },
  { label: "Market Positioning", score: 59, color: "bg-warm-beige" },
];

export default function Insights() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground mb-0.5">AI Insights Panel</h2>
          <p className="text-xs text-muted-foreground">AI-generated from your latest data · updated now</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
          <Eye className="w-3 h-3" />
          6 active insights
        </span>
      </div>

      {/* Performance pillars */}
      <div className="card-surface rounded-xl p-5 border border-border/50">
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-4">Performance Pillars</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {performancePillars.map((pillar) => (
            <div key={pillar.label}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-muted-foreground">{pillar.label}</span>
                <span className="text-xs font-semibold text-foreground">{pillar.score}/100</span>
              </div>
              <div className="h-2 rounded-full bg-surface overflow-hidden">
                <div
                  className={`h-full rounded-full ${pillar.color} transition-all duration-700`}
                  style={{ width: `${pillar.score}%`, opacity: 0.85 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {insights.map((insight, i) => (
          <div
            key={i}
            className={`card-surface rounded-xl p-5 border ${insight.border} hover:shadow-elevated transition-all duration-200 group`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg ${insight.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <insight.icon className={`w-4 h-4 ${insight.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${insight.badgeColor}`}>
                    {insight.badge}
                  </span>
                  <span className="text-xs font-bold text-foreground">{insight.stat}</span>
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1.5">{insight.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{insight.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI summary strip */}
      <div className="rounded-xl bg-gradient-primary border border-primary/20 p-5 flex items-start gap-4">
        <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Zap className="w-4.5 h-4.5 text-primary" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-1.5">Overall AI Assessment</h4>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
            Your business shows strong top-line momentum with 12% revenue growth, but profitability risks exist in the
            Clothing segment and conversion funnel. Prioritize retention campaigns and checkout optimization in Q3 to
            protect margin while the Electronics growth engine continues firing.
          </p>
        </div>
        <div className="ml-auto flex-shrink-0">
          <span className="flex items-center gap-1 text-xs font-semibold text-teal-soft">
            <ArrowUpRight className="w-3.5 h-3.5" />
            Score: 78
          </span>
        </div>
      </div>
    </div>
  );
}
