import React from 'react';
import { HomeHero } from '../components/HomeHero';
import { SummaryCards } from '../components/SummaryCards';
import { ContinueLearning } from '../components/ContinueLearning';
import { TodaySchedule } from '../components/TodaySchedule';
import { LearningProgress } from '../components/LearningProgress';
import { PendingHomework } from '../components/PendingHomework';
import { UpcomingExams } from '../components/UpcomingExams';
import { EventsPreview } from '../components/EventsPreview';
import { AchievementsPreview } from '../components/AchievementsPreview';
import { NewsPreview } from '../components/NewsPreview';
import { AITutorCard } from '../components/AITutorCard';
import styles from './home.module.css';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <HomeHero />
      <SummaryCards />

      <div className={`grid ${styles.mainGrid}`} style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1.2fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Column: Learning activities */}
        <div className={styles.leftCol} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <ContinueLearning />
          <TodaySchedule />
          <PendingHomework />
          <EventsPreview />
        </div>

        {/* Right Column: Progress & Updates */}
        <div className={styles.rightCol} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <LearningProgress />
          <UpcomingExams />
          <AchievementsPreview />
          <NewsPreview />
          <AITutorCard />
        </div>
      </div>
    </div>
  );
};
