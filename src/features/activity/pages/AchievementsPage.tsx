import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { 
  Award, Star, Trophy, Medal, Flame, 
  Sparkles, CheckCircle2, TrendingUp, Users
} from 'lucide-react';
import styles from './activity.module.css';

interface AchievementItem {
  id: number;
  title: string;
  category: 'academic' | 'sports' | 'coding' | 'community';
  unlockedDate: string;
  points: number;
  iconBg: string;
  iconColor: string;
  description: string;
}

const mockAchievements: AchievementItem[] = [
  { id: 1, title: 'Physics Olympiad Qualifier', category: 'academic', unlockedDate: 'Mar 28, 2026', points: 150, iconBg: '#ECFDF5', iconColor: '#059669', description: 'Scored top 1% score in State Level Science Olympiad.' },
  { id: 2, title: '12-Day Study Streak Champion', category: 'academic', unlockedDate: 'Apr 02, 2026', points: 100, iconBg: '#EFF6FF', iconColor: '#2563EB', description: 'Completed daily lessons and submitted homework consistently for 12 days.' },
  { id: 3, title: 'Annual Track & Field Silver Medal', category: 'sports', unlockedDate: 'Mar 15, 2026', points: 120, iconBg: '#FEF3C7', iconColor: '#D97706', description: 'Secured 2nd position in 200m track sprint event.' },
  { id: 4, title: 'CodeFest 2025 Runner Up', category: 'coding', unlockedDate: 'Feb 20, 2026', points: 200, iconBg: '#F5F3FF', iconColor: '#7C3AED', description: 'Built an automated campus recycling tracker app in 24-hour hackathon.' }
];

export const AchievementsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [achievements, setAchievements] = useState<AchievementItem[]>(mockAchievements);

  const tabs = [
    { id: 'all', label: 'All Badges & Awards', count: achievements.length },
    { id: 'academic', label: 'Academic Stars' },
    { id: 'sports', label: 'Sports & Athletics' },
    { id: 'leaderboard', label: 'Class Leaderboard' }
  ];

  const filtered = activeTab === 'all' ? achievements : achievements.filter(a => a.category === activeTab);

  return (
    <div>
      <PageHeader
        title="Achievements & Gamified Rewards"
        subtitle="Earn badges, collect achievement points, climb class leaderboards, and unlock rewards"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Activity', path: '/activity' }, { label: 'Achievements' }]}
      />

      {/* Gamified Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <Card style={{ padding: '20px', borderRadius: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Trophy size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Achievement Score</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>570 Points</h3>
          </div>
        </Card>

        <Card style={{ padding: '20px', borderRadius: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flame size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Learning Streak</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>12 Days 🔥</h3>
          </div>
        </Card>

        <Card style={{ padding: '20px', borderRadius: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Medal size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Class Rank</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>Rank #2 🥈</h3>
          </div>
        </Card>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab !== 'leaderboard' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '18px', marginTop: '24px' }}>
          {filtered.map(item => (
            <Card key={item.id} style={{ padding: '22px', borderRadius: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: item.iconBg, color: item.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  <Award size={22} />
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f59e0b', background: '#FFFBEB', padding: '4px 10px', borderRadius: '12px' }}>
                  +{item.points} PTS
                </span>
              </div>

              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-main)' }}>{item.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>{item.description}</p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Unlocked: {item.unlockedDate}</span>
                <span>Badge Verified ✓</span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card style={{ padding: '0', borderRadius: '18px', marginTop: '24px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '14px 18px' }}>Rank</th>
                <th style={{ padding: '14px 18px' }}>Student Name</th>
                <th style={{ padding: '14px 18px' }}>Class</th>
                <th style={{ padding: '14px 18px' }}>Streak</th>
                <th style={{ padding: '14px 18px' }}>Total Points</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rank: '🥇 1', name: 'Emma Watson', class: 'Grade 10 - A', streak: '15 Days', pts: '620' },
                { rank: '🥈 2', name: 'Sarah Doe (You)', class: 'Grade 10 - A', streak: '12 Days', pts: '570' },
                { rank: '🥉 3', name: 'Lucas Martin', class: 'Grade 9 - C', streak: '10 Days', pts: '510' },
                { rank: '4', name: 'Ethan Hunt', class: 'Grade 10 - A', streak: '8 Days', pts: '440' }
              ].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)', background: row.name.includes('You') ? 'rgba(13,124,102,0.05)' : 'transparent' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 800 }}>{row.rank}</td>
                  <td style={{ padding: '14px 18px', fontWeight: 700 }}>{row.name}</td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-muted)' }}>{row.class}</td>
                  <td style={{ padding: '14px 18px', fontWeight: 600, color: '#ef4444' }}>{row.streak}</td>
                  <td style={{ padding: '14px 18px', fontWeight: 800, color: 'var(--primary-color)' }}>{row.pts} PTS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
};
