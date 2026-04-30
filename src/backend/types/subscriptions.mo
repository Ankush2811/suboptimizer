import Common "common";

module {
  public type SubscriptionId = Common.SubscriptionId;
  public type Timestamp      = Common.Timestamp;
  public type Paise          = Common.Paise;

  public type Category = {
    #Entertainment;
    #Productivity;
    #Health;
    #Finance;
    #Other;
  };

  public type BillingCycle = {
    #Monthly;
    #Quarterly;
    #Annual;
  };

  /// Mutable internal representation stored in the canister
  public type SubscriptionInternal = {
    id              : SubscriptionId;
    var name        : Text;
    var category    : Category;
    var price       : Paise;          // in paise
    var billingCycle: BillingCycle;
    var nextPaymentDate : Text;       // ISO date string e.g. "2026-05-01"
    var logoEmoji   : ?Text;
    var notes       : ?Text;
    var isActive    : Bool;
    createdAt       : Timestamp;
  };

  /// Immutable shared type for API boundary
  public type Subscription = {
    id              : SubscriptionId;
    name            : Text;
    category        : Category;
    price           : Paise;
    billingCycle    : BillingCycle;
    nextPaymentDate : Text;
    logoEmoji       : ?Text;
    notes           : ?Text;
    isActive        : Bool;
    createdAt       : Timestamp;
  };

  /// Input type for creating / updating a subscription (no id, no createdAt)
  public type SubscriptionInput = {
    name            : Text;
    category        : Category;
    price           : Paise;
    billingCycle    : BillingCycle;
    nextPaymentDate : Text;
    logoEmoji       : ?Text;
    notes           : ?Text;
  };

  /// Per-category spend summary
  public type CategoryBreakdown = {
    category          : Category;
    totalMonthlyPaise : Paise;
  };

  /// Optimization suggestion for a single subscription
  public type OptimizationSuggestion = {
    subscription     : Subscription;
    reason           : Text;
    potentialSaving  : Paise;   // monthly paise saved if cancelled
  };
};
