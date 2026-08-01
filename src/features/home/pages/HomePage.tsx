import React from 'react';
import { HomeHero } from '../components/HomeHero';
import { AnnouncementsSection } from '../components/AnnouncementsSection';
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
import { FeatureGuard } from '@/contexts/SubscriptionContext';
import styles from './home.module.css';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <HomeHero />
      <AnnouncementsSection />
      <SummaryCards />

      <div className={styles.mainGrid}>
        {/* Left Column: Learning activities */}
        <div className={styles.leftCol} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <ContinueLearning />
          <TodaySchedule />
          <PendingHomework />
          <FeatureGuard flag="live_classes">
            <EventsPreview />
          </FeatureGuard>
        </div>

        {/* Right Column: Progress & Updates */}
        <div className={styles.rightCol} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <FeatureGuard flag="learning_analytics">
            <LearningProgress />
          </FeatureGuard>
          <FeatureGuard flag="online_exams">
            <UpcomingExams />
          </FeatureGuard>
          <FeatureGuard flag="achievements">
            <AchievementsPreview />
          </FeatureGuard>
          <NewsPreview />
          <FeatureGuard flag="ai_study_assistant">
            <AITutorCard />
          </FeatureGuard>
        </div>
      </div>
    </div>
  );
};
