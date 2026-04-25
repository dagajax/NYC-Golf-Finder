// Returns the green-fee dollar amount to display for a course given the active filters.
// Falls back gracefully when a course doesn't offer the requested rate.
export function getPrice(course, { dayType, holesFilter }) {
  const isWeekend = dayType === 'weekend';
  const wantNine = holesFilter === '9';

  if (wantNine) {
    const nine = isWeekend ? course.weekend9 : course.weekday9;
    if (nine && nine > 0) return nine;
    // Fall back to 18-hole rate if no 9-hole rate exists.
    return isWeekend ? course.weekend18 : course.weekday18;
  }
  const eighteen = isWeekend ? course.weekend18 : course.weekday18;
  if (eighteen && eighteen > 0) return eighteen;
  // Fall back to 9 (e.g., dedicated 9-holers).
  return isWeekend ? course.weekend9 : course.weekday9;
}

// Format helpers
export function formatPrice(n) {
  if (!n || n <= 0) return '—';
  return `$${n}`;
}

export function budgetLabel(budget) {
  if (budget === 'budget') return '$';
  if (budget === 'mid') return '$$';
  if (budget === 'premium') return '$$$';
  return '';
}
