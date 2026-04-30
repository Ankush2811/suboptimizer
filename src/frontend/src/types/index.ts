export type SubscriptionId = string;

export type BillingCycle = "monthly" | "yearly" | "weekly" | "quarterly";

export type Category =
  | "Entertainment"
  | "Productivity"
  | "Health"
  | "Education"
  | "Finance"
  | "Gaming"
  | "News"
  | "Shopping"
  | "Other";

export interface Subscription {
  id: SubscriptionId;
  name: string;
  category: Category;
  amountPaise: bigint;
  billingCycle: BillingCycle;
  nextRenewalDate: string; // ISO date string
  isActive: boolean;
  logoEmoji?: string;
  notes?: string;
}

export interface SubscriptionInput {
  name: string;
  category: Category;
  amountPaise: bigint;
  billingCycle: BillingCycle;
  nextRenewalDate: string;
  logoEmoji?: string;
  notes?: string;
}

export interface CategoryBreakdown {
  category: Category;
  totalPaise: bigint;
  count: bigint;
}

export interface OptimizationSuggestion {
  subscriptionId: SubscriptionId;
  subscriptionName: string;
  suggestionType: "cancel" | "downgrade" | "pause" | "bundle";
  savingsPaise: bigint;
  reason: string;
}

export interface PopularSubscription {
  name: string;
  logoEmoji: string;
  monthlyPaise: number;
  category: Category;
}

export const POPULAR_SUBSCRIPTIONS: PopularSubscription[] = [
  {
    name: "Netflix",
    logoEmoji: "🎬",
    monthlyPaise: 49900,
    category: "Entertainment",
  },
  {
    name: "Amazon Prime",
    logoEmoji: "📦",
    monthlyPaise: 29900,
    category: "Entertainment",
  },
  {
    name: "Hotstar",
    logoEmoji: "⭐",
    monthlyPaise: 29900,
    category: "Entertainment",
  },
  {
    name: "Spotify",
    logoEmoji: "🎵",
    monthlyPaise: 11900,
    category: "Entertainment",
  },
  {
    name: "YouTube Premium",
    logoEmoji: "▶️",
    monthlyPaise: 12900,
    category: "Entertainment",
  },
  {
    name: "Google One",
    logoEmoji: "☁️",
    monthlyPaise: 13000,
    category: "Productivity",
  },
  {
    name: "Adobe Creative Cloud",
    logoEmoji: "🎨",
    monthlyPaise: 162000,
    category: "Productivity",
  },
  {
    name: "Notion",
    logoEmoji: "📝",
    monthlyPaise: 0,
    category: "Productivity",
  },
  {
    name: "Headspace",
    logoEmoji: "🧘",
    monthlyPaise: 24900,
    category: "Health",
  },
  {
    name: "Gym Membership",
    logoEmoji: "💪",
    monthlyPaise: 150000,
    category: "Health",
  },
  {
    name: "Zee5",
    logoEmoji: "🎭",
    monthlyPaise: 9900,
    category: "Entertainment",
  },
  {
    name: "SonyLIV",
    logoEmoji: "📺",
    monthlyPaise: 29900,
    category: "Entertainment",
  },
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Entertainment: "bg-primary/10 text-primary",
  Productivity: "bg-accent/20 text-accent-foreground",
  Health: "bg-savings/10 text-savings",
  Education: "bg-primary/15 text-primary",
  Finance: "bg-savings/15 text-savings",
  Gaming: "bg-alert/10 text-alert",
  News: "bg-alert/10 text-alert",
  Shopping: "bg-primary/10 text-primary",
  Other: "bg-muted text-muted-foreground",
};
