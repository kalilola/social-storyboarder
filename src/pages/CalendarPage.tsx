import { WeeklyCalendar } from "@/components/calendar/WeeklyCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Plus, Filter } from "lucide-react";

const CalendarPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-marketing-primary" />
            Calendrier de Contenus
          </h1>
          <p className="text-muted-foreground mt-2">
            Planifiez et gérez votre stratégie de contenu hebdomadaire
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-marketing-primary to-marketing-creative">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau contenu
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Vue Hebdomadaire</CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyCalendar />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-marketing-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-marketing-primary">12</div>
              <div className="text-sm text-muted-foreground">Contenus cette semaine</div>
            </div>
            <div className="text-center p-4 bg-marketing-creative/10 rounded-lg">
              <div className="text-2xl font-bold text-marketing-creative">85%</div>
              <div className="text-sm text-muted-foreground">Taux de completion</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;