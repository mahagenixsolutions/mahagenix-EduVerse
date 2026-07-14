import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import styles from './services.module.css';

// Import Sub-Modules
import { FeePaymentModule } from '../components/FeePaymentModule';
import { LibraryModule } from '../components/LibraryModule';
import { TransportModule } from '../components/TransportModule';
import { StoreModule } from '../components/StoreModule';
import { LeaveModule } from '../components/LeaveModule';
import { CertificatesModule } from '../components/CertificatesModule';
import { IdCardModule } from '../components/IdCardModule';
import { CounsellingModule } from '../components/CounsellingModule';
import { MedicalModule } from '../components/MedicalModule';
import { HelpDeskModule } from '../components/HelpDeskModule';
import { DownloadsModule } from '../components/DownloadsModule';
import { AdditionalServicesModule } from '../components/AdditionalServicesModule';

import { services, recentTransactions, supportTickets } from '@/mock/services';

const categories = ['All', 'Finance', 'Academic', 'Documents', 'Wellness', 'Support', 'Resources', 'Logistics', 'Shopping', 'Administrative'];

const BADGE_CLASS_MAP: Record<string, string> = {
  'action-needed': styles.badgeActionNeeded,
  'active': styles.badgeActive,
  'available': styles.badgeAvailable,
  'ready': styles.badgeReady
};

const STATUS_TEXT_MAP: Record<string, string> = {
  'action-needed': 'Action Needed',
  'active': 'Active',
  'available': 'Available',
  'ready': 'Ready'
};

const TX_SERVICE_META: Record<string, { icon: string; color: string; bg: string }> = {
  'Fee Payment': { icon: 'CreditCard', color: '#10B981', bg: 'rgba(16, 185, 129, 0.08)' },
  'School Store': { icon: 'ShoppingBag', color: '#EC4899', bg: 'rgba(236, 72, 153, 0.08)' },
  'Library Fine': { icon: 'BookOpen', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.08)' }
};

