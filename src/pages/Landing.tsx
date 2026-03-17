import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BarChart3, Brain, Sparkles, TrendingUp, ShieldCheck,
  FileText, MessageSquare, ArrowRight, Zap, LayoutDashboard } from
"lucide-react";

const features = [
{
  icon: BarChart3,
  title: "AI Business Dashboard",
  desc: "Revenue trends, sales analytics, customer growth, and KPIs at a glance.",
  color: "text-lavender",
  bg: "bg-primary/10"
},
{
  icon: Brain,
  title: "AI Insights Panel",
  desc: "Short, actionable insights on trends, performance, and risks.",
  color: "text-accent",
  bg: "bg-accent/10"
},
{
  icon: TrendingUp,
  title: "Predictive Analytics",
  desc: "Sales forecasts, demand trends, and customer churn predictions.",
  color: "text-teal-soft",
  bg: "bg-teal-soft/10"
},
{
  icon: ShieldCheck,
  title: "Business Health Score",
  desc: "A clear score out of 100 to evaluate your overall business health.",
  color: "text-warm-beige",
  bg: "bg-warm-beige/10"
},
{
  icon: Zap,
  title: "AI CEO Mode",
  desc: "Generate an executive summary, strategic recommendations, and risk flags.",
  color: "text-lavender",
  bg: "bg-primary/10"
},
{
  icon: MessageSquare,
  title: "AI Assistant",
  desc: "Ask questions about your data and get clear, instant answers.",
  color: "text-accent",
  bg: "bg-accent/10"
}];


const stats = [
{ value: "98%", label: "Accuracy Rate" },
{ value: "5x", label: "Faster Insights" },
{ value: "200+", label: "Data Points" },
{ value: "Real-time", label: "Analysis" }];


export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-48 h-48 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
          


          

          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-5 animate-fade-in leading-tight">
            Turn Data Into
            <br />
            <span className="gradient-text-lavender">Smart Decisions</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in leading-relaxed">
            InsightAI is an intelligent business management platform that analyzes your data,
            generates actionable insights, and helps you make better decisions — faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in">
            <Button
              onClick={() => navigate("/dashboard")}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-lavender gap-2 rounded-xl font-medium">
              
              <LayoutDashboard className="w-4 h-4" />
              Open Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => navigate("/assistant")}
              variant="outline"
              size="lg"
              className="border-border/60 text-foreground hover:bg-surface gap-2 rounded-xl font-medium">
              
              <MessageSquare className="w-4 h-4" />
              Try AI Assistant
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-surface/50">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) =>
          <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">Everything Your Business Needs</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            From raw data to strategic decisions — all in one place, powered by AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) =>
          <div
            key={f.title}
            className="card-surface rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-all duration-200 group">
            
              <div className={`w-9 h-9 rounded-lg ${f.bg} flex items-center justify-center mb-4`}>
                <f.icon className={`w-4.5 h-4.5 ${f.color}`} />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-sm">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="rounded-2xl bg-gradient-primary border border-primary/20 p-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Brain className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Ready to see your business clearly?</h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
            Upload your data, get AI insights, and start making smarter decisions today.
          </p>
          <Button
            onClick={() => navigate("/data-upload")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-xl">
            
            Upload Your Data
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center">
        <p className="text-xs text-muted-foreground">
          Built with ❤️ for Hackathon 2025 · InsightAI — AI Powered Business Management System
        </p>
      </footer>
    </div>);

}