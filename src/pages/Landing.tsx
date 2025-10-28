import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Lock, Coins, Activity, Server } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";

const Landing = () => {
  const features = [
    {
      icon: Lock,
      title: "Web3 Authentication",
      description: "Secure login with HashPack Wallet. Your identity, your control.",
    },
    {
      icon: Server,
      title: "Tokenized Devices",
      description: "Each device is an NFT. Transfer ownership seamlessly on Hedera.",
    },
    {
      icon: Zap,
      title: "Smart Automation",
      description: "Blockchain-powered rules that execute automatically and transparently.",
    },
    {
      icon: Shield,
      title: "Verified Logs",
      description: "Every action recorded on-chain via Hedera Mirror Node.",
    },
    {
      icon: Coins,
      title: "Energy Rewards",
      description: "Earn HTS tokens for energy-efficient automation and eco-friendly actions.",
    },
    {
      icon: Activity,
      title: "Real-Time Control",
      description: "Monitor and control your devices from anywhere, anytime.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/20 text-primary border border-primary/30">
                  Powered by Hedera Hashgraph
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Smart Homes.
                <br />
                <span className="text-gradient">Smarter Blockchain.</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl">
                Control, automate, and monetize your smart home with blockchain transparency. 
                Every action verified. Every device tokenized.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground glow text-lg">
                    Get Started Now
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="text-lg border-primary/30 hover:bg-primary/10">
                    View Dashboard
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-gradient">1000+</div>
                  <div className="text-sm text-muted-foreground">Connected Devices</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient">500K+</div>
                  <div className="text-sm text-muted-foreground">Automations Run</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="glass-card rounded-2xl overflow-hidden glow">
                <img 
                  src={heroImage} 
                  alt="Smart Home Network" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built on <span className="text-gradient">Hedera</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Leveraging the speed, security, and sustainability of Hedera Hashgraph 
              for next-generation smart home control.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="glass-card rounded-xl p-8 hover:scale-105 transition-transform cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center mb-6 group-hover:glow transition-all">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-2xl p-12 md:p-16 text-center glow">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to revolutionize your home?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the future of smart home automation with blockchain-verified control 
              and tokenized device ownership.
            </p>
            <Link to="/auth">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground glow text-lg">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
