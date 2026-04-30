import { Layout } from "@/components/Layout";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAddSubscription,
  useOptimizationSuggestions,
  useSubscriptions,
  useTotalMonthlySpend,
  useUpcomingRenewals,
} from "@/hooks/useSubscriptions";
import { formatPaise } from "@/lib/currency";
import { daysUntil, renewalLabel } from "@/lib/dates";
import type { Category } from "@/types/index";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, Plus, TrendingDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Sample seed data ─────────────────────────────────────────────────────────
const SEED_SUBSCRIPTIONS = [
  {
    name: "Netflix",
    logoEmoji: "🎬",
    amountPaise: 64900n,
    billingCycle: "monthly" as const,
    nextRenewalDate: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 2);
      return d.toISOString().split("T")[0];
    })(),
    category: "Entertainment" as const,
  },
  {
    name: "Spotify",
    logoEmoji: "🎵",
    amountPaise: 11900n,
    billingCycle: "monthly" as const,
    nextRenewalDate: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return d.toISOString().split("T")[0];
    })(),
    category: "Entertainment" as const,
  },
  {
    name: "Adobe Creative Cloud",
    logoEmoji: "🎨",
    amountPaise: 423000n,
    billingCycle: "monthly" as const,
    nextRenewalDate: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 18);
      return d.toISOString().split("T")[0];
    })(),
    category: "Productivity" as const,
  },
  {
    name: "Disney+ Hotstar",
    logoEmoji: "⭐",
    amountPaise: 89900n,
    billingCycle: "yearly" as const,
    nextRenewalDate: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 45);
      return d.toISOString().split("T")[0];
    })(),
    category: "Entertainment" as const,
  },
  {
    name: "Gym Membership",
    logoEmoji: "💪",
    amountPaise: 120000n,
    billingCycle: "monthly" as const,
    nextRenewalDate: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 12);
      return d.toISOString().split("T")[0];
    })(),
    category: "Health" as const,
  },
];

// ─── Category tabs ────────────────────────────────────────────────────────────
const CATEGORIES: { label: string; value: Category | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Productivity", value: "Productivity" },
  { label: "Health", value: "Health" },
  { label: "Finance", value: "Finance" },
];

