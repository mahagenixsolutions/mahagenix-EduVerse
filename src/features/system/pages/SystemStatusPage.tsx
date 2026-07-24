import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Activity, CheckCircle2, AlertTriangle, Clock, 
  Server, Database, Bell, HardDrive, CreditCard, Zap, RefreshCw 
} from 'lucide-react';

interface ServiceItem {
  name: string;
  category: string;
  icon: any;
  status: 'operational' | 'degraded' | 'maintenance';
  uptime: string;
  latency: string;
}

const mockServices: ServiceItem[] = [
  { name: 'API Gateway & GraphQL', category: 'Core Backend', icon: Server, status: 'operational', uptime: '99.99%', latency: '18ms' },
  { name: 'PostgreSQL Primary DB', category: 'Data Storage', icon: Database, status: 'operational', uptime: '99.98%', latency: '12ms' },
  { name: 'Notification Engine (Push/SMS/Email)', category: 'Communication', icon: Bell, status: 'operational', uptime: '99.95%', latency: '45ms' },
  { name: 'AWS S3 Asset Storage', category: 'Media Storage', icon: HardDrive, status: 'operational', uptime: '100%', latency: '32ms' },
  { name: 'Stripe & Razorpay Payment Gateways', category: 'Financial Services', icon: CreditCard, status: 'operational', uptime: '99.92%', latency: '110ms' },
  { name: 'Realtime WebSocket Server', category: 'Live Activity Feed', icon: Zap, status: 'operational', uptime: '99.97%', latency: '8ms' }
];

const mockIncidents = [
  { date: 'Apr 02, 2026', title: 'Scheduled Database Index Reindexing Completed', status: 'Resolved', duration: '12 Mins' },
  { date: 'Mar 24, 2026', title: 'Minor Latency Spike in SMS Gateway Provider', status: 'Resolved', duration: '8 Mins' },
  { date: 'Mar 10, 2026', title: 'Stripe Payment Webhook Timeout Handled', status: 'Resolved', duration: '4 Mins' }
];

export const SystemStatusPage: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>(mockServices);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefreshStatus = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
      <PageHeader
        title="Live System Status & Health Center"
        subtitle="Real-time operational status, uptime metrics, latency metrics, and infrastructure health logs"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'System Status' }]}
        actions={
          <Button size="sm" variant="outline" onClick={handleRefreshStatus} disabled={refreshing}>
            <RefreshCw size={14} style={{ marginRight: '6px' }} /> {refreshing ? 'Refreshing...' : 'Refresh Status'}
          </Button>
        }
      />

      {/* Overall Health Status Banner */}
      <Card style={{
        padding: '24px', borderRadius: '18px', marginBottom: '24px',
        background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#059669',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#059669', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={26} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 2px 0', fontSize: '1.2rem', fontWeight: 800, color: '#047857' }}>
              All EduVerse Systems Operational
            </h3>
            <span style={{ fontSize: '0.85rem', color: '#065F46', fontWeight: 500 }}>
              Overall Infrastructure Health: <strong>99.98% Uptime</strong> over last 90 days
            </span>
          </div>
        </div>

        <Badge variant="success" size="md">OPERATIONAL ✓</Badge>
      </Card>

      {/* Services Operational Breakdown */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px' }}>
        Core Infrastructure & Microservices Status
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {services.map((item, idx) => (
          <Card key={idx} style={{ padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--primary-light)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <item.icon size={20} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>{item.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.category}</span>
                </div>
              </div>

              <Badge variant="success">99.9%</Badge>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <span>Latency: <strong>{item.latency}</strong></span>
              <span>Uptime: <strong>{item.uptime}</strong></span>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Maintenance & Incident History */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px' }}>
        Past Maintenance & Incident Logs
      </h3>

      <Card style={{ padding: '0', borderRadius: '18px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
              <th style={{ padding: '14px 18px' }}>Date</th>
              <th style={{ padding: '14px 18px' }}>Event / Maintenance Detail</th>
              <th style={{ padding: '14px 18px' }}>Duration</th>
              <th style={{ padding: '14px 18px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockIncidents.map((log, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '14px 18px', fontWeight: 600, color: 'var(--text-muted)' }}>{log.date}</td>
                <td style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-main)' }}>{log.title}</td>
                <td style={{ padding: '14px 18px', color: 'var(--text-muted)' }}>{log.duration}</td>
                <td style={{ padding: '14px 18px' }}>
                  <Badge variant="success">{log.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
