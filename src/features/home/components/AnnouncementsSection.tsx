import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Megaphone, ChevronLeft, ChevronRight, Pause, Play, ArrowRight } from 'lucide-react';
import styles from './AnnouncementsSection.module.css';

export interface AnnouncementItem {
  id: number;
  eventId: number;
  title: string;
  subtitle: string;
  badge: string;
  badgeBg: string;
  buttonText: string;
  buttonBg: string;
  activeDotColor: string;
  imageUrl: string;
  category: string;
}

const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 1,
    eventId: 101,
    title: 'Summer Camp 2025',
    subtitle: 'Registrations Open!',
    badge: 'NEW',
    badgeBg: '#10B981',
    buttonText: 'Explore Now →',
    buttonBg: '#10B981',
    activeDotColor: '#10B981',
    imageUrl: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=800&q=80',
    category: 'Extracurricular',
  },
  {
    id: 2,
    eventId: 102,
    title: 'New Course Launched!',
    subtitle: 'AI & Machine Learning for Beginners',
    badge: 'NEW COURSE',
    badgeBg: '#2563EB',
    buttonText: 'Enroll Now →',
    buttonBg: '#2563EB',
    activeDotColor: '#2563EB',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    category: 'Technology',
  },
  {
    id: 3,
    eventId: 103,
    title: 'Scholarship Test 2025',
    subtitle: 'Apply before 31 May',
    badge: 'SCHOLARSHIP',
    badgeBg: '#EA580C',
    buttonText: 'Apply Now →',
    buttonBg: '#EA580C',
    activeDotColor: '#EA580C',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    category: 'Academics',
  },
  {
    id: 4,
    eventId: 104,
    title: 'Annual Sports Meet 2025',
    subtitle: 'Registration open',
    badge: 'SPORTS',
    badgeBg: '#8B5CF6',
    buttonText: 'Register Now →',
    buttonBg: '#8B5CF6',
    activeDotColor: '#8B5CF6',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    category: 'Athletics',
  },
  {
    id: 5,
    eventId: 105,
    title: 'Robotics & Science Fair',
    subtitle: 'Innovate & Win Medals',
    badge: 'EXHIBITION',
    badgeBg: '#059669',
    buttonText: 'Submit Project →',
    buttonBg: '#059669',
    activeDotColor: '#059669',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    category: 'Science',
  },
  {
    id: 6,
    eventId: 106,
    title: 'Campus CodeFest 2025',
    subtitle: '24-Hour Hackathon Challenge',
    badge: 'COMPETITION',
    badgeBg: '#7C3AED',
    buttonText: 'Join Hackathon →',
    buttonBg: '#7C3AED',
    activeDotColor: '#7C3AED',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    category: 'Coding',
  },
  {
    id: 7,
    eventId: 107,
    title: 'Campus Arts & Music Fest',
    subtitle: 'Showcase Your Talent Live',
    badge: 'CULTURAL',
    badgeBg: '#D97706',
    buttonText: 'Audition Now →',
    buttonBg: '#D97706',
    activeDotColor: '#D97706',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    category: 'Arts',
  },
  {
    id: 8,
    eventId: 108,
    title: 'Grab Best Study Kits',
    subtitle: 'Up to 40% Off Textbooks',
    badge: 'DISCOUNT',
    badgeBg: '#C026D3',
    buttonText: 'Shop Now →',
    buttonBg: '#C026D3',
    activeDotColor: '#C026D3',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    category: 'Campus Store',
  },
];

export const AnnouncementsSection: React.FC = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = 310;

    if (direction === 'right') {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 20) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    } else {
      if (container.scrollLeft <= 20) {
        container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    if (isPaused || isHovered) return;
    const interval = setInterval(() => {
      scroll('right');
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, isHovered, scroll]);

  const handleCardClick = (eventId: number) => {
    navigate(`/app/school/events?id=${eventId}`);
  };

  const handleViewAllClick = () => {
    navigate('/app/school/events');
  };

  return (
    <section className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconBadge}>
            <Megaphone size={20} color="#F97316" />
          </div>
          <h2 className={styles.title}>
            Announcements
            <span className={styles.announcementCount}>{ANNOUNCEMENTS.length} New</span>
          </h2>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.controlGroup}>
            <button
              className={styles.controlBtn}
              onClick={() => scroll('left')}
              title="Previous Announcement"
              aria-label="Previous announcement"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className={`${styles.controlBtn} ${isPaused ? styles.active : ''}`}
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? 'Resume Auto-scroll' : 'Pause Auto-scroll'}
              aria-label={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            >
              {isPaused ? <Play size={14} /> : <Pause size={14} />}
            </button>
            <button
              className={styles.controlBtn}
              onClick={() => scroll('right')}
              title="Next Announcement"
              aria-label="Next announcement"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <button className={styles.viewAllBtn} onClick={handleViewAllClick}>
            View All <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Auto-Scrolling Horizontal Track with All 8 Cards */}
      <div
        className={styles.carouselWrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.scrollTrack} ref={scrollRef}>
          {ANNOUNCEMENTS.map((item) => (
            <div
              key={item.id}
              className={styles.card}
              onClick={() => handleCardClick(item.eventId)}
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.75) 100%), url(${item.imageUrl})`,
              }}
            >
              {/* Top Content Block */}
              <div className={styles.cardTopContent}>
                {/* Solid Badge */}
                <span
                  className={styles.badge}
                  style={{ backgroundColor: item.badgeBg }}
                >
                  {item.badge}
                </span>

                {/* Title */}
                <h3 className={styles.cardTitle}>{item.title}</h3>

                {/* Subtitle */}
                <p className={styles.cardSubtitle}>{item.subtitle}</p>

                {/* Action CTA Button */}
                <button
                  className={styles.ctaBtn}
                  style={{ backgroundColor: item.buttonBg }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(item.eventId);
                  }}
                >
                  {item.buttonText}
                </button>
              </div>

              {/* Bottom Card Dots Indicator inside card */}
              <div className={styles.cardDotsRow}>
                <div className={styles.cardDotActive} style={{ backgroundColor: item.activeDotColor }} />
                <div className={styles.cardDot} />
                <div className={styles.cardDot} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