// ─── Greeting helper ──────────────────────────────────────────────────────────
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatTodayLong(): string {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function HomePage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const { data: subscriptions, isLoading: subsLoading } = useSubscriptions();
  const { data: totalSpend, isLoading: spendLoading } = useTotalMonthlySpend();
  const { data: upcomingRenewals, isLoading: renewalsLoading } =
    useUpcomingRenewals();
  const { data: suggestions } = useOptimizationSuggestions();
  const addSubscription = useAddSubscription();

  // Seed sample data once when subscriptions list is empty
  const seededRef = useRef(false);
  useEffect(() => {
    if (
      !seededRef.current &&
      subscriptions !== undefined &&
      subscriptions.length === 0 &&
      !addSubscription.isPending
    ) {
      seededRef.current = true;
      for (const sub of SEED_SUBSCRIPTIONS) {
        addSubscription.mutate(sub);
      }
    }
  }, [subscriptions, addSubscription]);

  // Compute savings from suggestions
  const totalSavingsPaise =
    suggestions?.reduce((sum, s) => sum + Number(s.savingsPaise), 0) ?? 120000;

  // Filter subscriptions by category
  const filteredSubs = (subscriptions ?? []).filter(
    (s) => activeCategory === "All" || s.category === activeCategory,
  );

  // Renewal urgency color helper
  function renewalColorClass(isoDate: string): string {
    const days = daysUntil(isoDate);
    if (days <= 2) return "text-alert font-semibold";
    if (days <= 5) return "text-yellow-600 font-semibold";
    return "text-muted-foreground";
  }

  return (
    <Layout>
      <div className="pb-8">
        {/* ─── Header ───────────────────────────────────────────── */}
        <div
          className="px-4 pt-6 pb-4 flex items-start justify-between"
          data-ocid="home.header"
        >
          <div>
            <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
              {formatTodayLong()}
            </p>
            <h1 className="font-display font-bold text-[22px] text-foreground mt-0.5 leading-tight">
              {getGreeting()}, Rahul 👋
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-card border border-border shadow-subtle flex items-center justify-center transition-smooth hover:shadow-elevated"
              aria-label="Notifications"
              data-ocid="home.notifications_button"
            >
              <Bell className="w-4 h-4 text-muted-foreground" />
            </button>
            <div
              className="w-9 h-9 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center"
              data-ocid="home.avatar"
            >
              <span className="text-sm font-bold text-primary">R</span>
            </div>
          </div>
        </div>

        {/* ─── Hero Spend Card ──────────────────────────────────── */}
        <div className="px-4 mb-6">
          <div
            className="rounded-2xl p-5 overflow-hidden relative"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.5 0.22 280) 0%, oklch(0.42 0.24 295) 55%, oklch(0.38 0.22 305) 100%)",
            }}
            data-ocid="home.spend_card"
          >
            {/* Decorative circles */}
            <div
              className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-10"
              style={{ background: "white" }}
            />
            <div
              className="absolute -bottom-8 -left-4 w-24 h-24 rounded-full opacity-10"
              style={{ background: "white" }}
            />

            <p className="text-[13px] font-medium text-white/70 mb-1 relative z-10">
              Monthly Spend
            </p>

            {spendLoading ? (
              <Skeleton className="h-12 w-36 mb-2 bg-white/20" />
            ) : (
              <h2
                className="font-display font-bold text-[42px] text-white leading-none mb-1 relative z-10"
                data-ocid="home.total_spend"
              >
                {formatPaise(totalSpend ?? 0n)}
              </h2>
            )}

            {/* Savings hint */}
            {totalSavingsPaise > 0 && (
              <div
                className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1.5 mt-2 relative z-10"
                data-ocid="home.savings_hint"
              >
                <TrendingDown className="w-3.5 h-3.5 text-green-300" />
                <span className="text-[13px] font-semibold text-green-300">
                  You can save {formatPaise(totalSavingsPaise)}/month
                </span>
              </div>
            )}

            {/* Subscription count pill */}
            <div className="absolute top-5 right-5 bg-white/15 rounded-full px-2.5 py-1 z-10">
              <span className="text-[11px] font-medium text-white/80">
                {subscriptions?.length ?? SEED_SUBSCRIPTIONS.length} active
              </span>
            </div>
          </div>
        </div>

        {/* ─── Upcoming Renewals ───────────────────────────────── */}
        <section className="mb-6" data-ocid="home.renewals_section">
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="font-display font-semibold text-foreground text-[15px]">
              Upcoming Renewals
            </h2>
            <Link
              to="/subscriptions"
              className="text-xs font-medium text-primary"
              data-ocid="home.renewals_view_all_link"
            >
              View all
            </Link>
          </div>

          {renewalsLoading ? (
            <div className="flex gap-3 px-4 overflow-x-auto pb-1">
              {[1, 2].map((i) => (
                <Skeleton
                  key={i}
                  className="w-44 h-[76px] rounded-[14px] flex-shrink-0"
                />
              ))}
            </div>
          ) : (upcomingRenewals ?? []).length > 0 ? (
            <div className="flex gap-3 px-4 overflow-x-auto pb-1 scrollbar-hide">
              {(upcomingRenewals ?? []).map((sub, i) => (
                <div key={sub.id} className="flex-shrink-0">
                  <div
                    className={`min-w-[168px] bg-card rounded-[14px] p-3.5 shadow-subtle border transition-smooth hover:shadow-elevated active:scale-[0.99] ${
                      daysUntil(sub.nextRenewalDate) <= 2
                        ? "border-orange-200"
                        : "border-border/50"
                    }`}
                    data-ocid={`renewals.item.${i + 1}`}
                  >
                    <Link
                      to="/subscription/$id"
                      params={{ id: sub.id }}
                      className="flex items-center gap-2.5"
                    >
                      <div className="w-10 h-10 rounded-[10px] bg-muted flex items-center justify-center text-xl flex-shrink-0">
                        {sub.logoEmoji ?? "📱"}
                      </div>
                      <div className="min-w-0">
                        <p className="font-display font-semibold text-foreground text-sm truncate">
                          {sub.name}
                        </p>
                        <p
                          className={`text-xs mt-0.5 ${renewalColorClass(sub.nextRenewalDate)}`}
                        >
                          {renewalLabel(sub.nextRenewalDate)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatPaise(sub.amountPaise)}
                          {sub.billingCycle === "monthly" ? "/mo" : "/yr"}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="mx-4 bg-card rounded-[14px] p-4 border border-border/50 text-center"
              data-ocid="home.renewals_empty_state"
            >
              <p className="text-sm text-muted-foreground">
                No renewals in the next 7 days 🎉
              </p>
            </div>
          )}
        </section>

        {/* ─── Optimization Tips (if any) ──────────────────────── */}
        {suggestions && suggestions.length > 0 && (
          <section className="px-4 mb-6" data-ocid="home.tips_section">
            <div
              className="rounded-2xl p-4 border border-green-200"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.18 155 / 0.1) 0%, oklch(0.68 0.18 155 / 0.04) 100%)",
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-savings-subtle flex items-center justify-center flex-shrink-0 mt-0.5">
                  <TrendingDown className="w-4 h-4 text-savings" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-foreground text-sm">
                    AI Suggestion
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {suggestions[0].reason}
                  </p>
                  <button
                    type="button"
                    className="text-xs font-semibold text-savings mt-2 transition-smooth hover:opacity-80"
                    onClick={() => navigate({ to: "/insights" })}
                    data-ocid="home.view_insights_button"
                  >
                    View all insights →
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── All Subscriptions ───────────────────────────────── */}
        <section data-ocid="home.subscriptions_section">
          <div className="px-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-semibold text-foreground text-[15px]">
                All Subscriptions{" "}
                <span className="text-muted-foreground font-normal text-[13px]">
                  ({filteredSubs.length})
                </span>
              </h2>
              <Link
                to="/subscriptions"
                className="text-xs font-medium text-primary"
                data-ocid="home.view_all_link"
              >
                View all
              </Link>
            </div>

            {/* Category filter tabs */}
            <div
              className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
              data-ocid="home.category_filter"
            >
              {CATEGORIES.map(({ label, value }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setActiveCategory(value)}
                  data-ocid={`home.category_tab.${value.toLowerCase()}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-smooth flex-shrink-0 ${
                    activeCategory === value
                      ? "bg-primary text-primary-foreground shadow-subtle"
                      : "bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {subsLoading || addSubscription.isPending ? (
            <div className="flex flex-col gap-3 px-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[76px] rounded-[14px]" />
              ))}
            </div>
          ) : filteredSubs.length === 0 &&
            (subscriptions ?? []).length === 0 ? (
            // True empty state — no subs at all
            <div
              className="mx-4 bg-card rounded-2xl p-8 border border-dashed border-border text-center"
              data-ocid="home.subscriptions_empty_state"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <p className="font-display font-semibold text-foreground text-base mb-1">
                No subscriptions yet
              </p>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                Start tracking your subscriptions to see how much you spend
                every month.
              </p>
              <Link to="/add-subscription">
                <Button
                  className="rounded-full px-6"
                  data-ocid="home.add_first_button"
                >
                  Add your first subscription
                </Button>
              </Link>
            </div>
          ) : filteredSubs.length === 0 ? (
            // Category filter returned no results
            <div
              className="mx-4 bg-card rounded-[14px] p-6 border border-border/50 text-center"
              data-ocid="home.category_empty_state"
            >
              <p className="text-sm text-muted-foreground">
                No {activeCategory} subscriptions found
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 px-4">
              {filteredSubs.map((sub, i) => (
                <SubscriptionCard key={sub.id} subscription={sub} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* ─── Quick Add FAB ───────────────────────────────────── */}
        <div className="px-4 mt-6">
          <Link to="/add-subscription">
            <Button
              className="w-full rounded-[14px] h-12 font-display font-semibold text-sm gap-2 shadow-elevated transition-smooth hover:opacity-90 active:scale-[0.98]"
              data-ocid="home.add_subscription_button"
            >
              <Plus className="w-4 h-4" />
              Add Subscription
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
