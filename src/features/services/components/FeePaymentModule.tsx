import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { CreditCard, Check, ShieldAlert, Award, FileText, Download, Printer } from 'lucide-react';

interface FeePaymentModuleProps {
  onBack: () => void;
}

export const FeePaymentModule: React.FC<FeePaymentModuleProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutMethod, setCheckoutMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Local state for interactive payments
  const [fees, setFees] = useState([
    { id: 1, name: 'Tuition Fee (Term 2)', amount: 10000, dueDate: '15 Oct 2026', category: 'Academic', status: 'pending' },
    { id: 2, name: 'Transport Fee (October)', amount: 2500, dueDate: '10 Oct 2026', category: 'Logistics', status: 'pending' }
  ]);

  const [history, setHistory] = useState([
    { id: 101, name: 'Term 1 Tuition Fee', amount: '₹45,000', date: '15 Sep 2025', receipt: 'REC-2025-8831', status: 'Successful' },
    { id: 102, name: 'School Store — Uniform', amount: '₹2,800', date: '10 Sep 2025', receipt: 'REC-2025-8710', status: 'Successful' },
    { id: 103, name: 'Library Fine — 3 Days Delay', amount: '₹30', date: '05 Sep 2025', receipt: 'REC-2025-8603', status: 'Successful' }
  ]);

  const totalDue = fees.reduce((sum, item) => item.status === 'pending' ? sum + item.amount : sum, 0);
  const totalPaid = history.reduce((sum, item) => sum + parseInt(item.amount.replace(/[₹,]/g, '')), 0);

  const handlePayNow = () => {
    setShowCheckout(true);
    setPaymentSuccess(false);
  };

  const executeMockPayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(true);
      // Mark all pending fees as paid
      setFees(prev => prev.map(f => ({ ...f, status: 'paid' })));
      // Add transaction to history
      const txId = Math.floor(Math.random() * 9000) + 1000;
      setHistory(prev => [
        {
          id: txId,
          name: 'Term 2 Tuition & Transport Fee',
          amount: `₹${totalDue.toLocaleString()}`,
          date: 'Today',
          receipt: `REC-2026-${txId}`,
          status: 'Successful'
        },
        ...prev
      ]);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Back button and Header */}
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
            Fee Payment & Invoices
          </h2>
        </div>

        {/* Tab triggers */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '12px' }}>
          <button 
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '0.82rem', fontWeight: 600,
              background: activeTab === 'overview' ? 'var(--surface-color)' : 'transparent',
              color: activeTab === 'overview' ? 'var(--text-main)' : 'var(--text-light)',
              cursor: 'pointer', boxShadow: activeTab === 'overview' ? '0 2px 8px rgba(0,0,0,0.04)' : 'none'
            }}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '0.82rem', fontWeight: 600,
              background: activeTab === 'history' ? 'var(--surface-color)' : 'transparent',
              color: activeTab === 'history' ? 'var(--text-main)' : 'var(--text-light)',
              cursor: 'pointer', boxShadow: activeTab === 'history' ? '0 2px 8px rgba(0,0,0,0.04)' : 'none'
            }}
          >
            Payment History
          </button>
        </div>
      </div>

      {/* Summary Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        <Card style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '6px', background: 'var(--surface-color)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>Total Outstanding</span>
          <strong style={{ fontSize: '1.5rem', color: totalDue > 0 ? '#EF4444' : '#10B981' }}>₹{totalDue.toLocaleString()}</strong>
        </Card>
        <Card style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '6px', background: 'var(--surface-color)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>Total Paid to Date</span>
          <strong style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>₹{totalPaid.toLocaleString()}</strong>
        </Card>
        <Card style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '6px', background: 'var(--surface-color)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>Scholarship Grant</span>
          <strong style={{ fontSize: '1.5rem', color: '#10B981' }}>10% Discount</strong>
        </Card>
        <Card style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '6px', background: 'var(--surface-color)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>Next Due Date</span>
          <strong style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>15 Oct 2026</strong>
        </Card>
      </div>

      {/* Active Tab Workspace */}
      {activeTab === 'overview' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '20px' }}>
          {/* Fees breakdown */}
          <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Fee Breakdown & Structure</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {fees.map(fee => (
                <div key={fee.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)',
                  background: fee.status === 'paid' ? 'rgba(16, 185, 129, 0.02)' : 'var(--surface-color)'
                }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: 700 }}>{fee.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Category: {fee.category} • Due: {fee.dueDate}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>₹{fee.amount.toLocaleString()}</strong>
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 700, padding: '4px 10px', borderRadius: '99px',
                      background: fee.status === 'paid' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                      color: fee.status === 'paid' ? '#10B981' : '#D97706'
                    }}>
                      {fee.status === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {totalDue > 0 ? (
              <button 
                onClick={handlePayNow}
                style={{
                  background: '#10B981', color: 'white', border: 'none', borderRadius: '14px',
                  padding: '12px 24px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'
                }}
              >
                <CreditCard size={18} /> Pay Outstanding Fees (₹{totalDue.toLocaleString()})
              </button>
            ) : (
              <div style={{
                background: 'rgba(16, 185, 129, 0.06)', color: '#10B981', padding: '16px', borderRadius: '16px',
                display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600
              }}>
                <Check size={18} /> Excellent! All school fees for the current semester have been cleared.
              </div>
            )}
          </Card>

          {/* Scholarship & Fines panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, rgba(6, 182, 212, 0.04) 100%)', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
                <Award size={20} />
                <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700 }}>Scholarship Verified</h4>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)', lineHeight: 1.4 }}>
                A 10% waiver has been auto-credited to your Term Tuition fees under the <strong>Sarah Doe Academic Excellence Scholarship</strong> scheme.
              </p>
            </Card>

            <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(107, 114, 128, 0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                <ShieldAlert size={20} />
                <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700 }}>Fines & Latency Alerts</h4>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)', lineHeight: 1.4 }}>
                No active late fee penalties or library damage charges currently pending on your student account ledger.
              </p>
            </Card>
          </div>
        </div>
      ) : (
        /* History Tab */
        <Card style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 700 }}>Past Transaction History</h3>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-light)' }}>
                  <th style={{ padding: '12px 8px', fontWeight: 600 }}>Fee Item</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600 }}>Date</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600 }}>Receipt #</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600 }}>Amount</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {history.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '14px 8px', fontWeight: 700, color: 'var(--text-main)' }}>{item.name}</td>
                    <td style={{ padding: '14px 8px', color: 'var(--text-light)' }}>{item.date}</td>
                    <td style={{ padding: '14px 8px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{item.receipt}</td>
                    <td style={{ padding: '14px 8px', fontWeight: 700 }}>{item.amount}</td>
                    <td style={{ padding: '14px 8px' }}>
                      <span style={{ fontSize: '0.72rem', background: 'rgba(16, 185, 129, 0.08)', color: '#10B981', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 8px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => alert(`Downloading Receipt for ${item.receipt}`)}
                          style={{ background: 'none', border: 'none', color: '#10B981', cursor: 'pointer', padding: '4px' }}
                          title="Download Receipt PDF"
                        >
                          <Download size={16} />
                        </button>
                        <button 
                          onClick={() => window.print()}
                          style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', padding: '4px' }}
                          title="Print Receipt Invoice"
                        >
                          <Printer size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Checkout Dialog Modal */}
      {showCheckout && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999999
        }}>
          <Card style={{ width: '420px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', borderRadius: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Secure Checkout</h3>
              <button 
                onClick={() => setShowCheckout(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-light)', fontSize: '1.1rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {paymentSuccess ? (
              /* Success Stage */
              <div style={{ textAlign: 'center', padding: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.08)',
                  color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Check size={32} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>Payment Successful</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)', lineHeight: 1.4 }}>
                    Your transaction has been credited. You can download the invoice from the Payment History panel.
                  </p>
                </div>
                <button 
                  onClick={() => setShowCheckout(false)}
                  style={{
                    background: '#10B981', color: 'white', border: 'none', borderRadius: '12px',
                    padding: '8px 24px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer'
                  }}
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              /* Checkout Options Stage */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'var(--bg-secondary)', padding: '12px 16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Amount Payable:</span>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>₹{totalDue.toLocaleString()}</strong>
                </div>

                {/* Tab layout inside checkout */}
                <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                  {['upi', 'card', 'netbanking'].map(method => (
                    <button 
                      key={method}
                      onClick={() => setCheckoutMethod(method as any)}
                      style={{
                        flex: 1, padding: '6px 0', border: 'none', background: 'none', fontSize: '0.75rem', fontWeight: 700,
                        borderBottom: checkoutMethod === method ? '2px solid #10B981' : 'none',
                        color: checkoutMethod === method ? '#10B981' : 'var(--text-muted)', cursor: 'pointer'
                      }}
                    >
                      {method.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Content based on method */}
                {checkoutMethod === 'upi' && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '10px 0' }}>
                    <div style={{
                      width: '140px', height: '140px', background: '#F3F4F6', borderRadius: '12px', border: '1px solid var(--border-color)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--text-muted)',
                      backgroundImage: `url('https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi://pay?pa=eduverse@bank')`,
                      backgroundSize: 'cover'
                    }}>
                      {/* Generates mock QR code */}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>Scan the QR code with any UPI app (GPay/Paytm) to pay.</span>
                  </div>
                )}

                {checkoutMethod === 'card' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input 
                      type="text" 
                      placeholder="Card Number (4000 1234 5678 9010)" 
                      style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none' }}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input 
                        type="text" 
                        placeholder="MM / YY" 
                        style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none' }}
                      />
                      <input 
                        type="text" 
                        placeholder="CVV" 
                        style={{ width: '80px', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none' }}
                      />
                    </div>
                  </div>
                )}

                {checkoutMethod === 'netbanking' && (
                  <select style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none', background: 'white' }}>
                    <option>Select Popular Banks</option>
                    <option>State Bank of India (SBI)</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                  </select>
                )}

                {/* Action button */}
                <button 
                  onClick={executeMockPayment}
                  style={{
                    background: '#10B981', color: 'white', border: 'none', borderRadius: '12px',
                    padding: '12px 0', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)', marginTop: '8px'
                  }}
                >
                  Pay Securely via {checkoutMethod.toUpperCase()}
                </button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};
