import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MockServer, type CalendarEvent, type Registration } from '@/mock-server/MockServer';
import { useRole } from '@/contexts/RoleContext';
import { EventHeader } from '../components/events/EventHeader';
import { EventSearchFilter } from '../components/events/EventSearchFilter';
import { EventGrid } from '../components/events/EventGrid';
import { EventDetailsView } from '../components/events/EventDetailsView';
import { EventRegistrationModal } from '../components/events/EventRegistrationModal';
import styles from './events.module.css';

export const EventsPage: React.FC = () => {
  const { currentUser } = useRole();
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  // Registration modal checkout steps
  const [checkoutStep, setCheckoutStep] = useState<
    'profile_review' | 'payment_select' | 'payment_process' | 'success' | null
  >(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [createdReg, setCreatedReg] = useState<Registration | null>(null);

  const loadData = async () => {
    setLoading(true);
    const allEvents = await MockServer.getEvents();
    const studentRegs = await MockServer.getStudentRegistrations('GFA-2025-10042');
    setEvents(allEvents.filter((e) => e.status === 'published'));
    setRegistrations(studentRegs);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  useEffect(() => {
    const eventIdParam = searchParams.get('id');
    if (eventIdParam && events.length > 0) {
      const eventId = parseInt(eventIdParam, 10);
      if (events.some((e) => e.id === eventId)) {
        setSelectedEventId(eventId);
      }
    }
  }, [searchParams, events]);

  const handleSelectEvent = (id: number) => {
    setSelectedEventId(id);
  };

  const handleBackToList = () => {
    setSelectedEventId(null);
    setSearchParams({});
  };

  const handleStartRegistration = () => {
    setCheckoutStep('profile_review');
  };

  const handleCloseModal = () => {
    setCheckoutStep(null);
    loadData();
  };

  const handleProcessPayment = () => {
    if (!selectedEventId) return;
    const evt = events.find((e) => e.id === selectedEventId);
    setCheckoutStep('payment_process');
    setTimeout(async () => {
      const reg = await MockServer.completePayment(
        selectedEventId,
        'GFA-2025-10042',
        paymentMethod,
        evt?.fee || 0,
      );
      setCreatedReg(reg);
      setCheckoutStep('success');
    }, 1500);
  };

  const categories: string[] = Array.from(new Set(events.map((e) => e.category).filter((c) => c != null))) as string[];

  const filteredEvents = events.filter((evt) => {
    const matchesTab =
      activeTab === 'explore' ||
      (activeTab === 'my_events' &&
        registrations.some((r) => r.eventId === evt.id && r.status === 'registered')) ||
      (activeTab === 'payment_history' &&
        registrations.some((r) => r.eventId === evt.id && r.paymentStatus === 'paid'));

    const matchesCategory =
      selectedCategory === 'All' || evt.category === selectedCategory;

    const matchesQuery =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (evt.location ?? '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesCategory && matchesQuery;
  });

  const tabItems = [
    { id: 'explore', label: 'Explore Events', count: events.length },
    {
      id: 'my_events',
      label: 'My Events',
      count: registrations.filter((r) => r.status === 'registered').length,
    },
    {
      id: 'payment_history',
      label: 'Payment History',
      count: registrations.filter((r) => r.paymentStatus === 'paid').length,
    },
  ];

  const selectedEvent = events.find((e) => e.id === selectedEventId);
  const selectedRegistration = registrations.find((r) => r.eventId === selectedEventId);

  return (
    <div className={styles.eventsPageContainer}>
      {selectedEvent ? (
        <EventDetailsView
          event={selectedEvent}
          registration={selectedRegistration}
          onBack={handleBackToList}
          onRegister={handleStartRegistration}
        />
      ) : (
        <>
          <EventHeader />

          <EventSearchFilter
            activeTab={activeTab}
            onTabChange={setActiveTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
            tabItems={tabItems}
          />

          <EventGrid
            events={filteredEvents}
            registrations={registrations}
            onSelectEvent={handleSelectEvent}
          />
        </>
      )}

      {checkoutStep && selectedEvent && (
        <EventRegistrationModal
          event={selectedEvent}
          step={checkoutStep}
          paymentMethod={paymentMethod}
          onPaymentMethodChange={setPaymentMethod}
          onProceedToPayment={() => setCheckoutStep('payment_select')}
          onProcessPayment={handleProcessPayment}
          onClose={handleCloseModal}
          createdReg={createdReg}
        />
      )}
    </div>
  );
};
