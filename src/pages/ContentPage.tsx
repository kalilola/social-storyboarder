import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Image, Video, Plus, Download, Copy } from "lucide-react";
import { useState } from "react";

interface ContentItem {
  id: string;
  title: string;
  type: "text" | "image" | "video";
  content: string;
  category: string;
  instructions?: string;
}

const ContentPage = () => {
  const [contents, setContents] = useState<ContentItem[]>([
    {
      id: "1",
      title: "Post LinkedIn Motivation",
      type: "text",
      content: "🚀 La réussite n'est pas un accident, c'est un choix délibéré.\n\nChaque jour, nous avons le pouvoir de...",
      category: "LinkedIn",
      instructions: "Ton motivant et inspirant, utiliser des emojis, call-to-action engageant"
    },
    {
      id: "2", 
      title: "Visuel Instagram Stories",
      type: "image",
      content: "Bannière colorée avec citation motivante et logo d'entreprise",
      category: "Instagram",
      instructions: "Format 9:16, couleurs vives, texte lisible, style moderne"
    },
    {
      id: "3",
      title: "Script Vidéo Produit",
      type: "video",
      content: "Intro accrocheuse -> Problème -> Solution -> Témoignage -> Call-to-action",
      category: "YouTube",
      instructions: "Durée 60s max, ton conversationnel, montrer bénéfices concrets"
    }
  ]);

  const [newContent, setNewContent] = useState({
    title: "",
    type: "text" as ContentItem["type"],
    content: "",
    category: "",
    instructions: ""
  });

  const addContent = () => {
    if (newContent.title && newContent.content) {
      setContents([...contents, {
        ...newContent,
        id: Date.now().toString()
      }]);
      setNewContent({
        title: "",
        type: "text",
        content: "",
        category: "",
        instructions: ""
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "text": return FileText;
      case "image": return Image;
      case "video": return Video;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "text": return "bg-blue-100 text-blue-800 border-blue-200";
      case "image": return "bg-green-100 text-green-800 border-green-200";
      case "video": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <FileText className="w-8 h-8 text-marketing-primary" />
            Bibliothèque de Contenus
          </h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos exemples de contenus, illustrations et instructions pour l'IA
          </p>
        </div>
        <Button className="bg-gradient-to-r from-marketing-primary to-marketing-creative">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau contenu
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Contenus Existants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contents.map((item) => {
                const IconComponent = getTypeIcon(item.type);
                return (
                  <div key={item.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5 text-marketing-primary" />
                        <h3 className="font-medium">{item.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(item.type)}>
                          {item.type}
                        </Badge>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-3 rounded text-sm">
                      {item.content}
                    </div>
                    
                    {item.instructions && (
                      <div className="bg-marketing-primary/10 p-3 rounded text-sm">
                        <strong className="text-marketing-primary">Instructions IA:</strong>
                        <p className="mt-1">{item.instructions}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4 mr-1" />
                        Copier
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Exporter
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ajouter un Contenu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content-title">Titre</Label>
              <Input
                id="content-title"
                value={newContent.title}
                onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                placeholder="Nom du contenu"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content-type">Type</Label>
              <select 
                id="content-type"
                className="w-full p-2 border rounded-md"
                value={newContent.type}
                onChange={(e) => setNewContent({...newContent, type: e.target.value as ContentItem["type"]})}
              >
                <option value="text">Texte</option>
                <option value="image">Image</option>
                <option value="video">Vidéo</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content-category">Catégorie</Label>
              <Input
                id="content-category"
                value={newContent.category}
                onChange={(e) => setNewContent({...newContent, category: e.target.value})}
                placeholder="Ex: LinkedIn, Instagram..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content-text">Contenu</Label>
              <Textarea
                id="content-text"
                value={newContent.content}
                onChange={(e) => setNewContent({...newContent, content: e.target.value})}
                placeholder="Votre contenu ou description..."
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content-instructions">Instructions IA</Label>
              <Textarea
                id="content-instructions"
                value={newContent.instructions}
                onChange={(e) => setNewContent({...newContent, instructions: e.target.value})}
                placeholder="Instructions pour l'IA..."
                rows={3}
              />
            </div>
            
            <Button onClick={addContent} className="w-full">
              Ajouter
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentPage;