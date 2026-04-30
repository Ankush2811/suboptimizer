import { z as useInternetIdentity, b as useSubscriptions, c as useTotalMonthlySpend, j as jsxRuntimeExports, q as ue } from "./index-C2nV8s-d.js";
import { c as createLucideIcon, L as Layout, U as User, f as formatPaise } from "./currency-imaPNYs2.js";
import { B as Button } from "./button-DM-IkvfC.js";
import { L as Label } from "./label-DDUOMYjf.js";
import { S as Switch } from "./switch-uDVkGi9x.js";
import { B as Bell } from "./bell-MGZHXBEk.js";
import "./utils-CqG2ErZb.js";
import "./index-BGu_BhPC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleHelp = createLucideIcon("circle-help", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
function ProfilePage() {
  const { login, clear, isAuthenticated } = useInternetIdentity();
  const isLoggedIn = isAuthenticated;
  const { data: subscriptions } = useSubscriptions();
  const { data: totalSpend } = useTotalMonthlySpend();
  const subCount = (subscriptions == null ? void 0 : subscriptions.length) ?? 0;
  const monthlySpend = totalSpend ?? 0n;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-6 pb-8", "data-ocid": "profile.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-[16px] p-5 shadow-elevated border border-border/50 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-7 h-7 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-base", children: "Your Account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Internet Identity connected" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-base", children: "Welcome!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Sign in to sync your data" })
      ] }) }),
      isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: clear,
          className: "text-xs rounded-[10px]",
          "data-ocid": "profile.logout_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3 h-3 mr-1.5" }),
            "Sign out"
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          onClick: login,
          className: "text-xs rounded-[10px] bg-primary text-primary-foreground",
          "data-ocid": "profile.login_button",
          children: "Sign in"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-[14px] p-4 shadow-subtle border border-border/50 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-foreground", children: subCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Active Subscriptions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-[14px] p-4 shadow-subtle border border-border/50 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground", children: formatPaise(monthlySpend) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Monthly Spend" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-[16px] border border-border/50 shadow-subtle overflow-hidden mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-muted-foreground px-4 pt-4 pb-2 uppercase tracking-wide", children: "Notifications" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-3 flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between",
            "data-ocid": "profile.renewal_alerts_toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-foreground cursor-pointer", children: "Renewal Alerts" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true, "aria-label": "Renewal Alerts" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between",
            "data-ocid": "profile.sms_detection_toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-foreground cursor-pointer", children: "SMS Detection" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { "aria-label": "SMS Detection" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-[16px] border border-border/50 shadow-subtle overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "w-full flex items-center justify-between px-4 py-4 transition-smooth hover:bg-muted/40",
        "data-ocid": "profile.help_button",
        onClick: () => ue.info("Help is coming soon! Contact support at caffeine.ai"),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Help & Support" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-8", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ". Built with love using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-primary hover:underline",
          children: "caffeine.ai"
        }
      )
    ] })
  ] }) });
}
export {
  ProfilePage as default
};
