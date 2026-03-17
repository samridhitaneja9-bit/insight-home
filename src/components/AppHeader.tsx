import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  const pageTitle: Record<string, string> = {
    "/": "Home",
    "/dashboard": "Dashboard",
    "/data-upload": "Data Upload",
    "/insights": "AI Insights",
    "/predictive": "Predictive Analytics",
    "/assistant": "AI Assistant",
    "/reports": "Reports",
  };

  const currentTitle = pageTitle[location.pathname] || "InsightAI";

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
        <div className="h-4 w-px bg-border" />
        <h1 className="text-sm font-semibold text-foreground">{currentTitle}</h1>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface transition-all duration-200">
          <Search className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface transition-all duration-200 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
        </button>
        <div className="h-4 w-px bg-border mx-1" />
        <Button
          variant={isDashboard ? "default" : "outline"}
          size="sm"
          onClick={() => navigate("/dashboard")}
          className={`gap-2 text-xs font-medium rounded-lg transition-all duration-200 ${
            isDashboard
              ? "bg-primary text-primary-foreground shadow-glow-lavender"
              : "border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          Dashboard
        </Button>
      </div>
    </header>
  );
}
