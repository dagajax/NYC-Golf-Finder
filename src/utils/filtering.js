// Pure functions for filtering and sorting the COURSES list.

export const TRANSPORT_MODES = {
  WALK: 'walk', // Subway + Walk
  TRANSIT: 'transit', // Train + Uber
  CAR: 'car', // Uber / Car
};

export function commuteMinutes(course, mode) {
  if (mode === TRANSPORT_MODES.CAR) return course.driveTime;
  return course.transitTime;
}

export function applyFilters(courses, state) {
  const { mode, maxCommute, holes, budget } = state;

  return courses.filter((c) => {
    // Transport mode access
    if (mode === TRANSPORT_MODES.WALK && !c.walkTransit) return false;
    if (mode === TRANSPORT_MODES.TRANSIT && c.transitTime >= 999) return false;

    // Commute cap
    const time = commuteMinutes(c, mode);
    if (time > maxCommute) return false;

    // Holes — strict per spec: 9 means dedicated 9-holers only; 18 hides 9-holers.
    if (holes === '9' && c.holes !== 9) return false;
    if (holes === '18' && c.holes === 9) return false;

    // Budget
    if (budget !== 'any' && c.budget !== budget) return false;

    return true;
  });
}

export function sortByCommute(courses, mode) {
  return [...courses].sort((a, b) => commuteMinutes(a, mode) - commuteMinutes(b, mode));
}
