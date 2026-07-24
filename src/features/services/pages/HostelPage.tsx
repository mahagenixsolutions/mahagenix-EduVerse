import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { 
  Building, Utensils, CheckCircle2, Clock, 
  ShieldCheck, AlertCircle, FileText, Plus, User
} from 'lucide-react';
import styles from './services.module.css';

interface GatePass {
  id: number;
  reason: string;
  outTime: string;
  inTime: string;
  status: 'approved' | 'pending' | 'rejected';
  approvedBy: string;
}

const mockGatePasses: GatePass[] = [
  { id: 1, reason: 'Weekend family visit home', outTime: 'Apr 11, 05:00 PM', inTime: 'Apr 13, 08:00 AM', status: 'approved', approvedBy: 'Warden Mr. Roy' },
  { id: 2, reason: 'Medical dental appointment', outTime: 'Apr 15, 03:00 PM', inTime: 'Apr 15, 06:30 PM', status: 'pending', approvedBy: 'Warden Review' }
];

export const HostelPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [passes, setPasses] = useState<GatePass[]>(mockGatePasses);
  const [showPassModal, setShowPassModal] = useState(false);
  const [reason, setReason] = useState('Weekend Visit');
  const [toast, setToast] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: 'Room & Overview' },
    { id: 'mess', label: 'Mess Menu & Meals' },
    { id: 'gatepass', label: 'Gate Pass Status', count: passes.length },
    { id: 'notices', label: 'Hostel Notices' }
  ];

  const handleApplyGatePass = (e: React.FormEvent) => {
    e.preventDefault();
    const newPass: GatePass = {
      id: Date.now(),
      reason,
      outTime: 'Tomorrow 04:00 PM',
      inTime: 'Day after 08:00 AM',
      status: 'pending',
      approvedBy: 'Pending Warden Approval'
    };
    setPasses(prev => [newPass, ...prev]);
    setShowPassModal(false);
    setToast('Gate Pass Application submitted to Hostel Warden!');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div>
      <PageHeader
        title="Hostel & Residential Services"
        subtitle="Manage room details, weekly mess menu, hostel notices, and gate pass requests"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Services', path: '/services' }, { label: 'Hostel' }]}
        actions={
          <Button size="sm" onClick={() => setShowPassModal(true)}>
            <Plus size={16} style={{ marginRight: '6px' }} /> Apply for Gate Pass
          </Button>
        }
      />

      {toast && (
        <div style={{
          padding: '12px 20px', background: '#ECFDF5', color: '#059669',
          borderRadius: '12px', border: '1px solid #A7F3D0', marginBottom: '20px',
          display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600
        }}>
          <CheckCircle2 size={20} />
          <span>{toast}</span>
        </div>
      )}

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '24px' }}>
          <Card style={{ padding: '24px', borderRadius: '18px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 800 }}>Hostel Room Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Block & Room:</span>
                <strong>Block C - Room #304 (Double Occupancy)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Roommate:</span>
                <strong>Lucas Martin (Grade 9 - C)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Hostel Warden:</span>
                <strong>Mr. David Roy (+91 98765 11223)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Night Curfew Time:</span>
                <strong style={{ color: 'var(--primary-color)' }}>09:30 PM Sharp</strong>
              </div>
            </div>
          </Card>

          <Card style={{ padding: '24px', borderRadius: '18px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 800 }}>Night Attendance Summary</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem' }}>
                98%
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>Hostel Roll Call Record</div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Present on 29 out of 30 nights this month</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'mess' && (
        <Card style={{ padding: '24px', borderRadius: '18px', marginTop: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Utensils size={20} style={{ color: 'var(--primary-color)' }} /> Weekly Mess Menu
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, idx) => (
              <div key={day} style={{ background: 'var(--bg-color)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-color)' }}>{day}</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                  <div>🥣 <strong>Breakfast:</strong> Idli Sambar, Juice</div>
                  <div>🍲 <strong>Lunch:</strong> Rice, Dal, Paneer Gravy</div>
                  <div>🍱 <strong>Dinner:</strong> Chapati, Mixed Veg Curry</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'gatepass' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '24px' }}>
          {passes.map(p => (
            <Card key={p.id} style={{ padding: '20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{p.reason}</h4>
                  <Badge variant={p.status === 'approved' ? 'success' : 'warning'}>{p.status.toUpperCase()}</Badge>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Out: {p.outTime} | Expected Return: {p.inTime}
                </div>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-color)' }}>{p.approvedBy}</span>
            </Card>
          ))}
        </div>
      )}

      {showPassModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Card style={{ maxWidth: '420px', width: '100%', padding: '24px', borderRadius: '18px' }}>
            <h3 style={{ margin: '0 0 14px 0' }}>Apply for Hostel Gate Pass</h3>
            <form onSubmit={handleApplyGatePass} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Reason for Leaving Hostel</label>
                <input type="text" value={reason} onChange={e => setReason(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)' }} required />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <Button type="button" variant="outline" onClick={() => setShowPassModal(false)}>Cancel</Button>
                <Button type="submit">Submit Gate Pass</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
