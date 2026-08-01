import React, { useState } from 'react';
import { 
  Heart, LayoutDashboard, UserPlus, Users, User, MessageSquare, 
  CalendarCheck, Book, FileText, Award, Receipt, Briefcase, 
  IndianRupee, Package, BookOpen, Bus, Building, BarChart3, 
  Sparkles, ArrowRight
} from 'lucide-react';

const MODULES_DATA = [
  { id: 'dashboard', name: 'Dashboard', desc: 'Get real-time overview with insights, updates, and alerts in one place.', icon: LayoutDashboard, color: '#ec4899', bg: 'rgba(236, 72, 153, 0.12)', cat: 'core' },
  { id: 'admissions', name: 'Admissions', desc: 'Simplify inquiry, enrollment, and admission workflow seamlessly.', icon: UserPlus, color: '#f97316', bg: 'rgba(249, 115, 22, 0.12)', cat: 'administration' },
  { id: 'student-mgmt', name: 'Student Management', desc: 'Manage student profiles, records, academic history, and progress.', icon: Users, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.12)', cat: 'core' },
  { id: 'teacher-mgmt', name: 'Teacher Management', desc: 'Manage faculty profiles, schedules, leaves, and performance.', icon: User, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)', cat: 'core' },
  
  { id: 'communication', name: 'Communication', desc: 'Send notifications, messages, and announcements instantly.', icon: MessageSquare, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.12)', cat: 'core' },
  { id: 'attendance', name: 'Attendance', desc: 'Automate attendance tracking with biometric, QR, and more.', icon: CalendarCheck, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.12)', cat: 'academics' },
  { id: 'homework', name: 'Homework', desc: 'Assign, submit, and grade homework with digital tracking.', icon: Book, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.12)', cat: 'academics' },
  { id: 'assignments', name: 'Assignments', desc: 'Create and evaluate assignments with rubrics and feedback.', icon: FileText, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.12)', cat: 'academics' },
  
  { id: 'results', name: 'Results & Grades', desc: 'Generate report cards, grade books, and performance analytics.', icon: Award, color: '#f97316', bg: 'rgba(249, 115, 22, 0.12)', cat: 'academics' },
  { id: 'fee', name: 'Fee Management', desc: 'Fast invoices, collections, receipts, and payment gateway integration.', icon: Receipt, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.12)', cat: 'administration' },
  { id: 'hr', name: 'HR & Payroll', desc: 'Staff management, payroll processing, leave, and compliance.', icon: Briefcase, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.12)', cat: 'administration' },
  { id: 'finance', name: 'Finance & Accounting', desc: 'Budgets, expenses, income tracking, and financial statements.', icon: IndianRupee, color: '#ec4899', bg: 'rgba(236, 72, 153, 0.12)', cat: 'administration' },
  
  { id: 'inventory', name: 'Inventory', desc: 'Asset tracking, procurement, stock management, and vendor portal.', icon: Package, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.12)', cat: 'services' },
  { id: 'library', name: 'Library', desc: 'Catalog management, book lending, digital library, and e-resources.', icon: BookOpen, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.12)', cat: 'services' },
  { id: 'transport', name: 'Transport', desc: 'Route management, GPS tracking, driver management, and live updates.', icon: Bus, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.12)', cat: 'services' },
  { id: 'hostel', name: 'Hostel', desc: 'Room allocation, hostel checkout, mess management, and complaints.', icon: Building, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.12)', cat: 'services' },
  
  { id: 'reports', name: 'Reports & Analytics', desc: 'Customizable reports, data visualization, and export capabilities.', icon: BarChart3, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.12)', cat: 'advanced', hasLink: true },
  { id: 'ai', name: 'AI Assistant', desc: 'AI-powered insights, automation, predictive analytics, and chatbot.', icon: Sparkles, color: '#ec4899', bg: 'rgba(236, 72, 153, 0.12)', cat: 'advanced', hasLink: true },
];

const CATEGORIES = [
  { id: 'all', label: 'All Modules' },
  { id: 'core', label: 'Core' },
  { id: 'academics', label: 'Academics' },
  { id: 'administration', label: 'Administration' },
  { id: 'services', label: 'Services' },
  { id: 'advanced', label: 'Advanced' }
];

export const CoreModulesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredModules = MODULES_DATA.filter(mod => 
    activeCategory === 'all' || mod.cat === activeCategory
  );

  return (
    <section className="mkt-section" id="modules" style={{ padding: '80px 0', background: '#f8fafc' }}>
      <div className="mkt-container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 30, background: '#d1fae5', color: '#10b981', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
            <Heart size={14} /> Core Modules
          </div>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            18 Powerful Modules for Every Need
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            From admissions to AI-powered analytics — every aspect of school management, covered.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 30,
                  border: isActive ? 'none' : '1px solid #cbd5e1',
                  background: isActive ? '#10b981' : '#fff',
                  color: isActive ? '#fff' : '#475569',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 10px rgba(16, 185, 129, 0.3)' : 'none',
                  fontFamily: 'inherit'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 3-Column Module Card Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {filteredModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div 
                key={mod.id} 
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: 24,
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                {/* Rounded Square Icon Box */}
                <div style={{ width: 44, height: 44, borderRadius: 12, background: mod.bg, color: mod.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={22} strokeWidth={2} />
                </div>
                
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>{mod.name}</h3>
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5, margin: 0 }}>{mod.desc}</p>
                  {mod.hasLink && (
                    <a 
                      href="#demo" 
                      onClick={e => e.preventDefault()} 
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 12, fontSize: 13, fontWeight: 600, color: '#3b82f6', textDecoration: 'none' }}
                    >
                      Learn More <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
