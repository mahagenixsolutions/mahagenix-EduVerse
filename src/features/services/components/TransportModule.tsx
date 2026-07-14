import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Bus, MapPin, PhoneCall, AlertOctagon, Download, Map, Check } from 'lucide-react';

interface TransportModuleProps {
  onBack: () => void;
}

export const TransportModule: React.FC<TransportModuleProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'change_point' | 'complaint'>('details');
  const [newStop, setNewStop] = useState('');
  const [complaintText, setComplaintText] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Mock Route stops data
  const routeStops = [
    { name: 'Sector 4 Corner Stop', time: '07:15 AM', status: 'Passed' },
    { name: 'Central Library Crossing (Your Pickup)', time: '07:30 AM', status: 'Next', active: true },
    { name: 'Green Valley Plaza Stop', time: '07:42 AM', status: 'Upcoming' },
    { name: 'School Main Gate Entrance', time: '08:00 AM', status: 'Destination' }
  ];

  const handleRequestChange = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestSubmitted(false);
      setNewStop('');
      alert('Pickup point change request submitted to Transport Desk. Expected review window: 48 hours.');
    }, 1500);
  };

  const handleComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Complaint successfully filed. Ticket ID: TKT-TRN-902. Our logistics coordinator will review.');
    setComplaintText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div>
        <button 
          onClick={onBack} 
          style={{ 
            background: 'none', border: 'none', color: '#10B981', fontWeight: 600, 
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0, marginBottom: '8px'
          }}
        >
          ← Back to Services
        </button>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
          School Transport Service
        </h2>
      </div>

      {/* Driver and vehicle summary card */}
      <Card style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', background: 'var(--surface-color)' }}>
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200" 
          alt="Driver Rajesh" 
          style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} 
        />
        <div style={{ flex: 1, minWidth: '180px' }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700 }}>Bus No. 12 — Route 7</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', display: 'block' }}>Vehicle: <strong>KA-01-F-1234</strong></span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', display: 'block' }}>Driver: Mr. Rajesh Kumar • Conductor: Mr. Amit Singh</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setShowPass(true)}
            style={{
              background: 'none', border: '1px solid var(--border-color)', borderRadius: '12px',
              padding: '8px 16px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)'
            }}
          >
            <Download size={14} /> Download Pass
          </button>
          <a 
            href="tel:+919876543210"
            style={{
              background: '#10B981', color: 'white', border: 'none', borderRadius: '12px',
              padding: '8px 16px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', boxShadow: '0 4px 12px rgba(16,185,129,0.1)'
            }}
          >
            <PhoneCall size={14} /> Call Driver
          </a>
        </div>
      </Card>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
        <button 
          onClick={() => setActiveTab('details')}
          style={{
            padding: '8px 16px', border: 'none', background: 'none', fontSize: '0.85rem', fontWeight: 700,
            borderBottom: activeTab === 'details' ? '2.5px solid #10B981' : 'none',
            color: activeTab === 'details' ? '#10B981' : 'var(--text-light)', cursor: 'pointer'
          }}
        >
          Route & Tracking
        </button>
        <button 
          onClick={() => setActiveTab('change_point')}
          style={{
            padding: '8px 16px', border: 'none', background: 'none', fontSize: '0.85rem', fontWeight: 700,
            borderBottom: activeTab === 'change_point' ? '2.5px solid #10B981' : 'none',
            color: activeTab === 'change_point' ? '#10B981' : 'var(--text-light)', cursor: 'pointer'
          }}
        >
          Change Stop Request
        </button>
        <button 
          onClick={() => setActiveTab('complaint')}
          style={{
            padding: '8px 16px', border: 'none', background: 'none', fontSize: '0.85rem', fontWeight: 700,
            borderBottom: activeTab === 'complaint' ? '2.5px solid #10B981' : 'none',
            color: activeTab === 'complaint' ? '#10B981' : 'var(--text-light)', cursor: 'pointer'
          }}
        >
          File Complaint
        </button>
      </div>

      {/* Content */}
      {activeTab === 'details' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '20px' }}>
          {/* Route path timeline */}
          <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Route Timeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', position: 'relative' }}>
              {routeStops.map((stop, idx) => (
                <div key={stop.name} style={{ display: 'flex', gap: '16px', alignItems: 'stretch' }}>
                  {/* Line Bullet */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: '24px' }}>
                    <div style={{
                      width: '14px', height: '14px', borderRadius: '50%',
                      backgroundColor: stop.active ? '#10B981' : '#E5E7EB',
                      border: stop.active ? '3px solid white' : '2px solid white',
                      boxShadow: stop.active ? '0 0 0 3px #10B981' : 'none',
                      zIndex: 2, marginTop: '4px'
                    }} />
                    {idx !== routeStops.length - 1 && (
                      <div style={{
                        position: 'absolute', top: '18px', bottom: '0px', width: '2.5px',
                        backgroundColor: '#E5E7EB', zIndex: 1
                      }} />
                    )}
                  </div>

                  {/* Stop detail */}
                  <div style={{ paddingBottom: '24px', flex: 1 }}>
                    <h4 style={{ margin: '0 0 2px 0', fontSize: '0.88rem', fontWeight: 700, color: stop.active ? '#10B981' : 'var(--text-main)' }}>
                      {stop.name}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block' }}>ETA: {stop.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Map display mock */}
          <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', overflow: 'hidden' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Map size={18} color="var(--primary-color)" /> Live Bus Position
            </h3>
            
            {/* Map Box */}
            <div style={{
              flex: 1, minHeight: '260px', borderRadius: '16px', border: '1px solid var(--border-color)',
              background: '#E5E7EB', position: 'relative', overflow: 'hidden',
              backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600')`,
              backgroundSize: 'cover'
            }}>
              {/* Overlay elements mapping the path */}
              <div style={{
                position: 'absolute', top: '35%', left: '42%', background: '#10B981', color: 'white',
                padding: '6px 12px', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 4px 10px rgba(16,185,129,0.2)'
              }}>
                <Bus size={12} /> Bus 12 (Live)
              </div>

              <div style={{
                position: 'absolute', top: '48%', left: '55%', background: '#EF4444', color: 'white',
                padding: '6px 12px', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 4px 10px rgba(239,68,68,0.2)'
              }}>
                <MapPin size={12} /> Your Stop
              </div>
            </div>
            
            <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Last ping: 12 seconds ago</span>
              <span>Next Station Arrival: <strong>4 mins</strong></span>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'change_point' && (
        <Card style={{ padding: '24px', maxWidth: '500px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 700 }}>Request Route/Stop Relocation</h3>
          
          <form onSubmit={handleRequestChange} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Select New Route Zone</label>
              <select style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', background: 'white' }}>
                <option>Route 7 — Downtown Loop</option>
                <option>Route 4 — West Valley Sector</option>
                <option>Route 11 — Expressway North</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Specify New Stop Point</label>
              <input 
                type="text" 
                placeholder="e.g. Sector 12 Metro Station Gate 3" 
                value={newStop}
                onChange={e => setNewStop(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none' }}
                required
              />
            </div>

            <button 
              type="submit"
              style={{
                background: '#10B981', color: 'white', border: 'none', borderRadius: '12px',
                padding: '12px 0', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(16,185,129,0.1)'
              }}
            >
              Submit Change Request
            </button>
          </form>
        </Card>
      )}

      {activeTab === 'complaint' && (
        <Card style={{ padding: '24px', maxWidth: '500px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 700 }}>Log Logistics Issues</h3>
          
          <form onSubmit={handleComplaint} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Complaint Subject</label>
              <select style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', background: 'white' }}>
                <option>Bus Arrival Delay / Timings</option>
                <option>Driver / Helper behavior</option>
                <option>Speeding / Rash Driving</option>
                <option>AC / Seating / Comfort</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Details Description</label>
              <textarea 
                placeholder="Provide date, timing, and descriptive details..."
                rows={4}
                value={complaintText}
                onChange={e => setComplaintText(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none', resize: 'none' }}
                required
              />
            </div>

            <button 
              type="submit"
              style={{
                background: '#EF4444', color: 'white', border: 'none', borderRadius: '12px',
                padding: '12px 0', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer'
              }}
            >
              File Support Ticket
            </button>
          </form>
        </Card>
      )}

      {/* Ticket Pass Overlay */}
      {showPass && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999999
        }}>
          <Card style={{ width: '340px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', borderRadius: '24px', background: 'white', border: '2px dashed #10B981' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed var(--border-color)', paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#10B981' }}>🚌 EduVerse Transport Pass</h3>
              <button onClick={() => setShowPass(false)} style={{ background: 'none', border: 'none', color: 'var(--text-light)', fontSize: '1.1rem', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'center', alignItems: 'center', padding: '10px 0' }}>
              {/* QR Code */}
              <div style={{
                width: '120px', height: '120px', background: '#F3F4F6', borderRadius: '12px', border: '1px solid var(--border-color)',
                backgroundImage: `url('https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=transport_student_sarah_doe')`,
                backgroundSize: 'cover'
              }} />
              
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginTop: '8px' }}>Sarah Doe</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Roll: GFA-2025-10042 • Route 7</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.78rem', borderTop: '1px dashed var(--border-color)', paddingTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Pickup Stop:</span>
                <strong>Central Library</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Vehicle Assign:</span>
                <strong>Bus 12 (KA-01-F-1234)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Valid Till:</span>
                <strong>30 Jun 2027</strong>
              </div>
            </div>

            <button 
              onClick={() => {
                alert('Downloading pass PDF...');
                setShowPass(false);
              }}
              style={{
                background: '#10B981', color: 'white', border: 'none', borderRadius: '12px',
                padding: '10px 0', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
              }}
            >
              <Download size={14} /> Download PDF
            </button>
          </Card>
        </div>
      )}
    </div>
  );
};
