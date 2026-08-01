import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { Shield, Users, GraduationCap, TrendingUp, Building2, Book, Target, BriefcaseBusiness, Wrench } from 'lucide-react';

export const TrustBadgesSection: React.FC = () => (
  <section className="mkt-section mkt-trust-section" id="trust">
    {/* Decorative Map / Background Elements */}
    <div className="mkt-trust-bg">
      <div className="mkt-trust-marker" style={{ top: '20%', right: '25%' }}>
        <div className="mkt-trust-pin"></div>
        <div className="mkt-trust-pulse"></div>
      </div>
      <div className="mkt-trust-marker" style={{ top: '45%', right: '15%' }}>
        <div className="mkt-trust-pin"></div>
        <div className="mkt-trust-pulse"></div>
      </div>
      <div className="mkt-trust-marker" style={{ bottom: '30%', right: '35%' }}>
        <div className="mkt-trust-pin"></div>
        <div className="mkt-trust-pulse"></div>
      </div>
      {/* Subtle bar charts in background left */}
      <div className="mkt-trust-bg-bars">
        <div className="bg-bar" style={{ height: '40px' }}></div>
        <div className="bg-bar" style={{ height: '70px' }}></div>
        <div className="bg-bar" style={{ height: '100px' }}></div>
        <div className="bg-bar" style={{ height: '60px' }}></div>
      </div>
    </div>
    
    <div className="mkt-container" style={{ position: 'relative', zIndex: 2 }}>
      <SectionHeader
        badge="Trusted by Schools Nationwide"
        badgeIcon={<Shield size={14} />}
        title={<>Powering Schools<br/>Across <span className="mkt-text-purple">the Nation</span></>}
        subtitle="From small schools to large university networks, EduVerse scales with your institution."
      />

      {/* Stats */}
      <div className="mkt-stats-grid">
        <div className="mkt-stat">
          <div className="mkt-stat__icon mkt-stat__icon--purple">
            <Building2 size={26} />
          </div>
          <div className="mkt-stat__value">
            <AnimatedCounter value={50} suffix="+" />
          </div>
          <div className="mkt-stat__label">Schools Trust Us</div>
        </div>
        <div className="mkt-stat">
          <div className="mkt-stat__icon mkt-stat__icon--blue">
            <Users size={26} />
          </div>
          <div className="mkt-stat__value">
            <AnimatedCounter value={25000} suffix="+" />
          </div>
          <div className="mkt-stat__label">Active Students</div>
        </div>
        <div className="mkt-stat">
          <div className="mkt-stat__icon mkt-stat__icon--green">
            <GraduationCap size={26} />
          </div>
          <div className="mkt-stat__value">
            <AnimatedCounter value={400} suffix="+" />
          </div>
          <div className="mkt-stat__label">Empowered Teachers</div>
        </div>
        <div className="mkt-stat">
          <div className="mkt-stat__icon mkt-stat__icon--orange">
            <TrendingUp size={26} />
          </div>
          <div className="mkt-stat__value">
            <AnimatedCounter value={99.9} suffix="%" />
          </div>
          <div className="mkt-stat__label">Platform Uptime</div>
        </div>
      </div>

      {/* Industries */}
      <div className="mkt-industries-grid">
        <div className="mkt-industry-chip">
          <Building2 size={16} color="#3b82f6" /> <span>K-12 Schools</span>
        </div>
        <div className="mkt-industry-chip">
          <Book size={16} color="#06b6d4" /> <span>Higher Education</span>
        </div>
        <div className="mkt-industry-chip">
          <Target size={16} color="#f97316" /> <span>Coaching Institutes</span>
        </div>
        <div className="mkt-industry-chip">
          <BriefcaseBusiness size={16} color="#8b5cf6" /> <span>Corporate Learning</span>
        </div>
        <div className="mkt-industry-chip">
          <Wrench size={16} color="#ec4899" /> <span>Training Centers</span>
        </div>
      </div>
    </div>
  </section>
);
