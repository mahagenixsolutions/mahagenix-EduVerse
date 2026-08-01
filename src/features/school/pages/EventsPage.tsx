import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MockServer, type CalendarEvent, type Registration } from '@/mock-server/MockServer';
import { useRole } from '@/contexts/RoleContext';
import { 
  ArrowLeft, Calendar, MapPin, Clock, Users, Download, CreditCard, 
  Wallet, QrCode, Phone, Mail, FileText, CheckCircle2, ChevronDown, 
  ChevronUp, Check, AlertCircle, Info, Landmark, HelpCircle, Eye,
  XCircle, Shield, Ticket, IdCard, Printer
} from 'lucide-react';
import styles from './events.module.css';

// Live countdown timer component
const CountdownTimer: React.FC<{ deadline: string }> = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(deadline) - +new Date();
      if (difference <= 0) {
        setIsPassed(true);
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  if (isPassed) {
    return <span style={{ color: 'var(--danger)', fontWeight: 600 }}>Deadline Passed</span>;
  }

  if (!timeLeft) return null;

  return (
    <div className={styles.countdownTime}>
      <div className={styles.timeSegment}>
        <span className={styles.timeVal}>{timeLeft.days}</span>
        <span className={styles.timeLbl}>Days</span>
      </div>
      <span className={styles.timeDivider}>:</span>
      <div className={styles.timeSegment}>
        <span className={styles.timeVal}>{timeLeft.hours.toString().padStart(2, '0')}</span>
        <span className={styles.timeLbl}>Hrs</span>
      </div>
      <span className={styles.timeDivider}>:</span>
      <div className={styles.timeSegment}>
        <span className={styles.timeVal}>{timeLeft.minutes.toString().padStart(2, '0')}</span>
        <span className={styles.timeLbl}>Mins</span>
      </div>
      <span className={styles.timeDivider}>:</span>
      <div className={styles.timeSegment}>
        <span className={styles.timeVal}>{timeLeft.seconds.toString().padStart(2, '0')}</span>
        <span className={styles.timeLbl}>Secs</span>
      </div>
    </div>
  );
};

