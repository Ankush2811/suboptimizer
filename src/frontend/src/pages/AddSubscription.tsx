import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAddSubscription } from "@/hooks/useSubscriptions";
import { formatPaise } from "@/lib/currency";
import { todayISO } from "@/lib/dates";
import type { BillingCycle, Category, SubscriptionInput } from "@/types/index";
import { CATEGORY_COLORS, POPULAR_SUBSCRIPTIONS } from "@/types/index";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORIES: Category[] = [
  "Entertainment",
  "Productivity",
  "Health",
  "Finance",
  "Education",
  "Gaming",
  "News",
  "Shopping",
  "Other",
];

const BILLING_CYCLES: { value: BillingCycle; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Annual" },
  { value: "weekly", label: "Weekly" },
];

// Featured popular subscriptions for the quick-add grid
const FEATURED_NAMES = [
  "Netflix",
  "Amazon Prime",
  "Hotstar",
  "Spotify",
  "Adobe Creative Cloud",
  "Gym Membership",
];
const FEATURED = POPULAR_SUBSCRIPTIONS.filter((s) =>
  FEATURED_NAMES.includes(s.name),
);

interface FormState {
  name: string;
  emoji: string;
  category: Category | "";
  priceRupees: string;
  billingCycle: BillingCycle | "";
  nextPaymentDate: string;
  notes: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  emoji: "📋",
  category: "",
  priceRupees: "",
  billingCycle: "monthly",
  nextPaymentDate: todayISO(),
  notes: "",
};

interface FormErrors {
  name?: string;
  price?: string;
}

