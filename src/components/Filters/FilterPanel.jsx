import styles from './FilterPanel.module.css';
import { TRANSPORT_MODES } from '../../utils/filtering.js';

const TRANSPORT_OPTIONS = [
  { value: TRANSPORT_MODES.WALK, label: '🚶 Subway + Walk' },
  { value: TRANSPORT_MODES.TRANSIT, label: '🚇 Train + Uber' },
  { value: TRANSPORT_MODES.CAR, label: '🚗 Uber / Car' },
];

const HOLES_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: '9', label: '9' },
  { value: '18', label: '18' },
];

const BUDGET_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: 'budget', label: '$' },
  { value: 'mid', label: '$$' },
  { value: 'premium', label: '$$$' },
];

const DAY_OPTIONS = [
  { value: 'weekday', label: 'Weekday' },
  { value: 'weekend', label: 'Weekend' },
];

function PillGroup({ value, options, onChange }) {
  return (
    <div className={styles.pillRow}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={`${styles.pill} ${value === o.value ? styles.pillActive : ''}`}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function FilterPanel({ filters, onChange, disabled }) {
  const set = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <div className={`${styles.panel} ${disabled ? styles.dimmed : ''}`} aria-disabled={disabled}>
      <div className={styles.group}>
        <div className={styles.label}>How are you getting there?</div>
        <PillGroup
          value={filters.mode}
          options={TRANSPORT_OPTIONS}
          onChange={(v) => set('mode', v)}
        />
      </div>

      <div className={styles.group}>
        <div className={styles.label}>
          Max commute · <span style={{ color: 'var(--color-gold)' }}>{filters.maxCommute} min</span>
        </div>
        <div className={styles.sliderRow}>
          <input
            type="range"
            min={20}
            max={120}
            step={5}
            value={filters.maxCommute}
            className={styles.slider}
            onChange={(e) => set('maxCommute', Number(e.target.value))}
          />
          <span className={styles.sliderValue}>{filters.maxCommute} min</span>
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.label}>How many holes?</div>
        <PillGroup
          value={filters.holes}
          options={HOLES_OPTIONS}
          onChange={(v) => set('holes', v)}
        />
      </div>

      <div className={styles.group}>
        <div className={styles.label}>Budget</div>
        <PillGroup
          value={filters.budget}
          options={BUDGET_OPTIONS}
          onChange={(v) => set('budget', v)}
        />
      </div>

      <div className={styles.group}>
        <div className={styles.label}>Day type</div>
        <PillGroup
          value={filters.dayType}
          options={DAY_OPTIONS}
          onChange={(v) => set('dayType', v)}
        />
      </div>
    </div>
  );
}
