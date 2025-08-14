import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Target, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface StrategyModuleProps {
  onSave?: (strategy: string) => void;
}

export const StrategyModule = ({ onSave }: StrategyModuleProps) => {
  const [strategy, setStrategy] = useState("");

  const handleSave = () => {
    if (strategy.trim()) {
      onSave?.(strategy);
      toast.success("Stratégie marketing sauvegardée !");
    } else {
      toast.error("Veuillez saisir une stratégie avant de sauvegarder.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Target className="w-4 h-4 text-module-strategy" />
        <span>Définissez votre stratégie marketing globale</span>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="strategy-input">Stratégie Marketing</Label>
        <Textarea
          id="strategy-input"
          placeholder="Décrivez votre stratégie marketing : objectifs, cibles, messages clés, canaux privilégiés..."
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          className="min-h-[120px] resize-none bg-background/50 border-border/50 focus:border-module-strategy/50"
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          {strategy.length} caractères
        </div>
        <Button 
          onClick={handleSave}
          size="sm"
          className="gap-2 bg-module-strategy hover:bg-module-strategy/90"
        >
          <Save className="w-3 h-3" />
          Sauvegarder
        </Button>
      </div>
    </div>
  );
};