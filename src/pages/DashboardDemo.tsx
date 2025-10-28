import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Lightbulb, Thermometer, Lock, Fan, Activity, Plus, Wifi, WifiOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const devices = [
    { id: 1, name: "Living Room Light", type: "light", status: "on", icon: Lightbulb, power: "12W", connected: true },
    { id: 2, name: "Smart Thermostat", type: "thermostat", status: "on", icon: Thermometer, power: "72°F", connected: true },
    { id: 3, name: "Front Door Lock", type: "lock", status: "locked", icon: Lock, power: "Secure", connected: true },
    { id: 4, name: "Bedroom Fan", type: "fan", status: "off", icon: Fan, power: "0W", connected: false },
    { id: 5, name: "Kitchen Light", type: "light", status: "on", icon: Lightbulb, power: "15W", connected: true },
    { id: 6, name: "Garage Door", type: "lock", status: "locked", icon: Lock, power: "Secure", connected: true },
  ];

  const stats = [
    { label: "Active Devices", value: "5/6", icon: Activity, color: "text-primary" },
    { label: "Energy Saved", value: "23%", icon: Lightbulb, color: "text-green-500" },
    { label: "Monthly Cost", value: "$42", icon: Thermometer, color: "text-accent" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage and monitor your smart devices</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow">
          <Plus className="w-4 h-4 mr-2" />
          Add Device
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Devices Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Your Devices</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device) => {
            const Icon = device.icon;
            return (
              <Card key={device.id} className="glass-card p-6 hover:scale-105 transition-transform">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${
                    device.status === "on" || device.status === "locked" 
                      ? "bg-primary/20 border-primary/30" 
                      : "bg-muted/20 border-muted/30"
                  } border flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${
                      device.status === "on" || device.status === "locked" 
                        ? "text-primary" 
                        : "text-muted-foreground"
                    }`} />
                  </div>
                  <div className="flex items-center gap-2">
                    {device.connected ? (
                      <>
                        <Wifi className="w-4 h-4 text-green-500" />
                        <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/30">
                          Online
                        </Badge>
                      </>
                    ) : (
                      <>
                        <WifiOff className="w-4 h-4 text-destructive" />
                        <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30">
                          Offline
                        </Badge>
                      </>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2">{device.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{device.power}</p>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="text-sm font-medium">
                    {device.type === "lock" 
                      ? (device.status === "locked" ? "Locked" : "Unlocked")
                      : (device.status === "on" ? "On" : "Off")
                    }
                  </span>
                  <Switch 
                    checked={device.status === "on" || device.status === "locked"} 
                    disabled={!device.connected}
                  />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
