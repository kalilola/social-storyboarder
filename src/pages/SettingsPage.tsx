import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, User, Bell, Palette, Shield, Database } from "lucide-react";
import { useState } from "react";

const SettingsPage = () => {
  const [profile, setProfile] = useState({
    name: "Marie Dupont",
    email: "marie.dupont@entreprise.com",
    company: "Digital Marketing Pro",
    timezone: "Europe/Paris"
  });

  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    mobile: true,
    weekly: true
  });

  const [aiSettings, setAiSettings] = useState({
    creativity: "balanced",
    language: "french",
    tone: "professional"
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Settings className="w-8 h-8 text-marketing-primary" />
            Paramètres
          </h1>
          <p className="text-muted-foreground mt-2">
            Configurez votre compte et personnalisez votre expérience ContentAI
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profil utilisateur */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profil Utilisateur
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Entreprise</Label>
              <Input
                id="company"
                value={profile.company}
                onChange={(e) => setProfile({...profile, company: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Fuseau horaire</Label>
              <Select value={profile.timezone} onValueChange={(value) => setProfile({...profile, timezone: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Paris">Europe/Paris (GMT+1)</SelectItem>
                  <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">Sauvegarder le profil</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notif">Notifications par email</Label>
                <p className="text-sm text-muted-foreground">Recevoir les alertes importantes</p>
              </div>
              <Switch
                id="email-notif"
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="browser-notif">Notifications navigateur</Label>
                <p className="text-sm text-muted-foreground">Alertes en temps réel</p>
              </div>
              <Switch
                id="browser-notif"
                checked={notifications.browser}
                onCheckedChange={(checked) => setNotifications({...notifications, browser: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="mobile-notif">Notifications mobile</Label>
                <p className="text-sm text-muted-foreground">Push notifications</p>
              </div>
              <Switch
                id="mobile-notif"
                checked={notifications.mobile}
                onCheckedChange={(checked) => setNotifications({...notifications, mobile: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weekly-notif">Rapport hebdomadaire</Label>
                <p className="text-sm text-muted-foreground">Résumé des performances</p>
              </div>
              <Switch
                id="weekly-notif"
                checked={notifications.weekly}
                onCheckedChange={(checked) => setNotifications({...notifications, weekly: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configuration IA */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Configuration IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="creativity">Niveau de créativité</Label>
              <Select value={aiSettings.creativity} onValueChange={(value) => setAiSettings({...aiSettings, creativity: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservateur</SelectItem>
                  <SelectItem value="balanced">Équilibré</SelectItem>
                  <SelectItem value="creative">Créatif</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Langue principale</Label>
              <Select value={aiSettings.language} onValueChange={(value) => setAiSettings({...aiSettings, language: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="french">Français</SelectItem>
                  <SelectItem value="english">Anglais</SelectItem>
                  <SelectItem value="spanish">Espagnol</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tone">Ton par défaut</Label>
              <Select value={aiSettings.tone} onValueChange={(value) => setAiSettings({...aiSettings, tone: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professionnel</SelectItem>
                  <SelectItem value="casual">Décontracté</SelectItem>
                  <SelectItem value="enthusiastic">Enthousiaste</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand-voice">Voix de marque personnalisée</Label>
              <Textarea
                id="brand-voice"
                placeholder="Décrivez le ton et la personnalité de votre marque..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sécurité */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Sécurité
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Mot de passe actuel</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nouveau mot de passe</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button variant="outline" className="w-full">
              Changer le mot de passe
            </Button>
            <hr />
            <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
              Activer l'authentification à deux facteurs
            </Button>
          </CardContent>
        </Card>

        {/* Données */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Gestion des Données
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline">
                Exporter mes données
              </Button>
              <Button variant="outline">
                Importer des données
              </Button>
              <Button variant="outline" className="text-red-600 hover:text-red-700">
                Supprimer le compte
              </Button>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium mb-2">Politique de confidentialité</h4>
              <p className="text-sm text-muted-foreground">
                Vos données sont chiffrées et stockées de manière sécurisée. 
                Nous ne partageons jamais vos informations avec des tiers sans votre consentement explicite.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;