import { Layout } from "@/components/Layout";
import { billingCycleLabel } from "@/components/SubscriptionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCancelSubscription,
  useSubscriptionById,
  useUpdateSubscription,
} from "@/hooks/useSubscriptions";
import { formatPaise, paiseToRupees, rupeesToPaise } from "@/lib/currency";
import { daysUntil, formatDisplayDate } from "@/lib/dates";
import { CATEGORY_COLORS, POPULAR_SUBSCRIPTIONS } from "@/types/index";
import type { BillingCycle, Category, SubscriptionInput } from "@/types/index";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Edit2,
  RefreshCw,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Constants ────────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  "Entertainment",
  "Productivity",
  "Health",
  "Education",
  "Finance",
  "Gaming",
  "News",
  "Shopping",
  "Other",
];

const BILLING_CYCLES: { value: BillingCycle; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "weekly", label: "Weekly" },
];

// ─── Renewal badge helper ─────────────────────────────────────────────────────
function RenewalBadge({ days }: { days: number }) {
  if (days < 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
        <Clock className="w-3 h-3" />
        Overdue
      </span>
    );
  }
  if (days <= 2) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-alert-subtle text-alert">
        <Clock className="w-3 h-3" />
        {days === 0 ? "Today!" : days === 1 ? "Tomorrow" : `In ${days} days`}
      </span>
    );
  }
  if (days <= 5) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700">
        <Clock className="w-3 h-3" />
        In {days} days
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-savings-subtle text-savings">
      <Clock className="w-3 h-3" />
      In {days} days
    </span>
  );
}

// ─── Edit Form ────────────────────────────────────────────────────────────────
interface EditFormProps {
  initialEmoji: string;
  initialName: string;
  initialAmount: number;
  initialBilling: BillingCycle;
  initialCategory: Category;
  initialRenewal: string;
  initialNotes: string;
  isPending: boolean;
  onSave: (input: SubscriptionInput) => void;
  onCancel: () => void;
}

