const POPULAR_SUBSCRIPTIONS = [
  {
    name: "Netflix",
    logoEmoji: "🎬",
    monthlyPaise: 49900,
    category: "Entertainment"
  },
  {
    name: "Amazon Prime",
    logoEmoji: "📦",
    monthlyPaise: 29900,
    category: "Entertainment"
  },
  {
    name: "Hotstar",
    logoEmoji: "⭐",
    monthlyPaise: 29900,
    category: "Entertainment"
  },
  {
    name: "Spotify",
    logoEmoji: "🎵",
    monthlyPaise: 11900,
    category: "Entertainment"
  },
  {
    name: "YouTube Premium",
    logoEmoji: "▶️",
    monthlyPaise: 12900,
    category: "Entertainment"
  },
  {
    name: "Google One",
    logoEmoji: "☁️",
    monthlyPaise: 13e3,
    category: "Productivity"
  },
  {
    name: "Adobe Creative Cloud",
    logoEmoji: "🎨",
    monthlyPaise: 162e3,
    category: "Productivity"
  },
  {
    name: "Notion",
    logoEmoji: "📝",
    monthlyPaise: 0,
    category: "Productivity"
  },
  {
    name: "Headspace",
    logoEmoji: "🧘",
    monthlyPaise: 24900,
    category: "Health"
  },
  {
    name: "Gym Membership",
    logoEmoji: "💪",
    monthlyPaise: 15e4,
    category: "Health"
  },
  {
    name: "Zee5",
    logoEmoji: "🎭",
    monthlyPaise: 9900,
    category: "Entertainment"
  },
  {
    name: "SonyLIV",
    logoEmoji: "📺",
    monthlyPaise: 29900,
    category: "Entertainment"
  }
];
const CATEGORY_COLORS = {
  Entertainment: "bg-primary/10 text-primary",
  Productivity: "bg-accent/20 text-accent-foreground",
  Health: "bg-savings/10 text-savings",
  Education: "bg-primary/15 text-primary",
  Finance: "bg-savings/15 text-savings",
  Gaming: "bg-alert/10 text-alert",
  News: "bg-alert/10 text-alert",
  Shopping: "bg-primary/10 text-primary",
  Other: "bg-muted text-muted-foreground"
};
export {
  CATEGORY_COLORS as C,
  POPULAR_SUBSCRIPTIONS as P
};
