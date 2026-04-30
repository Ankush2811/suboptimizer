import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart3, Home, Layers, Plus, User } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

const NAV_ITEMS = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/insights", icon: BarChart3, label: "Insights" },
  { to: "/add-subscription", icon: Plus, label: "Add", isCenter: true },
  { to: "/subscriptions", icon: Layers, label: "Subscriptions" },
  { to: "/profile", icon: User, label: "Profile" },
];

export function Layout({ children, showNav = true }: LayoutProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      {/* Mobile frame */}
      <div className="w-full max-w-[430px] min-h-screen flex flex-col relative bg-background">
        <main
          className={`flex-1 overflow-y-auto ${showNav ? "pb-24" : "pb-0"}`}
        >
          {children}
        </main>

        {showNav && (
          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50">
            <div className="bg-card border-t border-border shadow-elevated">
              <div className="flex items-end justify-around px-2 py-2">
                {NAV_ITEMS.map(({ to, icon: Icon, label, isCenter }) => {
                  const isActive =
                    currentPath === to || currentPath.startsWith(`${to}/`);
                  if (isCenter) {
                    return (
                      <Link
                        key={to}
                        to={to}
                        data-ocid="nav.add_button"
                        className="flex flex-col items-center -mt-5 flex-1"
                      >
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-elevated transition-smooth ${
                            isActive
                              ? "bg-primary/90 scale-95"
                              : "bg-primary hover:bg-primary/90"
                          }`}
                        >
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <span className="text-[10px] mt-1 text-muted-foreground">
                          {label}
                        </span>
                      </Link>
                    );
                  }
                  return (
                    <Link
                      key={to}
                      to={to}
                      data-ocid={`nav.${label.toLowerCase()}_link`}
                      className="flex flex-col items-center gap-1 flex-1 py-1 transition-smooth"
                    >
                      <Icon
                        className={`w-5 h-5 transition-smooth ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span
                        className={`text-[10px] font-medium transition-smooth ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
