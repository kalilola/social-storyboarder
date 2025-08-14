import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
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
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Calendrier de Contenus</h1>
            <div className="bg-card rounded-lg p-6">
              <p className="text-muted-foreground">Vue détaillée du calendrier en développement...</p>
            </div>
          </div>
        );
      case "strategy":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Stratégie Marketing</h1>
            <div className="bg-card rounded-lg p-6">
              <p className="text-muted-foreground">Vue détaillée de la stratégie en développement...</p>
            </div>
          </div>
        );
      case "planning":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Planning & Tâches</h1>
            <div className="bg-card rounded-lg p-6">
              <p className="text-muted-foreground">Vue détaillée du planning en développement...</p>
            </div>
          </div>
        );
      case "facebook":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">API Facebook</h1>
            <div className="bg-card rounded-lg p-6">
              <p className="text-muted-foreground">Configuration avancée de l'API Facebook en développement...</p>
            </div>
          </div>
        );
      case "content":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Bibliothèque de Contenus</h1>
            <div className="bg-card rounded-lg p-6">
              <p className="text-muted-foreground">Gestion avancée des contenus en développement...</p>
            </div>
          </div>
        );
      case "analytics":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Analytics & Performances</h1>
            <div className="bg-card rounded-lg p-6">
              <p className="text-muted-foreground">Tableaux de bord analytics en développement...</p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Paramètres</h1>
            <div className="bg-card rounded-lg p-6">
              <p className="text-muted-foreground">Configuration de l'application en développement...</p>
            </div>
          </div>
        );
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