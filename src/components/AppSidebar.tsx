import { BarChart3, Brain, FileUp, Home, LineChart, MessageSquare, FileText, Sparkles } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "Data Upload", url: "/data-upload", icon: FileUp },
  { title: "Insights", url: "/insights", icon: Brain },
  { title: "Predictive", url: "/predictive", icon: LineChart },
  { title: "AI Assistant", url: "/assistant", icon: MessageSquare },
  { title: "Reports", url: "/reports", icon: FileText },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-lavender flex items-center justify-center flex-shrink-0 shadow-glow-lavender">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <span className="text-sm font-semibold text-foreground tracking-tight">InsightAI</span>
              <p className="text-[10px] text-muted-foreground leading-tight">Business Intelligence</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="pt-3">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground px-3 mb-1">
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          collapsed ? "justify-center" : ""
                        } ${
                          isActive
                            ? "bg-primary/15 text-primary font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`}
                        activeClassName=""
                      >
                        <item.icon
                          className={`flex-shrink-0 transition-colors ${
                            collapsed ? "w-5 h-5" : "w-4 h-4"
                          } ${isActive ? "text-primary" : ""}`}
                        />
                        {!collapsed && <span className="truncate">{item.title}</span>}
                        {!collapsed && isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!collapsed && (
        <div className="p-3 mt-auto border-t border-sidebar-border">
          <div className="rounded-lg bg-gradient-primary border border-primary/20 p-3">
            <p className="text-xs font-medium text-foreground mb-1">Hackathon Build</p>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              AI-powered prototype for business intelligence.
            </p>
          </div>
        </div>
      )}
    </Sidebar>
  );
}
