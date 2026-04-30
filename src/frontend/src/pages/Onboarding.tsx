import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useSetOnboardingComplete } from "@/hooks/useSubscriptions";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Step data ───────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    emoji: "📊",
    title: "See where your money goes",
    desc: "Visual breakdown of every subscription by category.",
  },
  {
    emoji: "💡",
    title: "Get smart cancel suggestions",
    desc: "We flag low-usage subs so you save without thinking.",
  },
  {
    emoji: "⚡",
    title: "Track renewals before they hit",
    desc: "Never get surprised by a charge again.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const DOT_LABELS = ["welcome", "benefits", "setup"];

function ProgressDots({ step, total }: { step: number; total: number }) {
  return (
    <div
      className="flex items-center gap-2 justify-center"
      aria-label={`Step ${step + 1} of ${total}`}
    >
      {DOT_LABELS.slice(0, total).map((label, i) => (
        <span
          key={label}
          className={`rounded-full transition-smooth ${
            i === step ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-border"
          }`}
        />
      ))}
    </div>
  );
}

function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center text-center gap-7">
      {/* Illustration */}
      <div className="w-52 h-40 rounded-3xl gradient-primary relative overflow-hidden shadow-elevated flex items-center justify-center">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 25% 25%, rgba(255,255,255,0.25), transparent 55%)",
          }}
        />
        <span className="text-6xl drop-shadow select-none relative z-10">
          💡
        </span>
        {/* Decorative circles */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
        <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-white/10" />
      </div>

      <div className="space-y-3 max-w-xs">
        <h1 className="font-display text-[1.75rem] font-bold text-foreground leading-tight">
          Take control of your subscriptions
        </h1>
        <p className="text-muted-foreground text-[0.95rem] leading-relaxed">
          Track everything you pay for. Stop paying for what you don't use.
        </p>
      </div>

      <Button
        data-ocid="onboarding.get_started_button"
        onClick={onNext}
        size="lg"
        className="w-full gradient-primary border-0 text-primary-foreground font-semibold text-base rounded-2xl shadow-elevated transition-smooth hover:opacity-90 h-[52px]"
      >
        Get Started
      </Button>
    </div>
  );
}

function StepBenefits({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Smart savings, simplified
        </h2>
        <p className="text-muted-foreground text-sm">
          Everything you need to stay on top of your subscriptions.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {BENEFITS.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: i * 0.1,
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            data-ocid={`onboarding.benefit.item.${i + 1}`}
            className="bg-card border border-border rounded-2xl p-4 flex items-start gap-4 shadow-subtle"
          >
            <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-xl flex-shrink-0 shadow-subtle">
              {b.emoji}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground text-sm">{b.title}</p>
              <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
                {b.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <Button
        data-ocid="onboarding.next_button"
        onClick={onNext}
        size="lg"
        className="w-full gradient-primary border-0 text-primary-foreground font-semibold text-base rounded-2xl shadow-elevated transition-smooth hover:opacity-90 h-[52px]"
      >
        Next
      </Button>
    </div>
  );
}

function StepSetup({
  onFinish,
  isPending,
}: { onFinish: () => void; isPending: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-3xl mx-auto shadow-subtle">
          📱
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mt-2">
          Auto-detect subscriptions?
        </h2>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
          We can scan your SMS to find subscriptions automatically
          <span className="text-primary font-medium"> (coming soon)</span>.
        </p>
      </div>

      {/* SMS toggle card */}
      <div
        data-ocid="onboarding.sms_card"
        className="bg-card border border-border rounded-2xl p-5 shadow-subtle"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm">
              SMS Detection
            </p>
            <p className="text-muted-foreground text-xs mt-0.5">
              SMS Detection — Coming Soon
            </p>
          </div>
          <Switch
            data-ocid="onboarding.sms_toggle"
            disabled
            checked={false}
            aria-label="SMS Detection toggle — coming soon"
          />
        </div>
        <div className="mt-3 pt-3 border-t border-border">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 inline-block" />
            We'll notify you when this is available
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Button
          data-ocid="onboarding.start_saving_button"
          onClick={onFinish}
          disabled={isPending}
          size="lg"
          className="w-full gradient-primary border-0 text-primary-foreground font-semibold text-base rounded-2xl shadow-elevated transition-smooth hover:opacity-90 h-[52px]"
        >
          {isPending ? "Setting up…" : "Start Saving 🎉"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          You can always enable this later in Settings.
        </p>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 3;

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { mutate: completeOnboarding, isPending } = useSetOnboardingComplete();

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
  };

  const handleFinish = () => {
    completeOnboarding(undefined, {
      onSuccess: () => navigate({ to: "/home" }),
      onError: () => navigate({ to: "/home" }),
    });
  };

  return (
    <div
      data-ocid="onboarding.page"
      className="min-h-screen bg-background flex flex-col items-center"
    >
      {/* Decorative background blobs */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-32 -right-24 w-72 h-72 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.5 0.22 280 / 0.09), transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.68 0.18 155 / 0.07), transparent 70%)",
          }}
        />
      </div>

      <div className="w-full max-w-[430px] min-h-screen flex flex-col px-6 pt-12 pb-10 relative z-10">
        {/* Skip button — only visible on step 1 */}
        <div className="flex justify-end h-8 mb-6">
          {step === 1 && (
            <button
              type="button"
              data-ocid="onboarding.skip_button"
              onClick={() => setStep(TOTAL_STEPS - 1)}
              className="text-sm text-muted-foreground font-medium transition-smooth hover:text-foreground"
            >
              Skip
            </button>
          )}
        </div>

        {/* Animated step content */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            >
              {step === 0 && <StepWelcome onNext={handleNext} />}
              {step === 1 && <StepBenefits onNext={handleNext} />}
              {step === 2 && (
                <StepSetup onFinish={handleFinish} isPending={isPending} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="pt-8 pb-6">
          <ProgressDots step={step} total={TOTAL_STEPS} />
        </div>

        {/* Branding */}
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
