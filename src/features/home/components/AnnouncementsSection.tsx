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
  badgeColor: string;
  buttonText: string;
  buttonBg: string;
  cardBg: string;
  imageUrl: string;
  category: string;
}

const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 1,
    eventId: 101,
    title: 'Summer Camp 2025',
    subtitle: 'Registrations Open!',
    badge: 'New',
    badgeBg: '#10B981',
    badgeColor: '#FFFFFF',
    buttonText: 'Explore Now →',
    buttonBg: '#10B981',
    cardBg: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=400&q=80',
    category: 'Extracurricular'
  },
  {
    id: 2,
    eventId: 102,
    title: 'New Course Launched!',
    subtitle: 'AI & Machine Learning for Beginners',
    badge: 'New Course',
    badgeBg: '#2563EB',
    badgeColor: '#FFFFFF',
    buttonText: 'Enroll Now →',
    buttonBg: '#2563EB',
    cardBg: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80',
    category: 'Technology'
  },
  {
    id: 3,
    eventId: 103,
    title: 'Scholarship Test 2025',
    subtitle: 'Apply before 31 May',
    badge: 'Scholarship',
    badgeBg: '#D97706',
    badgeColor: '#FFFFFF',
    buttonText: 'Apply Now →',
    buttonBg: '#D97706',
    cardBg: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80',
    category: 'Academics'
  },
  {
    id: 4,
    eventId: 104,
    title: 'Grab the Best Study Material',
    subtitle: 'Up to 40% Off on Textbooks & Kits',
    badge: 'Discount',
    badgeBg: '#C026D3',
    badgeColor: '#FFFFFF',
    buttonText: 'Shop Now →',
    buttonBg: '#C026D3',
    cardBg: 'linear-gradient(135deg, #FDF4FF 0%, #FAE8FF 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80',
    category: 'Campus Store'
  },
  {
    id: 5,
    eventId: 105,
    title: 'Annual Sports Meet 2025',
    subtitle: 'Registration Opens Today!',
    badge: 'Sports',
    badgeBg: '#EF4444',
    badgeColor: '#FFFFFF',
    buttonText: 'Register →',
    buttonBg: '#EF4444',
    cardBg: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80',
    category: 'Athletics'
  },
  {
    id: 6,
    eventId: 106,
    title: 'Robotics & Science Fair',
    subtitle: 'Innovate & Win Medals',
    badge: 'Exhibition',
    badgeBg: '#059669',
    badgeColor: '#FFFFFF',
    buttonText: 'Submit Project →',
    buttonBg: '#059669',
    cardBg: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80',
    category: 'Science'
  },
  {
    id: 7,
    eventId: 107,
    title: 'Campus CodeFest 2025',
    subtitle: '24-Hour Hackathon',
    badge: 'Competition',
    badgeBg: '#7C3AED',
    badgeColor: '#FFFFFF',
    buttonText: 'Join Hackathon →',
    buttonBg: '#7C3AED',
    cardBg: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
    category: 'Coding'
  },
  {
    id: 8,
    eventId: 108,
    title: 'Campus Arts & Music Fest',
    subtitle: 'Showcase Your Talent',
    badge: 'Cultural',
    badgeBg: '#EA580C',
    badgeColor: '#FFFFFF',
    buttonText: 'Audition Now →',
    buttonBg: '#EA580C',
    cardBg: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80',
    category: 'Arts'
  }
];

export const AnnouncementsSection: React.FC = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Function to scroll left/right
  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = 350; // card width + gap
    
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

  // Auto scroll effect
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
      {/* Header with Title and Control Buttons */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconBadge}>
            <Megaphone size={18} />
          </div>
          <h2 className={styles.title}>
            Announcements
            <span className={styles.announcementCount}>{ANNOUNCEMENTS.length}</span>
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
              title={isPaused ? "Resume Auto-scroll" : "Pause Auto-scroll"}
              aria-label={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
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

          <button 
            className={styles.viewAllBtn}
            onClick={handleViewAllClick}
          >
            View All <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Auto-scrolling Horizontal Track */}
      <div 
        className={styles.carouselWrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.scrollTrack} ref={scrollRef}>
          {ANNOUNCEMENTS.map(item => (
            <div 
              key={item.id}
              className={styles.card}
              style={{ background: item.cardBg }}
              onClick={() => handleCardClick(item.eventId)}
              title={`View ${item.title} details in Student Event Hub`}
            >
              <div className={styles.cardContent}>
                <span 
                  className={styles.badge}
                  style={{ backgroundColor: item.badgeBg, color: item.badgeColor }}
                >
                  {item.badge}
                </span>

                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardSubtitle}>{item.subtitle}</p>

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

              {/* Real Picture Container */}
              <div className={styles.cardImageWrapper}>
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className={styles.cardImage}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
