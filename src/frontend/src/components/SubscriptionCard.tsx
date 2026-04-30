import { Badge } from "@/components/ui/badge";
import { formatPaise } from "@/lib/currency";
import { formatDisplayDate } from "@/lib/dates";
import type { BillingCycle, Category, Subscription } from "@/types/index";
import { CATEGORY_COLORS } from "@/types/index";
import { Link } from "@tanstack/react-router";

interface SubscriptionCardProps {
  subscription: Subscription;
  index?: number;
}

export function billingCycleLabel(cycle: BillingCycle): string {
  switch (cycle) {
    case "monthly":
      return "/mo";
    case "yearly":
      return "/yr";
    case "weekly":
      return "/wk";
    case "quarterly":
      return "/qtr";
  }
}

export function SubscriptionCard({
  subscription,
  index = 0,
}: SubscriptionCardProps) {
  const categoryColor =
    CATEGORY_COLORS[subscription.category as Category] ?? CATEGORY_COLORS.Other;

  return (
    <Link
      to="/subscription/$id"
      params={{ id: subscription.id }}
      data-ocid={`subscriptions.item.${index + 1}`}
      className="block"
    >
      <div className="flex items-center gap-3 bg-card rounded-[14px] p-4 shadow-subtle border border-border/50 transition-smooth hover:shadow-elevated hover:border-border active:scale-[0.99]">
        {/* Logo */}
        <div className="w-12 h-12 rounded-[12px] bg-muted flex items-center justify-center text-2xl flex-shrink-0 shadow-xs">
          {subscription.logoEmoji ?? "📱"}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="font-display font-semibold text-foreground text-[15px] truncate">
              {subscription.name}
            </span>
            <span className="font-display font-bold text-foreground text-[15px] flex-shrink-0">
              {formatPaise(subscription.amountPaise)}
              <span className="text-muted-foreground font-normal text-xs">
                {billingCycleLabel(subscription.billingCycle)}
              </span>
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 mt-1.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <Badge
                variant="secondary"
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${categoryColor} border-0`}
              >
                {subscription.category}
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              Renewing: {formatDisplayDate(subscription.nextRenewalDate)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Compact card variant for upcoming renewals
interface RenewalCardProps {
  subscription: Subscription;
  label: string;
  index?: number;
}

export function RenewalCard({
  subscription,
  label,
  index = 0,
}: RenewalCardProps) {
  return (
    <Link
      to="/subscription/$id"
      params={{ id: subscription.id }}
      data-ocid={`renewals.item.${index + 1}`}
      className="block"
    >
      <div className="flex items-center gap-3 bg-card rounded-[14px] p-3.5 shadow-subtle border border-border/50 min-w-[160px] transition-smooth hover:shadow-elevated active:scale-[0.99]">
        <div className="w-10 h-10 rounded-[10px] bg-muted flex items-center justify-center text-xl flex-shrink-0">
          {subscription.logoEmoji ?? "📱"}
        </div>
        <div className="min-w-0">
          <p className="font-display font-semibold text-foreground text-sm truncate">
            {subscription.name}
          </p>
          <p className="text-xs text-destructive font-medium mt-0.5">{label}</p>
          <p className="text-xs text-muted-foreground">
            {formatPaise(subscription.amountPaise)}/mo
          </p>
        </div>
      </div>
    </Link>
  );
}
