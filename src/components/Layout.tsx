import { Link, useLocation } from "react-router-dom";
import { Home, LayoutDashboard, Zap, Gift, Activity, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import ConnectWalletDialog from "./ConnectWalletDialog";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const navigation = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Automation", path: "/automation", icon: Zap },
    { name: "Rewards", path: "/rewards", icon: Gift },
    { name: "Activity", path: "/activity", icon: Activity },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'var(--gradient-dark)' }} />
      <div className="fixed top-0 inset-x-0 h-[500px] pointer-events-none" style={{ background: 'var(--gradient-glow)' }} />
      
      {/* Navigation */}
      <nav className="relative z-50 border-b border-border/50 backdrop-blur-md bg-background/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center glow">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-gradient">HedraHome</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isActive(item.path)
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <ConnectWalletDialog>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow">
                      Connect Wallet
                    </Button>
                  </ConnectWalletDialog>
                  <Button
                    variant="outline"
                    onClick={signOut}
                    className="border-destructive/30 hover:bg-destructive/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link to="/auth">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border/50 backdrop-blur-md bg-background/90">
        <div className="flex items-center justify-around h-16 px-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                  isActive(item.path)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pb-20 md:pb-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
