import React from "react";
import type { CalendarEvent, Registration } from '@/mock-server/MockServer';
import { EventCard } from "./EventCard";
import { EmptyState } from "@/components/feedback/EmptyState";
import styles from "../../pages/events.module.css";

interface EventGridProps {
  events: CalendarEvent[];
  registrations: Registration[];
  onSelectEvent: (id: number) => void;
}

export const EventGrid: React.FC<EventGridProps> = ({
  events,
  registrations,
  onSelectEvent,
}) => {
  if (events.length === 0) {
    return (
      <EmptyState
        title="No Events Found"
        description="No upcoming events match your search query or filter selection."
      />
    );
  }

  const getStatus = (id: number) => {
    const reg = registrations.find((r) => r.eventId === id);
    return reg ? reg.status : null;
  };

  return (
    <div className={styles.eventsGrid}>
      {events.map((evt) => (
        <EventCard
          key={evt.id}
          event={evt}
          regStatus={getStatus(evt.id)}
          onSelect={onSelectEvent}
        />
      ))}
    </div>
  );
};
