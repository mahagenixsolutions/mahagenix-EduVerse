import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { 
  CreditCard, Download, CheckCircle2, Clock, 
  Wallet, ShieldCheck, AlertCircle, FileText, ArrowRight
} from 'lucide-react';
import styles from './services.module.css';

interface FeeItem {
  id: number;
  term: string;
  category: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  receiptNo?: string;
}

const mockFees: FeeItem[] = [
  { id: 1, term: 'Term 1 Tuition & Lab Fee', category: 'Academic', amount: 18500, dueDate: 'Jan 15, 2026', status: 'paid', receiptNo: 'REC-2026-0941' },
  { id: 2, term: 'Term 2 Tuition Fee', category: 'Academic', amount: 18500, dueDate: 'Apr 30, 2026', status: 'pending' },
  { id: 3, term: 'Annual Hostel & Mess Charge', category: 'Residential', amount: 12000, dueDate: 'Feb 10, 2026', status: 'paid', receiptNo: 'REC-2026-1104' },
  { id: 4, term: 'Bus Transport Term 2', category: 'Transport', amount: 2450, dueDate: 'May 05, 2026', status: 'pending' }
];

export const FeesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [fees, setFees] = useState<FeeItem[]>(mockFees);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const tabs = [
    { id: 'all', label: 'All Dues & Status', count: fees.length },
    { id: 'pending', label: 'Pending Dues', count: fees.filter(f => f.status === 'pending').length },
    { id: 'history', label: 'Payment History & Receipts', count: fees.filter(f => f.status === 'paid').length }
  ];

  const handlePayNow = (id: number) => {
    setIsProcessing(true);
    setTimeout(() => {
      setFees(prev => prev.map(f => f.id === id ? { ...f, status: 'paid' as const, receiptNo: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}` } : f));
      setIsProcessing(false);
      setToast('Payment Successful! Official Receipt generated & downloaded.');
      setTimeout(() => setToast(null), 3500);
    }, 1200);
  };

  const filtered = fees.filter(f => {
    if (activeTab === 'pending') return f.status === 'pending';
    if (activeTab === 'history') return f.status === 'paid';
    return true;
  });

  const totalPending = fees.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);

  return (
    <div>
      <PageHeader
        title="Fee Payments & Financial Center"
        subtitle="View tuition & transport fee status, pay online via UPI/Card, and download official payment receipts"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Services', path: '/services' }, { label: 'Fee Payments' }]}
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

      {/* Financial Summary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <Card style={{ padding: '20px', borderRadius: '18px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Dues Pending</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>₹{totalPending.toLocaleString()}</h3>
          </div>
        </Card>

        <Card style={{ padding: '20px', borderRadius: '18px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Scholarship Waiver</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>₹15,000 / Yr</h3>
          </div>
        </Card>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '16px', 
        marginTop: '24px' 
      }}>
        {filtered.map(fee => (
          <Card 
            key={fee.id} 
            style={{ 
              padding: '20px', 
              borderRadius: '18px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              gap: '14px',
              height: '100%'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                <Badge variant={fee.status === 'paid' ? 'success' : 'warning'}>{fee.status.toUpperCase()}</Badge>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-color)' }}>{fee.category}</span>
              </div>

              <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.3 }}>
                {fee.term}
              </h4>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Due Date: {fee.dueDate}
                {fee.receiptNo && <div style={{ fontSize: '0.75rem', marginTop: '2px' }}>Receipt: {fee.receiptNo}</div>}
              </div>
            </div>

            <div style={{ 
              borderTop: '1px solid var(--border-color)', 
              paddingTop: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                ₹{fee.amount.toLocaleString()}
              </span>

              {fee.status === 'pending' ? (
                <Button size="sm" onClick={() => handlePayNow(fee.id)} disabled={isProcessing}>
                  <CreditCard size={14} style={{ marginRight: '4px' }} />
                  {isProcessing ? '...' : 'Pay Online Now'}
                </Button>
              ) : (
                <Button size="sm" variant="outline">
                  <Download size={14} style={{ marginRight: '4px' }} /> Receipt PDF
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
