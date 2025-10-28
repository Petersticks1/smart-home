import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Lightbulb, Thermometer, Lock, Fan, Activity, Wifi, WifiOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AddDeviceDialog from "@/components/AddDeviceDialog";
import { toast } from "sonner";

interface Device {
  id: string;
  name: string;
  type: string;
  status: string;
  icon: string;
  power_usage: string;
  connected: boolean;
}

const iconMap: Record<string, any> = {
  lightbulb: Lightbulb,
  thermometer: Thermometer,
  lock: Lock,
  fan: Fan,
};

const DashboardReal = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const fetchDevices = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("devices")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDevices(data || []);
    } catch (error: any) {
      toast.error("Failed to load devices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    if (user) {
      fetchDevices();
    }
  }, [user, authLoading, navigate]);

  const toggleDevice = async (deviceId: string, currentStatus: string) => {
    const newStatus = currentStatus === "on" || currentStatus === "locked" ? "off" : "on";
    
    try {
      const { error } = await supabase
        .from("devices")
        .update({ status: newStatus })
        .eq("id", deviceId);

      if (error) throw error;

      setDevices((prev) =>
        prev.map((device) =>
          device.id === deviceId ? { ...device, status: newStatus } : device
        )
      );

      toast.success(`Device ${newStatus === "on" ? "turned on" : "turned off"}`);
    } catch (error: any) {
      toast.error("Failed to update device");
    }
  };

  const activeDevices = devices.filter((d) => d.status === "on" || d.status === "locked").length;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage and monitor your smart devices</p>
        </div>
        <AddDeviceDialog onDeviceAdded={fetchDevices}>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow">
            Add Device
          </Button>
        </AddDeviceDialog>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Devices</p>
              <p className="text-3xl font-bold">
                {activeDevices}/{devices.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Energy Saved</p>
              <p className="text-3xl font-bold">23%</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Monthly Cost</p>
              <p className="text-3xl font-bold">$42</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
              <Thermometer className="w-6 h-6 text-accent" />
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Your Devices</h2>
        {devices.length === 0 ? (
          <Card className="glass-card p-12 text-center">
            <Lightbulb className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No devices yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first smart device to get started
            </p>
            <AddDeviceDialog onDeviceAdded={fetchDevices}>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow">
                Add Your First Device
              </Button>
            </AddDeviceDialog>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device) => {
              const Icon = iconMap[device.icon] || Lightbulb;
              const isActive = device.status === "on" || device.status === "locked";

              return (
                <Card key={device.id} className="glass-card p-6 hover:scale-105 transition-transform">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg ${
                        isActive ? "bg-primary/20 border-primary/30" : "bg-muted/20 border-muted/30"
                      } border flex items-center justify-center`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
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
                  <p className="text-sm text-muted-foreground mb-4">{device.power_usage}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-sm font-medium">
                      {device.type === "lock"
                        ? device.status === "locked"
                          ? "Locked"
                          : "Unlocked"
                        : device.status === "on"
                        ? "On"
                        : "Off"}
                    </span>
                    <Switch
                      checked={isActive}
                      onCheckedChange={() => toggleDevice(device.id, device.status)}
                      disabled={!device.connected}
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardReal;
