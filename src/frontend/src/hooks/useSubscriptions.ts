import { createActor } from "@/backend";
import { todayISO } from "@/lib/dates";
import type {
  CategoryBreakdown,
  OptimizationSuggestion,
  Subscription,
  SubscriptionId,
  SubscriptionInput,
} from "@/types/index";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Typed actor interface ────────────────────────────────────────────────────
interface BackendActor {
  getSubscriptions(): Promise<Subscription[]>;
  getTotalMonthlySpend(): Promise<bigint>;
  getUpcomingRenewals(isoToday: string): Promise<Subscription[]>;
  getCategoryBreakdown(): Promise<CategoryBreakdown[]>;
  getOptimizationSuggestions(): Promise<OptimizationSuggestion[]>;
  getOnboardingComplete(): Promise<boolean>;
  setOnboardingComplete(): Promise<void>;
  addSubscription(input: SubscriptionInput): Promise<SubscriptionId>;
  updateSubscription(
    id: SubscriptionId,
    input: SubscriptionInput,
  ): Promise<boolean>;
  cancelSubscription(id: SubscriptionId): Promise<boolean>;
  getSubscriptionById(
    id: SubscriptionId,
  ): Promise<{ __kind__: "Some"; value: Subscription } | { __kind__: "None" }>;
}

function asBackend(actor: unknown): BackendActor {
  return actor as BackendActor;
}

// ─── Query Keys ──────────────────────────────────────────────────────────────
const KEYS = {
  subscriptions: ["subscriptions"] as const,
  totalSpend: ["totalMonthlySpend"] as const,
  upcomingRenewals: ["upcomingRenewals"] as const,
  categoryBreakdown: ["categoryBreakdown"] as const,
  suggestions: ["optimizationSuggestions"] as const,
  onboarding: ["onboardingComplete"] as const,
};

// ─── Hooks ────────────────────────────────────────────────────────────────────
export function useSubscriptions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Subscription[]>({
    queryKey: KEYS.subscriptions,
    queryFn: async () => {
      if (!actor) return [];
      return asBackend(actor).getSubscriptions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTotalMonthlySpend() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<bigint>({
    queryKey: KEYS.totalSpend,
    queryFn: async () => {
      if (!actor) return 0n;
      return asBackend(actor).getTotalMonthlySpend();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpcomingRenewals() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Subscription[]>({
    queryKey: KEYS.upcomingRenewals,
    queryFn: async () => {
      if (!actor) return [];
      return asBackend(actor).getUpcomingRenewals(todayISO());
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCategoryBreakdown() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<CategoryBreakdown[]>({
    queryKey: KEYS.categoryBreakdown,
    queryFn: async () => {
      if (!actor) return [];
      return asBackend(actor).getCategoryBreakdown();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useOptimizationSuggestions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<OptimizationSuggestion[]>({
    queryKey: KEYS.suggestions,
    queryFn: async () => {
      if (!actor) return [];
      return asBackend(actor).getOptimizationSuggestions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useOnboardingComplete() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: KEYS.onboarding,
    queryFn: async () => {
      if (!actor) return false;
      return asBackend(actor).getOnboardingComplete();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubscriptionById(id: SubscriptionId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Subscription | null>({
    queryKey: ["subscription", id],
    queryFn: async () => {
      if (!actor) return null;
      const result = await asBackend(actor).getSubscriptionById(id);
      if (result.__kind__ === "Some") return result.value;
      return null;
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────
export function useAddSubscription() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<SubscriptionId, Error, SubscriptionInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return asBackend(actor).addSubscription(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.subscriptions });
      qc.invalidateQueries({ queryKey: KEYS.totalSpend });
      qc.invalidateQueries({ queryKey: KEYS.upcomingRenewals });
      qc.invalidateQueries({ queryKey: KEYS.categoryBreakdown });
      qc.invalidateQueries({ queryKey: KEYS.suggestions });
    },
  });
}

export function useUpdateSubscription() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    boolean,
    Error,
    { id: SubscriptionId; input: SubscriptionInput }
  >({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not available");
      return asBackend(actor).updateSubscription(id, input);
    },
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: KEYS.subscriptions });
      qc.invalidateQueries({ queryKey: KEYS.totalSpend });
      qc.invalidateQueries({ queryKey: KEYS.upcomingRenewals });
      qc.invalidateQueries({ queryKey: ["subscription", id] });
    },
  });
}

export function useCancelSubscription() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, SubscriptionId>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return asBackend(actor).cancelSubscription(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.subscriptions });
      qc.invalidateQueries({ queryKey: KEYS.totalSpend });
      qc.invalidateQueries({ queryKey: KEYS.suggestions });
    },
  });
}

export function useSetOnboardingComplete() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, void>({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return asBackend(actor).setOnboardingComplete();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.onboarding });
    },
  });
}
