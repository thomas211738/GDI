// Trust score constants
const PRIOR_REPORTS = 3;
const PRIOR_CONFIRM_RATE = 0.5;
const TRUST_MIN = 0.1;
const TRUST_MAX = 1.0;
export const CONFIRM_THRESHOLD = 15; // % deviation considered "confirmed"

/**
 * Computes a Bayesian trust score from a user's report history.
 * New users start at 0.5. Accurate reporters approach 1.0. Bad actors floor at 0.1.
 */
export function computeTrustScore(userDoc) {
  if (!userDoc) return 0.5;
  const { totalReports = 0, confirmedReports = 0 } = userDoc;
  if (totalReports === 0) return 0.5;

  const smoothedConfirmed = confirmedReports + PRIOR_REPORTS * PRIOR_CONFIRM_RATE;
  const smoothedTotal = totalReports + PRIOR_REPORTS;

  return Math.max(TRUST_MIN, Math.min(TRUST_MAX, smoothedConfirmed / smoothedTotal));
}

/**
 * Parses a correctionKey like "2026-03-27_14" back into a Date.
 */
export function parseSlotTime(correctionKey) {
  const [datePart, hourPart] = correctionKey.split("_");
  const [year, month, day] = datePart.split("-").map(Number);
  return new Date(year, month - 1, day, Number(hourPart));
}

/**
 * Computes weighted average from a reports map { uid: { value, weight } }.
 * Returns null if no reports.
 */
export function weightedAverage(reports) {
  if (!reports || Object.keys(reports).length === 0) return null;
  let weightedSum = 0;
  let totalWeight = 0;
  for (const report of Object.values(reports)) {
    weightedSum += report.value * report.weight;
    totalWeight += report.weight;
  }
  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : null;
}