export const ServicesPage: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [defaultSubService, setDefaultSubService] = useState('Hostel');
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Routes clicks on cards to sub-modules
  const handleCardClick = (serviceId: number) => {
    if (serviceId === 1) setActiveModule('fee_payment');
    if (serviceId === 2) setActiveModule('library');
    if (serviceId === 3) setActiveModule('transport');
    if (serviceId === 4) setActiveModule('school_store');
    if (serviceId === 5) setActiveModule('leave_request');
    if (serviceId === 6) setActiveModule('certificates');
    if (serviceId === 7) setActiveModule('id_card');
    if (serviceId === 8) setActiveModule('certificates');
    if (serviceId === 9) setActiveModule('counselling');
    if (serviceId === 10) setActiveModule('medical_room');
    if (serviceId === 11) setActiveModule('help_desk');
    if (serviceId === 12) setActiveModule('downloads');
  };

  const handleSubServiceClick = (type: string) => {
    setDefaultSubService(type);
    setActiveModule('additional_services');
  };

  // Combined search and category filter
  const filtered = services.filter(service => {
    const matchesCategory = category === 'All' || service.category === category;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.statusText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Render sub-module if active
  if (activeModule === 'fee_payment') return <FeePaymentModule onBack={() => setActiveModule(null)} />;
  if (activeModule === 'library') return <LibraryModule onBack={() => setActiveModule(null)} />;
  if (activeModule === 'transport') return <TransportModule onBack={() => setActiveModule(null)} />;
  if (activeModule === 'school_store') return <StoreModule onBack={() => setActiveModule(null)} />;
  if (activeModule === 'leave_request') return <LeaveModule onBack={() => setActiveModule(null)} />;
  if (activeModule === 'certificates') return <CertificatesModule onBack={() => setActiveModule(null)} />;
  if (activeModule === 'id_card') return <IdCardModule onBack={() => setActiveModule(null)} />;
  if (activeModule === 'counselling') return <CounsellingModule onBack={() => setActiveModule(null)} />;
  if (activeModule === 'medical_room') return <MedicalModule onBack={() => setActiveModule(null)} />;
  if (activeModule === 'help_desk') return <HelpDeskModule onBack={() => setActiveModule(null)} />;
  if (activeModule === 'downloads') return <DownloadsModule onBack={() => setActiveModule(null)} />;
  if (activeModule === 'additional_services') return <AdditionalServicesModule defaultSubService={defaultSubService} onBack={() => setActiveModule(null)} />;

  return (
    <div className={styles.servicesPage}>
      {/* Top summary stats dashboard cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '8px' }}>
        <div style={{ padding: '16px 20px', borderRadius: '20px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', boxShadow: '0 2px 10px rgba(0,0,0,0.01)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>Pending Requests</span>
          <strong style={{ fontSize: '1.25rem', color: '#F59E0B' }}>2 Active</strong>
        </div>
        <div style={{ padding: '16px 20px', borderRadius: '20px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', boxShadow: '0 2px 10px rgba(0,0,0,0.01)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>Outstanding Fees</span>
          <strong style={{ fontSize: '1.25rem', color: '#EF4444' }}>₹12,500</strong>
        </div>
        <div style={{ padding: '16px 20px', borderRadius: '20px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', boxShadow: '0 2px 10px rgba(0,0,0,0.01)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>Library Checkout</span>
          <strong style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>2 Books</strong>
        </div>
        <div style={{ padding: '16px 20px', borderRadius: '20px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', boxShadow: '0 2px 10px rgba(0,0,0,0.01)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>Active Tickets</span>
          <strong style={{ fontSize: '1.25rem', color: '#3B82F6' }}>1 Ticket</strong>
        </div>
      </div>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <Icons.Search size={20} color="var(--text-light)" />
        <input 
          type="text"
          placeholder="Search services..." 
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Tabs Scroll */}
      <div className={styles.categoryScroll}>
        {categories.map(c => (
          <button 
            key={c} 
            className={category === c ? styles.catActive : styles.catBtn} 
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className={styles.serviceGrid}>
        {filtered.map(service => {
          const Icon = (Icons as any)[service.icon] || Icons.HelpCircle;
          const badgeClass = BADGE_CLASS_MAP[service.status] || styles.badgeAvailable;
          const badgeText = STATUS_TEXT_MAP[service.status] || 'Available';
          const cardClass = `${styles.serviceCard} hover-lift ${service.id === 2 ? styles.libraryHighlight : ''}`;

          return (
            <div key={service.id} className={cardClass} onClick={() => handleCardClick(service.id)}>
              <div className={styles.serviceIconWrap}>
                {service.stickerUrl ? (
                  <img 
                    src={service.stickerUrl} 
                    alt={service.name} 
                    className={styles.serviceSticker}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className={styles.fallbackIconWrap}
                  style={{ 
                    display: service.stickerUrl ? 'none' : 'flex',
                    color: service.color 
                  }}
                >
                  <Icon size={24} />
                </div>
              </div>

              <div className={styles.serviceBody}>
                <p className={styles.serviceTitle}>{service.name}</p>
                <p className={styles.serviceStatus}>{service.statusText}</p>
              </div>

              <span className={`${styles.statusBadge} ${badgeClass}`}>
                {badgeText}
              </span>

              <div className={styles.serviceAction}>
                <Icons.ChevronRight size={18} color="var(--text-light)" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Services row */}
      <section className={styles.section}>
        <p className={styles.sectionHead}>Additional Campus Services</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {[
            { name: 'Hostel', detail: 'Block allocation, wardens', type: 'Hostel', icon: Icons.Home, color: '#3B82F6', bg: 'rgba(59,130,246,0.06)' },
            { name: 'Mess Menu', detail: 'Weekly meal schedules', type: 'Mess Menu', icon: Icons.Coffee, color: '#F59E0B', bg: 'rgba(245,158,11,0.06)' },
            { name: 'PTM Booking', detail: 'Parent-Teacher meetings', type: 'PTM Booking', icon: Icons.Users, color: '#10B981', bg: 'rgba(16,185,129,0.06)' },
            { name: 'Lost & Found', detail: 'Claim misplaced items', type: 'Lost & Found', icon: Icons.Search, color: '#EF4444', bg: 'rgba(239,68,68,0.06)' }
          ].map(sub => {
            const SubIcon = sub.icon;
            return (
              <div 
                key={sub.name}
                className="hover-lift"
                onClick={() => handleSubServiceClick(sub.type)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px', padding: '16px',
                  borderRadius: '20px', border: '1px solid var(--border-color)',
                  background: 'var(--surface-color)', cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '38px', height: '38px', borderRadius: '8px',
                  background: sub.bg, color: sub.color, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <SubIcon size={18} />
                </div>
                <div>
                  <p style={{ margin: '0 0 2px 0', fontSize: '13.8px', fontWeight: 600, color: 'var(--text-main)', fontFamily: '"Century Gothic", "Inter", sans-serif' }}>{sub.name}</p>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>{sub.detail}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Transactions Section */}
      <section className={styles.section}>
        <p className={styles.sectionHead}>Recent Transactions</p>
        <div className={styles.txCard}>
          {recentTransactions.map(tx => {
            const meta = TX_SERVICE_META[tx.service] || { icon: 'CreditCard', color: '#10B981', bg: 'rgba(16, 185, 129, 0.08)' };
            const TxIcon = (Icons as any)[meta.icon] || Icons.CreditCard;
            
            return (
              <div key={tx.id} className={styles.txItem}>
                <div className={styles.txLeft}>
                  <div 
                    className={styles.txIconWrap} 
                    style={{ backgroundColor: meta.bg, color: meta.color }}
                  >
                    <TxIcon size={20} />
                  </div>
                  <div className={styles.txDetails}>
                    <p className={styles.txTitle}>{tx.description}</p>
                    <span>{tx.service} • {tx.date}</span>
                  </div>
                </div>

                <div className={styles.txRight}>
                  <strong className={styles.txAmount}>{tx.amount}</strong>
                  <span className={styles.txStatusPill}>
                    {tx.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Support Tickets Section */}
      <section className={styles.section}>
        <p className={styles.sectionHead}>Support Tickets</p>
        <div className={styles.ticketGrid}>
          {supportTickets.map(ticket => {
            const isTkt1 = ticket.id === 'TKT-001';
            const gradientStyle = isTkt1 
              ? { 
                  background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.04) 0%, rgba(139, 92, 246, 0.04) 100%)',
                  border: '1px solid rgba(139, 92, 246, 0.15)'
                }
              : {
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, rgba(59, 130, 246, 0.04) 100%)',
                  border: '1px solid rgba(59, 130, 246, 0.15)'
                };

            const statusClass = ticket.status === 'open' 
              ? styles.ticketStatusOpen 
              : styles.ticketStatusResolved;

            return (
              <div 
                key={ticket.id} 
                className={styles.ticketCardWrapper}
                style={gradientStyle}
                onClick={() => {
                  setActiveModule('help_desk');
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <code className={styles.ticketIdBadge}>{ticket.id}</code>
                  <span className={`${styles.ticketStatusPill} ${statusClass}`}>
                    {ticket.status}
                  </span>
                </div>

                <p className={styles.ticketTitle}>{ticket.title}</p>

                <span className={styles.ticketMetaText}>
                  {ticket.date} • Priority: {ticket.priority}
                </span>

                <div className={styles.ticketChatIcon}>
                  <Icons.MessageSquare size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
