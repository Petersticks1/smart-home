import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

const deviceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  type: z.string().min(1, "Please select a device type"),
  icon: z.string(),
  powerUsage: z.string().optional(),
});

interface AddDeviceDialogProps {
  onDeviceAdded?: () => void;
  children: React.ReactNode;
}

const AddDeviceDialog = ({ onDeviceAdded, children }: AddDeviceDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [powerUsage, setPowerUsage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const deviceTypes = [
    { value: "light", label: "Light", icon: "lightbulb" },
    { value: "thermostat", label: "Thermostat", icon: "thermometer" },
    { value: "lock", label: "Lock", icon: "lock" },
    { value: "fan", label: "Fan", icon: "fan" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in first");
      return;
    }

    setLoading(true);

    try {
      const selectedDevice = deviceTypes.find((d) => d.value === type);
      const validated = deviceSchema.parse({
        name: name.trim(),
        type,
        icon: selectedDevice?.icon || "lightbulb",
        powerUsage: powerUsage.trim(),
      });

      const { error } = await supabase.from("devices").insert({
        user_id: user.id,
        name: validated.name,
        type: validated.type,
        icon: validated.icon,
        power_usage: validated.powerUsage || "0W",
        status: "off",
        connected: true,
      });

      if (error) throw error;

      toast.success("Device added successfully!");
      setOpen(false);
      setName("");
      setType("");
      setPowerUsage("");
      onDeviceAdded?.();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message || "Failed to add device");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="glass-card border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" />
            Add New Device
          </DialogTitle>
          <DialogDescription>
            Register a new smart device to your HedraHome
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Device Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Living Room Light"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="glass-card border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Device Type</Label>
            <Select value={type} onValueChange={setType} required>
              <SelectTrigger className="glass-card border-border/50">
                <SelectValue placeholder="Select device type" />
              </SelectTrigger>
              <SelectContent>
                {deviceTypes.map((device) => (
                  <SelectItem key={device.value} value={device.value}>
                    {device.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="power">Power Usage (optional)</Label>
            <Input
              id="power"
              type="text"
              placeholder="12W"
              value={powerUsage}
              onChange={(e) => setPowerUsage(e.target.value)}
              className="glass-card border-border/50"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Device"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDeviceDialog;
