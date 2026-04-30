import List   "mo:core/List";
import SubLib "../lib/subscriptions";
import Types  "../types/subscriptions";

mixin (
  subs    : List.List<Types.SubscriptionInternal>,
  nextId  : { var value : Nat }
) {
  // ── CRUD ──────────────────────────────────────────────────────────────────

  public func addSubscription(input : Types.SubscriptionInput) : async Types.SubscriptionId {
    let id = nextId.value;
    nextId.value += 1;
    let sub = SubLib.create(id, input);
    subs.add(sub);
    id
  };

  public func updateSubscription(id : Types.SubscriptionId, input : Types.SubscriptionInput) : async Bool {
    switch (SubLib.findById(subs, id)) {
      case (?sub) {
        sub.applyUpdate(input);
        true
      };
      case null { false };
    }
  };

  public func cancelSubscription(id : Types.SubscriptionId) : async Bool {
    switch (SubLib.findById(subs, id)) {
      case (?sub) {
        sub.cancel();
        true
      };
      case null { false };
    }
  };

  public query func getSubscriptions() : async [Types.Subscription] {
    SubLib.listActive(subs)
  };

  public query func getSubscriptionById(id : Types.SubscriptionId) : async ?Types.Subscription {
    switch (SubLib.findById(subs, id)) {
      case (?sub) { ?SubLib.toPublic(sub) };
      case null   { null };
    }
  };

  // ── Aggregates ────────────────────────────────────────────────────────────

  public query func getTotalMonthlySpend() : async Nat {
    SubLib.totalMonthlySpend(subs)
  };

  /// isoToday: caller-supplied "YYYY-MM-DD" string representing today's date
  public query func getUpcomingRenewals(isoToday : Text) : async [Types.Subscription] {
    SubLib.upcomingRenewals(subs, isoToday)
  };

  public query func getCategoryBreakdown() : async [Types.CategoryBreakdown] {
    SubLib.categoryBreakdown(subs)
  };

  // ── Optimization ──────────────────────────────────────────────────────────

  public query func getOptimizationSuggestions() : async [Types.OptimizationSuggestion] {
    SubLib.optimizationSuggestions(subs)
  };
};
