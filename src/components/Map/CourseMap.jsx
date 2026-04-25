import { useMemo, useState } from 'react';
import styles from './CourseMap.module.css';
import { BOROUGH_COLORS } from '../../data/boroughColors.js';
import {
  PENN_STATION,
  SPEED_MI_PER_MIN,
  buildViewport,
  project,
  clampXY,
  pixelsPerMile,
} from '../../utils/geo.js';
import { TRANSPORT_MODES } from '../../utils/filtering.js';

const W = 600;
const H = 500;
const RING_MINUTES = [30, 60, 90];

export default function CourseMap({ courses, filters, selectedId, onSelect }) {
  const [hoverId, setHoverId] = useState(null);

  const viewport = useMemo(() => buildViewport(courses), [courses]);
  const ppm = pixelsPerMile(viewport, H);
  const penn = clampXY(project(PENN_STATION.lat, PENN_STATION.lng, viewport, W, H), W, H);

  const speed =
    filters.mode === TRANSPORT_MODES.CAR
      ? SPEED_MI_PER_MIN.car
      : SPEED_MI_PER_MIN.transit;

  const projected = courses.map((c) => {
    const raw = project(c.lat, c.lng, viewport, W, H);
    const p = clampXY(raw, W, H);
    return { course: c, x: p.x, y: p.y };
  });

  const activeId = hoverId ?? selectedId;

  return (
    <div className={styles.wrap}>
      <div className={styles.legend}>
        {Object.entries(BOROUGH_COLORS).map(([k, v]) => (
          <span key={k} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: v }} /> {k}
          </span>
        ))}
      </div>

      <div className={styles.svgWrap}>
        <svg className={styles.svg} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Map of courses">
          {/* Subtle grid */}
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={(W / 6) * i}
              y1={0}
              x2={(W / 6) * i}
              y2={H}
              className={styles.gridLine}
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={(H / 5) * i}
              x2={W}
              y2={(H / 5) * i}
              className={styles.gridLine}
            />
          ))}

          {/* Time rings */}
          {RING_MINUTES.map((mins) => {
            const r = mins * speed * ppm;
            const dim = mins > filters.maxCommute;
            return (
              <g key={mins}>
                <circle
                  cx={penn.x}
                  cy={penn.y}
                  r={r}
                  className={`${styles.ring} ${dim ? styles.ringDim : ''}`}
                />
                <text
                  x={penn.x + r + 4}
                  y={penn.y - 2}
                  className={styles.ringLabel}
                  opacity={dim ? 0.4 : 1}
                >
                  {mins} min
                </text>
              </g>
            );
          })}

          {/* Connectors */}
          {projected.map(({ course, x, y }) => (
            <line
              key={`c${course.id}`}
              x1={penn.x}
              y1={penn.y}
              x2={x}
              y2={y}
              className={`${styles.connector} ${
                activeId === course.id ? styles.connectorActive : ''
              }`}
            />
          ))}

          {/* Penn Station */}
          <circle cx={penn.x} cy={penn.y} r={5} className={styles.pennDot} />
          <text x={penn.x + 10} y={penn.y + 4} className={styles.pennLabel}>
            PENN STATION
          </text>

          {/* Course pins */}
          {projected.map(({ course, x, y }) => {
            const color = BOROUGH_COLORS[course.borough] || '#888';
            const flipLeft = x > W - 130;
            const isActive = activeId === course.id;
            return (
              <g key={course.id}>
                {/* flag pole */}
                <line x1={x} y1={y} x2={x} y2={y - 18} className={styles.pinPole} />
                {/* flag triangle */}
                <polygon
                  points={`${x},${y - 18} ${x + 12},${y - 14} ${x},${y - 10}`}
                  fill={color}
                  className={styles.pinFlag}
                />
                {/* dot */}
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 7 : 5}
                  fill={color}
                  className={styles.pinDot}
                  onMouseEnter={() => setHoverId(course.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onClick={() => onSelect(selectedId === course.id ? null : course.id)}
                />
                {/* tooltip */}
                {isActive && (
                  <g>
                    <rect
                      x={flipLeft ? x - 14 - course.name.length * 6.2 : x + 12}
                      y={y - 22}
                      width={Math.max(60, course.name.length * 6.2 + 12)}
                      height={20}
                      rx={6}
                      ry={6}
                      className={styles.tooltip}
                    />
                    <text
                      x={flipLeft ? x - 8 : x + 18}
                      y={y - 8}
                      className={styles.tooltipText}
                      textAnchor={flipLeft ? 'end' : 'start'}
                    >
                      {course.name}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
