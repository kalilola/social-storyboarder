import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { X, GripVertical, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

interface ModuleCardProps {
  id: string;
  title: string;
  type: string;
  children: React.ReactNode;
  onRemove: (id: string) => void;
  className?: string;
  resizable?: boolean;
}

const moduleTypeColors = {
  strategy: "bg-module-strategy/10 text-module-strategy border-module-strategy/20",
  planning: "bg-module-planning/10 text-module-planning border-module-planning/20", 
  facebook: "bg-module-facebook/10 text-module-facebook border-module-facebook/20",
  content: "bg-module-content/10 text-module-content border-module-content/20",
  calendar: "bg-module-calendar/10 text-module-calendar border-module-calendar/20"
};

export const ModuleCard = ({ id, title, type, children, onRemove, className, resizable = true }: ModuleCardProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const cardContent = (
    <Card className={cn(
      "h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-200",
      isResizing && "border-marketing-primary/50"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              {...attributes} 
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-muted/50 transition-colors"
            >
              <GripVertical className="w-4 h-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs",
                moduleTypeColors[type as keyof typeof moduleTypeColors]
              )}
            >
              {type}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            {resizable && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-muted/50 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(id)}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );

  if (!resizable) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "group",
          isDragging && "opacity-50",
          className
        )}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group",
        isDragging && "opacity-50",
        className
      )}
    >
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full"
        onLayout={() => setIsResizing(true)}
      >
        <ResizablePanel defaultSize={100} minSize={30}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel defaultSize={100} minSize={30}>
              {cardContent}
            </ResizablePanel>
            <ResizableHandle 
              withHandle 
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onMouseDown={() => setIsResizing(true)}
              onMouseUp={() => setIsResizing(false)}
            />
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle 
          withHandle 
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          onMouseDown={() => setIsResizing(true)}
          onMouseUp={() => setIsResizing(false)}
        />
      </ResizablePanelGroup>
    </div>
  );
};