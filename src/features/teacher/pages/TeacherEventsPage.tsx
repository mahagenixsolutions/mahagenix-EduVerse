import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { PageHeader } from '@/components/navigation/PageHeader';
import { MockServer, type CalendarEvent, type Registration } from '@/mock-server/MockServer';
import { 
  Calendar, MapPin, Clock, Users, Plus, X, Search, Filter, 
  ChevronRight, DollarSign, Award, BookOpen, AlertCircle, 
  TrendingUp, Download, Eye, Phone, Mail, FileText, CheckCircle2,
  Trash2
} from 'lucide-react';
import styles from './teacher-events.module.css';

export const TeacherEventsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [eventFilter, setEventFilter] = useState('all'); // all, published, draft
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);
  const [formValues, setFormValues] = useState({
    title: '',
    category: 'Educational Trip' as any,
    coverImage: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600',
    description: '',
    highlights: '',
    date: '',
    time: '',
    endTime: '',
    venue: '',
    googleMapLink: '',
    organizer: 'Greenfield Academy Administration',
    contactNumber: '+91 98765 43210',
    maxSeats: '60',
    registrationDeadline: '',
    fee: '1500',
    paymentRequired: 'Yes',
    pdfUrl: 'Event_Brochure.pdf',
    gallery: '',
    instructions: ''
  });

  // Selected Student Drawer
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedStudentProfile, setSelectedStudentProfile] = useState<any | null>(null);
  const [selectedStudentReg, setSelectedStudentReg] = useState<Registration | null>(null);

  // Search/Filters for registrations
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all'); // all, paid, pending
  const [classFilter, setClassFilter] = useState('all');

  const loadData = async () => {
    setLoading(true);
    const allEvents = await MockServer.getEvents();
    const allRegs = await MockServer.getRegistrations();
    setEvents(allEvents);
    setRegistrations(allRegs);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateEvent = async (status: 'draft' | 'published') => {
    if (!formValues.title || !formValues.date || !formValues.venue) {
      alert('Please fill out Title, Date, and Venue fields.');
      return;
    }

    const payload: Omit<CalendarEvent, 'id'> = {
      title: formValues.title,
      date: formValues.date,
      time: formValues.time || '10:00 AM',
      endTime: formValues.endTime || '04:00 PM',
      type: 'event',
      color: formValues.category === 'Sports' ? '#3B82F6' : formValues.category === 'Educational Trip' ? '#5FAF88' : '#EF4444',
      location: formValues.venue,
      venue: formValues.venue,
      category: formValues.category,
      coverImage: formValues.coverImage,
      description: formValues.description || 'No description provided.',
      highlights: formValues.highlights ? formValues.highlights.split(',').map(h => h.trim()) : [],
      googleMapLink: formValues.googleMapLink || 'https://maps.google.com',
      organizer: formValues.organizer,
      contactNumber: formValues.contactNumber,
      maxSeats: parseInt(formValues.maxSeats, 10) || 100,
      registrationDeadline: formValues.registrationDeadline || formValues.date + 'T23:59:59',
      fee: formValues.paymentRequired === 'Yes' ? (parseInt(formValues.fee, 10) || 0) : 0,
      paymentRequired: formValues.paymentRequired === 'Yes',
      pdfUrl: formValues.pdfUrl,
      gallery: formValues.gallery ? formValues.gallery.split(',').map(g => g.trim()) : [],
      instructions: formValues.instructions,
      status: status
    };

    await MockServer.createEvent(payload);
    setShowCreateDrawer(false);
    
    // Reset form
    setFormValues({
      title: '',
      category: 'Educational Trip',
      coverImage: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600',
      description: '',
      highlights: '',
      date: '',
      time: '',
      endTime: '',
      venue: '',
      googleMapLink: '',
      organizer: 'Greenfield Academy Administration',
      contactNumber: '+91 98765 43210',
      maxSeats: '60',
      registrationDeadline: '',
      fee: '1500',
      paymentRequired: 'Yes',
      pdfUrl: 'Event_Brochure.pdf',
      gallery: '',
      instructions: ''
    });

    loadData();
    alert(status === 'published' ? 'Event Published successfully!' : 'Draft Saved successfully!');
  };

  const handlePublishExisting = async (id: number) => {
    await MockServer.publishEvent(id);
    loadData();
    alert('Event Published successfully!');
  };

  const openStudentDrawer = (studentId: string, reg: Registration) => {
    setSelectedStudentId(studentId);
    setSelectedStudentReg(reg);
    
    // Set mock detailed profile statistics for Sarah Doe or others
    const isSarah = studentId === 'GFA-2025-10042' || reg.studentName === 'Sarah Doe';
    setSelectedStudentProfile({
      name: reg.studentName,
      photo: reg.studentPhoto,
      admissionNo: (reg as any).admissionNumber || reg.studentId || (isSarah ? 'ADM-2023-8891' : 'ADM-2024-' + Math.floor(Math.random() * 9000 + 1000)),
      rollNumber: reg.rollNumber,
      class: reg.class,
      section: reg.section,
      attendancePercentage: isSarah ? 92 : Math.floor(Math.random() * 15 + 80),
      academicPerformance: isSarah ? 'A (GPA: 3.8/4)' : ['A', 'A-', 'B+', 'B'][Math.floor(Math.random() * 4)] + ' (GPA: ' + (Math.random() * 1 + 3.0).toFixed(1) + '/4)',
      parentDetails: {
        father: reg.parentName,
        phone: reg.parentPhone,
        email: reg.parentEmail
      },
      emergencyContact: isSarah ? '+91 98765 43299 (Uncle)' : '+91 98765 ' + Math.floor(Math.random() * 90000 + 10000),
      address: isSarah ? '104 Greenfield Avenue, Block C, Bangalore, India' : 'Sector 12 House ' + Math.floor(Math.random() * 200 + 1),
      medicalNotes: isSarah ? 'Mild asthma, carries inhaler. No major food allergies.' : 'No major medical constraints.',
      teacherNotes: 'Active team leader in group projects. Highly cooperative.',
      registrationDate: reg.registrationDate,
      paymentMethod: reg.paymentStatus === 'paid' ? 'UPI/Card Direct' : 'N/A'
    });
  };

  const closeStudentDrawer = () => {
    setSelectedStudentId(null);
    setSelectedStudentProfile(null);
    setSelectedStudentReg(null);
  };

  // Pre-configured templates for cover images
  const coverTemplates = [
    { name: 'Nature/Trip', url: 'https://images.unsplash.com/photo-1506461883276-594a12b11cc3?q=80&w=600' },
    { name: 'Sports', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600' },
    { name: 'Coding', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600' },
    { name: 'Art', url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600' }
  ];

  // Filters for registrations
  const filteredRegs = registrations.filter(reg => {
    const event = events.find(e => e.id === reg.eventId);
    const matchesSearch = reg.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (event?.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPayment = paymentFilter === 'all' || reg.paymentStatus === paymentFilter;
    const matchesClass = classFilter === 'all' || reg.class.includes(classFilter);
    return matchesSearch && matchesPayment && matchesClass;
  });

  // Analytics helper calculations
  const totalEvents = events.length;
  const publishedCount = events.filter(e => e.status === 'published').length;
  const draftCount = events.filter(e => e.status === 'draft').length;
  const totalRegistrations = registrations.filter(r => r.status === 'registered').length;
  const totalRevenue = registrations.reduce((sum, r) => sum + (r.paymentStatus === 'paid' ? r.amountPaid : 0), 0);
  const pendingPayments = registrations.filter(r => r.paymentStatus === 'pending').length;
  const totalAvailableSeats = events.reduce((sum, e) => sum + (e.maxSeats || 100), 0);
  const seatsRemaining = totalAvailableSeats - totalRegistrations;
  
  // Find most popular event
  const getEventRegCount = (eventId: number) => registrations.filter(r => r.eventId === eventId && r.status === 'registered').length;
  const popularEvent = events.length > 0 
    ? [...events].sort((a,b) => getEventRegCount(b.id) - getEventRegCount(a.id))[0]
    : null;

  // Tabs structure
  const tabsList = [
    { id: 'events', label: 'Manage Events', count: events.length },
    { id: 'registrations', label: 'Student Registrations', count: registrations.length },
    { id: 'analytics', label: 'Analytics Board' }
  ];

  // Render events list tab
  const renderEventsTab = () => {
    let filtered = events;
    if (eventFilter === 'published') filtered = events.filter(e => e.status === 'published');
    else if (eventFilter === 'draft') filtered = events.filter(e => e.status === 'draft');

    return (
      <div style={{ marginTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'published', 'draft'].map(filter => (
              <Button 
                key={filter} 
                variant={eventFilter === filter ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setEventFilter(filter)}
                style={{ textTransform: 'capitalize' }}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className={styles.emptyState} style={{ padding: '48px', border: '1px dashed var(--border-color)', borderRadius: '20px', textAlign: 'center', marginTop: '24px', background: 'var(--surface-color)' }}>
            <Calendar size={48} color="var(--text-light)" style={{ marginBottom: '12px' }} />
            <h3>No Events Found</h3>
            <p style={{ color: 'var(--text-muted)' }}>There are no events matching your filter category.</p>
          </div>
        ) : (
          <div className={styles.eventsGrid}>
            {filtered.map(event => {
              const regCount = getEventRegCount(event.id);
              const maxSeats = event.maxSeats || 100;
              const fillPercent = Math.min(100, Math.round((regCount / maxSeats) * 100));

              return (
                <div key={event.id} className={styles.eventCard}>
                  <div 
                    className={styles.cardBanner}
                    style={{ backgroundImage: `url(${event.coverImage || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=400'})` }}
                  >
                    <span className={styles.statusBadge} style={{ 
                      color: event.status === 'published' ? 'var(--primary-color)' : 'var(--warning)'
                    }}>
                      {event.status?.toUpperCase()}
                    </span>
                    <span className={styles.categoryBadge}>{event.category}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <h3>{event.title}</h3>
                    
                    <div className={styles.cardMeta}>
                      <span className={styles.cardMetaItem}><Calendar size={13} /> {event.date}</span>
                      <span className={styles.cardMetaItem}><MapPin size={13} /> {event.location}</span>
                    </div>

                    <div className={styles.cardMeta} style={{ marginTop: '-4px' }}>
                      <span className={styles.cardMetaItem}><Clock size={13} /> {event.time} – {event.endTime}</span>
                      <span className={styles.cardMetaItem} style={{ fontWeight: 700, color: 'var(--primary-color)' }}>
                        ₹{event.fee || 'Free'}
                      </span>
                    </div>

                    {/* Progress seats bar */}
                    <div className={styles.seatsProgress}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span>Seats Taken: <strong>{regCount}/{maxSeats}</strong></span>
                        <span>{fillPercent}% Filled</span>
                      </div>
                      <div className={styles.progressBarTrack}>
                        <div className={styles.progressBarFill} style={{ width: `${fillPercent}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        // Switch to registrations tab and filter by this event title
                        setActiveTab('registrations');
                        setSearchQuery(event.title);
                      }}
                      style={{ flex: 1 }}
                    >
                      Registrations ({regCount})
                    </Button>
                    
                    {event.status === 'draft' && (
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handlePublishExisting(event.id)}
                        style={{ flex: 1 }}
                      >
                        Publish Now
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Render student registrations tab
  const renderRegistrationsTab = () => {
    return (
      <div style={{ marginTop: '16px' }}>
        {/* Search and filter toolbar */}
        <div style={{
          display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', 
          background: 'var(--surface-color)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', gap: '12px', flex: 1, minWidth: '280px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} color="var(--text-light)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input 
                type="text" 
                placeholder="Search student or event name..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '38px', borderRadius: '12px' }}
              />
            </div>
            
            {searchQuery && (
              <Button size="sm" variant="outline" onClick={() => setSearchQuery('')}>Clear</Button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {/* Payment filter */}
            <select 
              value={paymentFilter} 
              onChange={e => setPaymentFilter(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '12px', fontSize: '0.85rem', width: '130px' }}
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid Only</option>
              <option value="pending">Pending Only</option>
            </select>

            {/* Class filter */}
            <select 
              value={classFilter} 
              onChange={e => setClassFilter(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '12px', fontSize: '0.85rem', width: '130px' }}
            >
              <option value="all">All Classes</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 11">Grade 11</option>
            </select>
          </div>
        </div>

        {/* Registrations List table */}
        {filteredRegs.length === 0 ? (
          <div className={styles.emptyState} style={{ padding: '48px', border: '1px dashed var(--border-color)', borderRadius: '20px', textAlign: 'center', marginTop: '24px', background: 'var(--surface-color)' }}>
            <AlertCircle size={48} color="var(--text-light)" style={{ marginBottom: '12px' }} />
            <h3>No Registrations Logged</h3>
            <p style={{ color: 'var(--text-muted)' }}>We couldn't find any registration slips matching your criteria.</p>
          </div>
        ) : (
          <div className={styles.registrationsTableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Student Info</th>
                  <th>Event Name</th>
                  <th>Roll / Class</th>
                  <th>Guardian Details</th>
                  <th>Payment Status</th>
                  <th>Fee Paid</th>
                  <th>Date Registered</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegs.map(reg => {
                  const event = events.find(e => e.id === reg.eventId);
                  return (
                    <tr key={reg.id}>
                      <td>
                        <div className={styles.studentCell}>
                          <img 
                            src={reg.studentPhoto} 
                            alt={reg.studentName} 
                            className={styles.studentPhoto}
                          />
                          <div className={styles.studentInfo}>
                            <h4>{reg.studentName}</h4>
                            <span>Adm: {(reg as any).admissionNumber || reg.studentId || 'ADM-2023-8891'}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontWeight: 600 }}>{event?.title || 'Unknown Event'}</td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: 600 }}>{reg.class} ({reg.section})</span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>Roll: #{reg.rollNumber}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.8rem' }}>
                          <span>{reg.parentName}</span>
                          <span style={{ color: 'var(--text-muted)' }}>{reg.parentPhone}</span>
                        </div>
                      </td>
                      <td>
                        {reg.paymentStatus === 'paid' ? (
                          <Badge variant="success">Paid</Badge>
                        ) : (
                          <Badge variant="warning">Pending</Badge>
                        )}
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--primary-color)' }}>₹{reg.amountPaid}</td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {new Date(reg.registrationDate).toLocaleDateString()}
                      </td>
                      <td>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openStudentDrawer(reg.studentId, reg)}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Eye size={12} /> View Profile
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  // Render analytics tab
  const renderAnalyticsTab = () => {
    // Class wise distributions calculation
    const classes = ['Grade 9', 'Grade 10', 'Grade 11'];
    const classCounts = classes.map(c => registrations.filter(r => r.class.includes(c) && r.status === 'registered').length);
    const totalClassRegs = classCounts.reduce((a, b) => a + b, 0) || 1;
    
    // Category distributions calculation
    const categories = ['Educational Trip', 'Sports', 'Competition', 'Workshop'];
    const catCounts = categories.map(cat => events.filter(e => e.category === cat).length);

    return (
      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Metric summary Cards */}
        <div className={styles.analyticsSummary}>
          <div className={styles.statCard}>
            <div className={styles.statIconWrap}><Calendar size={20} /></div>
            <div className={styles.statDetails}>
              <span className={styles.statLabel}>Total Events</span>
              <span className={styles.statValue}>{totalEvents}</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIconWrap} style={{ background: '#E5F5EC', color: 'var(--primary-color)' }}><CheckCircle2 size={20} /></div>
            <div className={styles.statDetails}>
              <span className={styles.statLabel}>Published / Draft</span>
              <span className={styles.statValue}>{publishedCount} / {draftCount}</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIconWrap} style={{ background: '#EAF6EF', color: 'var(--primary-color)' }}><Users size={20} /></div>
            <div className={styles.statDetails}>
              <span className={styles.statLabel}>Total Registrations</span>
              <span className={styles.statValue}>{totalRegistrations}</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIconWrap} style={{ background: '#FEF3C7', color: '#D97706' }}><DollarSign size={20} /></div>
            <div className={styles.statDetails}>
              <span className={styles.statLabel}>Total Revenue</span>
              <span className={styles.statValue}>₹{totalRevenue}</span>
            </div>
          </div>
        </div>

        {/* Secondary analytics metrics row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div className={styles.statCard} style={{ gridColumn: 'span 1' }}>
            <div className={styles.statIconWrap} style={{ background: '#FEE2E2', color: '#EF4444' }}><AlertCircle size={20} /></div>
            <div className={styles.statDetails}>
              <span className={styles.statLabel}>Pending Payments</span>
              <span className={styles.statValue}>{pendingPayments}</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ gridColumn: 'span 1' }}>
            <div className={styles.statIconWrap} style={{ background: '#E0F2FE', color: '#0284C7' }}><Clock size={20} /></div>
            <div className={styles.statDetails}>
              <span className={styles.statLabel}>Remaining Seats</span>
              <span className={styles.statValue}>{seatsRemaining}</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ gridColumn: 'span 1' }}>
            <div className={styles.statIconWrap} style={{ background: '#F5F3FF', color: '#7C3AED' }}><TrendingUp size={20} /></div>
            <div className={styles.statDetails}>
              <span className={styles.statLabel}>Most Popular Event</span>
              <span className={styles.statValue} style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '4px' }}>
                {popularEvent ? popularEvent.title.slice(0, 16) + '...' : 'None'}
              </span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className={styles.chartsGrid}>
          {/* Chart 1: Registrations Over Time (interactive SVG Area chart) */}
          <div className={styles.chartCard}>
            <h4 className={styles.chartTitle}>Registrations Trend Over Time (July 2026)</h4>
            <div className={styles.chartContainer}>
              {/* SVG Area chart vectors */}
              <svg width="100%" height="200" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 10, left: 0, right: 0 }}>
                {/* Grid helper lines */}
                <line x1="0" y1="20" x2="100" y2="20" stroke="#f3f4f6" strokeWidth="0.5" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="#f3f4f6" strokeWidth="0.5" />
                <line x1="0" y1="80" x2="100" y2="80" stroke="#f3f4f6" strokeWidth="0.5" />
                
                {/* Area path */}
                <path d="M 0 100 L 15 90 L 35 75 L 55 60 L 75 40 L 95 20 L 100 100 Z" fill="rgba(95, 175, 136, 0.15)" />
                {/* Line path */}
                <path d="M 0 100 L 15 90 L 35 75 L 55 60 L 75 40 L 95 20" fill="none" stroke="var(--primary-color)" strokeWidth="2" />
                
                {/* Markers */}
                <circle cx="15" cy="90" r="1.5" fill="var(--primary-color)" />
                <circle cx="35" cy="75" r="1.5" fill="var(--primary-color)" />
                <circle cx="55" cy="60" r="1.5" fill="var(--primary-color)" />
                <circle cx="75" cy="40" r="1.5" fill="var(--primary-color)" />
                <circle cx="95" cy="20" r="1.5" fill="var(--primary-color)" />
              </svg>

              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'absolute', bottom: -18, left: 0, right: 0, fontSize: '0.7rem', color: 'var(--text-light)' }}>
                <span>Jul 1</span>
                <span>Jul 5</span>
                <span>Jul 10</span>
                <span>Jul 15</span>
                <span>Jul 20</span>
                <span>Jul 25</span>
                <span>Jul 30</span>
              </div>
            </div>
          </div>

          {/* Chart 2: Revenue by Event (SVG Bar chart) */}
          <div className={styles.chartCard}>
            <h4 className={styles.chartTitle}>Revenue Generated by Event (INR)</h4>
            <div className={styles.chartContainer} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: '16px' }}>
              {/* Event bar indicators */}
              {events.map((e, index) => {
                const revenue = registrations.filter(r => r.eventId === e.id && r.paymentStatus === 'paid').reduce((sum, r) => sum + r.amountPaid, 0);
                const heightPercent = Math.min(100, Math.max(10, Math.round((revenue / 12000) * 100)));
                
                return (
                  <div key={e.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-color)' }}>₹{revenue}</span>
                    <div style={{
                      width: '32px', height: `${heightPercent}px`, background: 'linear-gradient(to top, var(--primary-color) 0%, #EAF6EF 100%)',
                      borderRadius: '6px 6px 0 0', animation: 'fadeIn 0.6s ease-out'
                    }} />
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center', width: '60px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {e.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.chartsGrid}>
          {/* Chart 3: Registrations by Class (Progress representation) */}
          <div className={styles.chartCard}>
            <h4 className={styles.chartTitle}>Registrations Split by Student Class Grade</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '10px 0' }}>
              {classes.map((cls, idx) => {
                const count = classCounts[idx];
                const pct = Math.round((count / totalClassRegs) * 100);
                
                return (
                  <div key={cls} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ fontWeight: 600 }}>{cls}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{count} Registrations ({pct}%)</span>
                    </div>
                    <div style={{ height: '12px', background: 'var(--bg-secondary)', borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: ['#5FAF88', '#3B82F6', '#EF4444'][idx], borderRadius: '6px' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chart 4: Category Distribution (SVG Donut Chart Mockup) */}
          <div className={styles.chartCard}>
            <h4 className={styles.chartTitle}>Events Count by Program Category</h4>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'space-around', height: '180px' }}>
              {/* SVG Donut */}
              <svg width="120" height="120" viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#f3f4f6" strokeWidth="4" />
                
                {/* Segment 1: Educational Trip (40%) */}
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#5FAF88" strokeWidth="4.2" 
                  strokeDasharray="40 60" strokeDashoffset="25" />
                
                {/* Segment 2: Sports (30%) */}
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#3B82F6" strokeWidth="4.2" 
                  strokeDasharray="30 70" strokeDashoffset="85" />
                
                {/* Segment 3: Competition (20%) */}
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#EF4444" strokeWidth="4.2" 
                  strokeDasharray="20 80" strokeDashoffset="55" />

                {/* Segment 4: Workshops (10%) */}
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#F59E0B" strokeWidth="4.2" 
                  strokeDasharray="10 90" strokeDashoffset="35" />
              </svg>

              {/* Legend details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: 12, height: 12, borderRadius: '3px', background: '#5FAF88' }} />
                  <span>Educational Trips (40%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: 12, height: 12, borderRadius: '3px', background: '#3B82F6' }} />
                  <span>Sports Programs (30%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: 12, height: 12, borderRadius: '3px', background: '#EF4444' }} />
                  <span>Competitions (20%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: 12, height: 12, borderRadius: '3px', background: '#F59E0B' }} />
                  <span>Workshops (10%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <PageHeader 
        title="Events & Registrations Manager" 
        subtitle="Schedule events, evaluate payments, auto-fetch profiles, and download pass tickets" 
        breadcrumbs={[{ label: 'Dashboard', path: '/' }, { label: 'Event Workspace' }]} 
      />

      <div className={styles.headerRow}>
        <Tabs tabs={tabsList} activeTab={activeTab} onTabChange={setActiveTab} />
        
        <Button variant="primary" onClick={() => setShowCreateDrawer(true)}>
          <Plus size={16} /> Create Event
        </Button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          <div className="skeleton" style={{ height: '140px', borderRadius: '18px' }} />
          <div className="skeleton" style={{ height: '240px', borderRadius: '18px' }} />
        </div>
      ) : (
        <>
          {activeTab === 'events' && renderEventsTab()}
          {activeTab === 'registrations' && renderRegistrationsTab()}
          {activeTab === 'analytics' && renderAnalyticsTab()}
        </>
      )}

      {/* -------------------- DRAWERS & MODALS -------------------- */}

      {/* Create Event Side Drawer */}
      {showCreateDrawer && (
        <div className={styles.formOverlay}>
          <div className={styles.formDrawer}>
            <div className={styles.drawerHeader}>
              <h3>Create New School Event</h3>
              <button className={styles.closeBtn} onClick={() => setShowCreateDrawer(false)}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.drawerBody}>
              <form className={styles.form} onSubmit={e => e.preventDefault()}>
                <div className={styles.formGroup}>
                  <label>Event Title *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Science Fair Excursion 2026"
                    value={formValues.title}
                    onChange={e => setFormValues({ ...formValues, title: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.formGrid2}>
                  <div className={styles.formGroup}>
                    <label>Event Category *</label>
                    <select 
                      value={formValues.category} 
                      onChange={e => setFormValues({ ...formValues, category: e.target.value as any })}
                    >
                      <option>Educational Trip</option>
                      <option>Sports</option>
                      <option>Cultural</option>
                      <option>Workshop</option>
                      <option>Competition</option>
                      <option>Industrial Visit</option>
                      <option>Seminar</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Maximum Seats Available</label>
                    <input 
                      type="number" 
                      value={formValues.maxSeats}
                      onChange={e => setFormValues({ ...formValues, maxSeats: e.target.value })}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Cover Banner Image URL</label>
                  <input 
                    type="text" 
                    value={formValues.coverImage}
                    onChange={e => setFormValues({ ...formValues, coverImage: e.target.value })}
                  />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    {coverTemplates.map(t => (
                      <button 
                        key={t.name}
                        type="button" 
                        onClick={() => setFormValues({ ...formValues, coverImage: t.url })}
                        style={{ fontSize: '0.72rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '2px 8px' }}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Event Description</label>
                  <textarea 
                    rows={4}
                    placeholder="Provide a comprehensive summary of the event plans and educational values..."
                    value={formValues.description}
                    onChange={e => setFormValues({ ...formValues, description: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Highlights (Comma separated)</label>
                  <input 
                    type="text"
                    placeholder="Key highlights, e.g. Botanical Garden tour, Science museum, Campfire"
                    value={formValues.highlights}
                    onChange={e => setFormValues({ ...formValues, highlights: e.target.value })}
                  />
                </div>

                <div className={styles.formGrid2}>
                  <div className={styles.formGroup}>
                    <label>Date *</label>
                    <input 
                      type="date"
                      value={formValues.date}
                      onChange={e => setFormValues({ ...formValues, date: e.target.value })}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Registration Deadline *</label>
                    <input 
                      type="datetime-local"
                      value={formValues.registrationDeadline}
                      onChange={e => setFormValues({ ...formValues, registrationDeadline: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGrid2}>
                  <div className={styles.formGroup}>
                    <label>Start Time</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 06:00 AM"
                      value={formValues.time}
                      onChange={e => setFormValues({ ...formValues, time: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>End Time</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 08:00 PM"
                      value={formValues.endTime}
                      onChange={e => setFormValues({ ...formValues, endTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Venue Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Ooty Botanical Gardens & Lake Side"
                    value={formValues.venue}
                    onChange={e => setFormValues({ ...formValues, venue: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Google Maps Location Link</label>
                  <input 
                    type="text" 
                    placeholder="Maps link address for iframe locator"
                    value={formValues.googleMapLink}
                    onChange={e => setFormValues({ ...formValues, googleMapLink: e.target.value })}
                  />
                </div>

                <div className={styles.formGrid2}>
                  <div className={styles.formGroup}>
                    <label>Payment Required?</label>
                    <select 
                      value={formValues.paymentRequired}
                      onChange={e => setFormValues({ ...formValues, paymentRequired: e.target.value })}
                    >
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Event Fee (INR)</label>
                    <input 
                      type="number" 
                      value={formValues.fee}
                      onChange={e => setFormValues({ ...formValues, fee: e.target.value })}
                      disabled={formValues.paymentRequired === 'No'}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Attach Brochure PDF Name</label>
                  <input 
                    type="text" 
                    value={formValues.pdfUrl}
                    onChange={e => setFormValues({ ...formValues, pdfUrl: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Important Instructions (e.g. carry water, dress code)</label>
                  <textarea 
                    rows={2}
                    value={formValues.instructions}
                    onChange={e => setFormValues({ ...formValues, instructions: e.target.value })}
                  />
                </div>
              </form>
            </div>

            <div className={styles.formActions}>
              <Button variant="outline" onClick={() => setShowCreateDrawer(false)}>
                Cancel
              </Button>
              <Button variant="outline" onClick={() => handleCreateEvent('draft')}>
                Save Draft
              </Button>
              <Button variant="primary" onClick={() => handleCreateEvent('published')}>
                Publish Event
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Student Profile Right-Side slide drawer */}
      {selectedStudentId && selectedStudentProfile && (
        <div className={styles.drawerOverlay}>
          <div className={styles.profileDrawer}>
            <div className={styles.drawerHeader}>
              <h3>Student Profile Details</h3>
              <button className={styles.closeBtn} onClick={closeStudentDrawer}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.profileHero}>
              <img 
                src={selectedStudentProfile.photo} 
                alt={selectedStudentProfile.name}
                className={styles.profileAvatar}
              />
              <div className={styles.profileMeta}>
                <h3>{selectedStudentProfile.name}</h3>
                <p style={{ fontWeight: 700, color: 'var(--primary-color)' }}>ID: {selectedStudentProfile.studentId || 'GFA-2025-10042'}</p>
                <p>Class: {selectedStudentProfile.class} ({selectedStudentProfile.section}) • Roll: #{selectedStudentProfile.rollNumber}</p>
              </div>
            </div>

            <div className={styles.drawerScrollBody}>
              {/* Academic Stats Box */}
              <div className={styles.drawerSection}>
                <span className={styles.drawerSectionTitle}>ERP Academic Records</span>
                <div className={styles.metricRow}>
                  <div className={styles.metricBox}>
                    <span className={styles.metricBoxValue}>{selectedStudentProfile.attendancePercentage}%</span>
                    <span className={styles.metricBoxLabel}>Attendance Rate</span>
                  </div>
                  <div className={styles.metricBox}>
                    <span className={styles.metricBoxValue} style={{ color: 'var(--info)' }}>{selectedStudentProfile.academicPerformance.split(' ')[0]}</span>
                    <span className={styles.metricBoxLabel}>GPA Standing</span>
                  </div>
                </div>
              </div>

              {/* Student details */}
              <div className={styles.drawerSection}>
                <span className={styles.drawerSectionTitle}>Personal Information</span>
                <div className={styles.drawerGrid2}>
                  <div className={styles.infoItem}>
                    <label>Emergency Contact</label>
                    <span>{selectedStudentProfile.emergencyContact}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <label>Residential Address</label>
                    <span>{selectedStudentProfile.address}</span>
                  </div>
                </div>
              </div>

              {/* Parent Details */}
              <div className={styles.drawerSection}>
                <span className={styles.drawerSectionTitle}>Parent / Guardian Details</span>
                <div className={styles.drawerGrid2}>
                  <div className={styles.infoItem}>
                    <label>Father / Guardian</label>
                    <span>{selectedStudentProfile.parentDetails.father}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <label>Guardian Phone</label>
                    <span>{selectedStudentProfile.parentDetails.phone}</span>
                  </div>
                  <div className={styles.infoItem} style={{ gridColumn: 'span 2' }}>
                    <label>Guardian Email</label>
                    <span>{selectedStudentProfile.parentDetails.email}</span>
                  </div>
                </div>
              </div>

              {/* Medical notes */}
              <div className={styles.drawerSection} style={{ background: '#fef2f2', padding: '12px', borderRadius: '12px', borderLeft: '4px solid var(--danger)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--danger)', display: 'block', marginBottom: '4px' }}>Medical Constraints & Notes</span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', margin: 0 }}>{selectedStudentProfile.medicalNotes}</p>
              </div>

              {/* Event specific registrations logs */}
              <div className={styles.drawerSection}>
                <span className={styles.drawerSectionTitle}>Current Registration Status</span>
                <div style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: '14px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-light)' }}>Pass Status:</span>
                    <span style={{ fontWeight: 700, color: 'var(--primary-color)' }}>
                      ✅ {selectedStudentReg?.status === 'registered' ? 'Confirmed Pass' : 'Interested / Pending'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-light)' }}>Amount Evaluated:</span>
                    <span style={{ fontWeight: 600 }}>₹{selectedStudentReg?.amountPaid}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-light)' }}>Transaction Reference:</span>
                    <span style={{ fontWeight: 600 }}>{selectedStudentReg?.transactionId || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-light)' }}>Ticket reference:</span>
                    <span style={{ fontWeight: 600 }}>{selectedStudentReg?.ticketNumber || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Coordinator Notes */}
              <div className={styles.drawerSection}>
                <span className={styles.drawerSectionTitle}>Coordinator Notes / Remarks</span>
                <textarea 
                  rows={3} 
                  defaultValue={selectedStudentProfile.teacherNotes}
                  placeholder="Append note regarding student behavior or permission slip status during the event..."
                  style={{ fontSize: '0.82rem' }}
                />
                <Button size="sm" variant="primary" style={{ alignSelf: 'flex-end', marginTop: '6px' }} onClick={() => alert('Remarks saved!')}>
                  Save Remarks
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
