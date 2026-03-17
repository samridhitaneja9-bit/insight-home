import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, Bot, User, Sparkles, RotateCcw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const suggestions = [
  "Why did sales drop in February?",
  "What should we improve next quarter?",
  "Predict next month performance",
  "Which product category is most profitable?",
  "How can we reduce customer churn?",
];

const responses: Record<string, string> = {
  "why did sales drop in february": `**February Sales Analysis**\n\nSales dipped to $38K in February (vs $42K in January) for a few key reasons:\n\n• **Post-holiday slowdown** — January clearance sales pulled demand forward, leaving February with less pent-up activity.\n• **Lower marketing spend** — Campaign budget was reduced by ~18% that month.\n• **Seasonal pattern** — February is consistently your weakest month based on 2-year trend data.\n\n**Recommendation:** Pre-plan a Valentine's / mid-winter promotion to offset the seasonal dip next year.`,
  "what should we improve next quarter": `**Q3 Improvement Priorities**\n\nBased on current data, here are the top 3 focus areas:\n\n1. **Checkout Optimization** — Conversion rate is at 3.82%, below your 4.2% peak. Fixing friction in the checkout flow could recover ~$8K/month.\n2. **Clothing Retention** — Repeat purchase rate fell 11%. A loyalty points system or discount for returning buyers would help.\n3. **Inventory Planning** — 3 high-demand SKUs are at risk of stocking out before December. Initiate reorder now.\n\n**Expected Impact:** +9–14% revenue if all three are addressed this quarter.`,
  "predict next month performance": `**September Performance Forecast**\n\n📈 **Revenue:** $72,000 (±$6K confidence range)\n👥 **New Customers:** ~265 (+12% from August)\n🛒 **Orders:** ~940 units estimated\n📊 **Conversion Rate:** 3.9% (slight recovery expected)\n\n**Key Drivers:**\n• Back-to-school electronics demand peaks in September\n• Returning customer campaign scheduled for mid-month\n• Historical Sep data shows avg. 5.9% MoM lift\n\n**Risk:** Inventory shortages on Wireless Buds may cap growth by ~$3–5K.`,
  "which product category is most profitable": `**Category Profitability Breakdown**\n\n| Category | Revenue | Margin | Profit |\n|---|---|---|---|\n| Electronics | $124K | 38% | $47K |\n| Smart Watch | $81K | 42% | $34K |\n| Clothing | $38K | 28% | $11K |\n| Food & Bev | $21K | 18% | $3.8K |\n\n**Top Performer: Electronics** — Highest absolute profit at $47K with solid margins.\n\n**Watch Out:** Food & Bev has the highest volume but lowest margins — pricing strategy review recommended.`,
  "how can we reduce customer churn": `**Churn Reduction Strategy**\n\nYour current churn rate is 3.4% with ~151 at-risk customers. Here's what the data suggests:\n\n**Short-term (next 30 days):**\n• Send a personalized re-engagement email to at-risk customers with a 10% loyalty discount\n• Follow up on customers who haven't purchased in 60+ days\n\n**Medium-term (next quarter):**\n• Launch a points-based loyalty program for Clothing segment\n• Add post-purchase follow-up emails at day 7 and day 30\n\n**Expected Outcome:** 15–25% reduction in churn rate, saving ~30–40 customers per month.`,
};

function getResponse(query: string): string {
  const key = query.toLowerCase().trim();
  for (const [k, v] of Object.entries(responses)) {
    if (key.includes(k.split(" ")[0]) || k.includes(key.split(" ")[0])) {
      return v;
    }
  }
  return `**Analyzing your query...**\n\nBased on your business data, here's what I found:\n\nYour business is currently performing well with 12.4% revenue growth YoY. The specific answer to "${query}" would depend on deeper dataset analysis.\n\n**General recommendation:** Check the Insights panel for the latest AI-generated findings, or upload fresh data in the Data Upload section for a more targeted analysis.\n\nIs there something more specific I can help you with?`;
}

function renderMarkdown(text: string) {
  return text
    .split("\n")
    .map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return <p key={i} className="font-semibold text-foreground mb-1">{line.replace(/\*\*/g, "")}</p>;
      }
      if (line.startsWith("• ")) {
        return (
          <p key={i} className="flex gap-2 mb-0.5">
            <span className="text-primary mt-0.5">•</span>
            <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
          </p>
        );
      }
      if (/^\d\./.test(line)) {
        return (
          <p key={i} className="flex gap-2 mb-0.5">
            <span className="text-primary font-semibold flex-shrink-0">{line[0]}.</span>
            <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
          </p>
        );
      }
      if (line.startsWith("|")) {
        return <code key={i} className="block text-[10px] font-mono text-muted-foreground mb-0.5">{line}</code>;
      }
      if (line === "") return <div key={i} className="h-1.5" />;
      return (
        <p key={i} className="mb-0.5" dangerouslySetInnerHTML={{
          __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
            .replace(/📈|👥|🛒|📊/g, (m) => `<span>${m}</span>`)
        }} />
      );
    });
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI Business Assistant. Ask me anything about your data — sales trends, predictions, risks, or recommendations.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text?: string) => {
    const query = (text || input).trim();
    if (!query) return;

    const userMsg: Message = {
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const aiMsg: Message = {
        role: "assistant",
        content: getResponse(query),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((m) => [...m, aiMsg]);
      setLoading(false);
    }, 900);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] animate-fade-in">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border/60 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">AI Business Assistant</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-soft animate-pulse-soft" />
              <span className="text-[10px] text-teal-soft">Online</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setMessages([{
            role: "assistant",
            content: "Hello! I'm your AI Business Assistant. Ask me anything about your data.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          }])}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="space-y-2 animate-fade-in">
            <p className="text-xs text-muted-foreground font-medium">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-3 py-1.5 rounded-full bg-surface border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""} animate-fade-in`}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
              msg.role === "assistant" ? "bg-primary/15" : "bg-surface-raised"
            }`}>
              {msg.role === "assistant"
                ? <Sparkles className="w-3.5 h-3.5 text-primary" />
                : <User className="w-3.5 h-3.5 text-muted-foreground" />
              }
            </div>
            <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
              <div className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                msg.role === "assistant"
                  ? "bg-card border border-border/60 text-muted-foreground"
                  : "bg-primary text-primary-foreground"
              }`}>
                {msg.role === "assistant"
                  ? <div className="space-y-0.5">{renderMarkdown(msg.content)}</div>
                  : msg.content
                }
              </div>
              <span className="text-[10px] text-muted-foreground mt-1 px-1">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse-soft" />
            </div>
            <div className="bg-card border border-border/60 rounded-2xl px-4 py-3">
              <div className="flex gap-1.5 items-center h-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse-soft" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-border/60 flex-shrink-0">
        <div className="flex gap-3 items-end">
          <div className="flex-1 bg-surface border border-border/60 rounded-2xl px-4 py-3 focus-within:border-primary/50 transition-colors">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Ask about your business data..."
              rows={1}
              className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground resize-none outline-none leading-relaxed"
            />
          </div>
          <Button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-10 w-10 p-0 flex-shrink-0 shadow-glow-lavender disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5" />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 text-center">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
