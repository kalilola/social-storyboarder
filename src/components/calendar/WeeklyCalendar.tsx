import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ContentBlock {
  id: string;
  type: "post" | "story" | "video" | "live" | "ad";
  title: string;
  time: string;
  platform: string;
}

interface DayContent {
  [key: string]: ContentBlock[];
}

const weekDays = [
  "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"
];

const contentTypeColors = {
  post: "bg-marketing-primary/10 text-marketing-primary border-marketing-primary/20",
  story: "bg-marketing-creative/10 text-marketing-creative border-marketing-creative/20",
  video: "bg-marketing-info/10 text-marketing-info border-marketing-info/20",
  live: "bg-marketing-warning/10 text-marketing-warning border-marketing-warning/20",
  ad: "bg-marketing-success/10 text-marketing-success border-marketing-success/20"
};

export const WeeklyCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [dayContents, setDayContents] = useState<DayContent>({
    "Lundi": [
      { id: "1", type: "post", title: "Post motivation", time: "09:00", platform: "Instagram" }
    ],
    "Mardi": [
      { id: "2", type: "story", title: "Behind the scenes", time: "14:00", platform: "Instagram" }
    ],
    "Mercredi": [],
    "Jeudi": [
      { id: "3", type: "video", title: "Tutorial produit", time: "16:00", platform: "YouTube" }
    ],
    "Vendredi": [
      { id: "4", type: "ad", title: "Campagne promo", time: "10:00", platform: "Facebook" }
    ],
    "Samedi": [],
    "Dimanche": [
      { id: "5", type: "live", title: "Live Q&A", time: "20:00", platform: "Instagram" }
    ]
  });

  const addContentBlock = (day: string) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type: "post",
      title: "Nouveau contenu",
      time: "12:00",
      platform: "Instagram"
    };
    
    setDayContents(prev => ({
      ...prev,
      [day]: [...(prev[day] || []), newBlock]
    }));
  };

  const removeContentBlock = (day: string, blockId: string) => {
    setDayContents(prev => ({
      ...prev,
      [day]: prev[day].filter(block => block.id !== blockId)
    }));
  };

  return (
    <Card className="h-full bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-module-calendar" />
            Calendrier Hebdomadaire
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(currentWeek - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground px-2">
              Semaine {currentWeek + 1}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(currentWeek + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="grid grid-cols-7 gap-0 border-t border-border/50">
          {weekDays.map((day) => {
            const dayContent = dayContents[day] || [];
            return (
              <div key={day} className="border-r border-border/50 last:border-r-0 min-h-[300px]">
                <div className="p-3 border-b border-border/50 bg-muted/20">
                  <div className="text-sm font-medium text-center">{day}</div>
                </div>
                
                <div className="p-2 space-y-2">
                  {dayContent.map((block) => (
                    <div
                      key={block.id}
                      className={cn(
                        "p-2 rounded border text-xs cursor-pointer hover:opacity-80 transition-opacity",
                        contentTypeColors[block.type]
                      )}
                      onClick={() => removeContentBlock(day, block.id)}
                    >
                      <div className="font-medium truncate">{block.title}</div>
                      <div className="text-xs opacity-75">{block.time}</div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {block.platform}
                      </Badge>
                    </div>
                  ))}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addContentBlock(day)}
                    className="w-full h-8 border-2 border-dashed border-border/50 hover:border-module-calendar/50 hover:bg-module-calendar/5"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};