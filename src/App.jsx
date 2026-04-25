import { useMemo, useState } from 'react';
import styles from './App.module.css';

import Header from './components/Header/Header.jsx';
import ViewToggle from './components/ViewToggle/ViewToggle.jsx';
import FilterPanel from './components/Filters/FilterPanel.jsx';
import CourseMap from './components/Map/CourseMap.jsx';
import CourseList from './components/CourseList/CourseList.jsx';
import Footer from './components/Footer/Footer.jsx';

import { COURSES } from './data/courses.js';
import {
  TRANSPORT_MODES,
  applyFilters,
  sortByCommute,
} from './utils/filtering.js';

const DEFAULT_FILTERS = {
  mode: TRANSPORT_MODES.CAR,
  maxCommute: 120,
  holes: 'any',
  budget: 'any',
  dayType: 'weekday',
};

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [showAll, setShowAll] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const visibleCourses = useMemo(() => {
    const filtered = showAll ? COURSES : applyFilters(COURSES, filters);
    return sortByCommute(filtered, filters.mode);
  }, [filters, showAll]);

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <ViewToggle showAll={showAll} onChange={setShowAll} />
        <FilterPanel filters={filters} onChange={setFilters} disabled={showAll} />

        <div className={styles.layout}>
          <CourseMap
            courses={visibleCourses}
            filters={filters}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <div>
            <div className={styles.listLabel}>
              <span className={styles.count}>{visibleCourses.length}</span> course
              {visibleCourses.length === 1 ? '' : 's'} · sorted by commute
            </div>
            <CourseList
              courses={visibleCourses}
              filters={filters}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
