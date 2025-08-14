import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Facebook, Wifi, WifiOff, BarChart3 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const FacebookModule = () => {
  const [apiKey, setApiKey] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [trackingData, setTrackingData] = useState({
    adsTracked: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0
  });

  const handleConnect = () => {
    if (apiKey.trim()) {
      setIsConnected(true);
      setTrackingData({
        adsTracked: 12,
        impressions: 45230,
        clicks: 1876,
        ctr: 4.14
      });
      toast.success("Connexion à l'API Facebook réussie !");
    } else {
      toast.error("Veuillez saisir une clé API valide.");
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setApiKey("");
    setTrackingData({
      adsTracked: 0,
      impressions: 0,
      clicks: 0,
      ctr: 0
    });
    toast.info("Déconnecté de l'API Facebook.");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Facebook className="w-4 h-4 text-module-facebook" />
        <span>Tracking des publicités Facebook</span>
        {isConnected ? (
          <Badge className="bg-marketing-success/10 text-marketing-success border-marketing-success/20">
            <Wifi className="w-3 h-3 mr-1" />
            Connecté
          </Badge>
        ) : (
          <Badge variant="outline" className="border-muted-foreground/20">
            <WifiOff className="w-3 h-3 mr-1" />
            Déconnecté
          </Badge>
        )}
      </div>

      {!isConnected ? (
        <div className="space-y-3">
          <div>
            <Label htmlFor="facebook-api">Clé API Facebook</Label>
            <Input
              id="facebook-api"
              type="password"
              placeholder="Saisissez votre clé API Facebook..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-background/50"
            />
          </div>
          <Button 
            onClick={handleConnect}
            className="w-full gap-2 bg-module-facebook hover:bg-module-facebook/90"
          >
            <Facebook className="w-4 h-4" />
            Se connecter à Facebook
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border/50 bg-background/30">
              <div className="text-lg font-bold text-marketing-info">{trackingData.adsTracked}</div>
              <div className="text-xs text-muted-foreground">Pubs trackées</div>
            </div>
            <div className="p-3 rounded-lg border border-border/50 bg-background/30">
              <div className="text-lg font-bold text-marketing-warning">{trackingData.impressions.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Impressions</div>
            </div>
            <div className="p-3 rounded-lg border border-border/50 bg-background/30">
              <div className="text-lg font-bold text-marketing-success">{trackingData.clicks.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Clics</div>
            </div>
            <div className="p-3 rounded-lg border border-border/50 bg-background/30">
              <div className="text-lg font-bold text-marketing-creative">{trackingData.ctr}%</div>
              <div className="text-xs text-muted-foreground">CTR</div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 gap-2">
              <BarChart3 className="w-3 h-3" />
              Voir Analytics
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDisconnect}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              Déconnecter
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};