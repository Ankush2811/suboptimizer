import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SubscriptionInput {
    name: string;
    billingCycle: BillingCycle;
    notes?: string;
    category: Category;
    price: Paise;
    nextPaymentDate: string;
    logoEmoji?: string;
}
export type SubscriptionId = bigint;
export type Timestamp = bigint;
export interface Subscription {
    id: SubscriptionId;
    name: string;
    createdAt: Timestamp;
    isActive: boolean;
    billingCycle: BillingCycle;
    notes?: string;
    category: Category;
    price: Paise;
    nextPaymentDate: string;
    logoEmoji?: string;
}
export type Paise = bigint;
export interface CategoryBreakdown {
    category: Category;
    totalMonthlyPaise: Paise;
}
export interface OptimizationSuggestion {
    subscription: Subscription;
    potentialSaving: Paise;
    reason: string;
}
export enum BillingCycle {
    Quarterly = "Quarterly",
    Monthly = "Monthly",
    Annual = "Annual"
}
export enum Category {
    Productivity = "Productivity",
    Health = "Health",
    Entertainment = "Entertainment",
    Other = "Other",
    Finance = "Finance"
}
export interface backendInterface {
    addSubscription(input: SubscriptionInput): Promise<SubscriptionId>;
    cancelSubscription(id: SubscriptionId): Promise<boolean>;
    getCategoryBreakdown(): Promise<Array<CategoryBreakdown>>;
    getOnboardingComplete(): Promise<boolean>;
    getOptimizationSuggestions(): Promise<Array<OptimizationSuggestion>>;
    getSubscriptionById(id: SubscriptionId): Promise<Subscription | null>;
    getSubscriptions(): Promise<Array<Subscription>>;
    getTotalMonthlySpend(): Promise<bigint>;
    getUpcomingRenewals(isoToday: string): Promise<Array<Subscription>>;
    setOnboardingComplete(): Promise<void>;
    updateSubscription(id: SubscriptionId, input: SubscriptionInput): Promise<boolean>;
}
