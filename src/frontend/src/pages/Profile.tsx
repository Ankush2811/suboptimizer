import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  useSubscriptions,
  useTotalMonthlySpend,
} from "@/hooks/useSubscriptions";
import { formatPaise } from "@/lib/currency";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Bell,
  ChevronRight,
  HelpCircle,
  LogOut,
  Shield,
  User,
} from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { login, clear, isAuthenticated } = useInternetIdentity();
  const isLoggedIn = isAuthenticated;
  const { data: subscriptions } = useSubscriptions();
  const { data: totalSpend } = useTotalMonthlySpend();

  const subCount = subscriptions?.length ?? 0;
  const monthlySpend = totalSpend ?? 0n;

  return (
    <Layout>
      <div className="px-4 pt-6 pb-8" data-ocid="profile.page">
        {/* User card */}
        <div className="bg-card rounded-[16px] p-5 shadow-elevated border border-border/50 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
              <User className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              {isLoggedIn ? (
                <>
                  <p className="font-display font-bold text-foreground text-base">
                    Your Account
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Internet Identity connected
                  </p>
                </>
              ) : (
                <>
                  <p className="font-display font-bold text-foreground text-base">
                    Welcome!
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Sign in to sync your data
                  </p>
                </>
              )}
            </div>
            {isLoggedIn ? (
              <Button
                variant="outline"
                size="sm"
                onClick={clear}
                className="text-xs rounded-[10px]"
                data-ocid="profile.logout_button"
              >
                <LogOut className="w-3 h-3 mr-1.5" />
                Sign out
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={login}
                className="text-xs rounded-[10px] bg-primary text-primary-foreground"
                data-ocid="profile.login_button"
              >
                Sign in
              </Button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-card rounded-[14px] p-4 shadow-subtle border border-border/50 text-center">
            <p className="font-display font-bold text-2xl text-foreground">
              {subCount}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Active Subscriptions
            </p>
          </div>
          <div className="bg-card rounded-[14px] p-4 shadow-subtle border border-border/50 text-center">
            <p className="font-display font-bold text-xl text-foreground">
              {formatPaise(monthlySpend)}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Monthly Spend
            </p>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-card rounded-[16px] border border-border/50 shadow-subtle overflow-hidden mb-4">
          <h2 className="font-display font-semibold text-sm text-muted-foreground px-4 pt-4 pb-2 uppercase tracking-wide">
            Notifications
          </h2>

          <div className="px-4 pb-3 flex flex-col gap-3">
            <div
              className="flex items-center justify-between"
              data-ocid="profile.renewal_alerts_toggle"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-primary" />
                <Label className="text-sm font-medium text-foreground cursor-pointer">
                  Renewal Alerts
                </Label>
              </div>
              <Switch defaultChecked aria-label="Renewal Alerts" />
            </div>
            <div
              className="flex items-center justify-between"
              data-ocid="profile.sms_detection_toggle"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-primary" />
                <Label className="text-sm font-medium text-foreground cursor-pointer">
                  SMS Detection
                </Label>
              </div>
              <Switch aria-label="SMS Detection" />
            </div>
          </div>
        </div>

        {/* Help */}
        <div className="bg-card rounded-[16px] border border-border/50 shadow-subtle overflow-hidden">
          <button
            type="button"
            className="w-full flex items-center justify-between px-4 py-4 transition-smooth hover:bg-muted/40"
            data-ocid="profile.help_button"
            onClick={() =>
              toast.info("Help is coming soon! Contact support at caffeine.ai")
            }
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Help & Support
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </Layout>
  );
}
