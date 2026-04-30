import Char  "mo:core/Char";
import List  "mo:core/List";
import Map   "mo:core/Map";
import Nat32 "mo:core/Nat32";
import Time  "mo:core/Time";
import Types "../types/subscriptions";

module {
  public type SubscriptionInternal   = Types.SubscriptionInternal;
  public type Subscription           = Types.Subscription;
  public type SubscriptionInput      = Types.SubscriptionInput;
  public type CategoryBreakdown      = Types.CategoryBreakdown;
  public type OptimizationSuggestion = Types.OptimizationSuggestion;

  /// Convert internal mutable record to shared immutable record
  public func toPublic(s : SubscriptionInternal) : Subscription {
    {
      id              = s.id;
      name            = s.name;
      category        = s.category;
      price           = s.price;
      billingCycle    = s.billingCycle;
      nextPaymentDate = s.nextPaymentDate;
      logoEmoji       = s.logoEmoji;
      notes           = s.notes;
      isActive        = s.isActive;
      createdAt       = s.createdAt;
    }
  };

  /// Create a new SubscriptionInternal from input, assigning id and createdAt
  public func create(id : Nat, input : SubscriptionInput) : SubscriptionInternal {
    {
      id;
      var name            = input.name;
      var category        = input.category;
      var price           = input.price;
      var billingCycle    = input.billingCycle;
      var nextPaymentDate = input.nextPaymentDate;
      var logoEmoji       = input.logoEmoji;
      var notes           = input.notes;
      var isActive        = true;
      createdAt           = Time.now();
    }
  };

  /// Apply update fields from input onto an existing internal record (mutates in place)
  public func applyUpdate(self : SubscriptionInternal, input : SubscriptionInput) {
    self.name            := input.name;
    self.category        := input.category;
    self.price           := input.price;
    self.billingCycle    := input.billingCycle;
    self.nextPaymentDate := input.nextPaymentDate;
    self.logoEmoji       := input.logoEmoji;
    self.notes           := input.notes;
  };

  /// Soft-delete: set isActive = false
  public func cancel(self : SubscriptionInternal) {
    self.isActive := false;
  };

  /// Return all active subscriptions as shared array
  public func listActive(subs : List.List<SubscriptionInternal>) : [Subscription] {
    subs.filter(func(s) { s.isActive })
        .map<SubscriptionInternal, Subscription>(func(s) { toPublic(s) })
        .toArray()
  };

  /// Find a subscription by id (active or inactive)
  public func findById(subs : List.List<SubscriptionInternal>, id : Nat) : ?SubscriptionInternal {
    subs.find(func(s) { s.id == id })
  };

  /// Normalize a subscription price to monthly paise
  /// Monthly → price; Quarterly → price/3; Annual → price/12
  public func toMonthlyPaise(s : SubscriptionInternal) : Nat {
    switch (s.billingCycle) {
      case (#Monthly)   { s.price };
      case (#Quarterly) { s.price / 3 };
      case (#Annual)    { s.price / 12 };
    }
  };

  /// Sum of monthly-normalized prices for all active subscriptions
  public func totalMonthlySpend(subs : List.List<SubscriptionInternal>) : Nat {
    subs.foldLeft<Nat, SubscriptionInternal>(
      0,
      func(acc, s) {
        if (s.isActive) { acc + toMonthlyPaise(s) } else { acc }
      }
    )
  };

  // ── ISO date helpers ─────────────────────────────────────────────────────

  /// Parse digits from a Text into a Nat; returns 0 on failure
  func parseNat(t : Text) : Nat {
    var result : Nat = 0;
    for (c in t.toIter()) {
      let code = c.toNat32();
      if (code >= 48 and code <= 57) {
        result := result * 10 + (code.toNat() - 48);
      };
    };
    result
  };

  /// Parse "YYYY-MM-DD" into a compact sortable Nat: YYYYMMDD
  func isoToInt(date : Text) : Nat {
    let parts = date.split(#char '-').toArray();
    if (parts.size() != 3) return 0;
    let y = parseNat(parts[0]);
    let m = parseNat(parts[1]);
    let d = parseNat(parts[2]);
    y * 10000 + m * 100 + d
  };

  /// Compute the upper-bound compact Nat for today + 7 days.
  /// We reconstruct parts and add 7 to the day, then re-pack.
  /// Over-counts slightly around month-end but never under-counts.
  func isoPlus7(isoToday : Text) : Nat {
    let parts = isoToday.split(#char '-').toArray();
    if (parts.size() != 3) return 0;
    let y = parseNat(parts[0]);
    let m = parseNat(parts[1]);
    let d = parseNat(parts[2]) + 7;
    y * 10000 + m * 100 + d
  };

  /// Active subscriptions whose nextPaymentDate falls within the next 7 calendar days
  public func upcomingRenewals(subs : List.List<SubscriptionInternal>, isoToday : Text) : [Subscription] {
    let todayInt = isoToInt(isoToday);
    let ceilInt  = isoPlus7(isoToday);
    subs.filter(func(s) {
      if (not s.isActive) return false;
      let d = isoToInt(s.nextPaymentDate);
      d >= todayInt and d <= ceilInt
    })
    .map<SubscriptionInternal, Subscription>(func(s) { toPublic(s) })
    .toArray()
  };

  // ── Category aggregation ─────────────────────────────────────────────────

  /// Convert a Category variant to a stable Text key
  func categoryKey(c : Types.Category) : Text {
    switch (c) {
      case (#Entertainment) "Entertainment";
      case (#Productivity)  "Productivity";
      case (#Health)        "Health";
      case (#Finance)       "Finance";
      case (#Other)         "Other";
    }
  };

  /// Parse category key back to a Category variant
  func keyToCategory(k : Text) : Types.Category {
    switch (k) {
      case "Entertainment" #Entertainment;
      case "Productivity"  #Productivity;
      case "Health"        #Health;
      case "Finance"       #Finance;
      case _               #Other;
    }
  };

  /// Aggregate monthly spend per category for active subscriptions
  public func categoryBreakdown(subs : List.List<SubscriptionInternal>) : [CategoryBreakdown] {
    let categoryMap = Map.empty<Text, Nat>();
    subs.forEach(func(s) {
      if (s.isActive) {
        let key     = categoryKey(s.category);
        let monthly = toMonthlyPaise(s);
        let prev    = switch (categoryMap.get(key)) {
          case (?v) v;
          case null 0;
        };
        categoryMap.add(key, prev + monthly);
      }
    });
    categoryMap.entries()
      .map<(Text, Nat), CategoryBreakdown>(func((key, total)) {
        { category = keyToCategory(key); totalMonthlyPaise = total }
      })
      .toArray()
  };

  // ── Optimization suggestions ─────────────────────────────────────────────

  /// Return optimization suggestions:
  /// candidates are active Entertainment subs with no notes
  /// reason: "Consider cancelling this subscription"
  public func optimizationSuggestions(subs : List.List<SubscriptionInternal>) : [OptimizationSuggestion] {
    subs.filter(func(s) {
      s.isActive and s.category == #Entertainment and s.notes == null
    })
    .map<SubscriptionInternal, OptimizationSuggestion>(func(s) {
      {
        subscription    = toPublic(s);
        reason          = "Consider cancelling this subscription";
        potentialSaving = toMonthlyPaise(s);
      }
    })
    .toArray()
  };
};
