import { j as jsxRuntimeExports, L as Link, y as formatDisplayDate } from "./index-C2nV8s-d.js";
import { B as Badge } from "./badge-D1JcO1Wa.js";
import { f as formatPaise } from "./currency-imaPNYs2.js";
import { C as CATEGORY_COLORS } from "./index-O00GnYLu.js";
function billingCycleLabel(cycle) {
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
function SubscriptionCard({
  subscription,
  index = 0
}) {
  const categoryColor = CATEGORY_COLORS[subscription.category] ?? CATEGORY_COLORS.Other;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/subscription/$id",
      params: { id: subscription.id },
      "data-ocid": `subscriptions.item.${index + 1}`,
      className: "block",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-card rounded-[14px] p-4 shadow-subtle border border-border/50 transition-smooth hover:shadow-elevated hover:border-border active:scale-[0.99]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-[12px] bg-muted flex items-center justify-center text-2xl flex-shrink-0 shadow-xs", children: subscription.logoEmoji ?? "📱" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground text-[15px] truncate", children: subscription.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-foreground text-[15px] flex-shrink-0", children: [
              formatPaise(subscription.amountPaise),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs", children: billingCycleLabel(subscription.billingCycle) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: `text-[10px] px-2 py-0.5 rounded-full font-medium ${categoryColor} border-0`,
                children: subscription.category
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex-shrink-0", children: [
              "Renewing: ",
              formatDisplayDate(subscription.nextRenewalDate)
            ] })
          ] })
        ] })
      ] })
    }
  );
}
export {
  SubscriptionCard as S,
  billingCycleLabel as b
};
