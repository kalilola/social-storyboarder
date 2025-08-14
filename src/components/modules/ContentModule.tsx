import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Plus, Trash2, Image, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ContentExample {
  id: string;
  title: string;
  type: "text" | "image";
  content: string;
  instructions?: string;
}

export const ContentModule = () => {
  const [examples, setExamples] = useState<ContentExample[]>([
    {
      id: "1",
      title: "Post Instagram Motivation",
      type: "text",
      content: "🚀 Chaque petit pas compte vers tes objectifs ! #motivation #success",
      instructions: "Ton inspirant, émojis, hashtags pertinents"
    }
  ]);
  
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newInstructions, setNewInstructions] = useState("");
  const [selectedType, setSelectedType] = useState<"text" | "image">("text");

  const addExample = () => {
    if (newTitle.trim() && newContent.trim()) {
      const example: ContentExample = {
        id: Date.now().toString(),
        title: newTitle,
        type: selectedType,
        content: newContent,
        instructions: newInstructions || undefined
      };
      setExamples([...examples, example]);
      setNewTitle("");
      setNewContent("");
      setNewInstructions("");
      toast.success("Exemple de contenu ajouté !");
    }
  };

  const removeExample = (id: string) => {
    setExamples(examples.filter(ex => ex.id !== id));
    toast.success("Exemple supprimé !");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Sparkles className="w-4 h-4 text-module-content" />
        <span>Exemples de contenus et illustrations</span>
      </div>

      <div className="space-y-3 p-3 rounded-lg border border-border/50 bg-background/20">
        <h4 className="text-sm font-medium">Ajouter un exemple</h4>
        
        <div className="flex gap-2">
          <Button
            variant={selectedType === "text" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("text")}
            className="gap-2"
          >
            <FileText className="w-3 h-3" />
            Texte
          </Button>
          <Button
            variant={selectedType === "image" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("image")}
            className="gap-2"
          >
            <Image className="w-3 h-3" />
            Image
          </Button>
        </div>

        <div>
          <Label htmlFor="example-title">Titre de l'exemple</Label>
          <Input
            id="example-title"
            placeholder="Ex: Post LinkedIn B2B..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="bg-background/50"
          />
        </div>

        <div>
          <Label htmlFor="example-content">
            {selectedType === "text" ? "Contenu textuel" : "Description/URL de l'image"}
          </Label>
          <Textarea
            id="example-content"
            placeholder={selectedType === "text" ? "Votre contenu exemple..." : "Description de l'image ou URL..."}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="bg-background/50 min-h-[80px]"
          />
        </div>

        <div>
          <Label htmlFor="example-instructions">Instructions supplémentaires (optionnel)</Label>
          <Input
            id="example-instructions"
            placeholder="Ex: Ton professionnel, 3 hashtags max..."
            value={newInstructions}
            onChange={(e) => setNewInstructions(e.target.value)}
            className="bg-background/50"
          />
        </div>

        <Button onClick={addExample} size="sm" className="w-full gap-2 bg-module-content hover:bg-module-content/90">
          <Plus className="w-3 h-3" />
          Ajouter l'exemple
        </Button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        <h4 className="text-sm font-medium">Exemples stockés ({examples.length})</h4>
        {examples.map((example) => (
          <div key={example.id} className="p-3 rounded-lg border border-border/50 bg-background/30">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <h5 className="text-sm font-medium">{example.title}</h5>
                <Badge variant="outline" className="text-xs">
                  {example.type === "text" ? (
                    <><FileText className="w-3 h-3 mr-1" />Texte</>
                  ) : (
                    <><Image className="w-3 h-3 mr-1" />Image</>
                  )}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExample(example.id)}
                className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
              {example.content}
            </p>
            
            {example.instructions && (
              <p className="text-xs text-module-content italic">
                Instructions: {example.instructions}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};