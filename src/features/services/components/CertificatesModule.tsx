import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { FileText, Eye, Check, Clock, Download, ArrowRight } from 'lucide-react';

interface CertificatesModuleProps {
  onBack: () => void;
  defaultType?: string;
}

interface CertificateRequest {
  id: string;
  type: string;
  purpose: string;
  requestDate: string;
  status: 'Ready' | 'Under Review' | 'Rejected';
  certNumber?: string;
  timeline: { title: string; date: string; status: 'completed' | 'active' | 'upcoming'; remarks?: string }[];
}

export const CertificatesModule: React.FC<CertificatesModuleProps> = ({ onBack, defaultType = 'Bonafide Certificate' }) => {
  const [activeTab, setActiveTab] = useState<'apply' | 'history'>('apply');
  const [certType, setCertType] = useState(defaultType);
  const [purpose, setPurpose] = useState('Passport Application');
  const [otherPurpose, setOtherPurpose] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const [requests, setRequests] = useState<CertificateRequest[]>([
    {
      id: 'CERT-8813',
      type: 'Bonafide Certificate',
      purpose: 'Passport Application',
      requestDate: '08 Jul 2026',
      status: 'Ready',
      certNumber: 'EV-2026-BF-8813',
      timeline: [
        { title: 'Applied', date: '08 Jul 2026', status: 'completed' },
        { title: 'Admin Verification', date: '08 Jul 2026', status: 'completed', remarks: 'Roll details verified' },
        { title: 'Principal Authority Approval', date: '09 Jul 2026', status: 'completed', remarks: 'Approved & Signed' }
      ]
    },
    {
      id: 'CERT-8704',
      type: 'Migration Certificate',
      purpose: 'College Registration',
      requestDate: '02 Jun 2026',
      status: 'Ready',
      certNumber: 'EV-2026-MG-8704',
      timeline: [
        { title: 'Applied', date: '02 Jun 2026', status: 'completed' },
        { title: 'Admin Verification', date: '02 Jun 2026', status: 'completed', remarks: 'Dues cleared' },
        { title: 'Principal Authority Approval', date: '03 Jun 2026', status: 'completed', remarks: 'Approved & Signed' }
      ]
    }
  ]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPurpose = purpose === 'Other' ? otherPurpose : purpose;
    if (!finalPurpose.trim()) return;

    const idNum = Math.floor(Math.random() * 9000) + 1000;
    const certId = `CERT-${idNum}`;
    
    const newRequest: CertificateRequest = {
      id: certId,
      type: certType,
      purpose: finalPurpose,
      requestDate: 'Today',
      status: 'Under Review',
      timeline: [
        { title: 'Applied', date: 'Today', status: 'completed' },
        { title: 'Admin Verification', date: 'Today', status: 'active', remarks: 'Under office verification' },
        { title: 'Principal Authority Approval', date: 'Pending', status: 'upcoming' }
      ]
    };

    setRequests(prev => [newRequest, ...prev]);
    setOtherPurpose('');
    setActiveTab('history');
    alert(`Successfully applied for ${certType}! Tracking reference: ${certId}`);
  };

  const getPreviewText = () => {
    if (certType === 'Bonafide Certificate') {
      return `This is to certify that Sarah Doe, daughter of John Doe, is a bonafide student of class 10th-A in our institution. Her admission registration number is GFA-2025-10042. She is known to have a good moral character and has been studying in this school since June 2022.`;
    }
    if (certType === 'Conduct Certificate') {
      return `This certifies that Sarah Doe, daughter of John Doe, has been a student of class 10th-A in our institution. During her study period, her conduct, behavior, and character have been consistently EXCELLENT. She bears no active disciplinary record.`;
    }
    return `This is to certify that Sarah Doe, daughter of John Doe, has successfully completed her annual academic requirements in our institution. Her enrollment ledger is cleared of outstanding dues and liabilities.`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            Certificates & Bonafide Portal
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '12px' }}>
          <button 
            onClick={() => setActiveTab('apply')}
            style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '0.82rem', fontWeight: 600,
              background: activeTab === 'apply' ? 'var(--surface-color)' : 'transparent',
              color: activeTab === 'apply' ? 'var(--text-main)' : 'var(--text-light)',
              cursor: 'pointer'
            }}
          >
            Request New
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '0.82rem', fontWeight: 600,
              background: activeTab === 'history' ? 'var(--surface-color)' : 'transparent',
              color: activeTab === 'history' ? 'var(--text-main)' : 'var(--text-light)',
              cursor: 'pointer'
            }}
          >
            Request History ({requests.length})
          </button>
        </div>
      </div>

      {activeTab === 'apply' ? (
        /* Form view */
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' }}>
          <Card style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 700 }}>Apply Certificate Request</h3>
            
            <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Certificate Category</label>
                  <select 
                    value={certType}
                    onChange={e => setCertType(e.target.value)}
                    style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', background: 'white' }}
                  >
                    <option>Bonafide Certificate</option>
                    <option>Conduct Certificate</option>
                    <option>Study Certificate</option>
                    <option>Migration Certificate</option>
                    <option>Transfer Certificate</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Purpose of Application</label>
                  <select 
                    value={purpose}
                    onChange={e => setPurpose(e.target.value)}
                    style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', background: 'white' }}
                  >
                    <option>Passport Application</option>
                    <option>Visa verification</option>
                    <option>Bank account opening</option>
                    <option>College / Scholarship admission</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {purpose === 'Other' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Specify Purpose details</label>
                  <input 
                    type="text" 
                    placeholder="Enter details..." 
                    value={otherPurpose}
                    onChange={e => setOtherPurpose(e.target.value)}
                    style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none' }}
                    required
                  />
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button 
                  type="button"
                  onClick={() => setShowPreview(true)}
                  style={{
                    flex: 1, background: 'none', border: '1px solid #10B981', color: '#10B981',
                    borderRadius: '12px', padding: '12px 0', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                  }}
                >
                  <Eye size={16} /> Preview Mock Layout
                </button>
                <button 
                  type="submit"
                  style={{
                    flex: 1, background: '#10B981', color: 'white', border: 'none',
                    borderRadius: '12px', padding: '12px 0', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(16,185,129,0.1)'
                  }}
                >
                  Submit Application
                </button>
              </div>
            </form>
          </Card>

          <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-secondary)' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Instructions</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.8rem', color: 'var(--text-light)', lineHeight: 1.6 }}>
              <li>Bonafide requests are auto-approved within 24 hours under normal enrollment parameters.</li>
              <li>Verification status will follow the timeline workflow.</li>
              <li>Every document contains a verified QR code, official school seal, and the Principal's digital signature.</li>
            </ul>
          </Card>
        </div>
      ) : (
        /* History & timeline list */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {requests.map(req => (
            <Card key={req.id} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--surface-color)' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600, marginRight: '8px' }}>
                    REF: {req.id}
                  </span>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{req.type}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginLeft: '12px' }}>Purpose: {req.purpose}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '99px',
                    background: req.status === 'Ready' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                    color: req.status === 'Ready' ? '#10B981' : '#D97706'
                  }}>
                    {req.status}
                  </span>
                  {req.status === 'Ready' && (
                    <button 
                      onClick={() => alert(`Downloading Certificate PDF: ${req.certNumber}`)}
                      style={{
                        background: 'none', border: 'none', color: '#10B981', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700
                      }}
                    >
                      <Download size={14} /> Download PDF
                    </button>
                  )}
                </div>
              </div>

              {/* Approval status Timeline */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', padding: '16px', borderRadius: '16px' }}>
                {req.timeline.map((node, idx) => (
                  <React.Fragment key={node.title}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1, textAlign: 'center' }}>
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%',
                        background: node.status === 'completed' ? '#10B981' : node.status === 'active' ? '#F59E0B' : '#E5E7EB',
                        color: node.status === 'completed' || node.status === 'active' ? 'white' : 'var(--text-light)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem'
                      }}>
                        {node.status === 'completed' ? <Check size={12} /> : idx + 1}
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>{node.title}</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-light)' }}>{node.remarks || node.date}</span>
                    </div>
                    {idx !== req.timeline.length - 1 && (
                      <div style={{ flex: 0.5, height: '2px', background: req.timeline[idx+1].status === 'completed' || req.timeline[idx+1].status === 'active' ? '#10B981' : '#E5E7EB', margin: '0 8px', alignSelf: 'center', marginTop: '-16px' }} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Certificate Preview Drawer Overlay */}
      {showPreview && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999999
        }}>
          <Card style={{ width: '560px', padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px', borderRadius: '24px', background: '#FFFDF9', border: '10px double #cbd5e1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #334155', paddingBottom: '12px' }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <strong style={{ fontSize: '1.25rem', color: '#1E293B', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>EduVerse High School</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Affiliated Board Registration No. EV-90211</span>
              </div>
              <button onClick={() => setShowPreview(false)} style={{ background: 'none', border: 'none', color: 'var(--text-light)', fontSize: '1.1rem', cursor: 'pointer', alignSelf: 'flex-start' }}>✕</button>
            </div>

            <div style={{ textAlign: 'center', margin: '12px 0' }}>
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, color: '#0F766E', textDecoration: 'underline', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'serif' }}>
                {certType}
              </h2>
            </div>

            <p style={{
              fontSize: '0.9rem', color: '#334155', lineHeight: 1.8, textAlign: 'justify',
              fontFamily: 'serif', padding: '10px 0', margin: 0
            }}>
              {getPreviewText()}
            </p>

            {/* Verification Footer containing seals, QR code, and signatures */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
              borderTop: '1px solid #cbd5e1', paddingTop: '20px', marginTop: '12px'
            }}>
              {/* QR Verify code */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{
                  width: '72px', height: '72px', background: '#E2E8F0', borderRadius: '4px',
                  backgroundImage: `url('https://api.qrserver.com/v1/create-qr-code/?size=72x72&data=verify_certificate_sarah_doe')`,
                  backgroundSize: 'cover'
                }} />
                <span style={{ fontSize: '0.62rem', color: 'var(--text-light)' }}>Scan to Verify</span>
              </div>

              {/* Institution Seal Mock */}
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%', border: '2px double rgba(15,118,110,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem',
                color: 'rgba(15,118,110,0.5)', fontWeight: 700, transform: 'rotate(-15deg)', textAlign: 'center',
                textTransform: 'uppercase'
              }}>
                Institutional<br/>Seal
              </div>

              {/* Principal sign */}
              <div style={{ textAlign: 'center' }}>
                <span style={{
                  fontFamily: 'cursive', fontSize: '1rem', color: '#1E3A8A', display: 'block',
                  marginBottom: '2px', borderBottom: '1px solid #334155', padding: '0 10px'
                }}>
                  Dr. James Carter
                </span>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-light)' }}>Principal Authority</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
