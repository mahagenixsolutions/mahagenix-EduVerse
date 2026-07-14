import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { activityFeed, weeklyStreak, weeklySummary, badges } from '@/mock/activity';
import { Calendar, Target, Clock, Zap, BookOpen } from 'lucide-react';
import styles from './activity.module.css';

export const ActivityPage: React.FC = () => {
  return (
    <div className={styles.activityPage}>
      {/* Header Stats */}
      <section className={styles.statsOverview}>
        <div className={styles.statBox}>
          <Clock size={24} color="var(--primary-color)" />
          <div className={styles.statInfo}>
            <p className={styles.statValue}>{weeklySummary.hoursLearned}h</p>
            <p>Hours Learned</p>
          </div>
        </div>
        <div className={styles.statBox}>
          <Target size={24} color="var(--success)" />
          <div className={styles.statInfo}>
            <p className={styles.statValue}>{weeklySummary.averageScore}%</p>
            <p>Average Score</p>
          </div>
        </div>
        <div className={styles.statBox}>
          <Zap size={24} color="var(--warning)" />
          <div className={styles.statInfo}>
            <p className={styles.statValue}>12 Day</p>
            <p>Current Streak</p>
          </div>
        </div>
        <div className={styles.statBox}>
          <BookOpen size={24} color="var(--secondary-color)" />
          <div className={styles.statInfo}>
            <p className={styles.statValue}>{weeklySummary.lessonsCompleted}</p>
            <p>Lessons Completed</p>
          </div>
        </div>
      </section>

      <div className={styles.mainGrid}>
        {/* Left Column: Timeline */}
        <div className={styles.timelineCol}>
          <h2 className={styles.sectionTitle}>Recent Activity</h2>
          <div className={styles.feedContainer}>
            {activityFeed.map((item, index) => (
              <div key={item.id} className={styles.feedItem}>
                <div className={styles.feedTimeline}>
                  <div className={styles.feedDot}>{item.icon}</div>
                  {index < activityFeed.length - 1 && <div className={styles.feedLine} />}
                </div>
                <Card className={`${styles.feedCard} hover-lift`}>
                  <div className={styles.feedContent}>
                    <p className={styles.feedItemTitle}>{item.title}</p>
                    {item.subject && <span className={styles.feedSubject}>{item.subject}</span>}
                  </div>
                  <span className={styles.feedTime}>{item.time}</span>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Streaks & Badges */}
        <div className={styles.sidebarCol}>
          {/* Weekly Activity Map */}
          <section className={styles.sideSection}>
            <p className={styles.subTitle}>Weekly Activity</p>
            <Card className={styles.streakCard}>
              <div className={styles.streakMap}>
                {weeklyStreak.map(day => (
                  <div key={day.day} className={styles.streakDay}>
                    <div className={styles.streakBox} style={{
                      backgroundColor: day.active ? `rgba(99, 102, 241, ${Math.max(0.2, day.tasks * 0.15)})` : 'var(--border-color)',
                      borderColor: day.active ? 'var(--primary-color)' : 'var(--border-color)'
                    }} />
                    <span>{day.day[0]}</span>
                  </div>
                ))}
              </div>
              <div className={styles.streakLegend}>
                <span>Less</span>
                <div className={styles.legendBoxes}>
                  <div className={styles.legendBox} style={{ backgroundColor: 'var(--border-color)' }} />
                  <div className={styles.legendBox} style={{ backgroundColor: 'rgba(99, 102, 241, 0.2)' }} />
                  <div className={styles.legendBox} style={{ backgroundColor: 'rgba(99, 102, 241, 0.5)' }} />
                  <div className={styles.legendBox} style={{ backgroundColor: 'rgba(99, 102, 241, 0.9)' }} />
                </div>
                <span>More</span>
              </div>
            </Card>
          </section>

          {/* Badges Earned */}
          <section className={styles.sideSection}>
            <p className={styles.subTitle}>Badges Earned</p>
            <div className={styles.badgeList}>
              {badges.map(badge => (
                <Card key={badge.id} className={styles.badgeItem}>
                  <div className={styles.badgeIconWrap}>{badge.icon}</div>
                  <div className={styles.badgeInfo}>
                    <p className={styles.badgeNameTitle}>{badge.name}</p>
                    <p>{badge.description}</p>
                    <span className={styles.badgeDate}>Earned {badge.earnedDate}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
