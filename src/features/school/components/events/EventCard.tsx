import React from 'react';
import { Calendar, MapPin, CheckCircle, Info } from 'lucide-react';
import type { CalendarEvent } from '@/mock-server/MockServer';

interface EventCardProps {
  event: CalendarEvent;
  regStatus?: 'registered' | 'interested' | 'cancelled' | null;
  onSelect: (id: number) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  regStatus,
  onSelect,
}) => {
  const isRegistered = regStatus === 'registered';

  const defaultCover =
    event.category === 'Technology'
      ? 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop'
      : event.category === 'Academics'
      ? 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop'
      : event.category === 'Sports'
      ? 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop'
      : event.category === 'Science'
      ? 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop'
      : 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop';

  const coverUrl = event.coverImage || defaultCover;
  const seatsLeft = event.maxSeats ?? 150;

  return (
    <div
      onClick={() => onSelect(event.id)}
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #F1F5F9',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      {/* Top Banner Image with Badges */}
      <div
        style={{
          height: '165px',
          width: '100%',
          position: 'relative',
          backgroundImage: `url(${coverUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Top-Left Category Pill */}
        <span
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(4px)',
            color: '#10B981',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 600,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
          }}
        >
          {event.category || 'General'}
        </span>

        {/* Bottom-Right Seats Left Badge */}
        <span
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            color: '#FFFFFF',
            padding: '3px 10px',
            borderRadius: '999px',
            fontSize: '0.7rem',
            fontWeight: 500,
          }}
        >
          Seats Left: {seatsLeft > 0 ? seatsLeft : 50}
        </span>
      </div>

      {/* Card Body */}
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Header Row with Title & Registered Tag */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '12px',
              marginBottom: '8px',
            }}
          >
            <h3
              style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#0F172A',
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {event.title}
            </h3>

            {isRegistered && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#DCFCE7',
                  color: '#16A34A',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                <CheckCircle size={13} /> Registered
              </span>
            )}
          </div>

          {/* Description Snippet */}
          <p
            style={{
              fontSize: '0.85rem',
              color: '#64748B',
              lineHeight: 1.4,
              margin: '0 0 14px 0',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {event.description || 'Join us for an exciting school event featuring interactive sessions, competitions, and learning.'}
          </p>

          {/* Divider */}
          <div style={{ borderTop: '1px solid #F1F5F9', margin: '10px 0' }} />

          {/* Meta Information Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '14px',
              fontSize: '0.8rem',
              color: '#94A3B8',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} /> {event.date}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={13} /> {event.location}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              👥 {event.fee ? `₹${event.fee}` : '₹Free'}
            </span>
          </div>
        </div>

        {/* Bottom CTA Button matching user's screenshot */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(event.id);
          }}
          style={
            isRegistered
              ? {
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  background: '#FFFFFF',
                  color: '#0F172A',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginTop: '18px',
                  transition: 'all 0.2s ease',
                }
              : {
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#5FAF88',
                  color: '#FFFFFF',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginTop: '18px',
                  boxShadow: '0 4px 12px rgba(95, 175, 136, 0.25)',
                  transition: 'all 0.2s ease',
                }
          }
        >
          {isRegistered ? 'View Registered Ticket' : 'View Event Details'}
        </button>
      </div>
    </div>
  );
};
