import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { User, QrCode, Download, Printer, AlertTriangle, RefreshCw, Check } from 'lucide-react';

interface IdCardModuleProps {
  onBack: () => void;
}

export const IdCardModule: React.FC<IdCardModuleProps> = ({ onBack }) => {
  const [isFront, setIsFront] = useState(true);
  const [duplicateStatus, setDuplicateStatus] = useState<'none' | 'processing' | 'approved'>('none');
  const [lostReason, setLostReason] = useState('');
  const [showLostForm, setShowLostForm] = useState(false);

  const handleRequestDuplicate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lostReason.trim()) return;

    setDuplicateStatus('processing');
    setShowLostForm(false);
    setLostReason('');
    alert('Duplicate ID card request submitted! Admin office will verify the details.');
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
          Digital ID Card Center
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '24px', alignItems: 'start' }}>
        {/* Interactive ID Card Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          {/* Card Flipping Wrapper */}
          <div style={{
            width: '320px', height: '480px', perspective: '1000px', cursor: 'pointer'
          }} onClick={() => setIsFront(!isFront)}>
            <div style={{
              position: 'relative', width: '100%', height: '100%', textTransform: 'none',
              transformStyle: 'preserve-3d', transition: 'transform 0.6s',
              transform: isFront ? 'none' : 'rotateY(180deg)'
            }}>
              {/* FRONT VIEW */}
              <div style={{
                position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                background: 'linear-gradient(135deg, #0D7C66 0%, #10B981 100%)', color: 'white',
                borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between', border: '2px solid rgba(255,255,255,0.2)',
                boxShadow: '0 12px 40px rgba(13,124,102,0.15)'
              }}>
                {/* Header */}
                <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '12px' }}>
                  <strong style={{ fontSize: '1.1rem', letterSpacing: '1px', display: 'block' }}>EDUVERSE HIGH SCHOOL</strong>
                  <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>STUDENT IDENTIFICATION CARD</span>
                </div>

                {/* Avatar and Main details */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200" 
                    alt="Sarah Doe"
                    style={{
                      width: '110px', height: '110px', borderRadius: '50%', border: '4px solid white',
                      objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.3rem', fontWeight: 700 }}>Sarah Doe</h3>
                    <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.15)', padding: '2px 10px', borderRadius: '99px' }}>
                      Class: 10th-A (Roll: 42)
                    </span>
                  </div>
                </div>

                {/* Info Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', fontSize: '0.78rem', background: 'rgba(255,255,255,0.06)', padding: '12px', borderRadius: '12px' }}>
                  <div>
                    <span style={{ opacity: 0.8, display: 'block', fontSize: '0.65rem' }}>ADMISSION NO.</span>
                    <strong>GFA-2025-10042</strong>
                  </div>
                  <div>
                    <span style={{ opacity: 0.8, display: 'block', fontSize: '0.65rem' }}>BLOOD GROUP</span>
                    <strong>O Positive (O+)</strong>
                  </div>
                  <div>
                    <span style={{ opacity: 0.8, display: 'block', fontSize: '0.65rem' }}>BUS ROUTE</span>
                    <strong>Route 12 - Bus A</strong>
                  </div>
                  <div>
                    <span style={{ opacity: 0.8, display: 'block', fontSize: '0.65rem' }}>EMERGENCY CONTACT</span>
                    <strong>+91 98765 43200</strong>
                  </div>
                </div>

                {/* Footer validation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', opacity: 0.9 }}>
                  <span>Valid: <strong>30 Jun 2027</strong></span>
                  <span>Tap to Flip 🔄</span>
                </div>
              </div>

              {/* BACK VIEW */}
              <div style={{
                position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                background: '#FFFFFF', color: '#1E293B', borderRadius: '24px', padding: '24px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                border: '2px solid var(--border-color)', transform: 'rotateY(180deg)',
                boxShadow: '0 12px 40px rgba(15,23,42,0.08)'
              }}>
                {/* Header instructions */}
                <div>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', color: '#0F766E' }}>
                    Institutional Rules
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.72rem', color: 'var(--text-light)', lineHeight: 1.5 }}>
                    <li>This card is non-transferable and remains institutional property.</li>
                    <li>Always wear this card prominently inside campus borders.</li>
                    <li>Loss of card must be reported immediately to administrative office.</li>
                    <li>For duplicate copies, duplicate application forms apply.</li>
                  </ul>
                </div>

                {/* Address block */}
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                  <strong>Campus Address:</strong><br/>
                  EduVerse Campus, West Wing Boulevard, Sector 12, Bangalore - 560001
                </div>

                {/* Bottom Verification Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                    <div style={{
                      width: '64px', height: '64px', background: '#F1F5F9',
                      backgroundImage: `url('https://api.qrserver.com/v1/create-qr-code/?size=64x64&data=verify_id_card_sarah_doe')`,
                      backgroundSize: 'cover'
                    }} />
                    <span style={{ fontSize: '0.58rem', color: 'var(--text-light)' }}>Scan to Verify</span>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontFamily: 'cursive', fontSize: '0.9rem', color: '#1E3A8A', display: 'block', borderBottom: '1px solid #334155', padding: '0 8px' }}>
                      Dr. James Carter
                    </span>
                    <span style={{ fontSize: '0.62rem', color: 'var(--text-light)' }}>Principal Authority</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>Click card to flip and view instructions</span>
        </div>

        {/* Operations & Duplicate Requests Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Card Management Actions</h3>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button 
                onClick={() => alert('Downloading official ID card PDF...')}
                style={{
                  background: 'none', border: '1px solid var(--border-color)', borderRadius: '12px',
                  padding: '10px 16px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)'
                }}
              >
                <Download size={14} /> Download PDF
              </button>
              <button 
                onClick={() => window.print()}
                style={{
                  background: 'none', border: '1px solid var(--border-color)', borderRadius: '12px',
                  padding: '10px 16px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)'
                }}
              >
                <Printer size={14} /> Print Card
              </button>
              <button 
                onClick={() => setShowLostForm(true)}
                style={{
                  background: 'none', border: 'none', color: '#EF4444', fontSize: '0.8rem', fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                <AlertTriangle size={14} /> Report Lost Card
              </button>
            </div>
          </Card>

          {/* Duplicate Card Requests Tracker */}
          {duplicateStatus !== 'none' && (
            <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Duplicate Request Tracker</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', padding: '16px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#10B981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}><Check size={12} /></div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Requested</span>
                </div>
                <div style={{ flex: 0.5, height: '2px', background: duplicateStatus === 'approved' ? '#10B981' : '#E5E7EB', margin: '0 8px', alignSelf: 'center', marginTop: '-12px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: duplicateStatus === 'approved' ? '#10B981' : '#F59E0B', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
                    {duplicateStatus === 'approved' ? <Check size={12} /> : <RefreshCw size={12} className="spin" />}
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Processing</span>
                </div>
                <div style={{ flex: 0.5, height: '2px', background: '#E5E7EB', margin: '0 8px', alignSelf: 'center', marginTop: '-12px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#E5E7EB', color: 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>3</div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Ready</span>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Lost Form Modal Overlay */}
      {showLostForm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999999
        }}>
          <Card style={{ width: '400px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', borderRadius: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Report Lost ID Card</h3>
              <button onClick={() => setShowLostForm(false)} style={{ background: 'none', border: 'none', color: 'var(--text-light)', fontSize: '1.1rem', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleRequestDuplicate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Explain Reason of Loss</label>
                <textarea 
                  placeholder="Describe where or when card was misplaced..."
                  rows={3}
                  value={lostReason}
                  onChange={e => setLostReason(e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none', resize: 'none' }}
                  required
                />
              </div>

              <div style={{ fontSize: '0.75rem', background: 'rgba(239,68,68,0.05)', padding: '10px', borderRadius: '8px', color: '#EF4444' }}>
                ⚠️ A duplicate card issue charge of <strong>₹150</strong> will be billed to your outstanding invoices.
              </div>

              <button 
                type="submit"
                style={{
                  background: '#EF4444', color: 'white', border: 'none', borderRadius: '12px',
                  padding: '12px 0', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer'
                }}
              >
                Submit Duplicate Application
              </button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
