/**
 * Formats paise (1/100th of rupee) to ₹ with Indian comma separators.
 * e.g. 349900 paise → "₹3,499"
 */
export function formatPaise(paise: bigint | number): string {
  const rupees = Number(paise) / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: rupees % 1 === 0 ? 0 : 2,
  }).format(rupees);
}

/**
 * Formats rupees (whole number) to ₹ with Indian comma separators.
 * e.g. 3450 → "₹3,450"
 */
export function formatRupees(rupees: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rupees);
}

/**
 * Convert paise to rupees as a number.
 */
export function paiseToRupees(paise: bigint | number): number {
  return Number(paise) / 100;
}

/**
 * Convert rupees to paise as bigint.
 */
export function rupeesToPaise(rupees: number): bigint {
  return BigInt(Math.round(rupees * 100));
}
