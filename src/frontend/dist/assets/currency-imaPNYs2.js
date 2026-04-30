import { r as reactExports, A as useRouterState, j as jsxRuntimeExports, L as Link } from "./index-C2nV8s-d.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$3);
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
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
const NAV_ITEMS = [
  { to: "/home", icon: House, label: "Home" },
  { to: "/insights", icon: ChartColumn, label: "Insights" },
  { to: "/add-subscription", icon: Plus, label: "Add", isCenter: true },
  { to: "/subscriptions", icon: Layers, label: "Subscriptions" },
  { to: "/profile", icon: User, label: "Profile" }
];
function Layout({ children, showNav = true }) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[430px] min-h-screen flex flex-col relative bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "main",
      {
        className: `flex-1 overflow-y-auto ${showNav ? "pb-24" : "pb-0"}`,
        children
      }
    ),
    showNav && /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-t border-border shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-around px-2 py-2", children: NAV_ITEMS.map(({ to, icon: Icon2, label, isCenter }) => {
      const isActive = currentPath === to || currentPath.startsWith(`${to}/`);
      if (isCenter) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to,
            "data-ocid": "nav.add_button",
            className: "flex flex-col items-center -mt-5 flex-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-14 h-14 rounded-full flex items-center justify-center shadow-elevated transition-smooth ${isActive ? "bg-primary/90 scale-95" : "bg-primary hover:bg-primary/90"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { className: "w-6 h-6 text-primary-foreground" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] mt-1 text-muted-foreground", children: label })
            ]
          },
          to
        );
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to,
          "data-ocid": `nav.${label.toLowerCase()}_link`,
          className: "flex flex-col items-center gap-1 flex-1 py-1 transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Icon2,
              {
                className: `w-5 h-5 transition-smooth ${isActive ? "text-primary" : "text-muted-foreground"}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-[10px] font-medium transition-smooth ${isActive ? "text-primary" : "text-muted-foreground"}`,
                children: label
              }
            )
          ]
        },
        to
      );
    }) }) }) })
  ] }) });
}
function formatPaise(paise) {
  const rupees = Number(paise) / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: rupees % 1 === 0 ? 0 : 2
  }).format(rupees);
}
function paiseToRupees(paise) {
  return Number(paise) / 100;
}
function rupeesToPaise(rupees) {
  return BigInt(Math.round(rupees * 100));
}
export {
  Layout as L,
  Plus as P,
  User as U,
  createLucideIcon as c,
  formatPaise as f,
  paiseToRupees as p,
  rupeesToPaise as r
};
