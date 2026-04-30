import { u as useNavigate, r as reactExports, b as useSubscriptions, c as useTotalMonthlySpend, d as useUpcomingRenewals, e as useOptimizationSuggestions, f as useAddSubscription, j as jsxRuntimeExports, L as Link, g as renewalLabel, h as daysUntil } from "./index-C2nV8s-d.js";
import { c as createLucideIcon, L as Layout, f as formatPaise, P as Plus } from "./currency-imaPNYs2.js";
import { S as SubscriptionCard } from "./SubscriptionCard-t2Ivg2RA.js";
import { B as Button } from "./button-DM-IkvfC.js";
import { S as Skeleton } from "./skeleton-viP5RGyP.js";
import { B as Bell } from "./bell-MGZHXBEk.js";
import "./badge-D1JcO1Wa.js";
import "./utils-CqG2ErZb.js";
import "./index-O00GnYLu.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode);
const SEED_SUBSCRIPTIONS = [
  {
    name: "Netflix",
    logoEmoji: "🎬",
    amountPaise: 64900n,
    billingCycle: "monthly",
    nextRenewalDate: (() => {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() + 2);
      return d.toISOString().split("T")[0];
    })(),
    category: "Entertainment"
  },
  {
    name: "Spotify",
    logoEmoji: "🎵",
    amountPaise: 11900n,
    billingCycle: "monthly",
    nextRenewalDate: (() => {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() + 1);
      return d.toISOString().split("T")[0];
    })(),
    category: "Entertainment"
  },
  {
    name: "Adobe Creative Cloud",
    logoEmoji: "🎨",
    amountPaise: 423000n,
    billingCycle: "monthly",
    nextRenewalDate: (() => {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() + 18);
      return d.toISOString().split("T")[0];
    })(),
    category: "Productivity"
  },
  {
    name: "Disney+ Hotstar",
    logoEmoji: "⭐",
    amountPaise: 89900n,
    billingCycle: "yearly",
    nextRenewalDate: (() => {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() + 45);
      return d.toISOString().split("T")[0];
    })(),
    category: "Entertainment"
  },
  {
    name: "Gym Membership",
    logoEmoji: "💪",
    amountPaise: 120000n,
    billingCycle: "monthly",
    nextRenewalDate: (() => {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() + 12);
      return d.toISOString().split("T")[0];
    })(),
    category: "Health"
  }
];
const CATEGORIES = [
  { label: "All", value: "All" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Productivity", value: "Productivity" },
  { label: "Health", value: "Health" },
  { label: "Finance", value: "Finance" }
];
function getGreeting() {
  const hour = (/* @__PURE__ */ new Date()).getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
function formatTodayLong() {
  return (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });
}
function HomePage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const { data: subscriptions, isLoading: subsLoading } = useSubscriptions();
  const { data: totalSpend, isLoading: spendLoading } = useTotalMonthlySpend();
  const { data: upcomingRenewals, isLoading: renewalsLoading } = useUpcomingRenewals();
  const { data: suggestions } = useOptimizationSuggestions();
  const addSubscription = useAddSubscription();
  const seededRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!seededRef.current && subscriptions !== void 0 && subscriptions.length === 0 && !addSubscription.isPending) {
      seededRef.current = true;
      for (const sub of SEED_SUBSCRIPTIONS) {
        addSubscription.mutate(sub);
      }
    }
  }, [subscriptions, addSubscription]);
  const totalSavingsPaise = (suggestions == null ? void 0 : suggestions.reduce((sum, s) => sum + Number(s.savingsPaise), 0)) ?? 12e4;
  const filteredSubs = (subscriptions ?? []).filter(
    (s) => activeCategory === "All" || s.category === activeCategory
  );
  function renewalColorClass(isoDate) {
    const days = daysUntil(isoDate);
    if (days <= 2) return "text-alert font-semibold";
    if (days <= 5) return "text-yellow-600 font-semibold";
    return "text-muted-foreground";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-4 pt-6 pb-4 flex items-start justify-between",
        "data-ocid": "home.header",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium tracking-wide uppercase", children: formatTodayLong() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-[22px] text-foreground mt-0.5 leading-tight", children: [
              getGreeting(),
              ", Rahul 👋"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "w-9 h-9 rounded-full bg-card border border-border shadow-subtle flex items-center justify-center transition-smooth hover:shadow-elevated",
                "aria-label": "Notifications",
                "data-ocid": "home.notifications_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-muted-foreground" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-9 h-9 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center",
                "data-ocid": "home.avatar",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary", children: "R" })
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl p-5 overflow-hidden relative",
        style: {
          background: "linear-gradient(135deg, oklch(0.5 0.22 280) 0%, oklch(0.42 0.24 295) 55%, oklch(0.38 0.22 305) 100%)"
        },
        "data-ocid": "home.spend_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-10",
              style: { background: "white" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -bottom-8 -left-4 w-24 h-24 rounded-full opacity-10",
              style: { background: "white" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] font-medium text-white/70 mb-1 relative z-10", children: "Monthly Spend" }),
          spendLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-36 mb-2 bg-white/20" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "font-display font-bold text-[42px] text-white leading-none mb-1 relative z-10",
              "data-ocid": "home.total_spend",
              children: formatPaise(totalSpend ?? 0n)
            }
          ),
          totalSavingsPaise > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1.5 mt-2 relative z-10",
              "data-ocid": "home.savings_hint",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3.5 h-3.5 text-green-300" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[13px] font-semibold text-green-300", children: [
                  "You can save ",
                  formatPaise(totalSavingsPaise),
                  "/month"
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-5 right-5 bg-white/15 rounded-full px-2.5 py-1 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-medium text-white/80", children: [
            (subscriptions == null ? void 0 : subscriptions.length) ?? SEED_SUBSCRIPTIONS.length,
            " active"
          ] }) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-6", "data-ocid": "home.renewals_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-[15px]", children: "Upcoming Renewals" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/subscriptions",
            className: "text-xs font-medium text-primary",
            "data-ocid": "home.renewals_view_all_link",
            children: "View all"
          }
        )
      ] }),
      renewalsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 px-4 overflow-x-auto pb-1", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Skeleton,
        {
          className: "w-44 h-[76px] rounded-[14px] flex-shrink-0"
        },
        i
      )) }) : (upcomingRenewals ?? []).length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 px-4 overflow-x-auto pb-1 scrollbar-hide", children: (upcomingRenewals ?? []).map((sub, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `min-w-[168px] bg-card rounded-[14px] p-3.5 shadow-subtle border transition-smooth hover:shadow-elevated active:scale-[0.99] ${daysUntil(sub.nextRenewalDate) <= 2 ? "border-orange-200" : "border-border/50"}`,
          "data-ocid": `renewals.item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/subscription/$id",
              params: { id: sub.id },
              className: "flex items-center gap-2.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-[10px] bg-muted flex items-center justify-center text-xl flex-shrink-0", children: sub.logoEmoji ?? "📱" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm truncate", children: sub.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: `text-xs mt-0.5 ${renewalColorClass(sub.nextRenewalDate)}`,
                      children: renewalLabel(sub.nextRenewalDate)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    formatPaise(sub.amountPaise),
                    sub.billingCycle === "monthly" ? "/mo" : "/yr"
                  ] })
                ] })
              ]
            }
          )
        }
      ) }, sub.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "mx-4 bg-card rounded-[14px] p-4 border border-border/50 text-center",
          "data-ocid": "home.renewals_empty_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No renewals in the next 7 days 🎉" })
        }
      )
    ] }),
    suggestions && suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-4 mb-6", "data-ocid": "home.tips_section", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-2xl p-4 border border-green-200",
        style: {
          background: "linear-gradient(135deg, oklch(0.68 0.18 155 / 0.1) 0%, oklch(0.68 0.18 155 / 0.04) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-savings-subtle flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-4 h-4 text-savings" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: "AI Suggestion" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: suggestions[0].reason }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "text-xs font-semibold text-savings mt-2 transition-smooth hover:opacity-80",
                onClick: () => navigate({ to: "/insights" }),
                "data-ocid": "home.view_insights_button",
                children: "View all insights →"
              }
            )
          ] })
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "home.subscriptions_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground text-[15px]", children: [
            "All Subscriptions",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal text-[13px]", children: [
              "(",
              filteredSubs.length,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/subscriptions",
              className: "text-xs font-medium text-primary",
              "data-ocid": "home.view_all_link",
              children: "View all"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-2 overflow-x-auto scrollbar-hide pb-1",
            "data-ocid": "home.category_filter",
            children: CATEGORIES.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActiveCategory(value),
                "data-ocid": `home.category_tab.${value.toLowerCase()}`,
                className: `px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-smooth flex-shrink-0 ${activeCategory === value ? "bg-primary text-primary-foreground shadow-subtle" : "bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-primary"}`,
                children: label
              },
              value
            ))
          }
        )
      ] }),
      subsLoading || addSubscription.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 px-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[76px] rounded-[14px]" }, i)) }) : filteredSubs.length === 0 && (subscriptions ?? []).length === 0 ? (
        // True empty state — no subs at all
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mx-4 bg-card rounded-2xl p-8 border border-dashed border-border text-center",
            "data-ocid": "home.subscriptions_empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-8 h-8 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base mb-1", children: "No subscriptions yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5 leading-relaxed", children: "Start tracking your subscriptions to see how much you spend every month." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/add-subscription", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "rounded-full px-6",
                  "data-ocid": "home.add_first_button",
                  children: "Add your first subscription"
                }
              ) })
            ]
          }
        )
      ) : filteredSubs.length === 0 ? (
        // Category filter returned no results
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "mx-4 bg-card rounded-[14px] p-6 border border-border/50 text-center",
            "data-ocid": "home.category_empty_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "No ",
              activeCategory,
              " subscriptions found"
            ] })
          }
        )
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 px-4", children: filteredSubs.map((sub, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionCard, { subscription: sub, index: i }, sub.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/add-subscription", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        className: "w-full rounded-[14px] h-12 font-display font-semibold text-sm gap-2 shadow-elevated transition-smooth hover:opacity-90 active:scale-[0.98]",
        "data-ocid": "home.add_subscription_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
          "Add Subscription"
        ]
      }
    ) }) })
  ] }) });
}
export {
  HomePage as default
};
