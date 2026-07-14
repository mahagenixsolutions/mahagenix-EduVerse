import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { HeartPulse, Check, Calendar, Activity, AlertTriangle, ShieldCheck, Download } from 'lucide-react';

interface MedicalModuleProps {
  onBack: () => void;
}

interface DoctorVisit {
  id: number;
  date: string;
  doctor: string;
  reason: string;
  diagnosis: string;
  prescription: string;
  status: 'Completed' | 'Upcoming';
}

export const MedicalModule: React.FC<MedicalModuleProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'schedule'>('profile');
  const [visitDate, setVisitDate] = useState('');
  const [visitReason, setVisitReason] = useState('');
  
  const [visits, setVisits] = useState<DoctorVisit[]>([
    {
      id: 4002,
      date: '2026-06-08',
      doctor: 'Dr. James Carter (Institution Physician)',
      reason: 'Routine Physical & Health Screening',
      diagnosis: 'Normal vital checks, lung sound clear',
      prescription: 'Increase hydration, light cardiovascular exercise',
      status: 'Completed'
    },
    {
      id: 4001,
      date: '2026-05-14',
      doctor: 'Dr. James Carter (Institution Physician)',
      reason: 'Asthma/Wheezing Review',
      diagnosis: 'Mild exercise-induced bronchospasm',
      prescription: 'Albuterol Inhaler (1-2 puffs as needed before sports)',
      status: 'Completed'
    }
  ]);

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitDate || !visitReason.trim()) return;

    const id = Math.floor(Math.random() * 900) + 4000;
    const newVisit: DoctorVisit = {
      id,
      date: visitDate,
      doctor: 'Dr. James Carter (Institution Physician)',
      reason: visitReason,
      diagnosis: 'Awaiting Consultation',
      prescription: 'Pending doctor evaluation',
      status: 'Upcoming'
    };

    setVisits(prev => [newVisit, ...prev]);
    setVisitDate('');
    setVisitReason('');
    setActiveTab('profile');
    alert(`Doctor appointment scheduled successfully on ${visitDate}!`);
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
            Student Health & Medical Records
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '12px' }}>
          <button 
            onClick={() => setActiveTab('profile')}
            style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '0.82rem', fontWeight: 600,
              background: activeTab === 'profile' ? 'var(--surface-color)' : 'transparent',
              color: activeTab === 'profile' ? 'var(--text-main)' : 'var(--text-light)',
              cursor: 'pointer'
            }}
          >
            Medical Profile
          </button>
          <button 
            onClick={() => setActiveTab('schedule')}
            style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '0.82rem', fontWeight: 600,
              background: activeTab === 'schedule' ? 'var(--surface-color)' : 'transparent',
              color: activeTab === 'schedule' ? 'var(--text-main)' : 'var(--text-light)',
              cursor: 'pointer'
            }}
          >
            Schedule Clinic Visit
          </button>
        </div>
      </div>

      {activeTab === 'profile' ? (
        /* Medical Records details */
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '20px' }}>
          {/* Clinical Visits Log */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={18} color="var(--primary-color)" /> Doctor Consultations & Visits
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {visits.map(visit => (
                  <div key={visit.id} style={{
                    padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)',
                    background: visit.status === 'Upcoming' ? 'rgba(245,158,11,0.01)' : 'var(--surface-color)',
                    display: 'flex', flexDirection: 'column', gap: '8px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                      <div>
                        <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>{visit.reason}</strong>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', display: 'block' }}>Date: {visit.date} • MD: {visit.doctor}</span>
                      </div>
                      <span style={{
                        fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px',
                        background: visit.status === 'Completed' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                        color: visit.status === 'Completed' ? '#10B981' : '#D97706'
                      }}>
                        {visit.status}
                      </span>
                    </div>

                    <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                      <strong>Diagnosis:</strong> {visit.diagnosis}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', padding: '6px 12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                      💊 <strong>Prescription:</strong> {visit.prescription}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Side panels (Allergies & Vaccines) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Allergies */}
            <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid rgba(239,68,68,0.15)', background: 'linear-gradient(135deg, rgba(239,68,68,0.04) 0%, rgba(245,158,11,0.04) 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#EF4444' }}>
                <AlertTriangle size={18} />
                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>Critical Allergies</h4>
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.78rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                <li><strong>Peanut / Groundnut:</strong> SEVERE anaphylaxis risk (Epipen in Clinic).</li>
                <li><strong>Dust/Pollen:</strong> MILD asthma trigger.</li>
              </ul>
            </Card>

            {/* Vaccination */}
            <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
                <ShieldCheck size={18} />
                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>Vaccination Tracker</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem', color: 'var(--text-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>MMR Vaccine:</span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>Delivered ✓</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Hepatitis B:</span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>Delivered ✓</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>COVID-19 Booster:</span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>Delivered ✓</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        /* Schedule Doctor Visit */
        <Card style={{ padding: '24px', maxWidth: '500px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 700 }}>Schedule Clinic Appointment</h3>
          
          <form onSubmit={handleBookVisit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Choose Date</label>
              <input 
                type="date" 
                value={visitDate}
                onChange={e => setVisitDate(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none' }}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Reason for Visit / Symptoms</label>
              <textarea 
                placeholder="Describe your symptoms (e.g. sore throat, fever, physical medical checkup)..."
                rows={4}
                value={visitReason}
                onChange={e => setVisitReason(e.target.value)}
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
              Confirm Appointment
            </button>
          </form>
        </Card>
      )}
    </div>
  );
};
