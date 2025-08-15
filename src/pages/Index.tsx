import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import CalendarPage from "./CalendarPage";
import StrategyPage from "./StrategyPage";
import PlanningPage from "./PlanningPage";
import FacebookPage from "./FacebookPage";
import ContentPage from "./ContentPage";
import AnalyticsPage from "./AnalyticsPage";
import SettingsPage from "./SettingsPage";
import { toast } from "sonner";

const Index = () => {
  const [activeModule, setActiveModule] = useState("dashboard");

  const handleAddModule = () => {
    toast.info("Fonctionnalité d'ajout de modules en développement !", {
      description: "Bientôt disponible pour personnaliser votre workspace"
    });
  };

  const renderMainContent = () => {
    switch (activeModule) {
      case "dashboard":
        return <DashboardGrid onAddModule={handleAddModule} />;
      case "calendar":
        return <CalendarPage />;
      case "strategy":
        return <StrategyPage />;
      case "planning":
        return <PlanningPage />;
      case "facebook":
        return <FacebookPage />;
      case "content":
        return <ContentPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <DashboardGrid onAddModule={handleAddModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        activeModule={activeModule} 
        onModuleChange={setActiveModule}
        onAddModule={handleAddModule}
      />
      <main className="flex-1 overflow-hidden">
        {renderMainContent()}
      </main>
    </div>
  );
};

export default Index;