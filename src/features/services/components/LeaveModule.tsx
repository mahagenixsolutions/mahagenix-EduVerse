import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Calendar, FileText, Check, Clock, Upload, ArrowRight, Download } from 'lucide-react';

interface LeaveModuleProps {
  onBack: () => void;
}

interface LeaveRequest {
  id: number;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Approved' | 'Under Review' | 'Rejected';
  timeline: { title: string; date: string; status: 'completed' | 'active' | 'upcoming'; remarks?: string }[];
}

export const LeaveModule: React.FC<LeaveModuleProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'apply' | 'history'>('apply');
  const [leaveType, setLeaveType] = useState('Sick Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [attachment, setAttachment] = useState<string | null>(null);
  
  const [leaves, setLeaves] = useState<LeaveRequest[]>([
    {
      id: 1002,
      type: 'Medical Leave',
      startDate: '2026-10-15',
      endDate: '2026-10-18',
      reason: 'Wisdom teeth extraction surgery',
      status: 'Under Review',
      timeline: [
        { title: 'Submitted & Logged', date: 'Today', status: 'completed' },
        { title: 'Class Teacher Review', date: 'Today', status: 'active', remarks: 'Under evaluation by Mrs. Davis' },
        { title: 'Principal Approval', date: 'Pending', status: 'upcoming' }
      ]
    },
    {
      id: 1001,
      type: 'Casual Leave',
      startDate: '2026-05-05',
      endDate: '2026-05-06',
      reason: 'Family wedding ceremony attendance',
      status: 'Approved',
      timeline: [
        { title: 'Submitted & Logged', date: '04 May 2026', status: 'completed' },
        { title: 'Class Teacher Review', date: '04 May 2026', status: 'completed', remarks: 'Approved' },
        { title: 'Principal Approval', date: '05 May 2026', status: 'completed', remarks: 'Approved, sanction letter generated' }
      ]
    }
  ]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason.trim()) return;

    const id = Math.floor(Math.random() * 900) + 1000;
    const newRequest: LeaveRequest = {
      id,
      type: leaveType,
      startDate,
      endDate,
      reason,
      status: 'Under Review',
      timeline: [
        { title: 'Submitted & Logged', date: 'Today', status: 'completed' },
        { title: 'Class Teacher Review', date: 'Today', status: 'active', remarks: 'Assigned to Class Coordinator' },
        { title: 'Principal Approval', date: 'Pending', status: 'upcoming' }
      ]
    };

    setLeaves(prev => [newRequest, ...prev]);
    setStartDate('');
    setEndDate('');
    setReason('');
    setAttachment(null);
    setActiveTab('history');
    alert('Leave request submitted successfully! Class Teacher will be notified to review.');
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setAttachment('medical_cert_extract.pdf');
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
            Leave Applications Workspace
          </h2>
        </div>

        {/* Tab switcher */}
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
            Apply Leave
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
            Request History ({leaves.length})
          </button>
        </div>
      </div>

      {activeTab === 'apply' ? (
        /* Form View */
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' }}>
          <Card style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 700 }}>New Leave Request</h3>
            
            <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Leave Category</label>
                  <select 
                    value={leaveType}
                    onChange={e => setLeaveType(e.target.value)}
                    style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', background: 'white' }}
                  >
                    <option>Sick Leave</option>
                    <option>Casual Leave</option>
                    <option>Medical Leave</option>
                    <option>Special Leave / Absence</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Attach Medical/Sanction Proof</label>
                  <div 
                    onDragOver={e => e.preventDefault()}
                    onDrop={handleFileDrop}
                    onClick={() => setAttachment('sanction_letter_doc.pdf')}
                    style={{
                      border: '1px dashed var(--border-color)', borderRadius: '10px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      padding: '8px 12px', fontSize: '0.78rem', color: attachment ? '#10B981' : 'var(--text-light)',
                      cursor: 'pointer', background: 'var(--bg-secondary)', height: '22px'
                    }}
                  >
                    <Upload size={14} /> {attachment ? attachment : 'Click or Drag File Here'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Start Date</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none' }}
                    required
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>End Date</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none' }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Detailed Explanation / Reason</label>
                <textarea 
                  placeholder="Explain details of your absence request..."
                  rows={4}
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none', resize: 'none' }}
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
                File Application
              </button>
            </form>
          </Card>

          {/* Quick instructions / guidelines */}
          <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-secondary)' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Leave Rules & Guidelines</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.8rem', color: 'var(--text-light)', lineHeight: 1.6 }}>
              <li>Applications must be filed at least 24 hours prior to scheduled casual leaves.</li>
              <li>Medical leaves exceeding 2 days require a valid doctor certificate attachment.</li>
              <li>Approval updates will appear in your notifications dashboard instantly.</li>
              <li>Sanction approval letters can be printed once the Principal authorizes.</li>
            </ul>
          </Card>
        </div>
      ) : (
        /* History & Timeline Track View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {leaves.map(req => (
            <Card key={req.id} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--surface-color)' }}>
              {/* Top metadata */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600, marginRight: '8px' }}>
                    ID: #{req.id}
                  </span>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{req.type}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginLeft: '12px' }}>({req.startDate} to {req.endDate})</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '99px',
                    background: req.status === 'Approved' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                    color: req.status === 'Approved' ? '#10B981' : '#D97706'
                  }}>
                    {req.status}
                  </span>
                  {req.status === 'Approved' && (
                    <button 
                      onClick={() => alert('Downloading official approval letter PDF...')}
                      style={{
                        background: 'none', border: 'none', color: '#10B981', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700
                      }}
                    >
                      <Download size={14} /> Letter
                    </button>
                  )}
                </div>
              </div>

              {/* Leave explanation */}
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)' }}>
                <strong>Reason:</strong> {req.reason}
              </p>

              {/* Status Timeline */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', padding: '16px', borderRadius: '16px' }}>
                {req.timeline.map((node, index) => (
                  <React.Fragment key={node.title}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1, textAlign: 'center' }}>
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%',
                        background: node.status === 'completed' ? '#10B981' : node.status === 'active' ? '#F59E0B' : '#E5E7EB',
                        color: node.status === 'completed' || node.status === 'active' ? 'white' : 'var(--text-light)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem'
                      }}>
                        {node.status === 'completed' ? <Check size={12} /> : index + 1}
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>{node.title}</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-light)' }}>{node.remarks || node.date}</span>
                    </div>
                    {index !== req.timeline.length - 1 && (
                      <div style={{ flex: 0.5, height: '2px', background: req.timeline[index+1].status === 'completed' || req.timeline[index+1].status === 'active' ? '#10B981' : '#E5E7EB', margin: '0 8px', alignSelf: 'center', marginTop: '-16px' }} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
