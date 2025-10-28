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
import { Wallet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

const walletSchema = z.object({
  walletId: z.string().min(10, "Wallet ID must be at least 10 characters"),
});

interface ConnectWalletDialogProps {
  children: React.ReactNode;
}

const ConnectWalletDialog = ({ children }: ConnectWalletDialogProps) => {
  const [open, setOpen] = useState(false);
  const [walletId, setWalletId] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in first");
      return;
    }

    setLoading(true);

    try {
      const validated = walletSchema.parse({ walletId: walletId.trim() });

      const { error } = await supabase
        .from("profiles")
        .update({ wallet_id: validated.walletId })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Wallet connected successfully!");
      setOpen(false);
      setWalletId("");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message || "Failed to connect wallet");
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
            <Wallet className="w-5 h-5 text-primary" />
            Connect Wallet
          </DialogTitle>
          <DialogDescription>
            Enter your Hedera wallet ID to link your account
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleConnect} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="walletId">Wallet ID</Label>
            <Input
              id="walletId"
              type="text"
              placeholder="0.0.123456"
              value={walletId}
              onChange={(e) => setWalletId(e.target.value)}
              required
              className="glass-card border-border/50"
            />
            <p className="text-xs text-muted-foreground">
              Your Hedera account ID (e.g., 0.0.123456)
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow"
            disabled={loading}
          >
            {loading ? "Connecting..." : "Connect Wallet"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectWalletDialog;
