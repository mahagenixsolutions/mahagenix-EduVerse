import React from 'react';
import { GraduationCap } from 'lucide-react';

const FOOTER_COLUMNS = [
  {
    title: 'COMPANY',
    links: ['About Us', 'Careers', 'Blog', 'Press Kit', 'Partners'],
  },
  {
    title: 'SOLUTIONS',
    links: ['K-12 Schools', 'Higher Education', 'Coaching Institutes', 'Corporate Learning', 'Multi-Branch'],
  },
  {
    title: 'MODULES',
    links: ['Admissions', 'Attendance', 'Fee Management', 'Library', 'Transport', 'HR & Payroll', 'AI Assistant'],
  },
  {
    title: 'RESOURCES',
    links: ['Documentation', 'API Reference', 'Help Center', 'Webinars', 'Case Studies'],
  },
];

export const MarketingFooter: React.FC = () => (
  <footer id="footer" style={{ padding: '64px 0 32px', background: '#fafbfd', borderTop: '1px solid #e2e8f0' }}>
    <div className="mkt-container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
      
      {/* 5-Column Top Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 32, marginBottom: 48, textAlign: 'left' }}>
        
        {/* Brand Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={20} />
            </div>
            <span>EduVerse</span>
          </div>

          <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, margin: 0, maxWidth: 300 }}>
            The complete School ERP & Learning Management Platform. Transform how your school operates, teaches, and connects.
          </p>

          {/* Operational Status */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, color: '#059669', background: '#d1fae5', padding: '4px 12px', borderRadius: 20, width: 'fit-content' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
            All systems operational
          </div>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            {/* Facebook */}
            <a href="#facebook" onClick={e => e.preventDefault()} style={{ width: 34, height: 34, borderRadius: '50%', background: '#fff', border: '1px solid #cbd5e1', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Facebook">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            {/* Twitter */}
            <a href="#twitter" onClick={e => e.preventDefault()} style={{ width: 34, height: 34, borderRadius: '50%', background: '#fff', border: '1px solid #cbd5e1', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Twitter">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/></svg>
            </a>
            {/* LinkedIn */}
            <a href="#linkedin" onClick={e => e.preventDefault()} style={{ width: 34, height: 34, borderRadius: '50%', background: '#fff', border: '1px solid #cbd5e1', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="LinkedIn">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            {/* YouTube */}
            <a href="#youtube" onClick={e => e.preventDefault()} style={{ width: 34, height: 34, borderRadius: '50%', background: '#fff', border: '1px solid #cbd5e1', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="YouTube">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>

        {/* 4 Link Columns */}
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#0f172a', letterSpacing: '0.05em', marginBottom: 16 }}>
              {col.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={e => e.preventDefault()}
                  style={{ fontSize: 13, color: '#64748b', textDecoration: 'none', transition: 'color 0.2s', display: 'block' }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}

      </div>

      {/* Bottom Copyright & Legal Line */}
      <div style={{ paddingTop: 24, borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#64748b' }}>
        <div>© 2025 EduVerse. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="#privacy" onClick={e => e.preventDefault()} style={{ color: '#64748b', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#terms" onClick={e => e.preventDefault()} style={{ color: '#64748b', textDecoration: 'none' }}>Terms of Service</a>
          <a href="#cookie" onClick={e => e.preventDefault()} style={{ color: '#64748b', textDecoration: 'none' }}>Cookie Policy</a>
        </div>
      </div>

    </div>
  </footer>
);
