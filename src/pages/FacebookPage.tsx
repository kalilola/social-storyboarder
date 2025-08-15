import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Facebook, Key, BarChart3, Settings, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

const FacebookPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [autoSync, setAutoSync] = useState(true);

  const metrics = [
    { label: "Impressions", value: "145,230", change: "+12%" },
    { label: "Clics", value: "8,450", change: "+24%" },
    { label: "CTR", value: "5.8%", change: "+0.8%" },
    { label: "CPC", value: "0.65€", change: "-5%" },
  ];

  const campaigns = [
    { id: "1", name: "Campagne Lancement Produit", status: "active", budget: "500€", spend: "342€" },
    { id: "2", name: "Retargeting Website", status: "active", budget: "200€", spend: "156€" },
    { id: "3", name: "Lookalike Audience", status: "paused", budget: "300€", spend: "89€" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Facebook className="w-8 h-8 text-[#1877F2]" />
            API Facebook
          </h1>
          <p className="text-muted-foreground mt-2">
            Connectez et gérez vos campagnes Facebook Ads directement depuis l'interface
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              Connecté
            </Badge>
          ) : (
            <Badge className="bg-red-100 text-red-800 border-red-200">
              <AlertCircle className="w-3 h-3 mr-1" />
              Déconnecté
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Configuration API
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="app-id">App ID Facebook</Label>
              <Input 
                id="app-id"
                placeholder="Votre App ID Facebook"
                type="password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="app-secret">App Secret</Label>
              <Input 
                id="app-secret"
                placeholder="Votre App Secret"
                type="password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="access-token">Access Token</Label>
              <Input 
                id="access-token"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Votre Access Token"
                type="password"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="auto-sync" 
                checked={autoSync}
                onCheckedChange={setAutoSync}
              />
              <Label htmlFor="auto-sync">Synchronisation automatique</Label>
            </div>
            <Button 
              onClick={() => setIsConnected(!isConnected)}
              className="w-full bg-[#1877F2] hover:bg-[#1877F2]/90"
            >
              {isConnected ? "Déconnecter" : "Connecter à Facebook"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Métriques Rapides
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {metrics.map((metric, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="font-semibold">{metric.value}</p>
                </div>
                <Badge 
                  variant="outline"
                  className={
                    metric.change.startsWith("+") 
                      ? "text-green-600 border-green-200" 
                      : "text-red-600 border-red-200"
                  }
                >
                  {metric.change}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {isConnected && (
        <Card>
          <CardHeader>
            <CardTitle>Campagnes Actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-marketing-primary"></div>
                    <div>
                      <h3 className="font-medium">{campaign.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {campaign.spend} / {campaign.budget} dépensé
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      className={
                        campaign.status === "active" 
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-gray-100 text-gray-800 border-gray-200"
                      }
                    >
                      {campaign.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FacebookPage;