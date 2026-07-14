import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { currentUser, todaySchedule, homework, upcomingExams, schoolNews, quickActions } from '@/mock/data';
import * as Icons from 'lucide-react';
import styles from './home.module.css';

export const HomeDashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Welcome back, {currentUser.name.split(' ')[0]}! 👋</h1>
          <p>You have 2 upcoming exams and 1 pending homework.</p>
        </div>
        <div className={styles.heroImage}>
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=300&q=80" alt="Students" />
        </div>
      </section>

      {/* Quick Actions */}
      <section className={styles.quickActions}>
        {quickActions.map(action => {
          const Icon = (Icons as any)[action.icon];
          return (
            <button key={action.id} className={`${styles.actionCard} hover-lift`}>
              <div className={styles.actionIcon} style={{ backgroundColor: `${action.color}20`, color: action.color }}>
                <Icon size={24} />
              </div>
              <span>{action.label}</span>
            </button>
          );
        })}
      </section>

      <div className={`grid ${styles.mainGrid}`}>
        {/* Left Column */}
        <div className={styles.leftCol}>
          
          {/* Today's Schedule */}
          <Card className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h3>Today's Schedule</h3>
              <a href="#" className={styles.viewAll}>View Full Timetable</a>
            </div>
            <div className={styles.timeline}>
              {todaySchedule.map((item, idx) => (
                <div key={item.id} className={styles.timelineItem}>
                  <div className={styles.timelineTime}>{item.time.split(' - ')[0]}</div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineDot} style={{ 
                      backgroundColor: item.status === 'completed' ? 'var(--success)' : item.status === 'ongoing' ? 'var(--primary-color)' : 'var(--text-light)' 
                    }}></div>
                    {idx !== todaySchedule.length - 1 && <div className={styles.timelineLine}></div>}
                    <div className={`${styles.timelineCard} ${item.status === 'ongoing' ? styles.activeTimelineCard : ''}`}>
                      <h4>{item.subject}</h4>
                      <p>{item.room} • {item.teacher}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Homework */}
          <Card className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h3>Pending Homework</h3>
              <a href="#" className={styles.viewAll}>View All</a>
            </div>
            <div className={styles.list}>
              {homework.map(hw => (
                <div key={hw.id} className={styles.listItem}>
                  <div className={styles.hwIcon}>
                    <Icons.Book size={20} />
                  </div>
                  <div className={styles.listContent}>
                    <h4>{hw.title}</h4>
                    <p>{hw.subject}</p>
                  </div>
                  <div className={styles.listAction}>
                    {hw.status === 'pending' ? (
                      <span className={styles.badgeWarning}>Due {hw.dueDate}</span>
                    ) : (
                      <span className={styles.badgeSuccess}>Completed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className={styles.rightCol}>
          
          {/* Upcoming Exams */}
          <Card className={`${styles.sectionCard} ${styles.examsCard}`}>
            <h3>Upcoming Exams</h3>
            <div className={styles.examList}>
              {upcomingExams.map(exam => (
                <div key={exam.id} className={styles.examItem}>
                  <div className={styles.examDate}>
                    <span>{exam.date.split(' ')[0]}</span>
                    <strong>{exam.date.split(' ')[1]}</strong>
                  </div>
                  <div className={styles.examInfo}>
                    <h4>{exam.subject}</h4>
                    <p>{exam.type}</p>
                  </div>
                  <div className={styles.examDaysLeft}>
                    In {exam.daysLeft} days
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* School News */}
          <Card className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h3>School News</h3>
              <a href="#" className={styles.viewAll}>See All</a>
            </div>
            <div className={styles.newsList}>
              {schoolNews.map(news => (
                <div key={news.id} className={styles.newsItem}>
                  <div className={styles.newsCategory}>{news.category}</div>
                  <h4>{news.title}</h4>
                  <p className={styles.newsDate}>{news.date}</p>
                </div>
              ))}
            </div>
          </Card>
          
          {/* AI Tutor Card */}
          <Card className={styles.aiTutorCard}>
            <div className={styles.aiTutorContent}>
              <h3>Stuck on a concept?</h3>
              <p>EduVerse AI Tutor is ready to help you with Physics and Math.</p>
              <Button variant="secondary" size="sm">Ask AI Tutor ✨</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
