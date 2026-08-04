import React from 'react';
import { HomeHero } from '../components/HomeHero';
import { AnnouncementsSection } from '../components/AnnouncementsSection';
import { SummaryCards } from '../components/SummaryCards';
import { ContinueLearning } from '../components/ContinueLearning';
import { TodaySchedule } from '../components/TodaySchedule';
import { PendingHomework } from '../components/PendingHomework';
import { LearningProgress } from '../components/LearningProgress';
import { AchievementsPreview } from '../components/AchievementsPreview';
import { NewsPreview } from '../components/NewsPreview';
import { AITutorCard } from '../components/AITutorCard';
import styles from './home.module.css';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      {/* Welcome Hero Banner */}
      <HomeHero />

      {/* Announcements Auto-scroll Carousel */}
      <AnnouncementsSection />

      {/* 5 Metric Summary Cards */}
      <SummaryCards />

      {/* Row 1: Continue Learning | Today's Schedule | Pending Homework */}
      <div className={styles.threeColGrid}>
        <ContinueLearning />
        <TodaySchedule />
        <PendingHomework />
      </div>

      {/* Row 2: Learning Progress | Recent Achievements | School News */}
      <div className={styles.threeColGrid}>
        <LearningProgress />
        <AchievementsPreview />
        <NewsPreview />
      </div>

      {/* Row 3: AI Tutor Banner */}
      <AITutorCard />

      {/* Footer copyright */}
      <div className={styles.footerText}>
        © 2025 EduTrack AI. All rights reserved.
      </div>
    </div>
  );
};
