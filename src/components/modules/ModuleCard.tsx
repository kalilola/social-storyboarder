import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, GripVertical, Move } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useRef, useEffect } from "react";

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
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });
  const cardRef = useRef<HTMLDivElement>(null);
  
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
    width: resizable ? `${dimensions.width}px` : 'auto',
    height: resizable ? `${dimensions.height}px` : 'auto',
  };

  const handleMouseDown = (direction: 'horizontal' | 'vertical' | 'both') => (e: React.MouseEvent) => {
    if (!resizable) return;
    
    e.preventDefault();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = dimensions.width;
    const startHeight = dimensions.height;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      const newDimensions = { ...dimensions };
      
      if (direction === 'horizontal' || direction === 'both') {
        newDimensions.width = Math.max(300, startWidth + deltaX);
      }
      
      if (direction === 'vertical' || direction === 'both') {
        newDimensions.height = Math.max(200, startHeight + deltaY);
      }
      
      setDimensions(newDimensions);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        if (cardRef.current !== node) {
          cardRef.current = node;
        }
      }}
      style={style}
      className={cn(
        "group relative",
        isDragging && "opacity-50 z-50",
        isResizing && "z-40",
        className
      )}
    >
      <Card className={cn(
        "h-full w-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-200",
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
        <CardContent className="pt-0 h-[calc(100%-80px)] overflow-auto">
          {children}
        </CardContent>
      </Card>

      {/* Resize handles */}
      {resizable && (
        <>
          {/* Right handle */}
          <div
            className="absolute top-0 right-0 h-full w-1 cursor-ew-resize bg-transparent hover:bg-marketing-primary/30 opacity-0 group-hover:opacity-100 transition-opacity"
            onMouseDown={handleMouseDown('horizontal')}
          />
          
          {/* Bottom handle */}
          <div
            className="absolute bottom-0 left-0 w-full h-1 cursor-ns-resize bg-transparent hover:bg-marketing-primary/30 opacity-0 group-hover:opacity-100 transition-opacity"
            onMouseDown={handleMouseDown('vertical')}
          />
          
          {/* Bottom-right corner handle */}
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-nw-resize bg-marketing-primary/20 hover:bg-marketing-primary/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-tl-sm"
            onMouseDown={handleMouseDown('both')}
          />
        </>
      )}
    </div>
  );
};