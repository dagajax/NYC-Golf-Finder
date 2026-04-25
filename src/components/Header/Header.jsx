import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.titleRow}>
          <span className={styles.flag} aria-hidden>⛳</span>
          <h1 className={styles.title}>
            NYC <span className={styles.titleAccent}>Golf</span> Finder
          </h1>
        </div>
        <div className={styles.subtitle}>
          Public courses accessible from Penn Station · Chelsea, Manhattan
        </div>
      </div>
    </header>
  );
}
