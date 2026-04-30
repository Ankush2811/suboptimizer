import Map   "mo:core/Map";
import Types "../types/onboarding";

module {
  public type OnboardingState = Types.OnboardingState;

  /// Return whether onboarding is complete for a given principal key text
  public func isComplete(store : Map.Map<Text, OnboardingState>, key : Text) : Bool {
    switch (store.get(key)) {
      case (?state) { state.completed };
      case null     { false };
    }
  };

  /// Mark onboarding as complete for a given principal key text
  public func setComplete(store : Map.Map<Text, OnboardingState>, key : Text) {
    switch (store.get(key)) {
      case (?state) { state.completed := true };
      case null     {
        store.add(key, { var completed = true });
      };
    }
  };
};
