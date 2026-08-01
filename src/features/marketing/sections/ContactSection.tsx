import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, Send, User, MessageSquare, ChevronDown, CheckCircle 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', category: 'General Inquiry', subject: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="mkt-section" id="contact" style={{ padding: '80px 0', background: 'linear-gradient(180deg, #f8fafc 0%, #fff 100%)' }}>
      <div className="mkt-container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 30, background: '#d1fae5', color: '#10b981', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
            <Mail size={14} /> Contact Us
          </div>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            Get in <span style={{ color: '#10b981' }}>Touch</span>
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            Have questions? Our team is here to help. Reach out via the form below or contact us directly.
          </p>
        </div>

        {/* Main 2-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 28, alignItems: 'stretch' }}>
          
          {/* Left Form Card */}
          <div style={{ background: '#fff', borderRadius: 24, padding: 36, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              
              {/* Row 1: Full Name & Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} color="#94a3b8" style={{ position: 'absolute', top: 12, left: 14 }} />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      style={{ width: '100%', padding: '10px 14px 10px 40px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 13, color: '#0f172a', outline: 'none', fontFamily: 'inherit' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>Email</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} color="#94a3b8" style={{ position: 'absolute', top: 12, left: 14 }} />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      style={{ width: '100%', padding: '10px 14px 10px 40px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 13, color: '#0f172a', outline: 'none', fontFamily: 'inherit' }}
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Phone & Category */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>Phone</label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} color="#94a3b8" style={{ position: 'absolute', top: 12, left: 14 }} />
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px 10px 40px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 13, color: '#0f172a', outline: 'none', fontFamily: 'inherit' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>Category</label>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{ width: '100%', padding: '10px 36px 10px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 13, color: '#0f172a', outline: 'none', appearance: 'none', background: '#fff', fontFamily: 'inherit' }}
                    >
                      <option value="General Inquiry">Select a category</option>
                      <option value="Sales">Sales & Pricing</option>
                      <option value="Support">Customer Support</option>
                      <option value="Demo Request">Request a Demo</option>
                    </select>
                    <ChevronDown size={16} color="#94a3b8" style={{ position: 'absolute', top: 12, right: 14, pointerEvents: 'none' }} />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>Subject</label>
                <input
                  type="text"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 13, color: '#0f172a', outline: 'none', fontFamily: 'inherit' }}
                />
              </div>

              {/* Message */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>Message</label>
                <textarea
                  placeholder="Tell us about your school and what you're looking for..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 13, color: '#0f172a', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  width: '100%',
                  padding: '14px',
                  borderRadius: 12,
                  background: '#10b981',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit'
                }}
              >
                {submitted ? (
                  <>
                    <CheckCircle size={16} /> Message Sent Successfully!
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right Info Card & Map */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            {/* Info Items Card */}
            <div style={{ background: '#fff', borderRadius: 24, padding: 32, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#d1fae5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>Email</h4>
                  <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>hello@eduverse.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#d1fae5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>Phone</h4>
                  <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>+91 98765 43210</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#d1fae5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>Office</h4>
                  <p style={{ fontSize: 13, color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                    4th Floor, Innovation Tower, Hitech City,<br/>Hyderabad, Telangana 500081, India
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#d1fae5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>Business Hours</h4>
                  <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Monday – Saturday, 9:00 AM – 6:00 PM IST</p>
                </div>
              </div>

            </div>

            {/* Map Preview Card */}
            <div style={{ position: 'relative', background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', borderRadius: 20, height: 130, border: '1px solid #cbd5e1', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
              
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: '#fff', borderRadius: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 13, fontWeight: 700, color: '#0f172a' }}>
                <MapPin size={16} color="#10b981" />
                <span>Hyderabad, India</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
