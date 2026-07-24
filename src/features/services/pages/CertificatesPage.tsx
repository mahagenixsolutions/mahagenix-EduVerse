import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { 
  FileText, Download, CheckCircle2, QrCode, 
  Award, ShieldCheck, Printer, Eye, Sparkles
} from 'lucide-react';
import styles from './services.module.css';

interface CertificateItem {
  id: number;
  title: string;
  type: string;
  issuedDate: string;
  certificateNo: string;
  status: 'available' | 'requested';
}

const mockCertificates: CertificateItem[] = [
  { id: 1, title: 'Bonafide Student Certificate (Academic Year 2025-26)', type: 'Bonafide', issuedDate: 'Jan 10, 2026', certificateNo: 'BON-2026-8801', status: 'available' },
  { id: 2, title: 'Study & Conduct Certificate', type: 'Conduct', issuedDate: 'Feb 15, 2026', certificateNo: 'CND-2026-4412', status: 'available' },
  { id: 3, title: 'Transfer Certificate (TC Application)', type: 'Transfer', issuedDate: 'Pending Request', certificateNo: 'TC-PENDING', status: 'requested' }
];

export const CertificatesPage: React.FC = () => {
  const [certs, setCerts] = useState<CertificateItem[]>(mockCertificates);
  const [toast, setToast] = useState<string | null>(null);

  const handleDownload = (cert: CertificateItem) => {
    setToast(`Downloading official verified ${cert.type} Certificate PDF...`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleRequestNew = () => {
    const newCert: CertificateItem = {
      id: Date.now(),
      title: 'Course Completion & Merit Certificate',
      type: 'Merit',
      issuedDate: 'Issued Today',
      certificateNo: `MER-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'available'
    };
    setCerts(prev => [newCert, ...prev]);
    setToast('New Certificate generated & added to your document locker!');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div>
      <PageHeader
        title="Student Certificates & Document Locker"
        subtitle="Download official digitally signed Bonafide, Study, Conduct, and Transfer Certificates with QR verification"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Services', path: '/services' }, { label: 'Certificates' }]}
        actions={
          <Button size="sm" onClick={handleRequestNew}>
            <Sparkles size={16} style={{ marginRight: '6px' }} /> Request New Certificate
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
        {certs.map(cert => (
          <Card key={cert.id} style={{ padding: '24px', borderRadius: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <Badge variant={cert.status === 'available' ? 'success' : 'warning'}>
                  {cert.status === 'available' ? 'VERIFIED ✓' : 'IN REVIEW'}
                </Badge>
                <QrCode size={20} style={{ color: 'var(--primary-color)' }} />
              </div>

              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.35 }}>
                {cert.title}
              </h3>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Ref No: <strong>{cert.certificateNo}</strong> • Issued: {cert.issuedDate}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={16} /> Digitally Signed
              </span>

              <div style={{ display: 'flex', gap: '8px' }}>
                <Button size="sm" variant="outline" onClick={() => handleDownload(cert)}>
                  <Eye size={14} style={{ marginRight: '4px' }} /> View
                </Button>
                <Button size="sm" onClick={() => handleDownload(cert)}>
                  <Download size={14} style={{ marginRight: '4px' }} /> PDF
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