function EditForm({
  initialEmoji,
  initialName,
  initialAmount,
  initialBilling,
  initialCategory,
  initialRenewal,
  initialNotes,
  isPending,
  onSave,
  onCancel,
}: EditFormProps) {
  const [emoji, setEmoji] = useState(initialEmoji);
  const [name, setName] = useState(initialName);
  const [amount, setAmount] = useState(initialAmount.toString());
  const [billing, setBilling] = useState<BillingCycle>(initialBilling);
  const [category, setCategory] = useState<Category>(initialCategory);
  const [renewalDate, setRenewalDate] = useState(initialRenewal);
  const [notes, setNotes] = useState(initialNotes);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !amount) {
      toast.error("Please fill in all required fields");
      return;
    }
    onSave({
      name: name.trim(),
      amountPaise: rupeesToPaise(Number.parseFloat(amount)),
      billingCycle: billing,
      category,
      nextRenewalDate: renewalDate,
      logoEmoji: emoji,
      notes: notes.trim() || undefined,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
      data-ocid="detail.edit_form"
    >
      {/* Popular quick-fill */}
      <div>
        <p className="text-xs text-muted-foreground font-medium mb-2">
          Quick fill
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {POPULAR_SUBSCRIPTIONS.slice(0, 6).map((pop, i) => (
            <button
              key={pop.name}
              type="button"
              data-ocid={`detail.edit_popular.${i + 1}`}
              onClick={() => {
                setEmoji(pop.logoEmoji);
                setName(pop.name);
                setCategory(pop.category);
                setAmount((pop.monthlyPaise / 100).toString());
              }}
              className={`flex flex-col items-center gap-1 p-2.5 rounded-[12px] bg-background border transition-smooth flex-shrink-0 ${
                name === pop.name
                  ? "border-primary shadow-subtle"
                  : "border-border/50 hover:border-primary/40"
              }`}
            >
              <span className="text-xl">{pop.logoEmoji}</span>
              <span className="text-[9px] font-medium text-foreground w-12 text-center truncate">
                {pop.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Name + emoji */}
      <div>
        <Label className="font-medium text-sm text-foreground mb-1.5 block">
          Service Name *
        </Label>
        <div className="flex gap-2">
          <Input
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            className="w-14 text-center text-xl"
            maxLength={2}
            aria-label="Emoji"
            data-ocid="detail.edit_emoji_input"
          />
          <Input
            placeholder="e.g. Netflix"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1"
            required
            data-ocid="detail.edit_name_input"
          />
        </div>
      </div>

      {/* Amount */}
      <div>
        <Label className="font-medium text-sm text-foreground mb-1.5 block">
          Amount (₹) *
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">
            ₹
          </span>
          <Input
            type="number"
            placeholder="499"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-7"
            required
            min="0"
            data-ocid="detail.edit_amount_input"
          />
        </div>
      </div>

      {/* Billing cycle */}
      <div>
        <Label className="font-medium text-sm text-foreground mb-2 block">
          Billing Cycle
        </Label>
        <div className="flex gap-2 flex-wrap">
          {BILLING_CYCLES.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setBilling(value)}
              data-ocid={`detail.edit_billing.${value}`}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-smooth ${
                billing === value
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <Label className="font-medium text-sm text-foreground mb-2 block">
          Category
        </Label>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              data-ocid={`detail.edit_category.${cat.toLowerCase()}`}
              className={`transition-smooth ${
                category === cat
                  ? "ring-2 ring-primary ring-offset-1"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Badge
                variant="secondary"
                className={`text-[11px] px-2.5 py-1 rounded-full font-medium cursor-pointer ${CATEGORY_COLORS[cat]} border-0`}
              >
                {cat}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Renewal date */}
      <div>
        <Label className="font-medium text-sm text-foreground mb-1.5 block">
          Next Renewal Date
        </Label>
        <Input
          type="date"
          value={renewalDate}
          onChange={(e) => setRenewalDate(e.target.value)}
          data-ocid="detail.edit_renewal_input"
        />
      </div>

      {/* Notes */}
      <div>
        <Label className="font-medium text-sm text-foreground mb-1.5 block">
          Notes (optional)
        </Label>
        <Input
          placeholder="e.g. Family plan, shared with 3 people"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          data-ocid="detail.edit_notes_input"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 h-11 rounded-[12px]"
          data-ocid="detail.edit_cancel_button"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="flex-1 h-11 rounded-[12px] gradient-primary text-primary-foreground font-semibold"
          data-ocid="detail.edit_save_button"
        >
          {isPending ? (
            "Saving..."
          ) : (
            <>
              <Check className="w-4 h-4 mr-1.5" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SubscriptionDetailPage() {
  const { id } = useParams({ from: "/subscription/$id" });
  const navigate = useNavigate();
  const { data: sub, isLoading } = useSubscriptionById(id);
  const { mutate: cancelSub, isPending: cancelling } = useCancelSubscription();
  const { mutate: updateSub, isPending: updating } = useUpdateSubscription();

  const [editMode, setEditMode] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const days = sub ? daysUntil(sub.nextRenewalDate) : 0;
  const isUrgent = days >= 0 && days <= 2;

  function handleSave(input: SubscriptionInput) {
    updateSub(
      { id, input },
      {
        onSuccess: () => {
          toast.success("Subscription updated!");
          setEditMode(false);
        },
        onError: () => toast.error("Failed to update. Please try again."),
      },
    );
  }

  function handleCancel() {
    if (!confirmCancel) {
      setConfirmCancel(true);
      return;
    }
    cancelSub(id, {
      onSuccess: () => {
        toast.success("Subscription cancelled");
        navigate({ to: "/home" });
      },
      onError: () => toast.error("Failed to cancel. Please try again."),
    });
  }

  return (
    <Layout>
      <div className="px-4 pt-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link to="/home" data-ocid="detail.back_button">
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-card border border-border shadow-subtle flex items-center justify-center transition-smooth hover:shadow-elevated"
                aria-label="Back to home"
              >
                <ArrowLeft className="w-4 h-4 text-foreground" />
              </button>
            </Link>
            <h1 className="font-display font-bold text-lg text-foreground">
              {editMode ? "Edit Subscription" : "Details"}
            </h1>
          </div>
          {sub && !editMode && (
            <button
              type="button"
              onClick={() => {
                setEditMode(true);
                setConfirmCancel(false);
              }}
              className="w-9 h-9 rounded-full bg-card border border-border shadow-subtle flex items-center justify-center transition-smooth hover:border-primary/40 hover:shadow-elevated"
              aria-label="Edit subscription"
              data-ocid="detail.edit_button"
            >
              <Edit2 className="w-4 h-4 text-foreground" />
            </button>
          )}
          {editMode && (
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="w-9 h-9 rounded-full bg-card border border-border shadow-subtle flex items-center justify-center transition-smooth hover:border-destructive/40"
              aria-label="Close edit mode"
              data-ocid="detail.close_button"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="flex flex-col gap-4" data-ocid="detail.loading_state">
            <Skeleton className="h-32 rounded-[14px]" />
            <Skeleton className="h-24 rounded-[14px]" />
            <Skeleton className="h-16 rounded-[14px]" />
          </div>

          /* Not found state */
        ) : !sub ? (
          <div className="text-center py-16" data-ocid="detail.error_state">
            <p className="text-5xl mb-3">🔍</p>
            <p className="font-display font-semibold text-foreground mb-1">
              Subscription not found
            </p>
            <p className="text-sm text-muted-foreground mb-5">
              It may have been removed or never existed.
            </p>
            <Link to="/home">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                data-ocid="detail.go_home_button"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                Go Home
              </Button>
            </Link>
          </div>

          /* Edit mode */
        ) : editMode ? (
          <div className="bg-card rounded-[16px] p-5 shadow-elevated border border-border/50">
            <EditForm
              initialEmoji={sub.logoEmoji ?? "📱"}
              initialName={sub.name}
              initialAmount={paiseToRupees(sub.amountPaise)}
              initialBilling={sub.billingCycle}
              initialCategory={sub.category}
              initialRenewal={sub.nextRenewalDate}
              initialNotes={sub.notes ?? ""}
              isPending={updating}
              onSave={handleSave}
              onCancel={() => setEditMode(false)}
            />
          </div>

          /* Detail view */
        ) : (
          <>
            {/* Hero card */}
            <div
              className="bg-card rounded-[16px] p-5 shadow-elevated border border-border/50 mb-4"
              data-ocid="detail.card"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-[14px] bg-muted flex items-center justify-center text-3xl shadow-subtle flex-shrink-0">
                  {sub.logoEmoji ?? "📱"}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display font-bold text-xl text-foreground truncate">
                    {sub.name}
                  </h2>
                  <div className="flex items-center gap-2 flex-wrap mt-1.5">
                    <Badge
                      variant="secondary"
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[sub.category]} border-0`}
                    >
                      {sub.category}
                    </Badge>
                    <RenewalBadge days={days} />
                  </div>
                </div>
              </div>

              {/* Price row */}
              <div className="mt-5 pt-4 border-t border-border/50 flex items-end justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">
                    Amount
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-bold text-3xl text-foreground">
                      {formatPaise(sub.amountPaise)}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {billingCycleLabel(sub.billingCycle)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">
                    Status
                  </p>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      sub.isActive
                        ? "bg-savings-subtle text-savings"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {sub.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-card rounded-[14px] p-4 shadow-subtle border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground font-medium">
                    Next Renewal
                  </span>
                </div>
                <p
                  className={`font-display font-semibold text-sm leading-tight ${
                    isUrgent ? "text-alert" : "text-foreground"
                  }`}
                >
                  {formatDisplayDate(sub.nextRenewalDate)}
                </p>
                <p
                  className={`text-xs mt-1 font-medium ${
                    isUrgent ? "text-alert" : "text-muted-foreground"
                  }`}
                >
                  {days < 0
                    ? "Past due"
                    : days === 0
                      ? "Today!"
                      : days === 1
                        ? "Tomorrow"
                        : `In ${days} days`}
                </p>
              </div>

              <div className="bg-card rounded-[14px] p-4 shadow-subtle border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCw className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground font-medium">
                    Billing
                  </span>
                </div>
                <p className="font-display font-semibold text-sm capitalize text-foreground">
                  {sub.billingCycle}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {billingCycleLabel(sub.billingCycle)}
                </p>
              </div>
            </div>

            {/* Notes */}
            {sub.notes && (
              <div className="bg-card rounded-[14px] p-4 shadow-subtle border border-border/50 mb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground font-medium">
                    Notes
                  </span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {sub.notes}
                </p>
              </div>
            )}

            {/* Cancel flow */}
            <div className="flex flex-col gap-3 mt-6">
              {!confirmCancel ? (
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="w-full h-11 rounded-[12px] text-destructive border-destructive/30 hover:bg-destructive/5 hover:border-destructive/50 font-medium transition-smooth"
                  data-ocid="detail.delete_button"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Cancel Subscription
                </Button>
              ) : (
                <div
                  className="bg-alert-subtle rounded-[14px] p-4 border border-destructive/20"
                  data-ocid="detail.confirm_dialog"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl flex-shrink-0">⚠️</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground leading-snug">
                        Cancel{" "}
                        <span className="text-destructive">{sub.name}</span>?
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        You'll stop being charged {formatPaise(sub.amountPaise)}
                        {billingCycleLabel(sub.billingCycle)}.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setConfirmCancel(false)}
                      className="flex-1 rounded-[10px]"
                      data-ocid="detail.cancel_button"
                    >
                      Keep it
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleCancel}
                      disabled={cancelling}
                      className="flex-1 rounded-[10px] bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      data-ocid="detail.confirm_button"
                    >
                      {cancelling ? "Cancelling…" : "Yes, cancel"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
