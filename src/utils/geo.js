// Penn Station, Chelsea — origin point for all distance/time calculations.
export const PENN_STATION = { lat: 40.7506, lng: -73.9935 };

// Approximate travel speed (miles per minute) used for time-ring radii on the map.
export const SPEED_MI_PER_MIN = {
  walk: 0.35, // Subway + Walk
  transit: 0.35, // Train + Uber
  car: 0.55, // Uber / Car
};

// Haversine distance in miles between two lat/lng pairs.
export function haversineMiles(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 3958.8; // Earth radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// Convenience: miles from Penn Station to a given course.
export function milesFromPenn(course) {
  return haversineMiles(PENN_STATION.lat, PENN_STATION.lng, course.lat, course.lng);
}

// Build a viewport from a list of courses, capping the longitude span so far-flung
// outliers (Bethpage, Harbor Links) don't shrink the NYC cluster.
//
// Returns { minLat, maxLat, minLng, maxLng } in degrees.
export function buildViewport(courses, { lngSpanCap = 0.45, latSpanCap = 0.55, padding = 0.04 } = {}) {
  // Always include Penn Station so it is visible.
  const points = [PENN_STATION, ...courses];
  let minLat = Math.min(...points.map((p) => p.lat));
  let maxLat = Math.max(...points.map((p) => p.lat));
  let minLng = Math.min(...points.map((p) => p.lng));
  let maxLng = Math.max(...points.map((p) => p.lng));

  // Pad
  minLat -= padding;
  maxLat += padding;
  minLng -= padding;
  maxLng += padding;

  // Cap longitude span (centered on Penn Station so Manhattan stays centered).
  const lngSpan = maxLng - minLng;
  if (lngSpan > lngSpanCap) {
    const half = lngSpanCap / 2;
    minLng = PENN_STATION.lng - half;
    maxLng = PENN_STATION.lng + half;
  }

  // Cap latitude span similarly.
  const latSpan = maxLat - minLat;
  if (latSpan > latSpanCap) {
    const half = latSpanCap / 2;
    minLat = PENN_STATION.lat - half;
    maxLat = PENN_STATION.lat + half;
  }

  return { minLat, maxLat, minLng, maxLng };
}

// Project a lat/lng to SVG (x, y). Y is flipped (north-up).
export function project(lat, lng, viewport, width, height) {
  const x = ((lng - viewport.minLng) / (viewport.maxLng - viewport.minLng)) * width;
  const y = ((viewport.maxLat - lat) / (viewport.maxLat - viewport.minLat)) * height;
  return { x, y };
}

// Clamp pixel coords to within `inset` of the SVG edges.
export function clampXY({ x, y }, width, height, inset = 12) {
  return {
    x: Math.max(inset, Math.min(width - inset, x)),
    y: Math.max(inset, Math.min(height - inset, y)),
  };
}

// Approximate pixels-per-mile around Penn Station for the current viewport.
// Uses the latitude axis (less distortion at NYC latitudes).
export function pixelsPerMile(viewport, height) {
  const milesPerLatDegree = 69; // ~constant
  const latSpan = viewport.maxLat - viewport.minLat;
  return height / (latSpan * milesPerLatDegree);
}
