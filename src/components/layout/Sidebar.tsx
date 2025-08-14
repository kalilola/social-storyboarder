import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  BarChart3, 
  Sparkles,
  Facebook,
  FileText,
  Target,
  Plus
} from "lucide-react";

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  onAddModule: () => void;
}

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "calendar", label: "Calendrier", icon: Calendar },
  { id: "strategy", label: "Stratégie", icon: Target },
  { id: "planning", label: "Planning", icon: FileText },
  { id: "facebook", label: "Facebook API", icon: Facebook },
  { id: "content", label: "Contenus", icon: Sparkles },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Paramètres", icon: Settings }
];

export const Sidebar = ({ activeModule, onModuleChange, onAddModule }: SidebarProps) => {
  return (
    <div className="w-64 h-screen bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-marketing-primary to-marketing-creative flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">ContentAI</h1>
            <p className="text-xs text-muted-foreground">Marketing Suite</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-2 py-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeModule === item.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10",
                  activeModule === item.id && "bg-marketing-primary/10 text-marketing-primary hover:bg-marketing-primary/15"
                )}
                onClick={() => onModuleChange(item.id)}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-border">
        <Button 
          onClick={onAddModule}
          className="w-full gap-2 bg-gradient-to-r from-marketing-primary to-marketing-creative hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          Ajouter Module
        </Button>
      </div>
    </div>
  );
};