export default function AddSubscriptionPage() {
  const navigate = useNavigate();
  const { mutate: addSub, isPending } = useAddSubscription();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedPopular, setSelectedPopular] = useState<string | null>(null);

  function prefillFromPopular(name: string) {
    const sub = POPULAR_SUBSCRIPTIONS.find((s) => s.name === name);
    if (!sub) return;
    setSelectedPopular(name);
    setForm({
      name: sub.name,
      emoji: sub.logoEmoji,
      category: sub.category,
      priceRupees: sub.monthlyPaise > 0 ? String(sub.monthlyPaise / 100) : "",
      billingCycle: "monthly",
      nextPaymentDate: todayISO(),
      notes: "",
    });
    setErrors({});
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Subscription name is required";
    const price = Number.parseFloat(form.priceRupees);
    if (!form.priceRupees || Number.isNaN(price) || price < 0)
      next.price = "Enter a valid price in ₹";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const input: SubscriptionInput = {
      name: form.name.trim(),
      category: (form.category as Category) || "Other",
      amountPaise: BigInt(
        Math.round(Number.parseFloat(form.priceRupees) * 100),
      ),
      billingCycle: (form.billingCycle as BillingCycle) || "monthly",
      nextRenewalDate: form.nextPaymentDate || todayISO(),
      logoEmoji: form.emoji || "📋",
      notes: form.notes.trim() || undefined,
    };

    addSub(input, {
      onSuccess: () => {
        toast.success(`${input.name} added successfully!`);
        navigate({ to: "/home" });
      },
      onError: () =>
        toast.error("Failed to add subscription. Please try again."),
    });
  }

  return (
    <Layout>
      <div className="px-4 pt-4 pb-10">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            data-ocid="add.back_button"
            onClick={() => navigate({ to: "/home" })}
            className="w-9 h-9 rounded-full bg-card border border-border shadow-subtle flex items-center justify-center transition-smooth hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="font-display font-bold text-lg text-foreground">
            Add Subscription
          </h1>
        </div>

        {/* Popular Subscriptions Grid */}
        <section className="mb-6" data-ocid="add.popular_section">
          <h2 className="font-display font-semibold text-sm text-foreground mb-3">
            Popular Services
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {FEATURED.map((sub, i) => {
              const isSelected = selectedPopular === sub.name;
              return (
                <button
                  key={sub.name}
                  type="button"
                  onClick={() => prefillFromPopular(sub.name)}
                  data-ocid={`add.popular.item.${i + 1}`}
                  className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl border transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-elevated"
                      : "border-border bg-card shadow-subtle hover:border-primary/40 hover:bg-secondary/60"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-primary-foreground" />
                    </span>
                  )}
                  <span
                    className="text-2xl leading-none"
                    role="img"
                    aria-label={sub.name}
                  >
                    {sub.logoEmoji}
                  </span>
                  <span className="font-body font-medium text-xs text-foreground text-center leading-tight line-clamp-2 w-full">
                    {sub.name}
                  </span>
                  {sub.monthlyPaise > 0 && (
                    <span className="font-body text-[10px] text-muted-foreground">
                      {formatPaise(sub.monthlyPaise)}/mo
                    </span>
                  )}
                  <Badge
                    variant="secondary"
                    className={`text-[10px] px-1.5 py-0 font-body border-0 ${CATEGORY_COLORS[sub.category]}`}
                  >
                    {sub.category}
                  </Badge>
                </button>
              );
            })}
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="font-body text-xs text-muted-foreground">
            or add manually
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Manual Entry Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          data-ocid="add.form"
          noValidate
        >
          {/* Name + Emoji */}
          <div>
            <Label
              htmlFor="sub-name"
              className="font-medium text-sm text-foreground mb-1.5 block"
            >
              Service Name <span className="text-destructive">*</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="sub-emoji"
                value={form.emoji}
                onChange={(e) =>
                  setForm((f) => ({ ...f, emoji: e.target.value }))
                }
                className="w-14 text-center text-xl rounded-xl"
                maxLength={2}
                aria-label="Emoji icon"
                data-ocid="add.emoji_input"
              />
              <Input
                id="sub-name"
                placeholder="e.g. Netflix, Gym…"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className={`flex-1 rounded-xl ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                data-ocid="add.name_input"
              />
            </div>
            {errors.name && (
              <p
                data-ocid="add.name_field_error"
                className="text-destructive text-xs mt-1"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <Label
              htmlFor="sub-category"
              className="font-medium text-sm text-foreground mb-1.5 block"
            >
              Category
            </Label>
            <Select
              value={form.category}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, category: v as Category }))
              }
            >
              <SelectTrigger
                id="sub-category"
                data-ocid="add.category_select"
                className="rounded-xl"
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div>
            <Label
              htmlFor="sub-amount"
              className="font-medium text-sm text-foreground mb-1.5 block"
            >
              Price (₹) <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium pointer-events-none">
                ₹
              </span>
              <Input
                id="sub-amount"
                type="number"
                placeholder="499"
                value={form.priceRupees}
                onChange={(e) =>
                  setForm((f) => ({ ...f, priceRupees: e.target.value }))
                }
                className={`pl-7 rounded-xl ${errors.price ? "border-destructive focus-visible:ring-destructive" : ""}`}
                min="0"
                step="0.01"
                data-ocid="add.amount_input"
              />
            </div>
            {errors.price && (
              <p
                data-ocid="add.price_field_error"
                className="text-destructive text-xs mt-1"
              >
                {errors.price}
              </p>
            )}
          </div>

          {/* Billing Cycle */}
          <div>
            <Label
              htmlFor="sub-cycle"
              className="font-medium text-sm text-foreground mb-1.5 block"
            >
              Billing Cycle
            </Label>
            <Select
              value={form.billingCycle}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, billingCycle: v as BillingCycle }))
              }
            >
              <SelectTrigger
                id="sub-cycle"
                data-ocid="add.billing_cycle_select"
                className="rounded-xl"
              >
                <SelectValue placeholder="Select billing cycle" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {BILLING_CYCLES.map((cycle) => (
                  <SelectItem key={cycle.value} value={cycle.value}>
                    {cycle.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Next Renewal Date */}
          <div>
            <Label
              htmlFor="sub-renewal"
              className="font-medium text-sm text-foreground mb-1.5 block"
            >
              Next Payment Date
            </Label>
            <Input
              id="sub-renewal"
              type="date"
              value={form.nextPaymentDate}
              onChange={(e) =>
                setForm((f) => ({ ...f, nextPaymentDate: e.target.value }))
              }
              className="rounded-xl"
              data-ocid="add.renewal_date_input"
            />
          </div>

          {/* Notes */}
          <div>
            <Label
              htmlFor="sub-notes"
              className="font-medium text-sm text-foreground mb-1.5 block"
            >
              Notes{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </Label>
            <Textarea
              id="sub-notes"
              placeholder="Any notes about this subscription…"
              value={form.notes}
              onChange={(e) =>
                setForm((f) => ({ ...f, notes: e.target.value }))
              }
              rows={3}
              className="rounded-xl resize-none"
              data-ocid="add.notes_textarea"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 rounded-[14px] font-display font-semibold text-base gradient-primary text-primary-foreground shadow-elevated mt-2"
            data-ocid="add.submit_button"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                Adding…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Subscription
              </span>
            )}
          </Button>
        </form>
      </div>
    </Layout>
  );
}
