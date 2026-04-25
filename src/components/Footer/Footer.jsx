import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Rates are sourced from each course&rsquo;s public site and are accurate as of the
      most recent NYC Parks rate sheet. Reservation fees and cart fees may apply.
      Book NYC Parks tee times at{' '}
      <a href="https://golfnyc.com" target="_blank" rel="noopener noreferrer">
        golfnyc.com
      </a>
      . Times from Penn Station (Chelsea) are estimates &mdash; traffic and weather vary.
    </footer>
  );
}
