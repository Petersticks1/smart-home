import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Coins, TrendingUp, Gift, Zap, Star, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Rewards = () => {
  const stats = [
    { label: "Total Tokens Earned", value: "1,234", icon: Coins, color: "text-primary" },
    { label: "Current Balance", value: "892", icon: TrendingUp, color: "text-green-500" },
    { label: "Tokens Staked", value: "342", icon: Star, color: "text-accent" },
  ];

  const recentEarnings = [
    { action: "Energy Efficient Automation", amount: "+25", time: "2 hours ago", type: "automation" },
    { action: "Daily Device Usage", amount: "+10", time: "1 day ago", type: "daily" },
    { action: "Smart Thermostat Optimization", amount: "+35", time: "2 days ago", type: "automation" },
    { action: "Referral Bonus", amount: "+50", time: "3 days ago", type: "referral" },
    { action: "Evening Routine Completion", amount: "+15", time: "5 days ago", type: "automation" },
  ];

  const rewards = [
    { name: "Premium Device Discount", cost: "500", discount: "20%", icon: Gift },
    { name: "Advanced Automation Pack", cost: "300", discount: "Premium", icon: Zap },
    { name: "Energy Report Bundle", cost: "150", discount: "Detailed", icon: TrendingUp },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Energy Rewards</h1>
          <p className="text-muted-foreground">Earn tokens for efficient energy usage</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow">
          <Coins className="w-4 h-4 mr-2" />
          Stake Tokens
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-4xl font-bold flex items-baseline gap-2">
                    {stat.value}
                    <span className="text-lg text-muted-foreground">HBAR</span>
                  </p>
                </div>
                <div className={`w-14 h-14 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Earnings */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Earnings</h2>
          <Card className="glass-card">
            <div className="divide-y divide-border/50">
              {recentEarnings.map((earning, index) => (
                <div key={index} className="p-4 flex items-center justify-between hover:bg-muted/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">{earning.action}</p>
                      <p className="text-sm text-muted-foreground">{earning.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-500">{earning.amount}</p>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30 text-xs">
                      {earning.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Redeem Rewards */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Redeem Rewards</h2>
          <div className="space-y-4">
            {rewards.map((reward, index) => {
              const Icon = reward.icon;
              return (
                <Card key={index} className="glass-card p-6 hover:scale-[1.02] transition-transform">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{reward.name}</h3>
                        <Badge className="bg-accent/20 text-accent border-accent/30">
                          {reward.discount}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold mb-2">{reward.cost}</p>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Redeem
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Staking Info */}
          <Card className="glass-card p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Staking Benefits</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Annual Yield</span>
                <span className="font-semibold text-green-500">8.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Minimum Stake</span>
                <span className="font-semibold">100 HBAR</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Lock Period</span>
                <span className="font-semibold">30 days</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
