import List            "mo:core/List";
import Map             "mo:core/Map";
import SubTypes        "types/subscriptions";
import OTypes          "types/onboarding";
import SubsApi         "mixins/subscriptions-api";
import OnboardingApi   "mixins/onboarding-api";

actor {
  // ── Subscription state ────────────────────────────────────────────────────
  let subscriptions = List.empty<SubTypes.SubscriptionInternal>();
  let nextId        = { var value : Nat = 0 };

  // ── Onboarding state ──────────────────────────────────────────────────────
  let onboardingStore = Map.empty<Text, OTypes.OnboardingState>();

  // ── Mixin composition ─────────────────────────────────────────────────────
  include SubsApi(subscriptions, nextId);
  include OnboardingApi(onboardingStore);
};
