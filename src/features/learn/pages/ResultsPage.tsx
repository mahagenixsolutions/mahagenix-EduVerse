import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resultsData } from '@/mock/school';
import {
  Atom,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  Calculator,
  ChevronRight,
  ClipboardList,
  FlaskConical,
  Laptop,
  LineChart,
} from 'lucide-react';
import styles from './ResultsPage.module.css';

const subjectMeta = {
  Mathematics: {
    icon: Calculator,
    className: styles.subjectMath,
    performance: 'Excellent',
    performanceClass: styles.performanceExcellent,
  },
  Physics: {
    icon: Atom,
    className: styles.subjectPhysics,
    performance: 'Very Good',
    performanceClass: styles.performanceVeryGood,
  },
  English: {
    icon: BookOpen,
    className: styles.subjectEnglish,
    performance: 'Very Good',
    performanceClass: styles.performanceVeryGood,
  },
  'Computer Science': {
    icon: Laptop,
    className: styles.subjectComputer,
    performance: 'Excellent',
    performanceClass: styles.performanceExcellent,
  },
  Chemistry: {
    icon: FlaskConical,
    className: styles.subjectChemistry,
    performance: 'Good',
    performanceClass: styles.performanceGood,
  },
} as const;

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(resultsData[0]);
  const scorePercent = Math.round((selected.obtained / selected.totalMarks) * 100);

  return (
    <div className={styles.resultsPage}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <button type="button" onClick={() => navigate('/app')}>Home</button>
            <ChevronRight size={14} />
            <button type="button" onClick={() => navigate('/learn')}>Learn</button>
            <ChevronRight size={14} />
            <span>Results</span>
          </nav>

          <p className={styles.heroTitle}>Results & Report Card</p>
          <p className={styles.heroDesc}>View your exam results and performance overview</p>
        </div>

        <img
          src="/assets/stickers/results_report_hero.png"
          alt=""
          className={styles.heroSticker}
          aria-hidden="true"
        />
      </header>

      <section className={styles.metricsGrid} aria-label="Performance summary">
        <article className={`${styles.metricCard} ${styles.metricGreen}`}>
          <div className={styles.metricIcon}>
            <LineChart size={28} />
          </div>
          <div className={styles.metricBody}>
            <strong>{selected.percentage}%</strong>
            <span>Percentage</span>
            <p>Overall Performance</p>
          </div>
          <BarChart3 className={styles.metricArt} size={48} />
        </article>

        <article className={`${styles.metricCard} ${styles.metricBlue}`}>
          <div className={styles.metricIcon}>
            <Award size={28} />
          </div>
          <div className={styles.metricBody}>
            <strong>#{selected.rank}</strong>
            <span>Class Rank</span>
            <p>Top 10 Position</p>
          </div>
          <BarChart3 className={styles.metricArt} size={48} />
        </article>

        <article className={`${styles.metricCard} ${styles.metricPurple}`}>
          <div className={styles.metricIcon}>
            <ClipboardList size={28} />
          </div>
          <div className={styles.metricBody}>
            <strong>{selected.obtained}/{selected.totalMarks}</strong>
            <span>Total Marks</span>
            <p>Across All Subjects</p>
          </div>
          <div className={styles.scoreRing} style={{ '--score': `${scorePercent}%` } as React.CSSProperties}>
            <span>{scorePercent}%</span>
          </div>
        </article>
      </section>

      <div className={styles.controlsRow}>
        <div className={styles.examTabs} role="tablist" aria-label="Exam selector">
          {resultsData.map((result) => (
            <button
              key={result.id}
              type="button"
              role="tab"
              aria-selected={selected.id === result.id}
              className={selected.id === result.id ? styles.activeTab : undefined}
              onClick={() => setSelected(result)}
            >
              {result.examName}
            </button>
          ))}
        </div>

        <button type="button" className={styles.dateFilter}>
          <Calendar size={17} />
          {selected.date}
          <ChevronRight size={17} className={styles.downIcon} />
        </button>
      </div>

      <section className={styles.reportCard} aria-labelledby="report-title">
        <p className={styles.reportTitle} id="report-title">{selected.examName} - {selected.date}</p>

        <div className={styles.tableWrap}>
          <table className={styles.resultsTable}>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
                <th>Total</th>
                <th>Grade</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {selected.subjects.map((subject) => {
                const meta = subjectMeta[subject.name as keyof typeof subjectMeta];
                const Icon = meta.icon;

                return (
                  <tr key={subject.name}>
                    <td>
                      <div className={styles.subjectCell}>
                        <span className={`${styles.subjectIcon} ${meta.className}`}>
                          <Icon size={18} />
                        </span>
                        <p style={{ margin: 0, fontSize: '13.5px', fontWeight: 600, color: '#0F172A' }}>{subject.name}</p>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600, color: '#0F172A', fontSize: '13.5px' }}>{subject.obtained}</td>
                    <td>{subject.total}</td>
                    <td>
                      <span className={`${styles.gradeBadge} ${subject.grade === 'B+' ? styles.gradeBlue : styles.gradeGreen}`}>
                        {subject.grade}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.performanceBadge} ${meta.performanceClass}`}>
                        {meta.performance}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
