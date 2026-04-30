module {
  /// Unique identifier for a subscription (auto-incremented Nat)
  public type SubscriptionId = Nat;

  /// Timestamp in nanoseconds (from Time.now())
  public type Timestamp = Int;

  /// Amount in paise (1 INR = 100 paise)
  public type Paise = Nat;
};
