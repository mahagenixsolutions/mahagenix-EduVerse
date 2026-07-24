import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/navigation/PageHeader';
import { MockServer } from '@/mock-server/MockServer';
import { MapPin, Phone, MessageSquare, AlertOctagon, BellRing, Navigation, Check, AlertCircle, X } from 'lucide-react';
import styles from './school.module.css';

interface BusStop {
  name: string;
  eta: string;
  status: 'passed' | 'active' | 'upcoming';
}

export const TransportPage: React.FC = () => {
  const [stops, setStops] = useState<BusStop[]>([
    { name: 'Terminal 1 - Depot', eta: 'Passed', status: 'passed' },
    { name: 'Dwarka Sector 10 Crossing', eta: 'Passed', status: 'passed' },
    { name: 'Model School Roundabout', eta: '08:05 AM', status: 'active' }, // Current stop
    { name: 'Vasant Kunj Block C', eta: '08:15 AM (10 mins)', status: 'upcoming' },
    { name: 'Greenfield Campus (Gate 2)', eta: '08:30 AM (25 mins)', status: 'upcoming' },
  ]);

  const driver = {
    name: 'Rakesh Sharma',
    phone: '+91 98765 09876',
    license: 'DL-01-2019-098234',
    rating: '4.8 ★',
    photo: 'https://i.pravatar.cc/150?u=rakesh_driver',
    busNo: 'DL-1PB-4582 (Route 12B)',
    status: 'En Route - Active'
  };

  const [feeDue, setFeeDue] = useState(1200); // Outstanding monthly bus fee
  const [notified, setNotified] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleNotifyDriver = () => {
    setNotified(true);
    showFeedback('success', 'Driver notified! Your location has been shared for boarding confirmation.');
    setTimeout(() => setNotified(false), 8000);
  };

  const handleSosConfirm = () => {
    setShowSosModal(false);
    showFeedback('success', 'SOS EMERGENCY SIGNAL SENT! School transport desk and driver alerted.');
    MockServer.createNotification('⚠️ SOS Transport Alert', 'SOS Emergency alert triggered for Bus Route 12B.', 'event_cancel');
  };

  const handlePayFee = () => {
    setShowPayModal(false);
    setFeeDue(0);
    showFeedback('success', 'Monthly transport fee of ₹1,200 cleared successfully.');
    MockServer.createNotification('💳 Payment Success', 'Monthly transport subscription fee of ₹1,200 cleared.', 'payment_success');
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      <PageHeader 
        title="Bus Route Tracker" 
        subtitle="Review daily boarding points, check driver details, and monitor live route schedules"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'School', path: '/school' }, { label: 'Transport' }]}
      />

      {feedback && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderRadius: '16px',
          marginBottom: '20px', border: '1px solid',
          background: feedback.type === 'success' ? '#E8F5E9' : '#FFEBEE',
          borderColor: feedback.type === 'success' ? '#A5D6A7' : '#EF9A9A',
          color: feedback.type === 'success' ? '#2E7D32' : '#C62828',
          fontSize: '0.9rem', fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          {feedback.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* SOS Quick Floating Control */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
        <Card style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(95, 175, 136, 0.1)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Navigation size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>Active Route</span>
            <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>Route 12B - North Campus Express</h4>
          </div>
        </Card>

        {feeDue > 0 ? (
          <Card 
            onClick={() => setShowPayModal(true)}
            style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', flex: 1, cursor: 'pointer' }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertCircle size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>Bus Subscription Fee</span>
              <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#EF4444' }}>₹{feeDue} Due</h4>
            </div>
          </Card>
        ) : (
          <Card style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>Subscription Status</span>
              <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--success)' }}>Fully Paid</h4>
            </div>
          </Card>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '32px' }}>
        {/* Left Column: Driver Card & SOS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card style={{ padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <img 
              src={driver.photo} 
              alt={driver.name} 
              style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--border-color)' }}
            />
            
            <div>
              <Badge variant="success">{driver.status}</Badge>
              <h3 style={{ margin: '8px 0 4px 0', fontSize: '1.15rem', fontWeight: 700 }}>{driver.name}</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>License: {driver.license} ({driver.rating})</p>
              <span style={{ fontSize: '0.8rem', color: 'var(--primary-hover)', fontWeight: 700 }}>Bus: {driver.busNo}</span>
            </div>

            <div style={{ display: 'flex', gap: '12px', width: '100%', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <a href={`tel:${driver.phone}`} style={{ flex: 1, textDecoration: 'none' }}>
                <Button variant="outline" fullWidth style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Phone size={16} /> Call
                </Button>
              </a>
              <Button 
                variant="primary" 
                onClick={handleNotifyDriver} 
                disabled={notified}
                style={{ flex: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <BellRing size={16} /> {notified ? 'Notified!' : 'Boarding stop'}
              </Button>
            </div>
          </Card>

          <Card style={{ padding: '24px', background: 'rgba(239, 68, 68, 0.03)', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', fontWeight: 700, color: '#EF4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertOctagon size={20} /> Emergency Trigger
            </h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Are you in distress or stuck at a delayed boarding point? Trigger an immediate alert to school administration.
            </p>
            <Button variant="secondary" onClick={() => setShowSosModal(true)} style={{ background: '#EF4444', color: '#FFF', width: '100%' }}>
              Send SOS Alert
            </Button>
          </Card>
        </div>

        {/* Right Column: Route Stops timeline */}
        <Card style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: 700 }}>Route Timeline Stops</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative', paddingLeft: '24px' }}>
            {/* Timeline Vertical Stem Line */}
            <div style={{ position: 'absolute', top: '10px', bottom: '10px', left: '7px', width: '2px', background: 'var(--border-color)', zIndex: 1 }} />

            {stops.map((stop, index) => {
              const isActive = stop.status === 'active';
              const isPassed = stop.status === 'passed';
              
              return (
                <div key={index} style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--border-color)', position: 'relative', zIndex: 2 }}>
                  {/* Timeline Dot Node */}
                  <div style={{
                    position: 'absolute', left: '-23px', top: '22px',
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: isActive ? 'var(--primary-color)' : isPassed ? 'var(--text-light)' : '#FFF',
                    border: '2px solid',
                    borderColor: isActive ? 'var(--primary-color)' : 'var(--text-light)',
                    boxShadow: isActive ? '0 0 0 4px rgba(95, 175, 136, 0.2)' : 'none'
                  }} />

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: isActive ? 700 : 600, color: isActive ? 'var(--primary-hover)' : 'var(--text-main)' }}>
                        {stop.name}
                        {isActive && <Badge variant="success" style={{ marginLeft: '8px' }}>Bus Current Stop</Badge>}
                      </h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                        {isPassed ? 'Passed stop' : 'Estimated Time'}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <strong style={{ fontSize: '0.85rem', color: isActive ? 'var(--primary-hover)' : 'var(--text-muted)' }}>
                      {stop.eta}
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* SOS Alert Modal */}
      {showSosModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)',
          zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Card style={{ width: '100%', maxWidth: '420px', padding: '24px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button 
              onClick={() => setShowSosModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#EF4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertOctagon size={24} /> Confirm SOS Alert
            </h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Are you sure you want to trigger an emergency alert? This will immediately ping the school transport desk, the bus driver, and your registered guardian.
            </p>

            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <Button variant="outline" onClick={() => setShowSosModal(false)} style={{ flex: 1 }}>Cancel</Button>
              <Button variant="secondary" onClick={handleSosConfirm} style={{ background: '#EF4444', color: '#FFF', flex: 1 }}>
                Send SOS
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Pay Subscription Fee Modal */}
      {showPayModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)',
          zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Card style={{ width: '100%', maxWidth: '420px', padding: '24px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button 
              onClick={() => setShowPayModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>Pay Transport Dues</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Clear your monthly school bus route fee subscription.</p>

            <div style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Amount Due:</span>
              <strong style={{ fontSize: '1.25rem', color: '#EF4444' }}>₹1,200</strong>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <Button variant="outline" onClick={() => setShowPayModal(false)} style={{ flex: 1 }}>Cancel</Button>
              <Button variant="primary" onClick={handlePayFee} style={{ flex: 1 }}>
                Simulate UPI Payment
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
