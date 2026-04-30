import { Toaster } from "@/components/ui/sonner";
import { useOnboardingComplete } from "@/hooks/useSubscriptions";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy load pages
const OnboardingPage = lazy(() => import("@/pages/Onboarding"));
const HomePage = lazy(() => import("@/pages/Home"));
const InsightsPage = lazy(() => import("@/pages/Insights"));
const AddSubscriptionPage = lazy(() => import("@/pages/AddSubscription"));
const SubscriptionDetailPage = lazy(() => import("@/pages/SubscriptionDetail"));
const SubscriptionsPage = lazy(() => import("@/pages/Subscriptions"));
const ProfilePage = lazy(() => import("@/pages/Profile"));

// ─── Index redirect with onboarding check ────────────────────────────────────
function IndexRedirect() {
  const { data: onboardingComplete, isLoading } = useOnboardingComplete();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return <Navigate to={onboardingComplete ? "/home" : "/onboarding"} />;
}

// ─── Routes ──────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
      <Toaster position="top-center" richColors />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexRedirect,
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: OnboardingPage,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: HomePage,
});

const insightsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/insights",
  component: InsightsPage,
});

const addSubscriptionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/add-subscription",
  component: AddSubscriptionPage,
});

const subscriptionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/subscriptions",
  component: SubscriptionsPage,
});

const subscriptionDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/subscription/$id",
  component: SubscriptionDetailPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

// ─── Router ───────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  indexRoute,
  onboardingRoute,
  homeRoute,
  insightsRoute,
  addSubscriptionRoute,
  subscriptionsRoute,
  subscriptionDetailRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
