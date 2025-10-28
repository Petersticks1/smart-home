import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Activity as ActivityIcon, Search, Zap, Lock, Lightbulb, Shield } from "lucide-react";

const Activity = () => {
  const activities = [
    {
      id: 1,
      action: "Living Room Light turned ON",
      device: "Living Room Light",
      user: "0x7f3a...bc9d",
      timestamp: "2024-01-15 14:23:45",
      txHash: "0x7f3a4b2c9d8e1f6a5b4c3d2e1f9g8h7i6j5k4l3m2n1o0p",
      type: "device",
      icon: Lightbulb,
      status: "success",
    },
    {
      id: 2,
      action: "Front Door LOCKED",
      device: "Front Door Lock",
      user: "Automation: Evening Routine",
      timestamp: "2024-01-15 18:00:12",
      txHash: "0x4e2b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v",
      type: "automation",
      icon: Lock,
      status: "success",
    },
    {
      id: 3,
      action: "Smart Thermostat adjusted to 72°F",
      device: "Smart Thermostat",
      user: "0x9c1f...e3b2",
      timestamp: "2024-01-15 12:15:30",
      txHash: "0x9c1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d",
      type: "device",
      icon: Shield,
      status: "success",
    },
    {
      id: 4,
      action: "Energy Saver automation triggered",
      device: "Multiple Devices",
      user: "Automation: Energy Saver",
      timestamp: "2024-01-15 10:45:18",
      txHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v",
      type: "automation",
      icon: Zap,
      status: "success",
    },
    {
      id: 5,
      action: "Kitchen Light turned OFF",
      device: "Kitchen Light",
      user: "0x7f3a...bc9d",
      timestamp: "2024-01-14 22:30:05",
      txHash: "0x5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a",
      type: "device",
      icon: Lightbulb,
      status: "success",
    },
  ];

  const stats = [
    { label: "Total Events", value: "1,247", icon: ActivityIcon },
    { label: "Today", value: "23", icon: ActivityIcon },
    { label: "This Week", value: "156", icon: ActivityIcon },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Activity Log</h1>
        <p className="text-muted-foreground">Blockchain-verified device interactions</p>
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
                <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input 
          placeholder="Search by device, user, or transaction hash..." 
          className="pl-10 glass-card border-border/50 focus:border-primary/50"
        />
      </div>

      {/* Activity List */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <Card key={activity.id} className="glass-card p-6 hover:scale-[1.01] transition-transform">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{activity.action}</h3>
                        <p className="text-sm text-muted-foreground">{activity.device}</p>
                      </div>
                      <Badge className={`shrink-0 ${
                        activity.type === "automation" 
                          ? "bg-accent/20 text-accent border-accent/30" 
                          : "bg-primary/20 text-primary border-primary/30"
                      }`}>
                        {activity.type}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Initiated by</p>
                        <p className="font-mono text-xs">{activity.user}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Timestamp</p>
                        <p className="font-medium">{activity.timestamp}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Status</p>
                        <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                          Verified on Hedera
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                          <p className="font-mono text-xs text-primary truncate">{activity.txHash}</p>
                        </div>
                        <a 
                          href={`https://hashscan.io/mainnet/transaction/${activity.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline shrink-0"
                        >
                          View on Hedera →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Activity;
