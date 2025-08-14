import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, ExternalLink, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  date: string;
  status: "todo" | "doing" | "done";
}

export const PlanningModule = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Création contenu semaine 1", date: "2024-01-15", status: "todo" },
    { id: "2", title: "Analyse performances Facebook", date: "2024-01-16", status: "doing" }
  ]);
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");

  const addTask = () => {
    if (newTask.trim() && newDate) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask,
        date: newDate,
        status: "todo"
      };
      setTasks([...tasks, task]);
      setNewTask("");
      setNewDate("");
      toast.success("Tâche ajoutée au planning !");
    }
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success("Tâche supprimée !");
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "todo": return "bg-gray-500";
      case "doing": return "bg-module-planning";
      case "done": return "bg-marketing-success";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <FileText className="w-4 h-4 text-module-planning" />
        <span>Planification des tâches et contenus</span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="task-title">Nouvelle tâche</Label>
            <Input
              id="task-title"
              placeholder="Titre de la tâche..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="bg-background/50"
            />
          </div>
          <div>
            <Label htmlFor="task-date">Date</Label>
            <Input
              id="task-date"
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="bg-background/50"
            />
          </div>
        </div>
        
        <Button onClick={addTask} size="sm" className="w-full gap-2 bg-module-planning hover:bg-module-planning/90">
          <Plus className="w-3 h-3" />
          Ajouter la tâche
        </Button>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        <h4 className="text-sm font-medium">Tâches planifiées</h4>
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-2 p-2 rounded-lg border border-border/50 bg-background/30">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{task.title}</div>
              <div className="text-xs text-muted-foreground">{task.date}</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeTask(task.id)}
              className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full gap-2" size="sm">
        <ExternalLink className="w-3 h-3" />
        Ouvrir dans Google Sheets
      </Button>
    </div>
  );
};