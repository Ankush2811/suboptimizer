import { b as useSubscriptions, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-C2nV8s-d.js";
import { c as createLucideIcon, L as Layout, P as Plus } from "./currency-imaPNYs2.js";
import { S as SubscriptionCard } from "./SubscriptionCard-t2Ivg2RA.js";
import { B as Badge } from "./badge-D1JcO1Wa.js";
import { I as Input } from "./input-Bt6bSsZ6.js";
import { S as Skeleton } from "./skeleton-viP5RGyP.js";
import "./index-O00GnYLu.js";
import "./utils-CqG2ErZb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const CATEGORIES = [
  "All",
  "Entertainment",
  "Productivity",
  "Health",
  "Education",
  "Finance",
  "Gaming",
  "Other"
];
const SAMPLE_SUBS = [
  {
    id: "1",
    name: "Netflix",
    logoEmoji: "🎬",
    amountPaise: 49900n,
    billingCycle: "monthly",
    nextRenewalDate: "2026-07-15",
    category: "Entertainment",
    isActive: true
  },
  {
    id: "2",
    name: "Spotify",
    logoEmoji: "🎵",
    amountPaise: 11900n,
    billingCycle: "monthly",
    nextRenewalDate: "2026-07-14",
    category: "Entertainment",
    isActive: true
  },
  {
    id: "3",
    name: "Google One",
    logoEmoji: "☁️",
    amountPaise: 13000n,
    billingCycle: "monthly",
    nextRenewalDate: "2026-08-10",
    category: "Productivity",
    isActive: true
  },
  {
    id: "4",
    name: "Headspace",
    logoEmoji: "🧘",
    amountPaise: 24900n,
    billingCycle: "monthly",
    nextRenewalDate: "2026-07-22",
    category: "Health",
    isActive: true
  },
  {
    id: "5",
    name: "YouTube Premium",
    logoEmoji: "▶️",
    amountPaise: 12900n,
    billingCycle: "monthly",
    nextRenewalDate: "2026-08-02",
    category: "Entertainment",
    isActive: true
  },
  {
    id: "6",
    name: "Amazon Prime",
    logoEmoji: "📦",
    amountPaise: 29900n,
    billingCycle: "monthly",
    nextRenewalDate: "2026-08-20",
    category: "Entertainment",
    isActive: true
  },
  {
    id: "7",
    name: "Adobe Creative Cloud",
    logoEmoji: "🎨",
    amountPaise: 162000n,
    billingCycle: "monthly",
    nextRenewalDate: "2026-07-30",
    category: "Productivity",
    isActive: true
  }
];
function SubscriptionsPage() {
  const { data: subscriptions, isLoading } = useSubscriptions();
  const [search, setSearch] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const displaySubs = subscriptions ?? SAMPLE_SUBS;
  const filtered = displaySubs.filter((sub) => {
    const matchesSearch = sub.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || sub.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-5 pb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "font-display font-bold text-xl text-foreground",
          "data-ocid": "subscriptions.page",
          children: "All Subscriptions"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/add-subscription", "data-ocid": "subscriptions.add_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-subtle",
          "aria-label": "Add",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 text-primary-foreground" })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search subscriptions...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "pl-9 rounded-[12px]",
          "data-ocid": "subscriptions.search_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveCategory(cat),
        "data-ocid": `subscriptions.filter.${cat.toLowerCase()}`,
        className: `flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-smooth ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:border-primary/40"}`,
        children: cat
      },
      cat
    )) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[72px] rounded-[14px]" }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16",
        "data-ocid": "subscriptions.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "🔍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "No subscriptions found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: search ? "Try a different search term" : "Add your first subscription to get started" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/add-subscription", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "text-primary bg-primary/10 border-0 cursor-pointer px-4 py-2",
              children: "+ Add Subscription"
            }
          ) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: filtered.map((sub, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionCard, { subscription: sub, index: i }, sub.id)) })
  ] }) });
}
export {
  SubscriptionsPage as default
};
