import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users, Eye, Download, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const AnalyticsPage = () => {
  const performanceData = [
    { month: "Jan", impressions: 45000, clicks: 2400, conversions: 120 },
    { month: "Fév", impressions: 52000, clicks: 2800, conversions: 145 },
    { month: "Mar", impressions: 48000, clicks: 2600, conversions: 132 },
    { month: "Avr", impressions: 61000, clicks: 3200, conversions: 168 },
    { month: "Mai", impressions: 58000, clicks: 3100, conversions: 155 },
    { month: "Juin", impressions: 67000, clicks: 3600, conversions: 189 }
  ];

  const channelData = [
    { name: "Facebook", value: 35, color: "#1877F2" },
    { name: "Instagram", value: 28, color: "#E4405F" },
    { name: "LinkedIn", value: 22, color: "#0077B5" },
    { name: "Google Ads", value: 15, color: "#4285F4" }
  ];

  const metrics = [
    { 
      title: "Impressions Totales", 
      value: "2.4M", 
      change: "+23%", 
      trend: "up",
      icon: Eye 
    },
    { 
      title: "Clics Générés", 
      value: "84.3K", 
      change: "+18%", 
      trend: "up",
      icon: TrendingUp 
    },
    { 
      title: "Taux de Conversion", 
      value: "4.8%", 
      change: "+0.8%", 
      trend: "up",
      icon: BarChart3 
    },
    { 
      title: "Audience Totale", 
      value: "156K", 
      change: "+12%", 
      trend: "up",
      icon: Users 
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-marketing-primary" />
            Analytics & Performances
          </h1>
          <p className="text-muted-foreground mt-2">
            Suivez et analysez les performances de vos campagnes marketing
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  </div>
                  <IconComponent className="w-8 h-8 text-marketing-primary" />
                </div>
                <div className="flex items-center mt-2">
                  <Badge 
                    className={`${
                      metric.trend === "up" 
                        ? "bg-green-100 text-green-800 border-green-200" 
                        : "bg-red-100 text-red-800 border-red-200"
                    }`}
                  >
                    {metric.change}
                  </Badge>
                  <span className="text-sm text-muted-foreground ml-2">vs mois dernier</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique des performances */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution des Performances</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="impressions" 
                  stroke="hsl(var(--marketing-primary))" 
                  strokeWidth={2}
                  name="Impressions"
                />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="hsl(var(--marketing-creative))" 
                  strokeWidth={2}
                  name="Clics"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Répartition par canal */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({name, value}) => `${name} ${value}%`}
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Graphique en barres des conversions */}
      <Card>
        <CardHeader>
          <CardTitle>Conversions par Mois</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="conversions" 
                fill="hsl(var(--marketing-secondary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Insights automatiques */}
      <Card>
        <CardHeader>
          <CardTitle>Insights IA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-marketing-primary/10 rounded-lg border border-marketing-primary/20">
            <h4 className="font-medium text-marketing-primary mb-2">📈 Tendance Positive</h4>
            <p className="text-sm">
              Vos campagnes LinkedIn affichent une croissance de +35% ce mois-ci. 
              Considérez augmenter le budget sur ce canal.
            </p>
          </div>
          <div className="p-4 bg-marketing-creative/10 rounded-lg border border-marketing-creative/20">
            <h4 className="font-medium text-marketing-creative mb-2">🎯 Opportunité</h4>
            <p className="text-sm">
              Le taux de conversion Instagram est en baisse. Testez de nouveaux formats visuels 
              ou ajustez votre audience cible.
            </p>
          </div>
          <div className="p-4 bg-marketing-secondary/10 rounded-lg border border-marketing-secondary/20">
            <h4 className="font-medium text-marketing-secondary mb-2">💡 Recommandation</h4>
            <p className="text-sm">
              Optimal publishing time: 14h-16h en semaine pour maximiser l'engagement 
              selon vos données historiques.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;