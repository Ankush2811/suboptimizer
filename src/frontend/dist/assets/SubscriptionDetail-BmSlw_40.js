import { s as useParams, u as useNavigate, v as useSubscriptionById, w as useCancelSubscription, x as useUpdateSubscription, r as reactExports, h as daysUntil, j as jsxRuntimeExports, L as Link, y as formatDisplayDate, q as ue } from "./index-C2nV8s-d.js";
import { c as createLucideIcon, L as Layout, p as paiseToRupees, f as formatPaise, r as rupeesToPaise } from "./currency-imaPNYs2.js";
import { b as billingCycleLabel } from "./SubscriptionCard-t2Ivg2RA.js";
import { B as Badge } from "./badge-D1JcO1Wa.js";
import { B as Button } from "./button-DM-IkvfC.js";
import { I as Input } from "./input-Bt6bSsZ6.js";
import { L as Label } from "./label-DDUOMYjf.js";
import { S as Skeleton } from "./skeleton-viP5RGyP.js";
import { C as CATEGORY_COLORS, P as POPULAR_SUBSCRIPTIONS } from "./index-O00GnYLu.js";
import { A as ArrowLeft, C as Check } from "./check-QBRRyUFO.js";
import "./utils-CqG2ErZb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
const CATEGORIES = [
  "Entertainment",
  "Productivity",
  "Health",
  "Education",
  "Finance",
  "Gaming",
  "News",
  "Shopping",
  "Other"
];
const BILLING_CYCLES = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "weekly", label: "Weekly" }
];
function RenewalBadge({ days }) {
  if (days < 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
      "Overdue"
    ] });
  }
  if (days <= 2) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-alert-subtle text-alert", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
      days === 0 ? "Today!" : days === 1 ? "Tomorrow" : `In ${days} days`
    ] });
  }
  if (days <= 5) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
      "In ",
      days,
      " days"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-savings-subtle text-savings", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
    "In ",
    days,
    " days"
  ] });
}
function EditForm({
  initialEmoji,
  initialName,
  initialAmount,
  initialBilling,
  initialCategory,
  initialRenewal,
  initialNotes,
  isPending,
  onSave,
  onCancel
}) {
  const [emoji, setEmoji] = reactExports.useState(initialEmoji);
  const [name, setName] = reactExports.useState(initialName);
  const [amount, setAmount] = reactExports.useState(initialAmount.toString());
  const [billing, setBilling] = reactExports.useState(initialBilling);
  const [category, setCategory] = reactExports.useState(initialCategory);
  const [renewalDate, setRenewalDate] = reactExports.useState(initialRenewal);
  const [notes, setNotes] = reactExports.useState(initialNotes);
  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !amount) {
      ue.error("Please fill in all required fields");
      return;
    }
    onSave({
      name: name.trim(),
      amountPaise: rupeesToPaise(Number.parseFloat(amount)),
      billingCycle: billing,
      category,
      nextRenewalDate: renewalDate,
      logoEmoji: emoji,
      notes: notes.trim() || void 0
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "flex flex-col gap-5",
      "data-ocid": "detail.edit_form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium mb-2", children: "Quick fill" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1", children: POPULAR_SUBSCRIPTIONS.slice(0, 6).map((pop, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `detail.edit_popular.${i + 1}`,
              onClick: () => {
                setEmoji(pop.logoEmoji);
                setName(pop.name);
                setCategory(pop.category);
                setAmount((pop.monthlyPaise / 100).toString());
              },
              className: `flex flex-col items-center gap-1 p-2.5 rounded-[12px] bg-background border transition-smooth flex-shrink-0 ${name === pop.name ? "border-primary shadow-subtle" : "border-border/50 hover:border-primary/40"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: pop.logoEmoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-medium text-foreground w-12 text-center truncate", children: pop.name })
              ]
            },
            pop.name
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-medium text-sm text-foreground mb-1.5 block", children: "Service Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: emoji,
                onChange: (e) => setEmoji(e.target.value),
                className: "w-14 text-center text-xl",
                maxLength: 2,
                "aria-label": "Emoji",
                "data-ocid": "detail.edit_emoji_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "e.g. Netflix",
                value: name,
                onChange: (e) => setName(e.target.value),
                className: "flex-1",
                required: true,
                "data-ocid": "detail.edit_name_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-medium text-sm text-foreground mb-1.5 block", children: "Amount (₹) *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm", children: "₹" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                placeholder: "499",
                value: amount,
                onChange: (e) => setAmount(e.target.value),
                className: "pl-7",
                required: true,
                min: "0",
                "data-ocid": "detail.edit_amount_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-medium text-sm text-foreground mb-2 block", children: "Billing Cycle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: BILLING_CYCLES.map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setBilling(value),
              "data-ocid": `detail.edit_billing.${value}`,
              className: `px-3 py-1.5 rounded-full text-xs font-medium transition-smooth ${billing === value ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:border-primary/40"}`,
              children: label
            },
            value
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-medium text-sm text-foreground mb-2 block", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setCategory(cat),
              "data-ocid": `detail.edit_category.${cat.toLowerCase()}`,
              className: `transition-smooth ${category === cat ? "ring-2 ring-primary ring-offset-1" : "opacity-70 hover:opacity-100"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: `text-[11px] px-2.5 py-1 rounded-full font-medium cursor-pointer ${CATEGORY_COLORS[cat]} border-0`,
                  children: cat
                }
              )
            },
            cat
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-medium text-sm text-foreground mb-1.5 block", children: "Next Renewal Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: renewalDate,
              onChange: (e) => setRenewalDate(e.target.value),
              "data-ocid": "detail.edit_renewal_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-medium text-sm text-foreground mb-1.5 block", children: "Notes (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "e.g. Family plan, shared with 3 people",
              value: notes,
              onChange: (e) => setNotes(e.target.value),
              "data-ocid": "detail.edit_notes_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: onCancel,
              className: "flex-1 h-11 rounded-[12px]",
              "data-ocid": "detail.edit_cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: isPending,
              className: "flex-1 h-11 rounded-[12px] gradient-primary text-primary-foreground font-semibold",
              "data-ocid": "detail.edit_save_button",
              children: isPending ? "Saving..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 mr-1.5" }),
                "Save Changes"
              ] })
            }
          )
        ] })
      ]
    }
  );
}
function SubscriptionDetailPage() {
  const { id } = useParams({ from: "/subscription/$id" });
  const navigate = useNavigate();
  const { data: sub, isLoading } = useSubscriptionById(id);
  const { mutate: cancelSub, isPending: cancelling } = useCancelSubscription();
  const { mutate: updateSub, isPending: updating } = useUpdateSubscription();
  const [editMode, setEditMode] = reactExports.useState(false);
  const [confirmCancel, setConfirmCancel] = reactExports.useState(false);
  const days = sub ? daysUntil(sub.nextRenewalDate) : 0;
  const isUrgent = days >= 0 && days <= 2;
  function handleSave(input) {
    updateSub(
      { id, input },
      {
        onSuccess: () => {
          ue.success("Subscription updated!");
          setEditMode(false);
        },
        onError: () => ue.error("Failed to update. Please try again.")
      }
    );
  }
  function handleCancel() {
    if (!confirmCancel) {
      setConfirmCancel(true);
      return;
    }
    cancelSub(id, {
      onSuccess: () => {
        ue.success("Subscription cancelled");
        navigate({ to: "/home" });
      },
      onError: () => ue.error("Failed to cancel. Please try again.")
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/home", "data-ocid": "detail.back_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "w-9 h-9 rounded-full bg-card border border-border shadow-subtle flex items-center justify-center transition-smooth hover:shadow-elevated",
            "aria-label": "Back to home",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 text-foreground" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-lg text-foreground", children: editMode ? "Edit Subscription" : "Details" })
      ] }),
      sub && !editMode && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setEditMode(true);
            setConfirmCancel(false);
          },
          className: "w-9 h-9 rounded-full bg-card border border-border shadow-subtle flex items-center justify-center transition-smooth hover:border-primary/40 hover:shadow-elevated",
          "aria-label": "Edit subscription",
          "data-ocid": "detail.edit_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4 text-foreground" })
        }
      ),
      editMode && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setEditMode(false),
          className: "w-9 h-9 rounded-full bg-card border border-border shadow-subtle flex items-center justify-center transition-smooth hover:border-destructive/40",
          "aria-label": "Close edit mode",
          "data-ocid": "detail.close_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", "data-ocid": "detail.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-[14px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-[14px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-[14px]" })
    ] }) : !sub ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", "data-ocid": "detail.error_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl mb-3", children: "🔍" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "Subscription not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "It may have been removed or never existed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/home", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "rounded-full",
          "data-ocid": "detail.go_home_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5 mr-1.5" }),
            "Go Home"
          ]
        }
      ) })
    ] }) : editMode ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-[16px] p-5 shadow-elevated border border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditForm,
      {
        initialEmoji: sub.logoEmoji ?? "📱",
        initialName: sub.name,
        initialAmount: paiseToRupees(sub.amountPaise),
        initialBilling: sub.billingCycle,
        initialCategory: sub.category,
        initialRenewal: sub.nextRenewalDate,
        initialNotes: sub.notes ?? "",
        isPending: updating,
        onSave: handleSave,
        onCancel: () => setEditMode(false)
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-[16px] p-5 shadow-elevated border border-border/50 mb-4",
          "data-ocid": "detail.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-[14px] bg-muted flex items-center justify-center text-3xl shadow-subtle flex-shrink-0", children: sub.logoEmoji ?? "📱" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground truncate", children: sub.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mt-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: `text-[10px] px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[sub.category]} border-0`,
                      children: sub.category
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RenewalBadge, { days })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 pt-4 border-t border-border/50 flex items-end justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium mb-0.5", children: "Amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-3xl text-foreground", children: formatPaise(sub.amountPaise) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: billingCycleLabel(sub.billingCycle) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium mb-0.5", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs font-semibold px-2 py-0.5 rounded-full ${sub.isActive ? "bg-savings-subtle text-savings" : "bg-muted text-muted-foreground"}`,
                    children: sub.isActive ? "Active" : "Inactive"
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-[14px] p-4 shadow-subtle border border-border/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "Next Renewal" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `font-display font-semibold text-sm leading-tight ${isUrgent ? "text-alert" : "text-foreground"}`,
              children: formatDisplayDate(sub.nextRenewalDate)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `text-xs mt-1 font-medium ${isUrgent ? "text-alert" : "text-muted-foreground"}`,
              children: days < 0 ? "Past due" : days === 0 ? "Today!" : days === 1 ? "Tomorrow" : `In ${days} days`
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-[14px] p-4 shadow-subtle border border-border/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "Billing" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm capitalize text-foreground", children: sub.billingCycle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: billingCycleLabel(sub.billingCycle) })
        ] })
      ] }),
      sub.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-[14px] p-4 shadow-subtle border border-border/50 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "Notes" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: sub.notes })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 mt-6", children: !confirmCancel ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: handleCancel,
          className: "w-full h-11 rounded-[12px] text-destructive border-destructive/30 hover:bg-destructive/5 hover:border-destructive/50 font-medium transition-smooth",
          "data-ocid": "detail.delete_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 mr-2" }),
            "Cancel Subscription"
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-alert-subtle rounded-[14px] p-4 border border-destructive/20",
          "data-ocid": "detail.confirm_dialog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl flex-shrink-0", children: "⚠️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground leading-snug", children: [
                  "Cancel",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: sub.name }),
                  "?"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  "You'll stop being charged ",
                  formatPaise(sub.amountPaise),
                  billingCycleLabel(sub.billingCycle),
                  "."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setConfirmCancel(false),
                  className: "flex-1 rounded-[10px]",
                  "data-ocid": "detail.cancel_button",
                  children: "Keep it"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  onClick: handleCancel,
                  disabled: cancelling,
                  className: "flex-1 rounded-[10px] bg-destructive text-destructive-foreground hover:bg-destructive/90",
                  "data-ocid": "detail.confirm_button",
                  children: cancelling ? "Cancelling…" : "Yes, cancel"
                }
              )
            ] })
          ]
        }
      ) })
    ] })
  ] }) });
}
export {
  SubscriptionDetailPage as default
};
