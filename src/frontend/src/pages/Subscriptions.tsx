import { Layout } from "@/components/Layout";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import type { Category } from "@/types/index";
import { Link } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

const CATEGORIES: (Category | "All")[] = [
  "All",
  "Entertainment",
  "Productivity",
  "Health",
  "Education",
  "Finance",
  "Gaming",
  "Other",
];

const SAMPLE_SUBS = [
  {
    id: "1",
    name: "Netflix",
    logoEmoji: "🎬",
    amountPaise: 49900n,
    billingCycle: "monthly" as const,
    nextRenewalDate: "2026-07-15",
    category: "Entertainment" as const,
    isActive: true,
  },
  {
    id: "2",
    name: "Spotify",
    logoEmoji: "🎵",
    amountPaise: 11900n,
    billingCycle: "monthly" as const,
    nextRenewalDate: "2026-07-14",
    category: "Entertainment" as const,
    isActive: true,
  },
  {
    id: "3",
    name: "Google One",
    logoEmoji: "☁️",
    amountPaise: 13000n,
    billingCycle: "monthly" as const,
    nextRenewalDate: "2026-08-10",
    category: "Productivity" as const,
    isActive: true,
  },
  {
    id: "4",
    name: "Headspace",
    logoEmoji: "🧘",
    amountPaise: 24900n,
    billingCycle: "monthly" as const,
    nextRenewalDate: "2026-07-22",
    category: "Health" as const,
    isActive: true,
  },
  {
    id: "5",
    name: "YouTube Premium",
    logoEmoji: "▶️",
    amountPaise: 12900n,
    billingCycle: "monthly" as const,
    nextRenewalDate: "2026-08-02",
    category: "Entertainment" as const,
    isActive: true,
  },
  {
    id: "6",
    name: "Amazon Prime",
    logoEmoji: "📦",
    amountPaise: 29900n,
    billingCycle: "monthly" as const,
    nextRenewalDate: "2026-08-20",
    category: "Entertainment" as const,
    isActive: true,
  },
  {
    id: "7",
    name: "Adobe Creative Cloud",
    logoEmoji: "🎨",
    amountPaise: 162000n,
    billingCycle: "monthly" as const,
    nextRenewalDate: "2026-07-30",
    category: "Productivity" as const,
    isActive: true,
  },
];

export default function SubscriptionsPage() {
  const { data: subscriptions, isLoading } = useSubscriptions();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const displaySubs = subscriptions ?? SAMPLE_SUBS;
  const filtered = displaySubs.filter((sub) => {
    const matchesSearch = sub.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || sub.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1
            className="font-display font-bold text-xl text-foreground"
            data-ocid="subscriptions.page"
          >
            All Subscriptions
          </h1>
          <Link to="/add-subscription" data-ocid="subscriptions.add_button">
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-subtle"
              aria-label="Add"
            >
              <Plus className="w-4 h-4 text-primary-foreground" />
            </button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search subscriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-[12px]"
            data-ocid="subscriptions.search_input"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              data-ocid={`subscriptions.filter.${cat.toLowerCase()}`}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-smooth ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List */}
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[72px] rounded-[14px]" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-16"
            data-ocid="subscriptions.empty_state"
          >
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium text-foreground mb-1">
              No subscriptions found
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {search
                ? "Try a different search term"
                : "Add your first subscription to get started"}
            </p>
            <Link to="/add-subscription">
              <Badge
                variant="secondary"
                className="text-primary bg-primary/10 border-0 cursor-pointer px-4 py-2"
              >
                + Add Subscription
              </Badge>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((sub, i) => (
              <SubscriptionCard key={sub.id} subscription={sub} index={i} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
