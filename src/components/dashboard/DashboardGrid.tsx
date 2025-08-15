import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { StrategyModule } from "@/components/modules/StrategyModule";
import { PlanningModule } from "@/components/modules/PlanningModule";
import { FacebookModule } from "@/components/modules/FacebookModule";
import { ContentModule } from "@/components/modules/ContentModule";
import { WeeklyCalendar } from "@/components/calendar/WeeklyCalendar";
import { useState } from "react";

interface Module {
  id: string;
  title: string;
  type: string;
  component: React.ReactNode;
}

const createModule = (type: string, id?: string): Module => {
  const moduleId = id || `${type}-${Date.now()}`;
  
  const modules: Record<string, Omit<Module, "id">> = {
    strategy: {
      title: "Stratégie Marketing",
      type: "strategy",
      component: <StrategyModule />
    },
    planning: {
      title: "Planning & Tâches",
      type: "planning", 
      component: <PlanningModule />
    },
    facebook: {
      title: "API Facebook",
      type: "facebook",
      component: <FacebookModule />
    },
    content: {
      title: "Exemples de Contenus",
      type: "content",
      component: <ContentModule />
    },
    calendar: {
      title: "Calendrier Hebdomadaire",
      type: "calendar",
      component: <WeeklyCalendar />
    }
  };

  return {
    id: moduleId,
    ...modules[type]
  };
};

interface DashboardGridProps {
  onAddModule: () => void;
}

export const DashboardGrid = ({ onAddModule }: DashboardGridProps) => {
  const [modules, setModules] = useState<Module[]>([
    createModule("strategy", "strategy-1"),
    createModule("calendar", "calendar-1"),
    createModule("planning", "planning-1"),
    createModule("facebook", "facebook-1"),
    createModule("content", "content-1")
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;

    const oldIndex = modules.findIndex(module => module.id === active.id);
    const newIndex = modules.findIndex(module => module.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newModules = [...modules];
      const [movedModule] = newModules.splice(oldIndex, 1);
      newModules.splice(newIndex, 0, movedModule);
      setModules(newModules);
    }
  };

  const removeModule = (id: string) => {
    setModules(modules.filter(module => module.id !== id));
  };

  const addNewModule = (type: string) => {
    const newModule = createModule(type);
    setModules([...modules, newModule]);
  };

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Dashboard ContentAI</h1>
        <p className="text-muted-foreground">Gérez vos modules de création de contenu et planification marketing</p>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={modules.map(m => m.id)} strategy={rectSortingStrategy}>
          <div className="flex flex-wrap gap-6 items-start">
            {modules.map((module) => (
              <ModuleCard
                key={module.id}
                id={module.id}
                title={module.title}
                type={module.type}
                onRemove={removeModule}
                resizable={true}
              >
                {module.component}
              </ModuleCard>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {modules.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">Aucun module actif</div>
          <button 
            onClick={onAddModule}
            className="text-marketing-primary hover:underline"
          >
            Ajouter votre premier module
          </button>
        </div>
      )}
    </div>
  );
};