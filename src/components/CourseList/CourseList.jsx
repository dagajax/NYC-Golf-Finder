import styles from './CourseList.module.css';
import { BOROUGH_COLORS } from '../../data/boroughColors.js';
import { getPrice, formatPrice } from '../../utils/pricing.js';
import { milesFromPenn } from '../../utils/geo.js';
import { TRANSPORT_MODES } from '../../utils/filtering.js';

function CourseCard({ course, expanded, onToggle, filters }) {
  const color = BOROUGH_COLORS[course.borough] || '#888';
  const price = getPrice(course, filters);
  const miles = milesFromPenn(course).toFixed(1);
  const showTransitTag =
    filters.mode !== TRANSPORT_MODES.CAR && course.transitTime < 999;

  const transit = course.transit;
  const transitIsArray = Array.isArray(transit);

  return (
    <button
      type="button"
      className={`${styles.card} ${expanded ? styles.cardSelected : ''}`}
      onClick={onToggle}
      aria-expanded={expanded}
    >
      <div className={styles.row}>
        <div className={styles.titleWrap}>
          <span className={styles.dot} style={{ background: color }} />
          <div className={styles.name}>{course.name}</div>
        </div>
        <div className={styles.price}>{formatPrice(price)}</div>
      </div>

      <div className={styles.meta}>
        {course.borough} · {course.holes}H · Par {course.par} · {course.yards.toLocaleString()}y · {course.style}
      </div>

      <div className={styles.tags}>
        <span className={styles.tag}>🚗 {course.driveRange} min</span>
        {showTransitTag && (
          <span className={styles.tag}>🚇 {course.transitTime} min</span>
        )}
        <span className={styles.tag}>📍 {miles} mi</span>
        {course.cart > 0 && <span className={styles.tag}>🛒 ${course.cart} cart</span>}
      </div>

      {expanded && (
        <div className={styles.expanded}>
          <div className={styles.description}>{course.description}</div>

          {course.highlight && (
            <div className={styles.highlight}>
              <span className={styles.highlightIcon} aria-hidden>✦</span>
              <span>{course.highlight}</span>
            </div>
          )}

          <div className={styles.gettingThere}>
            <div className={styles.gettingThereLabel}>Getting there</div>
            {transitIsArray ? (
              transit.map((line, i) => (
                <div key={i} className={styles.transitItem}>{line}</div>
              ))
            ) : (
              <div className={styles.transitItem}>{transit}</div>
            )}
          </div>

          <div className={styles.tags}>
            {course.weekday18 > 0 && (
              <span className={styles.tag}>18H wkday ${course.weekday18}</span>
            )}
            {course.weekend18 > 0 && (
              <span className={styles.tag}>18H wkend ${course.weekend18}</span>
            )}
            {course.weekday9 > 0 && (
              <span className={styles.tag}>9H wkday ${course.weekday9}</span>
            )}
            {course.weekend9 > 0 && (
              <span className={styles.tag}>9H wkend ${course.weekend9}</span>
            )}
          </div>

          {course.phone && (
            <div className={styles.phone}>📞 {course.phone}</div>
          )}

          {course.website && (
            <a
              href={course.website}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.websiteBtn}
              onClick={(e) => e.stopPropagation()}
            >
              🌐 Course Website &amp; Tee Times
            </a>
          )}
        </div>
      )}
    </button>
  );
}

export default function CourseList({ courses, filters, selectedId, onSelect }) {
  if (courses.length === 0) {
    return (
      <div className={styles.empty}>
        No courses match these filters. Try widening the commute window or budget.
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {courses.map((c) => (
        <CourseCard
          key={c.id}
          course={c}
          filters={filters}
          expanded={selectedId === c.id}
          onToggle={() => onSelect(selectedId === c.id ? null : c.id)}
        />
      ))}
    </div>
  );
}
