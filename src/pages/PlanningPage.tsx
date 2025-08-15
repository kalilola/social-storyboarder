import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, FileText, Calendar, Clock, User } from "lucide-react";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
  assignee: string;
  dueDate: string;
  category: string;
}

const PlanningPage = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Créer 5 posts LinkedIn",
      description: "Contenu professionnel sur l'IA marketing",
      priority: "high",
      status: "in-progress",
      assignee: "Marie D.",
      dueDate: "2024-01-20",
      category: "Contenu"
    },
    {
      id: "2", 
      title: "Analyser performances Facebook",
      description: "Rapport hebdomadaire des métriques",
      priority: "medium",
      status: "todo",
      assignee: "Paul R.",
      dueDate: "2024-01-22",
      category: "Analytics"
    },
    {
      id: "3",
      title: "Optimiser campagne Google Ads",
      description: "Ajuster les mots-clés et budgets",
      priority: "high",
      status: "todo",
      assignee: "Sophie L.",
      dueDate: "2024-01-18",
      category: "Publicité"
    },
    {
      id: "4",
      title: "Newsletter mensuelle",
      description: "Rédaction et design de la newsletter",
      priority: "medium",
      status: "done",
      assignee: "Marie D.",
      dueDate: "2024-01-15",
      category: "Email"
    }
  ]);

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === "done" ? "todo" : "done" }
        : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done": return "bg-green-100 text-green-800 border-green-200";
      case "in-progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "todo": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <FileText className="w-8 h-8 text-marketing-primary" />
            Planning & Tâches
          </h1>
          <p className="text-muted-foreground mt-2">
            Organisez et suivez vos tâches marketing en temps réel
          </p>
        </div>
        <Button className="bg-gradient-to-r from-marketing-primary to-marketing-creative">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle tâche
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Liste des Tâches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  className={`p-4 border rounded-lg transition-all ${
                    task.status === "done" ? "bg-muted/30 opacity-75" : "bg-card"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      checked={task.status === "done"}
                      onCheckedChange={() => toggleTaskStatus(task.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${
                          task.status === "done" ? "line-through text-muted-foreground" : ""
                        }`}>
                          {task.title}
                        </h3>
                        <div className="flex gap-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {task.assignee}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {task.dueDate}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {task.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Progression
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-marketing-primary">
                  {Math.round((tasks.filter(t => t.status === "done").length / tasks.length) * 100)}%
                </div>
                <p className="text-sm text-muted-foreground">Complété</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>À faire</span>
                  <span className="font-medium">{tasks.filter(t => t.status === "todo").length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>En cours</span>
                  <span className="font-medium">{tasks.filter(t => t.status === "in-progress").length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Terminé</span>
                  <span className="font-medium">{tasks.filter(t => t.status === "done").length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intégration Google Sheets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Synchronisez vos tâches avec Google Sheets pour une collaboration optimale.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Connecter Google Sheets
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlanningPage;