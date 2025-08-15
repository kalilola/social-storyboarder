import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Target, Users, TrendingUp, Eye, Edit } from "lucide-react";
import { useState } from "react";

const StrategyPage = () => {
  const [strategy, setStrategy] = useState(`Objectif principal : Augmenter la notoriété de marque et générer des leads qualifiés

Public cible :
- Entrepreneurs et PME (25-45 ans)
- Responsables marketing digitaux
- Startups en phase de croissance

Positionnement :
- Solution innovante et accessible
- Expertise en IA et marketing automation
- ROI mesurable et transparent

Canaux prioritaires :
- LinkedIn (contenu professionnel)
- Facebook/Instagram (engagement communautaire)
- Email marketing (nurturing)
- Blog/SEO (génération de trafic organique)`);

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Target className="w-8 h-8 text-marketing-primary" />
            Stratégie Marketing
          </h1>
          <p className="text-muted-foreground mt-2">
            Définissez et suivez votre stratégie marketing globale
          </p>
        </div>
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "default" : "outline"}
        >
          <Edit className="w-4 h-4 mr-2" />
          {isEditing ? "Sauvegarder" : "Modifier"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Document Stratégique</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
                placeholder="Définissez votre stratégie marketing..."
              />
            ) : (
              <div className="bg-muted/30 p-6 rounded-lg min-h-[400px]">
                <pre className="whitespace-pre-wrap text-sm text-foreground font-sans">
                  {strategy}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Audiences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge variant="secondary">Entrepreneurs 25-45</Badge>
              <Badge variant="secondary">PME</Badge>
              <Badge variant="secondary">Startups</Badge>
              <Badge variant="secondary">Marketeurs digitaux</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                KPIs Stratégiques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Notoriété</span>
                <span className="text-sm font-medium text-marketing-primary">+24%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Leads qualifiés</span>
                <span className="text-sm font-medium text-marketing-creative">+156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Engagement</span>
                <span className="text-sm font-medium text-marketing-secondary">+89%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Veille Concurrentielle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Surveillance automatique des tendances et de la concurrence via IA.
              </p>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Configurer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StrategyPage;