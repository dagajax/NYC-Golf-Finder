import styles from './ViewToggle.module.css';

export default function ViewToggle({ showAll, onChange }) {
  return (
    <div className={styles.toggle} role="tablist" aria-label="View mode">
      <button
        role="tab"
        aria-selected={!showAll}
        className={`${styles.btn} ${!showAll ? styles.active : ''}`}
        onClick={() => onChange(false)}
      >
        🎯 Filtered View
      </button>
      <button
        role="tab"
        aria-selected={showAll}
        className={`${styles.btn} ${showAll ? styles.active : ''}`}
        onClick={() => onChange(true)}
      >
        📋 Show All 18 Courses
      </button>
    </div>
  );
}