export const EventsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser } = useRole();

  const [activeTab, setActiveTab] = useState('explore');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected event and checkout flows
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'profile_review' | 'payment_select' | 'payment_process' | 'success' | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'wallet' | 'netbanking'>('upi');
  const [paymentDetails, setPaymentDetails] = useState({ cardNo: '4532 •••• •••• 8901', expiry: '12/28', name: 'SARAH DOE', cvv: '123' });
  const [upiId, setUpiId] = useState('sarah.doe@okaxis');
  const [createdReg, setCreatedReg] = useState<Registration | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Fetch from MockServer
  const loadData = async () => {
    setLoading(true);
    const allEvents = await MockServer.getEvents();
    const studentRegs = await MockServer.getStudentRegistrations('GFA-2025-10042');
    
    // Only display published events for students
    setEvents(allEvents.filter(e => e.status === 'published'));
    setRegistrations(studentRegs);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  // Check URL search parameters (e.g. ?id=101)
  useEffect(() => {
    const eventIdParam = searchParams.get('id');
    if (eventIdParam && events.length > 0) {
      const eventId = parseInt(eventIdParam, 10);
      if (events.some(e => e.id === eventId)) {
        setSelectedEventId(eventId);
      }
    }
  }, [searchParams, events]);

  const selectEvent = (id: number) => {
    setSelectedEventId(id);
    setSearchParams({ id: id.toString() });
  };

  const closeDetails = () => {
    setSelectedEventId(null);
    setCheckoutStep(null);
    setSearchParams({});
    loadData();
  };

  const handleInterest = async (eventId: number) => {
    // Interest clicked - transition to Profile Review screen
    setCheckoutStep('profile_review');
  };

  const handleProceedToPayment = () => {
    // Go to Payment Select screen
    setCheckoutStep('payment_select');
  };

  const handleProcessPayment = (eventId: number, amount: number) => {
    setCheckoutStep('payment_process');
    // Simulate payment transaction
    setTimeout(async () => {
      const reg = await MockServer.completePayment(eventId, 'GFA-2025-10042', paymentMethod, amount);
      setCreatedReg(reg);
      setCheckoutStep('success');
    }, 1500);
  };

  // Check registration status of a specific event
  const getRegStatus = (eventId: number) => {
    const reg = registrations.find(r => r.eventId === eventId);
    return reg ? reg.status : null;
  };

  const getRegDetails = (eventId: number) => {
    return registrations.find(r => r.eventId === eventId) || null;
  };

  const tabs = [
    { id: 'explore', label: 'Explore Events', count: events.length },
    { id: 'my_events', label: 'My Events', count: registrations.filter(r => r.status === 'registered').length },
    { id: 'payment_history', label: 'Payment History', count: registrations.filter(r => r.paymentStatus === 'paid').length }
  ];

  const selectedEvent = events.find(e => e.id === selectedEventId);

  // Mock FAQs
  const mockFaqs = [
    { q: 'Is transportation provided?', a: 'Yes, round-trip school bus transportation is included in the package. Buses leave at the specified start time from the school assembly gates.' },
    { q: 'What is the refund policy?', a: 'Cancellations made 5 days before the event are eligible for a 100% refund. No refunds will be provided for cancellations made within 48 hours of the event.' },
    { q: 'Are outside foods allowed?', a: 'Simple snacks and water bottles are permitted. Lunch and breakfasts are fully catered by the school partners and included in paid tickets.' }
  ];

  if (selectedEventId && selectedEvent) {
    const regState = getRegStatus(selectedEvent.id);
    const regDetails = getRegDetails(selectedEvent.id);
    
    return (
      <div className={styles.detailsPage}>
        <div>
          <button className={styles.backBtn} onClick={closeDetails}>
            <ArrowLeft size={16} /> Back to Events List
          </button>
        </div>

        {/* Hero banner */}
        <div 
          className={styles.detailsHero} 
          style={{ backgroundImage: `url(${selectedEvent.coverImage})` }}
        >
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <span className={styles.heroCategory}>{selectedEvent.category}</span>
            <h2 className={styles.heroTitle}>{selectedEvent.title}</h2>
            <div className={styles.heroMeta}>
              <span className={styles.heroMetaItem}><Calendar size={16} /> {selectedEvent.date}</span>
              <span className={styles.heroMetaItem}><Clock size={16} /> {selectedEvent.time} – {selectedEvent.endTime || 'Wrap up'}</span>
              <span className={styles.heroMetaItem}><MapPin size={16} /> {selectedEvent.location}</span>
            </div>
          </div>
        </div>

        {/* Details Grid layout: Main details (Left), Sticky widgets (Right) */}
        <div className={styles.detailsGrid}>
          {/* Main Details Panel */}
          <div className={styles.mainPanel}>
            <div className={styles.sectionCard}>
              <p className={styles.sectionTitle}>Event Description</p>
              <p className={styles.richText}>{selectedEvent.description}</p>
            </div>

            {selectedEvent.highlights && (
              <div className={styles.sectionCard}>
                <p className={styles.sectionTitle}>Event Highlights</p>
                <div className={styles.highlightsList}>
                  {selectedEvent.highlights.map((high, idx) => (
                    <div key={idx} className={styles.highlightItem}>
                      <CheckCircle2 size={18} className={styles.highlightIcon} />
                      <span>{high}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline Itinerary */}
            <div className={styles.sectionCard}>
              <p className={styles.sectionTitle}>Itinerary / Program Timeline</p>
              <div className={styles.timeline}>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <span className={styles.timelineTime}>{selectedEvent.time}</span>
                    <span className={styles.timelineHeading}>Departure & Assembly</span>
                    <span className={styles.timelineDesc}>Assembly at School Gate A. Briefing by coordinators and bus boarding.</span>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <span className={styles.timelineTime}>11:30 AM</span>
                    <span className={styles.timelineHeading}>Arrival & Interactive Session</span>
                    <span className={styles.timelineDesc}>Guided tour of venues, hands-on activities, and group experiments.</span>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <span className={styles.timelineTime}>01:30 PM</span>
                    <span className={styles.timelineHeading}>Catered Buffet Lunch</span>
                    <span className={styles.timelineDesc}>Healthy delicious vegetarian buffet provided at the venue catering gardens.</span>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <span className={styles.timelineTime}>04:30 PM</span>
                    <span className={styles.timelineHeading}>Closing Ceremony & Departure</span>
                    <span className={styles.timelineDesc}>Awarding certificate credits, packing bagpacks, and departing back.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inclusions / Exclusions */}
            <div className={styles.sectionCard}>
              <p className={styles.sectionTitle}>Details Summary</p>
              <div className={styles.inclusionGrid}>
                <div className={styles.includedBox}>
                  <h5 style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary-color)', marginBottom: '8px' }}>What's Included:</h5>
                  <div className={styles.incItem}><Check size={16} color="var(--primary-color)" /> Transportation both directions</div>
                  <div className={styles.incItem}><Check size={16} color="var(--primary-color)" /> Entry permits and ticket passes</div>
                  <div className={styles.incItem}><Check size={16} color="var(--primary-color)" /> Lunch and beverages</div>
                  <div className={styles.incItem}><Check size={16} color="var(--primary-color)" /> Student participation certificates</div>
                </div>
                <div className={styles.excludedBox}>
                  <h5 style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--danger)', marginBottom: '8px' }}>What's NOT Included:</h5>
                  <div className={styles.excItem}><XCircle size={16} color="var(--danger)" /> Personal shopping expenses</div>
                  <div className={styles.excItem}><XCircle size={16} color="var(--danger)" /> Custom cameras or equipment rental</div>
                  <div className={styles.excItem}><XCircle size={16} color="var(--danger)" /> Separate room service additions</div>
                </div>
              </div>
            </div>

            {/* Google Map location */}
            <div className={styles.sectionCard}>
              <p className={styles.sectionTitle}>Venue Map Location</p>
              <div style={{
                borderRadius: '16px', height: '240px', background: 'var(--bg-secondary)', overflow: 'hidden', 
                border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)'
              }}>
                <MapPin size={32} color="var(--primary-color)" style={{ marginBottom: '8px' }} />
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{selectedEvent.venue}</span>
                <span style={{ fontSize: '0.8rem', marginTop: '4px' }}>{selectedEvent.location}</span>
                <a href={selectedEvent.googleMapLink} target="_blank" rel="noopener noreferrer" style={{
                  marginTop: '12px', fontSize: '0.813rem', color: '#fff', background: 'var(--primary-color)', padding: '6px 16px', borderRadius: '12px'
                }}>Open in Google Maps</a>
              </div>
            </div>

            {/* Gallery Images */}
            {selectedEvent.gallery && selectedEvent.gallery.length > 0 && (
              <div className={styles.sectionCard}>
                <p className={styles.sectionTitle}>Event Gallery Preview</p>
                <div className={styles.galleryGrid}>
                  {selectedEvent.gallery.map((img, idx) => (
                    <img key={idx} src={img} alt={`Gallery ${idx + 1}`} className={styles.galleryImg} />
                  ))}
                </div>
              </div>
            )}

            {/* Important Instructions */}
            {selectedEvent.instructions && (
              <div className={styles.sectionCard} style={{ borderLeft: '4px solid var(--warning)' }}>
                <p className={styles.sectionTitle} style={{ color: 'var(--warning)' }}>Important Instructions</p>
                <p className={styles.richText} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <Info size={18} style={{ color: 'var(--warning)', flexShrink: 0, marginTop: '2px' }} />
                  <span>{selectedEvent.instructions}</span>
                </p>
              </div>
            )}

            {/* FAQ List */}
            <div className={styles.sectionCard}>
              <p className={styles.sectionTitle}>Frequently Asked Questions (FAQs)</p>
              <div className={styles.faqList}>
                {mockFaqs.map((faq, idx) => (
                  <div key={idx} className={styles.faqItem}>
                    <button 
                      className={styles.faqHeader} 
                      onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    >
                      <span>{faq.q}</span>
                      {expandedFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {expandedFaq === idx && (
                      <div className={styles.faqBody}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact coordinator */}
            <div className={styles.sectionCard}>
              <p className={styles.sectionTitle}>Organizer & Coordinator Info</p>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{
                  width: 50, height: 50, borderRadius: '50%', background: 'var(--primary-light)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)'
                }}>
                  <Users size={22} />
                </div>
                <div>
                  <h5 style={{ fontWeight: 600, fontSize: '0.95rem' }}>{selectedEvent.organizer}</h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Event Management Committee Representative</p>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={12} /> {selectedEvent.contactNumber}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12} /> events@greenfield.edu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Side Card */}
          <div className={styles.sidebarCard}>
            <div>
              <span className={styles.priceLabel}>Registration Fee</span>
              <div className={styles.priceVal}>
                ₹{selectedEvent.fee || 'Free'}
                {selectedEvent.fee ? <span className={styles.priceSub}>/ student</span> : null}
              </div>
            </div>

            {/* Max seats details */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span>Available Seats:</span>
              <span style={{ fontWeight: 600 }}>{selectedEvent.maxSeats || 100} maximum seats</span>
            </div>

            {/* Registration status badge */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', display: 'block', marginBottom: '6px' }}>Your Status</span>
              {regState === 'registered' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span className={styles.badgeSuccess} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 12px', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={16} /> ✅ Registered
                  </span>
                  
                  {regDetails && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px', background: 'var(--bg-secondary)', padding: '10px', borderRadius: '12px' }}>
                      <span>💳 Payment Status: Paid</span>
                      <span>📅 Date: {new Date(regDetails.registrationDate).toLocaleDateString()}</span>
                      <span>🔢 TxID: {regDetails.transactionId}</span>
                    </div>
                  )}

                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setCreatedReg(regDetails);
                      setCheckoutStep('success');
                    }}
                    style={{ width: '100%', marginTop: '6px' }}
                  >
                    View Ticket & Receipt
                  </Button>
                </div>
              ) : regState === 'interested' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span className={styles.badgePending} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 12px', fontSize: '0.9rem' }}>
                    <Info size={16} /> Interested (Payment Pending)
                  </span>
                  <Button variant="primary" style={{ width: '100%', marginTop: '4px' }} onClick={handleProceedToPayment}>
                    Complete Payment
                  </Button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button 
                    variant="primary" 
                    style={{ flex: 1 }} 
                    onClick={() => handleInterest(selectedEvent.id)}
                  >
                    Interested
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      alert('Feedback captured. Thank you!');
                    }}
                  >
                    Not Interested
                  </Button>
                </div>
              )}
            </div>

            {/* Countdown timer */}
            {selectedEvent.registrationDeadline && (
              <div className={styles.deadlineCountdown}>
                <span className={styles.countdownLabel}>Registration Closes In:</span>
                <CountdownTimer deadline={selectedEvent.registrationDeadline} />
              </div>
            )}

            {/* Attachment download */}
            {selectedEvent.pdfUrl && (
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); alert(`Downloading file: ${selectedEvent.pdfUrl}`); }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', 
                  fontSize: '0.85rem', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', padding: '12px', borderRadius: '12px'
                }}
              >
                <Download size={16} /> Download Trip Itinerary (PDF)
              </a>
            )}
          </div>
        </div>

        {/* -------------------- STICKY / OVERLAY MODALS -------------------- */}

        {/* Profile Verification & Checkout Step */}
        {checkoutStep === 'profile_review' && (
          <div className={styles.paymentOverlay}>
            <div className={styles.paymentModal}>
              <div className={styles.modalHeader}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={20} color="var(--primary-color)" /> Review Student Information
                </h3>
                <button 
                  onClick={() => setCheckoutStep(null)} 
                  style={{ cursor: 'pointer', color: 'var(--text-light)' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  For ease of registration, the School ERP has pre-filled your academic and guardian details automatically. Please confirm the details before proceeding.
                </p>

                {/* Profile Card */}
                <div className={styles.profileReview}>
                  <img 
                    src="https://i.pravatar.cc/150?u=sarah" 
                    alt="Sarah Doe" 
                    className={styles.profileAvatar}
                  />
                  <div className={styles.profileDetails}>
                    <h4>Sarah Doe</h4>
                    <p style={{ fontWeight: 600, color: 'var(--primary-color)' }}>ID: GFA-2025-10042</p>
                    <p>Admission No: ADM-2023-8891</p>
                    <p>Class: 10th Grade (Sec A) • Roll: #12</p>
                  </div>
                </div>

                <div className={styles.detailsGridSmall}>
                  <div style={{ background: 'var(--bg-secondary)', padding: '10px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', display: 'block' }}>Parent/Guardian Name</span>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>John Doe</span>
                  </div>
                  <div style={{ background: 'var(--bg-secondary)', padding: '10px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', display: 'block' }}>Parent Phone Number</span>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>+91 98765 43211</span>
                  </div>
                  <div style={{ background: 'var(--bg-secondary)', padding: '10px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', display: 'block' }}>Parent Email Address</span>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>john.doe@email.com</span>
                  </div>
                  <div style={{ background: 'var(--bg-secondary)', padding: '10px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', display: 'block' }}>Institution Facility</span>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Greenfield Academy</span>
                  </div>
                </div>

                {/* Summary Box */}
                <div className={styles.summarySection}>
                  <div className={styles.summaryRow}>
                    <span>Event Base Fee:</span>
                    <span>₹{selectedEvent.fee}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Handling Fees (ERP):</span>
                    <span>₹0 (Waived)</span>
                  </div>
                  <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                    <span>Grand Total:</span>
                    <span>₹{selectedEvent.fee}</span>
                  </div>
                </div>

                {/* Terms checkbox */}
                <div style={{ display: 'flex', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)', alignItems: 'flex-start' }}>
                  <input type="checkbox" defaultChecked required style={{ marginTop: '2px' }} />
                  <span>I agree to follow the code of conduct and consent to guidelines set by coordinators.</span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  <Button 
                    variant="outline" 
                    style={{ flex: 1 }} 
                    onClick={async () => {
                      // Save interested state then close
                      await MockServer.registerInterest(selectedEvent.id, 'GFA-2025-10042');
                      setCheckoutStep(null);
                      loadData();
                    }}
                  >
                    Save Draft (Interested)
                  </Button>
                  <Button 
                    variant="primary" 
                    style={{ flex: 1 }} 
                    onClick={async () => {
                      // Save interested and proceed
                      await MockServer.registerInterest(selectedEvent.id, 'GFA-2025-10042');
                      handleProceedToPayment();
                    }}
                  >
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Selection Overlay */}
        {checkoutStep === 'payment_select' && (
          <div className={styles.paymentOverlay}>
            <div className={styles.paymentModal}>
              <div className={styles.modalHeader}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CreditCard size={20} color="var(--primary-color)" /> Select Payment Method
                </h3>
                <button 
                  onClick={() => setCheckoutStep('profile_review')} 
                  style={{ cursor: 'pointer', color: 'var(--text-light)' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className={styles.summarySection}>
                  <div className={styles.summaryRow}>
                    <span>Event Name:</span>
                    <span style={{ fontWeight: 600 }}>{selectedEvent.title}</span>
                  </div>
                  <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                    <span>Amount Payable:</span>
                    <span>₹{selectedEvent.fee}</span>
                  </div>
                </div>

                {/* Horizontal payment selectors */}
                <div className={styles.paymentMethodsList}>
                  <button 
                    className={`${styles.methodBtn} ${paymentMethod === 'upi' ? styles.methodBtnActive : ''}`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <QrCode size={20} />
                    <span>UPI / Scan QR</span>
                  </button>
                  <button 
                    className={`${styles.methodBtn} ${paymentMethod === 'card' ? styles.methodBtnActive : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CreditCard size={20} />
                    <span>Card Pay</span>
                  </button>
                  <button 
                    className={`${styles.methodBtn} ${paymentMethod === 'wallet' ? styles.methodBtnActive : ''}`}
                    onClick={() => setPaymentMethod('wallet')}
                  >
                    <Wallet size={20} />
                    <span>E-Wallets</span>
                  </button>
                  <button 
                    className={`${styles.methodBtn} ${paymentMethod === 'netbanking' ? styles.methodBtnActive : ''}`}
                    onClick={() => setPaymentMethod('netbanking')}
                  >
                    <Landmark size={20} />
                    <span>Net Banking</span>
                  </button>
                </div>

                {/* Sub-form based on selection */}
                {paymentMethod === 'card' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '8px 0' }}>
                    {/* Visual Card mockup */}
                    <div className={styles.cardContainer}>
                      <div className={styles.cardLogoRow}>
                        <div className={styles.cardChip} />
                        <span style={{ fontSize: '1rem', fontWeight: 800 }}>VISA</span>
                      </div>
                      <div className={styles.cardNumber}>{paymentDetails.cardNo}</div>
                      <div className={styles.cardDetailsRow}>
                        <div>
                          <div style={{ opacity: 0.6 }}>CARD HOLDER</div>
                          <div className={styles.cardHolderName}>{paymentDetails.name}</div>
                        </div>
                        <div>
                          <div style={{ opacity: 0.6 }}>EXPIRES</div>
                          <div>{paymentDetails.expiry}</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ flex: 2 }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Card Number</label>
                        <input 
                          type="text" 
                          value={paymentDetails.cardNo} 
                          onChange={e => setPaymentDetails({ ...paymentDetails, cardNo: e.target.value })}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>CVV</label>
                        <input 
                          type="text" 
                          maxLength={3} 
                          value={paymentDetails.cvv} 
                          onChange={e => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px 0', alignItems: 'center' }}>
                    <div style={{ background: '#fff', border: '1px solid var(--border-color)', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'center' }}>
                      {/* Fake QR code to scan */}
                      <svg width="120" height="120" viewBox="0 0 100 100" style={{ shapeRendering: 'crispEdges' }}>
                        <rect x="0" y="0" width="100" height="100" fill="#ffffff" />
                        <rect x="10" y="10" width="30" height="30" fill="#5FAF88" />
                        <rect x="15" y="15" width="20" height="20" fill="#ffffff" />
                        <rect x="18" y="18" width="14" height="14" fill="#5FAF88" />
                        <rect x="60" y="10" width="30" height="30" fill="#5FAF88" />
                        <rect x="65" y="15" width="20" height="20" fill="#ffffff" />
                        <rect x="68" y="18" width="14" height="14" fill="#5FAF88" />
                        <rect x="10" y="60" width="30" height="30" fill="#5FAF88" />
                        <rect x="15" y="65" width="20" height="20" fill="#ffffff" />
                        <rect x="60" y="60" width="30" height="30" fill="#5FAF88" />
                        <rect x="75" y="75" width="15" height="15" fill="#5FAF88" />
                        <rect x="60" y="45" width="10" height="10" fill="#5FAF88" />
                        <rect x="45" y="10" width="10" height="10" fill="#5FAF88" />
                        <rect x="35" y="35" width="10" height="10" fill="#5FAF88" />
                        <rect x="45" y="45" width="15" height="15" fill="#5FAF88" />
                      </svg>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Scan using BHIM, GooglePay, PhonePe, or Paytm</span>

                    <div style={{ width: '100%', marginTop: '8px' }}>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Or enter UPI ID</label>
                      <input 
                        type="text" 
                        value={upiId} 
                        onChange={e => setUpiId(e.target.value)}
                        placeholder="username@upi"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'wallet' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '8px 0' }}>
                    {['Paytm Wallet', 'Amazon Pay', 'PhonePe Wallet', 'Mobikwik'].map(w => (
                      <button key={w} style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px', background: 'var(--bg-secondary)', fontWeight: 600, fontSize: '0.85rem' }} onClick={() => alert(`${w} linked!`)}>
                        {w}
                      </button>
                    ))}
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div style={{ width: '100%', padding: '8px 0' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Popular Banks</label>
                    <select style={{ borderRadius: '12px', border: '1px solid var(--border-color)', padding: '10px' }}>
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {/* Action button */}
                <Button 
                  variant="primary" 
                  onClick={() => handleProcessPayment(selectedEvent.id, selectedEvent.fee || 0)}
                  style={{ width: '100%', marginTop: '12px' }}
                >
                  Pay ₹{selectedEvent.fee} Now
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Processing Overlay */}
        {checkoutStep === 'payment_process' && (
          <div className={styles.paymentOverlay}>
            <div className={styles.paymentModal} style={{ maxWidth: '380px', textAlign: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '24px 0' }}>
                <div style={{
                  width: 50, height: 50, borderRadius: '50%', border: '4px solid var(--border-color)', 
                  borderTopColor: 'var(--primary-color)', animation: 'skeleton-loading 1.2s infinite linear'
                }} />
                <h4 style={{ fontWeight: 700 }}>Processing Payment...</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Please do not reload the page or click back. We are verifying with your bank nodes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Payment Success & Ticket Display Overlay */}
        {checkoutStep === 'success' && createdReg && (
          <div className={styles.paymentOverlay}>
            <button 
              className={styles.overlayCloseBtn}
              onClick={() => { setCheckoutStep(null); closeDetails(); }}
              aria-label="Close"
            >
              <XCircle size={36} />
            </button>
            <div className={`${styles.paymentModal} ${styles.successModal}`} style={{ maxWidth: '540px' }}>
              <div className={styles.successContainer}>
                {/* Confetti added via CSS pseudo-elements in successModal, but we can add some explicit shapes if needed */}
                <div className={`${styles.confettiShape} ${styles.confetti1}`} />
                <div className={`${styles.confettiShape} ${styles.confetti2}`} />
                <div className={`${styles.confettiShape} ${styles.confetti3}`} />
                <div className={`${styles.confettiShape} ${styles.confetti4}`} />

                <div className={styles.successIconWrap}>
                  <div className={styles.successIcon}>
                    <Check strokeWidth={3} size={28} />
                  </div>
                </div>
                <div>
                  <h4 className={styles.successTitle}>Payment Successful!</h4>
                  <p className={styles.successSubtitle}>
                    Your ticket for {selectedEvent.title} has been generated.
                  </p>
                </div>

                <div className={styles.ticketOuter}>
                  {/* Fake cutouts for the perforated tear line */}
                  <div className={styles.ticketCutoutLeft} />
                  <div className={styles.ticketCutoutRight} />

                  <div className={styles.ticketShape}>
                    <div className={styles.ticketGreenHeader}>
                      <div className={styles.ticketHeaderLeft}>
                        <div className={styles.ticketHeaderLogo}>
                          <Shield size={24} />
                        </div>
                        <div>
                          <div className={styles.ticketHeaderTitle}>GREENFIELD ACADEMY</div>
                          <div className={styles.ticketHeaderSub}>Excellence In Education</div>
                        </div>
                      </div>
                      <div className={styles.ticketStamp}>
                        <CheckCircle2 size={16} /> CONFIRMED PASS
                      </div>
                    </div>

                    <div className={styles.ticketBody}>
                      <div className={styles.ticketUser}>
                        <img 
                          src="https://i.pravatar.cc/150?u=sarah" 
                          alt="Sarah Doe" 
                          className={styles.ticketUserImg}
                        />
                        <div>
                          <div className={styles.ticketUserName}>{createdReg.studentName}</div>
                          <div className={styles.ticketUserMeta}>
                            Class: <span className={styles.ticketUserMetaHighlight}>{createdReg.class} ({createdReg.section})</span> &nbsp;|&nbsp; Roll: {createdReg.rollNumber}
                          </div>
                        </div>
                      </div>

                      <div className={styles.ticketDivider} />

                      <div className={styles.ticketDetailsGrid}>
                        <div className={styles.ticketDetailItem}>
                          <Ticket size={20} className={styles.ticketDetailIcon} />
                          <div className={styles.ticketDetailContent}>
                            <span className={styles.ticketDetailLabel}>Ticket Reference</span>
                            <span className={styles.ticketDetailValue}>{createdReg.ticketNumber}</span>
                          </div>
                        </div>
                        <div className={styles.ticketDetailItem}>
                          <IdCard size={20} className={styles.ticketDetailIcon} />
                          <div className={styles.ticketDetailContent}>
                            <span className={styles.ticketDetailLabel}>Transaction ID</span>
                            <span className={styles.ticketDetailValue}>{createdReg.transactionId}</span>
                          </div>
                        </div>
                        <div className={styles.ticketDetailItem}>
                          <Calendar size={20} className={styles.ticketDetailIcon} />
                          <div className={styles.ticketDetailContent}>
                            <span className={styles.ticketDetailLabel}>Registration Date</span>
                            <span className={styles.ticketDetailValue}>{new Date(createdReg.registrationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                          </div>
                        </div>
                        <div className={styles.ticketDetailItem}>
                          <Wallet size={20} className={styles.ticketDetailIcon} />
                          <div className={styles.ticketDetailContent}>
                            <span className={styles.ticketDetailLabel}>Fee Paid</span>
                            <span className={styles.ticketDetailValueGreen}>₹{createdReg.amountPaid}</span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.ticketDivider} />

                      <div className={styles.ticketBottomSection}>
                        <div className={styles.ticketQrWrap}>
                          {/* SVG generated QR Code mockup */}
                          <svg viewBox="0 0 100 100" style={{ shapeRendering: 'crispEdges' }}>
                            <rect x="0" y="0" width="100" height="100" fill="#ffffff" />
                            <rect x="10" y="10" width="30" height="30" fill="#1F2937" />
                            <rect x="15" y="15" width="20" height="20" fill="#ffffff" />
                            <rect x="18" y="18" width="14" height="14" fill="#1F2937" />
                            <rect x="60" y="10" width="30" height="30" fill="#1F2937" />
                            <rect x="65" y="15" width="20" height="20" fill="#ffffff" />
                            <rect x="68" y="18" width="14" height="14" fill="#1F2937" />
                            <rect x="10" y="60" width="30" height="30" fill="#1F2937" />
                            <rect x="15" y="65" width="20" height="20" fill="#ffffff" />
                            <rect x="60" y="60" width="30" height="30" fill="#1F2937" />
                            <rect x="75" y="75" width="15" height="15" fill="#1F2937" />
                            <rect x="45" y="45" width="10" height="10" fill="#1F2937" />
                            <rect x="35" y="55" width="10" height="10" fill="#1F2937" />
                            <rect x="15" y="45" width="15" height="10" fill="#1F2937" />
                            <rect x="45" y="65" width="10" height="25" fill="#1F2937" />
                            <rect x="20" y="45" width="10" height="10" fill="#1F2937" />
                            <rect x="60" y="45" width="15" height="10" fill="#1F2937" />
                            <rect x="80" y="45" width="10" height="25" fill="#1F2937" />
                          </svg>
                        </div>
                        
                        <div className={styles.ticketInstructions}>
                          <div className={styles.ticketInstructionsHeader}>
                            <Info size={14} /> Important Instructions
                          </div>
                          <div className={styles.ticketInstructionItem}>
                            <CheckCircle2 size={12} /> Please carry this e-ticket on the day of the test.
                          </div>
                          <div className={styles.ticketInstructionItem}>
                            <CheckCircle2 size={12} /> Show this QR code at the exam center.
                          </div>
                          <div className={styles.ticketInstructionItem}>
                            <CheckCircle2 size={12} /> This ticket is non-transferable.
                          </div>
                          <div className={styles.ticketInstructionItem}>
                            <CheckCircle2 size={12} /> Contact school authority for any queries.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.ticketTearLine} />

                    <div className={styles.ticketFooter}>
                      <button 
                        className={styles.btnDownload}
                        onClick={() => alert(`Downloading Ticket for ${createdReg.ticketNumber}`)}
                      >
                        <Download size={18} /> Download Ticket
                      </button>
                      <button 
                        className={styles.btnReceipt}
                        onClick={() => alert(`Downloading ERP Transaction Invoice: ${createdReg.transactionId}`)}
                      >
                        <Printer size={18} /> Receipt Invoice
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Explore Events view
  const renderExplore = () => {
    if (events.length === 0) {
      return (
        <div className={styles.emptyState}>
          <Calendar size={48} color="var(--text-light)" />
          <h3>No events found</h3>
          <p>There are no school events listed in this portal right now.</p>
        </div>
      );
    }

    return (
      <div className={styles.eventsGrid}>
        {events.map(event => {
          const regState = getRegStatus(event.id);
          return (
            <div key={event.id} className={styles.eventCard}>
              <div 
                className={styles.cardBanner} 
                style={{ backgroundImage: `url(${event.coverImage || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=400'})` }}
              >
                <span className={styles.categoryBadge}>{event.category}</span>
                {event.maxSeats && (
                  <span className={styles.seatsLeftBadge}>Seats Left: {event.maxSeats - registrations.filter(r => r.eventId === event.id && r.status === 'registered').length}</span>
                )}
              </div>
              <div className={styles.cardBody}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <p className={styles.cardTitle}>{event.title}</p>
                  {regState === 'registered' ? (
                    <Badge variant="success">✅ Registered</Badge>
                  ) : regState === 'interested' ? (
                    <Badge variant="warning">Interested</Badge>
                  ) : null}
                </div>
                <p className={styles.cardDesc}>{event.description}</p>
                <div className={styles.cardMeta}>
                  <span className={styles.cardMetaItem}><Calendar size={14} /> {event.date}</span>
                  <span className={styles.cardMetaItem}><MapPin size={14} /> {event.location}</span>
                  <span className={styles.cardMetaItem}><Users size={14} /> ₹{event.fee || 'Free'}</span>
                </div>
              </div>
              <div className={styles.cardActions}>
                <Button 
                  variant={regState === 'registered' ? 'outline' : 'primary'} 
                  onClick={() => selectEvent(event.id)}
                  style={{ width: '100%', borderRadius: '12px' }}
                >
                  {regState === 'registered' ? 'View Registered Ticket' : 'View Event Details'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // My Events view
  const renderMyEvents = () => {
    const myRegistrations = registrations.filter(r => r.status === 'registered');

    if (myRegistrations.length === 0) {
      return (
        <div className={styles.emptyState}>
          <Calendar size={48} color="var(--text-light)" />
          <h3>No registered events</h3>
          <p>You have not registered for any events yet. Explore events and register now!</p>
        </div>
      );
    }

    return (
      <div className={styles.eventsGrid}>
        {myRegistrations.map(reg => {
          const event = events.find(e => e.id === reg.eventId);
          if (!event) return null;
          return (
            <div key={reg.id} className={styles.eventCard}>
              <div 
                className={styles.cardBanner} 
                style={{ backgroundImage: `url(${event.coverImage || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=400'})` }}
              >
                <span className={styles.categoryBadge}>{event.category}</span>
                <span className={styles.seatsLeftBadge} style={{ background: 'var(--primary-color)' }}>✅ CONFIRMED</span>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardTitle}>{event.title}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem', color: 'var(--text-muted)', margin: '8px 0' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> Date: {event.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> Time: {event.time}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} /> Venue: {event.venue}</span>
                </div>
                <div style={{ marginTop: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '10px', fontSize: '0.8rem', color: 'var(--text-light)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Ticket: {reg.ticketNumber}</span>
                  <span>TxID: {reg.transactionId}</span>
                </div>
              </div>
              <div className={styles.cardActions} style={{ display: 'flex', gap: '8px' }}>
                <Button 
                  variant="outline" 
                  onClick={() => selectEvent(event.id)}
                  style={{ flex: 1, borderRadius: '12px' }}
                >
                  Details
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setCreatedReg(reg);
                    setSelectedEventId(event.id);
                    setCheckoutStep('success');
                  }}
                  style={{ flex: 1, borderRadius: '12px', display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Eye size={14} /> View Pass
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Payment History view
  const renderPaymentHistory = () => {
    const paidRegistrations = registrations.filter(r => r.paymentStatus === 'paid');

    if (paidRegistrations.length === 0) {
      return (
        <div className={styles.emptyState}>
          <FileText size={48} color="var(--text-light)" />
          <h3>No payment records</h3>
          <p>No event transactions are logged for your profile.</p>
        </div>
      );
    }

    return (
      <div className={styles.historyTable}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Event Title</th>
              <th>Transaction ID</th>
              <th>Ticket Ref</th>
              <th>Payment Method</th>
              <th>Amount Paid</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {paidRegistrations.map(reg => {
              const event = events.find(e => e.id === reg.eventId);
              return (
                <tr key={reg.id}>
                  <td style={{ fontSize: '0.813rem' }}>{new Date(reg.registrationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                  <td style={{ fontWeight: 600 }}>{event?.title || 'Unknown Event'}</td>
                  <td style={{ fontSize: '0.813rem', color: 'var(--text-muted)' }}>{reg.transactionId}</td>
                  <td style={{ fontSize: '0.813rem', color: 'var(--text-muted)' }}>{reg.ticketNumber}</td>
                  <td><span style={{ background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>card/upi</span></td>
                  <td style={{ fontWeight: 700, color: 'var(--primary-color)' }}>₹{reg.amountPaid}</td>
                  <td>
                    <button 
                      style={{ color: 'var(--primary-color)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: 600 }}
                      onClick={() => alert(`Downloading Invoice Receipt for TxN: ${reg.transactionId}`)}
                    >
                      <Download size={14} /> Download
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <PageHeader 
        title="Student Event Hub" 
        subtitle="Manage and register for premium extracurricular trips, sports matches, and school competitions" 
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'School', path: '/school' }, { label: 'Events' }]} 
      />

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', marginTop: '16px' }}>
          <div className="skeleton" style={{ width: '100%', height: '220px', borderRadius: '18px' }}></div>
          <div className="skeleton" style={{ width: '100%', height: '220px', borderRadius: '18px' }}></div>
        </div>
      ) : (
        <>
          {activeTab === 'explore' && renderExplore()}
          {activeTab === 'my_events' && renderMyEvents()}
          {activeTab === 'payment_history' && renderPaymentHistory()}
        </>
      )}
    </div>
  );
};
