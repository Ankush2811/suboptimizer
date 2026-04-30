import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCategoryBreakdown,
  useOptimizationSuggestions,
  useTotalMonthlySpend,
} from "@/hooks/useSubscriptions";
import { formatPaise, paiseToRupees } from "@/lib/currency";
import type { Category } from "@/types/index";
import { Link } from "@tanstack/react-router";
import { Lightbulb, Sparkles, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Chart colours (design token values) ──────────────────────────────────────
const CHART_COLORS: Record<string, string> = {
  Entertainment: "oklch(0.50 0.22 280)",
  Productivity: "oklch(0.55 0.18 220)",
  Health: "oklch(0.68 0.18 155)",
  Education: "oklch(0.72 0.16 95)",
  Finance: "oklch(0.65 0.18 170)",
  Gaming: "oklch(0.60 0.20 320)",
  News: "oklch(0.66 0.22 50)",
  Shopping: "oklch(0.65 0.15 200)",
  Other: "oklch(0.60 0.05 260)",
};

const FALLBACK_COLOR = "oklch(0.50 0.10 260)";

// ─── Sample data fallbacks ─────────────────────────────────────────────────────
const SAMPLE_BREAKDOWN = [
  { category: "Entertainment" as Category, totalPaise: 175700n, count: 4n },
  { category: "Productivity" as Category, totalPaise: 43000n, count: 2n },
  { category: "Health" as Category, totalPaise: 24900n, count: 1n },
  { category: "Education" as Category, totalPaise: 9900n, count: 1n },
];

const SAMPLE_SUGGESTIONS = [
  {
    subscriptionId: "2",
    subscriptionName: "Spotify",
    logoEmoji: "🎵",
    suggestionType: "cancel" as const,
    savingsPaise: 11900n,
    reason:
      "You have Amazon Prime which includes Amazon Music. Consider cancelling Spotify.",
  },
  {
    subscriptionId: "4",
    subscriptionName: "Headspace",
    logoEmoji: "🧘",
    suggestionType: "pause" as const,
    savingsPaise: 24900n,
    reason:
      "You haven't opened Headspace in 30 days. Pause your subscription to save money.",
  },
];

// ─── Monthly trend (static illustrative data) ─────────────────────────────────
const MONTHLY_TREND = [
  { month: "Nov", spend: 2200 },
  { month: "Dec", spend: 2550 },
  { month: "Jan", spend: 2800 },
  { month: "Feb", spend: 2950 },
  { month: "Mar", spend: 3100 },
  { month: "Apr", spend: 3450 },
];

// ─── Recharts custom tooltip ──────────────────────────────────────────────────
function PieTooltipContent({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border/60 rounded-xl px-3 py-2 shadow-elevated text-xs">
      <p className="font-semibold text-foreground">{payload[0].name}</p>
      <p className="text-savings font-bold">₹{payload[0].value.toFixed(0)}</p>
    </div>
  );
}

function BarTooltipContent({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border/60 rounded-xl px-3 py-2 shadow-elevated text-xs">
      <p className="text-muted-foreground mb-0.5">{label}</p>
      <p className="font-bold text-primary">
        ₹{payload[0].value.toLocaleString("en-IN")}
      </p>
    </div>
  );
}

// ─── Legend renderer ──────────────────────────────────────────────────────────
function CategoryLegend({
  breakdown,
}: {
  breakdown: Array<{ category: Category; totalPaise: bigint; count: bigint }>;
}) {
  return (
    <div className="flex flex-col gap-2 mt-3">
      {breakdown.map((item) => (
        <div key={item.category} className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{
                background: CHART_COLORS[item.category] ?? FALLBACK_COLOR,
              }}
            />
            <span className="text-sm text-foreground truncate">
              {item.category}
            </span>
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 h-4 flex-shrink-0"
            >
              {Number(item.count)}
            </Badge>
          </div>
          <span className="text-sm font-semibold text-foreground ml-2">
            {formatPaise(item.totalPaise)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Suggestion type badge styling ────────────────────────────────────────────
const SUGGESTION_BADGE: Record<string, string> = {
  cancel: "bg-alert-subtle text-alert border-0",
  downgrade: "bg-yellow-50 text-yellow-700 border-0",
  pause: "bg-blue-50 text-blue-700 border-0",
  bundle: "bg-savings-subtle text-savings border-0",
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function InsightsPage() {
  const { data: breakdown, isLoading: bdLoading } = useCategoryBreakdown();
  const { data: suggestions, isLoading: sugLoading } =
    useOptimizationSuggestions();
  const { data: totalSpend, isLoading: spendLoading } = useTotalMonthlySpend();

  const displayBreakdown = breakdown?.length ? breakdown : SAMPLE_BREAKDOWN;
  const displaySuggestions = suggestions ?? SAMPLE_SUGGESTIONS;
  const displayTotal = totalSpend ?? 345000n;

  const totalSavingsPaise = displaySuggestions.reduce(
    (sum, s) => sum + Number(s.savingsPaise),
    0,
  );

  const chartData = displayBreakdown.map((item) => ({
    name: item.category,
    value: paiseToRupees(item.totalPaise),
  }));

  return (
    <Layout>
      <div className="px-4 pt-6 pb-24">
        {/* ── Page header ── */}
        <div className="mb-5">
          <h1
            className="font-display font-bold text-xl text-foreground"
            data-ocid="insights.page"
          >
            Insights
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Here's where your money goes
          </p>
        </div>

        {/* ── Monthly spend summary card ── */}
        <div
          className="gradient-hero rounded-[16px] border border-border/50 p-5 mb-5 shadow-subtle"
          data-ocid="insights.spend_summary_card"
        >
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
            Total Monthly Spend
          </p>
          {spendLoading ? (
            <Skeleton className="h-9 w-32 mb-1" />
          ) : (
            <p className="font-display font-bold text-3xl text-foreground">
              {formatPaise(displayTotal)}
            </p>
          )}
          {totalSavingsPaise > 0 && (
            <p className="text-sm font-semibold text-savings mt-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              You can save {formatPaise(totalSavingsPaise)}/month
            </p>
          )}
        </div>

        {/* ── Spending breakdown chart ── */}
        <section
          className="bg-card rounded-[16px] border border-border/50 p-4 mb-5 shadow-subtle"
          data-ocid="insights.breakdown_section"
        >
          <h2 className="font-display font-semibold text-[15px] text-foreground mb-4">
            Spending by Category
          </h2>

          {bdLoading ? (
            <Skeleton className="h-56 w-full rounded-xl" />
          ) : (
            <>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={82}
                      paddingAngle={3}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {chartData.map((entry) => (
                        <Cell
                          key={`cell-${entry.name}`}
                          fill={CHART_COLORS[entry.name] ?? FALLBACK_COLOR}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <CategoryLegend breakdown={displayBreakdown} />
            </>
          )}
        </section>

        {/* ── Monthly trend chart ── */}
        <section
          className="bg-card rounded-[16px] border border-border/50 p-4 mb-5 shadow-subtle"
          data-ocid="insights.trend_section"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h2 className="font-display font-semibold text-[15px] text-foreground">
              6-Month Trend
            </h2>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MONTHLY_TREND}
                barCategoryGap="30%"
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "oklch(0.52 0.01 255)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "oklch(0.52 0.01 255)" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  content={<BarTooltipContent />}
                  cursor={{ fill: "oklch(0.5 0.22 280 / 0.06)" }}
                />
                <Bar
                  dataKey="spend"
                  radius={[6, 6, 0, 0]}
                  fill="oklch(0.5 0.22 280)"
                >
                  {MONTHLY_TREND.map((entry, i) => (
                    <Cell
                      key={entry.month}
                      fill={
                        i === MONTHLY_TREND.length - 1
                          ? "oklch(0.5 0.22 280)"
                          : "oklch(0.5 0.22 280 / 0.45)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-muted-foreground text-center mt-1">
            Last 6 months spend trend
          </p>
        </section>

        {/* ── Optimization suggestions ── */}
        <section data-ocid="insights.suggestions_section">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              <h2 className="font-display font-semibold text-[15px] text-foreground">
                Smart Suggestions
              </h2>
            </div>
          </div>

          {/* Total savings potential banner */}
          {totalSavingsPaise > 0 && (
            <div
              className="gradient-savings rounded-[12px] border border-border/40 px-4 py-3 mb-3 flex items-center justify-between"
              data-ocid="insights.savings_potential_banner"
            >
              <span className="text-sm text-muted-foreground">
                Total savings potential
              </span>
              <span className="font-display font-bold text-savings text-sm">
                {formatPaise(totalSavingsPaise)}/month
              </span>
            </div>
          )}

          {sugLoading ? (
            <div className="flex flex-col gap-3">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-28 rounded-[14px]" />
              ))}
            </div>
          ) : displaySuggestions.length === 0 ? (
            <div
              className="bg-card rounded-[14px] p-8 border border-dashed border-border text-center"
              data-ocid="insights.suggestions.empty_state"
            >
              <p className="text-2xl mb-2">🎉</p>
              <p className="text-sm font-semibold text-foreground mb-1">
                Your subscriptions look optimized!
              </p>
              <p className="text-xs text-muted-foreground">
                No suggestions at this time. Keep it up!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {displaySuggestions.map((s, i) => {
                const emoji =
                  "logoEmoji" in s && (s as { logoEmoji?: string }).logoEmoji
                    ? (s as { logoEmoji: string }).logoEmoji
                    : "💡";

                return (
                  <div
                    key={s.subscriptionId}
                    className="bg-card rounded-[14px] p-4 shadow-subtle border border-border/50"
                    data-ocid={`insights.suggestion.${i + 1}`}
                  >
                    {/* Header row */}
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-9 h-9 rounded-[10px] bg-secondary flex items-center justify-center text-lg flex-shrink-0">
                        {emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display font-semibold text-sm text-foreground">
                            {s.subscriptionName}
                          </span>
                          <Badge
                            variant="secondary"
                            className={`text-[10px] capitalize px-2 py-0 h-[18px] ${
                              SUGGESTION_BADGE[s.suggestionType] ??
                              SUGGESTION_BADGE.cancel
                            }`}
                          >
                            {s.suggestionType}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                          {s.reason}
                        </p>
                      </div>
                    </div>

                    {/* Footer row */}
                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-border/40">
                      <p className="text-sm font-bold text-savings">
                        Save <span>{formatPaise(s.savingsPaise)}/month</span>
                      </p>
                      <Link
                        to="/subscription/$id"
                        params={{ id: s.subscriptionId }}
                        data-ocid={`insights.suggestion_review.${i + 1}`}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs rounded-lg border-primary/30 text-primary hover:bg-primary/5"
                        >
                          Review
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
