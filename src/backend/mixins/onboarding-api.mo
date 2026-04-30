import Map      "mo:core/Map";
import OLib     "../lib/onboarding";
import OTypes   "../types/onboarding";

mixin (
  onboardingStore : Map.Map<Text, OTypes.OnboardingState>
) {
  public shared ({ caller }) func setOnboardingComplete() : async () {
    OLib.setComplete(onboardingStore, caller.toText());
  };

  public shared query ({ caller }) func getOnboardingComplete() : async Bool {
    OLib.isComplete(onboardingStore, caller.toText());
  };
};
