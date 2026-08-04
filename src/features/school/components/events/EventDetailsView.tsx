import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Download,
  ChevronDown,
  ChevronUp,
  User,
  Phone,
  Mail,
  ExternalLink,
  Info,
} from 'lucide-react';
import type { CalendarEvent, Registration } from '@/mock-server/MockServer';

interface EventDetailsViewProps {
  event: CalendarEvent;
  registration?: Registration | null;
  onBack: () => void;
  onRegister: () => void;
}

export const EventDetailsView: React.FC<EventDetailsViewProps> = ({
  event,
  registration,
  onBack,
  onRegister,
}) => {
  const [interestedStatus, setInterestedStatus] = useState<'interested' | 'not_interested' | null>('interested');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // --- Live Countdown Timer ---
  const getTimeLeft = (deadline: string) => {
    // Sanitize: trim whitespace and fix malformed ISO strings (e.g. "2026-05-25T 23:59:59")
    const sanitized = deadline.trim().replace(/T\s+/, 'T');
    const target = new Date(sanitized).getTime();
    if (isNaN(target)) return null;          // guard against unparseable strings
    const diff = target - Date.now();
    if (diff <= 0) return null;
    const totalSeconds = Math.floor(diff / 1000);
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  };

  const [timeLeft, setTimeLeft] = useState(() =>
    event.registrationDeadline ? getTimeLeft(event.registrationDeadline) : null
  );

  useEffect(() => {
    if (!event.registrationDeadline) return;
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(event.registrationDeadline!));
    }, 1000);
    return () => clearInterval(timer);
  }, [event.registrationDeadline]);

  const isRegistered = registration?.status === 'registered';

  const faqs = [
    {
      question: 'Is transportation provided?',
      answer: 'Yes, AC luxury buses are arranged from School Gate A for round-trip transportation.',
    },
    {
      question: 'What is the refund policy?',
      answer: '100% refund is issued if registration is cancelled at least 48 hours prior to event start.',
    },
    {
      question: 'Are outside foods allowed?',
      answer: 'Healthy vegetarian lunch buffet and beverages are included. Personal water bottles are allowed.',
    },
  ];

  const defaultCover =
    event.category === 'Technology'
      ? 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop'
      : event.category === 'Academics'
      ? 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop'
      : event.category === 'Sports'
      ? 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop'
      : 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop';

  const coverUrl = event.coverImage || defaultCover;

  return (
    <div style={{ width: '100%', marginBottom: '40px' }}>
      {/* Top Back Navigation Button */}
      <button
        onClick={onBack}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          color: '#5FAF88',
          fontSize: '0.9rem',
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: '18px',
          padding: 0,
        }}
      >
        <ArrowLeft size={18} /> Back to Events List
      </button>

      {/* Hero Banner matching screenshot */}
      <div
        style={{
          height: '240px',
          width: '100%',
          borderRadius: '24px',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.2)), url(${coverUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '28px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          color: '#FFFFFF',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        }}
      >
        {/* Top-Left Category Badge */}
        <span
          style={{
            position: 'absolute',
            top: '20px',
            left: '28px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            color: '#10B981',
            padding: '4px 14px',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {event.category || 'EXTRACURRICULAR'}
        </span>

        {/* Title & Meta Row */}
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            margin: '0 0 10px 0',
            letterSpacing: '-0.02em',
          }}
        >
          {event.title}
        </h1>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            fontSize: '0.875rem',
            color: '#E2E8F0',
            fontWeight: 500,
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={16} /> {event.date}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={16} /> {event.time || '08:00 AM - 05:00 PM'}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={16} /> {event.location}
          </span>
        </div>
      </div>

      {/* Main Two-Column Grid Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
          gap: '28px',
          marginTop: '28px',
          alignItems: 'start',
        }}
      >
        {/* LEFT COLUMN CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Card 1: Event Description */}
          <div className="sectionCard" style={cardStyle}>
            <h3 style={sectionHeadingStyle}>Event Description</h3>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
              {event.description ||
                'Join our exciting 2-week Summer Camp featuring robotics workshops, outdoor athletics, creative arts, leadership training, and nature trails for all student grade levels.'}
            </p>
          </div>

          {/* Card 2: Event Highlights */}
          <div className="sectionCard" style={cardStyle}>
            <h3 style={sectionHeadingStyle}>Event Highlights</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={highlightItemStyle}>
                <CheckCircle size={16} color="#10B981" /> 2 Weeks of outdoor athletics & team survival challenges
              </div>
              <div style={highlightItemStyle}>
                <CheckCircle size={16} color="#10B981" /> Hands-on robotics and coding bootcamps
              </div>
              <div style={highlightItemStyle}>
                <CheckCircle size={16} color="#10B981" /> Art, acoustic music, and drama workshops
              </div>
              <div style={highlightItemStyle}>
                <CheckCircle size={16} color="#10B981" /> Campfire grand finale and team trophy ceremony
              </div>
            </div>
          </div>

          {/* Card 3: Itinerary / Program Timeline */}
          <div className="sectionCard" style={cardStyle}>
            <h3 style={sectionHeadingStyle}>Itinerary / Program Timeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', paddingLeft: '8px' }}>
              {/* Vertical Connector Line */}
              <div
                style={{
                  position: 'absolute',
                  left: '11px',
                  top: '12px',
                  bottom: '12px',
                  width: '2px',
                  background: '#E2E8F0',
                }}
              />

              {[
                {
                  time: '08:00 AM',
                  title: 'Departure & Assembly',
                  desc: 'Assembly at School Gate A. Briefing by coordinator and bus boarding.',
                },
                {
                  time: '11:30 AM',
                  title: 'Arrival & Interactive Session',
                  desc: 'Guided tour of venue, hands-on activities, and group experiments.',
                },
                {
                  time: '01:30 PM',
                  title: 'Catered Buffet Lunch',
                  desc: 'Healthy delicious vegetarian buffet provided at the venue catering gardens.',
                },
                {
                  time: '04:30 PM',
                  title: 'Closing Ceremony & Departure',
                  desc: 'Awarding certificate credits, packing backpacks, and departing back.',
                },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 2 }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#5FAF88',
                      marginTop: '6px',
                      boxShadow: '0 0 0 4px #ECFDF5',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#5FAF88', marginBottom: '2px' }}>
                      {item.time}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.825rem', color: '#64748B' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Details Summary */}
          <div className="sectionCard" style={cardStyle}>
            <h3 style={sectionHeadingStyle}>Details Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#10B981', margin: '0 0 12px 0' }}>
                  What's Included:
                </h4>
                <ul style={summaryListStyle}>
                  <li><CheckCircle size={14} color="#10B981" /> Transportation both directions</li>
                  <li><CheckCircle size={14} color="#10B981" /> Entry permits and ticket passes</li>
                  <li><CheckCircle size={14} color="#10B981" /> Lunch and beverages</li>
                  <li><CheckCircle size={14} color="#10B981" /> Student participation certificates</li>
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#EF4444', margin: '0 0 12px 0' }}>
                  What's NOT Included:
                </h4>
                <ul style={summaryListStyle}>
                  <li><XCircle size={14} color="#EF4444" /> Personal shopping expenses</li>
                  <li><XCircle size={14} color="#EF4444" /> Custom camera or equipment rental</li>
                  <li><XCircle size={14} color="#EF4444" /> Separate room service additions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 5: Venue Map Location */}
          <div className="sectionCard" style={cardStyle}>
            <h3 style={sectionHeadingStyle}>Venue Map Location</h3>
            <div
              style={{
                background: '#F8FAFC',
                borderRadius: '16px',
                padding: '28px',
                textAlign: 'center',
                border: '1px dashed #CBD5E1',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#ECFDF5',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto',
                }}
              >
                <MapPin size={24} />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 4px 0' }}>
                Outdoor Pavilion & Science Wing
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0 0 16px 0' }}>
                {event.location}
              </p>
              <button
                style={{
                  background: '#5FAF88',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '8px 18px',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                Open in Google Maps <ExternalLink size={13} />
              </button>
            </div>
          </div>

          {/* Card 6: Event Gallery Preview */}
          <div className="sectionCard" style={cardStyle}>
            <h3 style={sectionHeadingStyle}>Event Gallery Preview</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              {[
                'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=400',
                'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=400',
                'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400',
              ].map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`Gallery ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: '110px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Card 7: Important Instructions Alert Box */}
          <div
            style={{
              background: '#FFFBEB',
              borderLeft: '4px solid #F59E0B',
              borderRadius: '16px',
              padding: '18px 24px',
            }}
          >
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#D97706', margin: '0 0 6px 0' }}>
              Important Instructions
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#B45309', margin: 0, display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', flexShrink: 0 }}><Info size={16} /></span> Students should bring comfortable sports gear, water bottles, and school ID. Lunch and refreshments provided daily.
            </p>
          </div>

          {/* Card 8: Frequently Asked Questions (FAQs) */}
          <div className="sectionCard" style={cardStyle}>
            <h3 style={sectionHeadingStyle}>Frequently Asked Questions (FAQs)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#F8FAFC',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>
                      {faq.question}
                    </span>
                    {openFaqIndex === idx ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
                  </div>
                  {openFaqIndex === idx && (
                    <p style={{ fontSize: '0.825rem', color: '#64748B', margin: '10px 0 0 0', lineHeight: 1.5 }}>
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card 9: Organizer & Coordinator Info */}
          <div className="sectionCard" style={cardStyle}>
            <h3 style={sectionHeadingStyle}>Organizer & Coordinator Info</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#ECFDF5',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <User size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: '0 0 2px 0' }}>
                  Student Affairs & Activities Council
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 6px 0' }}>
                  Event Management Committee Representative
                </p>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.775rem', color: '#94A3B8' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Phone size={12} /> +91 98765 43211</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Mail size={12} /> events@campus1.edu</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN STICKY REGISTRATION SIDEBAR */}
        <div
          style={{
            position: 'sticky',
            top: '24px',
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #F1F5F9',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div>
            <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#94A3B8', letterSpacing: '0.05em', marginBottom: '6px' }}>
              REGISTRATION FEE
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>
                {event.fee ? `₹${event.fee}` : '₹Free'}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>/ student</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', color: '#64748B' }}>
            <span>Available Seats:</span>
            <span style={{ fontWeight: 700, color: '#0F172A' }}>
              {event.maxSeats || 150} maximum seats
            </span>
          </div>

          {/* Your Status Pill Toggle */}
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '8px' }}>Your Status:</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setInterestedStatus('interested')}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '10px',
                  border: 'none',
                  background: interestedStatus === 'interested' ? '#5FAF88' : '#F1F5F9',
                  color: interestedStatus === 'interested' ? '#FFFFFF' : '#64748B',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Interested
              </button>
              <button
                onClick={() => setInterestedStatus('not_interested')}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '10px',
                  border: 'none',
                  background: interestedStatus === 'not_interested' ? '#EF4444' : '#F1F5F9',
                  color: interestedStatus === 'not_interested' ? '#FFFFFF' : '#64748B',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Not Interested
              </button>
            </div>
          </div>

          {/* Registration Deadline Countdown Box */}
          <div
            style={{
              background: 'linear-gradient(135deg, #FFF5F5 0%, #F8FAFC 100%)',
              borderRadius: '14px',
              padding: '14px 16px',
              border: '1px solid #FEE2E2',
            }}
          >
            <div style={{ fontSize: '0.725rem', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '10px' }}>
              Registration Closes In
            </div>
            {timeLeft ? (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hrs' },
                  { value: timeLeft.minutes, label: 'Min' },
                  { value: timeLeft.seconds, label: 'Sec' },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    style={{
                      flex: 1,
                      background: '#FFFFFF',
                      borderRadius: '10px',
                      padding: '8px 4px',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(239,68,68,0.08)',
                      border: '1px solid #FEE2E2',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '1.4rem',
                        fontWeight: 800,
                        color: '#EF4444',
                        lineHeight: 1,
                        fontVariantNumeric: 'tabular-nums',
                        fontFamily: 'monospace',
                      }}
                    >
                      {String(unit.value).padStart(2, '0')}
                    </div>
                    <div style={{ fontSize: '0.6rem', fontWeight: 600, color: '#94A3B8', marginTop: '4px', letterSpacing: '0.03em' }}>
                      {unit.label}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#EF4444' }}>
                🔒 Registration Closed
              </div>
            )}
          </div>

          {/* Main Action Button */}
          <button
            onClick={onRegister}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              background: isRegistered ? '#10B981' : '#5FAF88',
              color: '#FFFFFF',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(95, 175, 136, 0.3)',
            }}
          >
            {isRegistered ? 'View Ticket & Pass' : 'Proceed to Register'}
          </button>

          {/* Download Trip Itinerary Button */}
          <button
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              background: '#FFFFFF',
              color: '#475569',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <Download size={14} /> Download Trip Itinerary (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  borderRadius: '20px',
  border: '1px solid #F1F5F9',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
  padding: '24px',
};

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  fontWeight: 800,
  color: '#0F172A',
  margin: '0 0 16px 0',
  borderLeft: '4px solid #5FAF88',
  paddingLeft: '12px',
};

const highlightItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '0.85rem',
  color: '#334155',
};

const summaryListStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  fontSize: '0.85rem',
  color: '#475569',
};
