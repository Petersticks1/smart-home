import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Zap, Clock, MapPin, Thermometer, Sun, Moon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const Automation = () => {
  const automations = [
    {
      id: 1,
      name: "Evening Routine",
      trigger: "Time: 6:00 PM",
      action: "Turn on living room lights, Lock doors",
      icon: Moon,
      active: true,
      executions: 45,
    },
    {
      id: 2,
      name: "Energy Saver",
      trigger: "Temperature > 75°F",
      action: "Turn off unnecessary devices",
      icon: Thermometer,
      active: true,
      executions: 23,
    },
    {
      id: 3,
      name: "Leave Home",
      trigger: "Location: Away from home",
      action: "Turn off all lights, Lock all doors",
      icon: MapPin,
      active: true,
      executions: 67,
    },
    {
      id: 4,
      name: "Morning Wake Up",
      trigger: "Time: 7:00 AM",
      action: "Gradually brighten bedroom lights",
      icon: Sun,
      active: false,
      executions: 12,
    },
  ];

  const recentExecutions = [
    { automation: "Evening Routine", time: "2 hours ago", status: "success", tx: "0x7f3a...bc9d" },
    { automation: "Energy Saver", time: "5 hours ago", status: "success", tx: "0x4e2b...d8a7" },
    { automation: "Leave Home", time: "8 hours ago", status: "success", tx: "0x9c1f...e3b2" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Automation Rules</h1>
          <p className="text-muted-foreground">Create and manage blockchain-powered automations</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow">
          <Plus className="w-4 h-4 mr-2" />
          New Rule
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Rules</p>
              <p className="text-3xl font-bold">3</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Executions</p>
              <p className="text-3xl font-bold">147</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Success Rate</p>
              <p className="text-3xl font-bold">99.8%</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
              <Zap className="w-6 h-6 text-accent" />
            </div>
          </div>
        </Card>
      </div>

      {/* Automation Rules */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Your Rules</h2>
        <div className="space-y-4">
          {automations.map((automation) => {
            const Icon = automation.icon;
            return (
              <Card key={automation.id} className="glass-card p-6 hover:scale-[1.02] transition-transform">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg ${
                      automation.active 
                        ? "bg-primary/20 border-primary/30" 
                        : "bg-muted/20 border-muted/30"
                    } border flex items-center justify-center shrink-0`}>
                      <Icon className={`w-6 h-6 ${
                        automation.active ? "text-primary" : "text-muted-foreground"
                      }`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{automation.name}</h3>
                        <Badge variant={automation.active ? "default" : "secondary"} className={
                          automation.active 
                            ? "bg-primary/20 text-primary border-primary/30" 
                            : ""
                        }>
                          {automation.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="font-medium">Trigger:</span>
                          <span>{automation.trigger}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="font-medium">Action:</span>
                          <span>{automation.action}</span>
                        </div>
                        <div className="text-muted-foreground">
                          <span className="font-medium">Executed:</span> {automation.executions} times
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Switch checked={automation.active} />
                    <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10">
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Executions */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Recent Executions</h2>
        <Card className="glass-card">
          <div className="divide-y divide-border/50">
            {recentExecutions.map((execution, index) => (
              <div key={index} className="p-6 flex items-center justify-between hover:bg-muted/10 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold mb-1">{execution.automation}</p>
                  <p className="text-sm text-muted-foreground">{execution.time}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                    Success
                  </Badge>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Transaction</p>
                    <p className="text-sm font-mono text-primary">{execution.tx}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Automation;
