import React, { useState } from 'react';
import {
  FileText,
  CreditCard,
  X,
  QrCode,
  Wallet,
  Building,
  CheckCircle2,
  Check,
  Download,
  Printer,
  Shield,
  Info,
  Ticket,
  Calendar,
  DollarSign,
} from 'lucide-react';
import type { CalendarEvent, Registration } from '@/mock-server/MockServer';

interface EventRegistrationModalProps {
  event: CalendarEvent;
  step: 'profile_review' | 'payment_select' | 'payment_process' | 'success';
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
  onProceedToPayment: () => void;
  onProcessPayment: () => void;
  onClose: () => void;
  createdReg: Registration | null;
}

export const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({
  event,
  step,
  paymentMethod,
  onPaymentMethodChange,
  onProceedToPayment,
  onProcessPayment,
  onClose,
  createdReg,
}) => {
  const [agreed, setAgreed] = useState(true);
  const feeAmount = event.fee ?? 1500;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      {/* Top Floating Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(4px)',
          border: 'none',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10000,
        }}
      >
        <X size={20} />
      </button>

      {/* Main Modal Card */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '32px',
          width: '100%',
          maxWidth: step === 'success' ? '560px' : '520px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid #F1F5F9',
        }}
      >
        {/* STEP 1: REVIEW STUDENT INFORMATION */}
        {step === 'profile_review' && (
          <div style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={20} color="#217A54" /> Review Student Information
              </h2>
              <button onClick={onClose} style={closeBtnStyle}>
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 20px 0' }}>
              For ease of registration, the School ERP has pre-filled your academic and guardian details automatically. Please confirm the details before proceeding.
            </p>

            <div style={{ background: '#F8FAFC', borderRadius: '18px', padding: '18px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', border: '1px solid #F1F5F9' }}>
              <img src="https://i.pravatar.cc/150?u=sarah" alt="Sarah Doe" style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover' }} />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 2px 0' }}>Sarah Doe</h3>
                <div style={{ fontSize: '0.775rem', fontWeight: 700, color: '#217A54', marginBottom: '2px' }}>ID: GFA-2025-10042</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Admission No: ADM-2023-8891</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Class: 10th Grade (Sec A) • Roll: #12</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '2px' }}>Parent/Guardian Name</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>John Doe</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '2px' }}>Parent Phone Number</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>+91 98765 43211</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '2px' }}>Parent Email Address</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>john.doe@email.com</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '2px' }}>Institution Facility</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>Greenfield Academy</div>
              </div>
            </div>

            <div style={{ background: '#F8FAFC', borderRadius: '14px', padding: '14px 18px', marginBottom: '18px', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Event Base Fee:</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>₹{feeAmount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Handling Fees (ERP):</span>
                <span style={{ fontWeight: 600, color: '#217A54' }}>₹0 (Waived)</span>
              </div>
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>
                <span>Grand Total:</span>
                <span>₹{feeAmount}</span>
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.8rem', color: '#64748B', cursor: 'pointer', marginBottom: '24px', lineHeight: 1.4 }}>
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ marginTop: '2px', accentColor: '#217A54' }} />
              <span>I agree to follow the code of conduct and consent to guidelines set by coordinators.</span>
            </label>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0', background: '#FFFFFF', color: '#0F172A', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
                Save Draft (Interested)
              </button>
              <button disabled={!agreed} onClick={onProceedToPayment} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: agreed ? '#217A54' : '#CBD5E1', color: '#FFFFFF', fontSize: '0.875rem', fontWeight: 700, cursor: agreed ? 'pointer' : 'not-allowed', boxShadow: agreed ? '0 4px 14px rgba(33, 122, 84, 0.3)' : 'none' }}>
                Proceed to Payment
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT PAYMENT METHOD */}
        {step === 'payment_select' && (
          <div style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CreditCard size={20} color="#217A54" /> Select Payment Method
              </h2>
              <button onClick={onClose} style={closeBtnStyle}>
                <X size={18} />
              </button>
            </div>

            <div style={{ background: '#F8FAFC', borderRadius: '14px', padding: '14px 18px', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Event Name:</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>{event.title}</span>
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', display: 'flex', justifyContent: 'space-between' }}>
                <span>Amount Payable:</span>
                <span>₹{feeAmount}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              {[
                { id: 'upi', label: 'UPI / Scan QR', icon: QrCode },
                { id: 'card', label: 'Card Pay', icon: CreditCard },
                { id: 'wallet', label: 'E-Wallets', icon: Wallet },
                { id: 'netbanking', label: 'Net Banking', icon: Building },
              ].map((pm) => {
                const IconC = pm.icon;
                const isSelected = paymentMethod === pm.id;
                return (
                  <button
                    key={pm.id}
                    onClick={() => onPaymentMethodChange(pm.id)}
                    style={{
                      padding: '14px',
                      borderRadius: '14px',
                      border: isSelected ? '2px solid #217A54' : '1px solid #E2E8F0',
                      background: isSelected ? '#E8F5E9' : '#FFFFFF',
                      color: isSelected ? '#217A54' : '#475569',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    <IconC size={18} /> {pm.label}
                  </button>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', padding: '16px', background: '#F8FAFC', borderRadius: '18px', marginBottom: '24px' }}>
              <div style={{ width: '130px', height: '130px', margin: '0 auto 12px auto', background: '#FFFFFF', borderRadius: '16px', padding: '12px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <path d="M0 0h35v35H0zM65 0h35v35H65zM0 65h35v35H0z" fill="#217A54" />
                  <path d="M10 10h15v15H10zM75 10h15v15H75zM10 75h15v15H10z" fill="#FFF" />
                  <path d="M40 10h20v10H40zM10 40h15v20H10zM40 40h20v20H40zM70 40h20v20H40zM40 70h20v20H40zM70 70h20v20H70z" fill="#217A54" />
                </svg>
              </div>
              <div style={{ fontSize: '0.775rem', color: '#64748B', marginBottom: '12px' }}>Scan using BHIM, GooglePay, PhonePe, or Paytm</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '4px' }}>Or enter UPI ID</div>
                <input type="text" defaultValue="sarah.doe@okaxis" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '0.85rem', color: '#0F172A', outline: 'none' }} />
              </div>
            </div>

            <button onClick={onProcessPayment} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: '#217A54', color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(33, 122, 84, 0.3)' }}>
              Pay ₹{feeAmount} Securely
            </button>
          </div>
        )}

        {/* STEP 3: PROCESSING PAYMENT LOADER */}
        {step === 'payment_process' && (
          <div style={{ padding: '54px 36px', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '4px solid #E2E8F0', borderTopColor: '#217A54', animation: 'spin 0.8s linear infinite', margin: '0 auto 24px auto' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0' }}>
              Processing Payment...
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
              Please do not reload the page or click back.<br />
              We are verifying with your bank nodes.
            </p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* STEP 4: EXACT MATCH AUTHENTIC REAL TICKET PASS WITH SCALLOPED EDGES (MATCHING USER SCREENSHOT EXACTLY) */}
        {step === 'success' && (
          <div style={{ padding: '36px 32px 32px 32px', position: 'relative', background: '#FFFFFF' }}>
            {/* Top Large Circular Green Checkmark Badge */}
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '3px solid #217A54',
                color: '#217A54',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                boxShadow: '0 6px 20px rgba(33, 122, 84, 0.2)',
              }}
            >
              <Check size={36} strokeWidth={3} />
            </div>

            {/* Header & Subtitle */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#217A54', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
                Payment Successful!
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                Your ticket for <strong>{event.title}</strong><br />has been generated.
              </p>
            </div>

            {/* Authentic Ticket Stub Graphic Container */}
            <div
              style={{
                position: 'relative',
                background: '#FFFFFF',
                borderRadius: '20px',
                border: '2px dashed #217A54',
                boxShadow: '0 10px 30px rgba(33, 122, 84, 0.1)',
                marginBottom: '20px',
                overflow: 'visible',
              }}
            >
              {/* Left & Right Circular Semicircular Notch Cutouts where Perforation Meets */}
              <div
                style={{
                  position: 'absolute',
                  left: '-14px',
                  bottom: '68px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  borderRight: '2px dashed #217A54',
                  zIndex: 10,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: '-14px',
                  bottom: '68px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  borderLeft: '2px dashed #217A54',
                  zIndex: 10,
                }}
              />

              {/* Ticket Top Dark Emerald Banner Bar */}
              <div
                style={{
                  background: '#217A54',
                  padding: '16px 22px',
                  color: '#FFFFFF',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTopLeftRadius: '18px',
                  borderTopRightRadius: '18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      border: '1.5px solid rgba(255, 255, 255, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(255, 255, 255, 0.1)',
                      flexShrink: 0,
                    }}
                  >
                    <Shield size={20} color="#FFFFFF" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, letterSpacing: '0.04em', lineHeight: 1.1 }}>
                      GREENFIELD ACADEMY
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}>
                      Excellence In Education
                    </div>
                  </div>
                </div>

                {/* Tilted Stamp Badge */}
                <span
                  style={{
                    background: 'none',
                    border: '1.5px solid rgba(255, 255, 255, 0.9)',
                    color: '#FFFFFF',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '0.675rem',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    whiteSpace: 'nowrap',
                    transform: 'rotate(-5deg)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <CheckCircle2 size={13} /> CONFIRMED PASS
                </span>
              </div>

              {/* Ticket Inner Main Body */}
              <div style={{ padding: '22px 24px' }}>
                {/* Student Profile Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                    alt="Sarah Doe"
                    style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 2px 0' }}>
                      Sarah Doe
                    </h4>
                    <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                      Class: <strong style={{ color: '#217A54' }}>Grade 10 (A)</strong> | Roll: 12
                    </div>
                  </div>
                </div>

                {/* Dashed Line 1 */}
                <div style={{ borderTop: '1px dashed #CBD5E1', margin: '16px 0' }} />

                {/* 2x2 Ticket Info Fields Grid matching user screenshot */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '0.675rem', color: '#94A3B8', fontWeight: 800, letterSpacing: '0.04em', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Ticket size={13} color="#217A54" /> TICKET REFERENCE
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>
                      {createdReg?.ticketNumber || 'TKT-103-5114'}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.675rem', color: '#94A3B8', fontWeight: 800, letterSpacing: '0.04em', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CreditCard size={13} color="#217A54" /> TRANSACTION ID
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>
                      {createdReg?.transactionId || 'TXN-88188101'}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.675rem', color: '#94A3B8', fontWeight: 800, letterSpacing: '0.04em', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} color="#217A54" /> REGISTRATION DATE
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>
                      31 July, 2026
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.675rem', color: '#94A3B8', fontWeight: 800, letterSpacing: '0.04em', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <DollarSign size={13} color="#217A54" /> FEE PAID
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#217A54' }}>
                      ₹{feeAmount}
                    </div>
                  </div>
                </div>

                {/* Dashed Line 2 */}
                <div style={{ borderTop: '1px dashed #CBD5E1', margin: '16px 0' }} />

                {/* QR Code & Instructions Section */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '94px',
                      height: '94px',
                      padding: '8px',
                      borderRadius: '16px',
                      border: '1.5px solid #217A54',
                      background: '#FFFFFF',
                      flexShrink: 0,
                    }}
                  >
                    <svg viewBox="0 0 100 100" width="100%" height="100%">
                      <path d="M0 0h35v35H0zM65 0h35v35H65zM0 65h35v35H0z" fill="#0F172A" />
                      <path d="M10 10h15v15H10zM75 10h15v15H75zM10 75h15v15H10z" fill="#FFF" />
                      <path d="M40 10h20v10H40zM10 40h15v20H10zM40 40h20v20H40zM70 40h20v20H70zM40 70h20v20H40zM70 70h20v20H70z" fill="#0F172A" />
                    </svg>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.55 }}>
                    <div style={{ fontWeight: 800, color: '#217A54', marginBottom: '4px', letterSpacing: '0.03em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Info size={13} /> IMPORTANT INSTRUCTIONS
                    </div>
                    <div>✓ Please carry this e-ticket on the day of the test.</div>
                    <div>✓ Show this QR code at the exam center.</div>
                    <div>✓ This ticket is non-transferable.</div>
                    <div>✓ Contact school authority for any queries.</div>
                  </div>
                </div>
              </div>

              {/* Bottom Stub Perforated Line with Side Notch Cutouts */}
              <div style={{ borderTop: '2px dashed #E2E8F0', padding: '16px 20px', background: '#FAFAFA', display: 'flex', gap: '14px' }}>
                <button
                  onClick={onClose}
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    borderRadius: '12px',
                    border: 'none',
                    background: '#217A54',
                    color: '#FFFFFF',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(33, 122, 84, 0.3)',
                  }}
                >
                  <Download size={16} /> Download Ticket
                </button>

                <button
                  onClick={onClose}
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    background: '#FFFFFF',
                    color: '#334155',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <Printer size={16} /> Receipt Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const closeBtnStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  border: 'none',
  background: '#F1F5F9',
  color: '#64748B',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};
