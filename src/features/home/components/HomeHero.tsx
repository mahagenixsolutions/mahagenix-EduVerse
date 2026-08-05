import React from 'react';
import { CalendarCheck, BookOpen, Award, Clock } from 'lucide-react';
const heroStudentImg = '/hero_student_illustration.png';

export const HomeHero: React.FC = () => {
  return (
    <section
      style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '28px 36px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '24px',
        border: '1px solid #F1F5F9',
      }}
    >
      {/* Left Content Area */}
      <div style={{ flex: 1, zIndex: 2, paddingRight: '20px' }}>
        <h1
          style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            color: '#0F172A',
            margin: '0 0 6px 0',
            letterSpacing: '-0.02em',
          }}
        >
          Welcome back, Sarah! 👋
        </h1>
        <p
          style={{
            fontSize: '0.875rem',
            color: '#64748B',
            margin: '0 0 24px 0',
          }}
        >
          Here's what's happening with your studies today.
        </p>

        {/* 4 Stat Stickers Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: '640px',
            gap: '32px',
            alignItems: 'flex-start',
          }}
        >
          {/* Sticker 1: Attendance */}
          <div style={{ minWidth: '90px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: '#ECFDF5',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <CalendarCheck size={16} />
              </div>
              <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
                Attendance
              </span>
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.2, marginBottom: '2px' }}>
              92%
            </div>
            <div style={{ fontSize: '0.725rem', color: '#94A3B8' }}>
              This Month
            </div>
          </div>

          {/* Sticker 2: Homework */}
          <div style={{ minWidth: '90px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: '#FFF7ED',
                  color: '#F97316',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <BookOpen size={16} />
              </div>
              <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
                Homework
              </span>
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.2, marginBottom: '2px' }}>
              3
            </div>
            <div style={{ fontSize: '0.725rem', color: '#94A3B8' }}>
              Pending
            </div>
          </div>

          {/* Sticker 3: Exams */}
          <div style={{ minWidth: '90px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: '#EFF6FF',
                  color: '#3B82F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Award size={16} />
              </div>
              <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
                Exams
              </span>
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.2, marginBottom: '2px' }}>
              2
            </div>
            <div style={{ fontSize: '0.725rem', color: '#94A3B8' }}>
              Upcoming
            </div>
          </div>

          {/* Sticker 4: Classes Today */}
          <div style={{ minWidth: '90px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: '#F3E8FF',
                  color: '#A855F7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Clock size={16} />
              </div>
              <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
                Classes Today
              </span>
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.2, marginBottom: '2px' }}>
              5
            </div>
            <div style={{ fontSize: '0.725rem', color: '#94A3B8' }}>
              Scheduled
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Area: Student Illustration Image */}
      <div
        style={{
          width: '300px',
          height: '190px',
          flexShrink: 0,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '-10px',
        }}
      >
        <img
          src={heroStudentImg}
          alt="Sarah Student Learning"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    </section>
  );
};
