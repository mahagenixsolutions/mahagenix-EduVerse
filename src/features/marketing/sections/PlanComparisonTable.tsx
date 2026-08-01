import React from 'react';
import { 
  Table, Check, Minus, LayoutDashboard, UserPlus, Users, User, 
  MessageSquare, CalendarCheck, Book, FileText, Award, Receipt, 
  Briefcase, IndianRupee, Package, BookOpen, Bus, Building, 
  BarChart3, Sparkles 
} from 'lucide-react';

const MODULE_ROWS = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, c: '#ec4899', starter: true, prof: true, ent: true },
  { id: 'admissions', name: 'Admissions', icon: UserPlus, c: '#f97316', starter: true, prof: true, ent: true },
  { id: 'student-mgmt', name: 'Student Management', icon: Users, c: '#3b82f6', starter: true, prof: true, ent: true },
  { id: 'teacher-mgmt', name: 'Teacher Management', icon: User, c: '#ef4444', starter: true, prof: true, ent: true },
  { id: 'communication', name: 'Communication', icon: MessageSquare, c: '#8b5cf6', starter: true, prof: true, ent: true },
  { id: 'attendance', name: 'Attendance', icon: CalendarCheck, c: '#22c55e', starter: true, prof: true, ent: true },
  { id: 'homework', name: 'Homework', icon: Book, c: '#3b82f6', starter: true, prof: true, ent: true },
  { id: 'assignments', name: 'Assignments', icon: FileText, c: '#8b5cf6', starter: true, prof: true, ent: true },
  { id: 'results', name: 'Results & Grades', icon: Award, c: '#f97316', starter: true, prof: true, ent: true },
  { id: 'fee', name: 'Fee Management', icon: Receipt, c: '#22c55e', starter: true, prof: true, ent: true },
  { id: 'hr', name: 'HR & Payroll', icon: Briefcase, c: '#8b5cf6', starter: false, prof: true, ent: true },
  { id: 'finance', name: 'Finance & Accounting', icon: IndianRupee, c: '#ec4899', starter: false, prof: true, ent: true },
  { id: 'inventory', name: 'Inventory', icon: Package, c: '#3b82f6', starter: false, prof: true, ent: true },
  { id: 'library', name: 'Library', icon: BookOpen, c: '#3b82f6', starter: false, prof: true, ent: true },
  { id: 'transport', name: 'Transport', icon: Bus, c: '#22c55e', starter: false, prof: true, ent: true },
  { id: 'hostel', name: 'Hostel', icon: Building, c: '#8b5cf6', starter: false, prof: true, ent: true },
  { id: 'reports', name: 'Reports & Analytics', icon: BarChart3, c: '#3b82f6', starter: false, prof: true, ent: true },
  { id: 'ai', name: 'AI Assistant', icon: Sparkles, c: '#ec4899', starter: false, prof: true, ent: true },
];

export const PlanComparisonTable: React.FC = () => {
  return (
    <section className="mkt-section" id="comparison" style={{ padding: '80px 0', background: '#f8fafc' }}>
      <div className="mkt-container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 30, background: '#e0f2fe', color: '#0284c7', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
            <Table size={14} /> Plan Comparison
          </div>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            Compare <span style={{ color: '#3b82f6' }}>Every</span> Module
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            See exactly which modules and features are included in each plan.
          </p>
        </div>

        {/* Table Box */}
        <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)', border: '1px solid #e2e8f0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '20px 24px', fontSize: 13, fontWeight: 800, color: '#334155', textTransform: 'uppercase', width: '35%' }}>
                  Modules
                </th>
                <th style={{ padding: '20px 24px', fontSize: 13, fontWeight: 800, color: '#334155', textTransform: 'uppercase', textAlign: 'center', width: '21%' }}>
                  <div>STARTER</div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: '#64748b', textTransform: 'none', marginTop: 2 }}>Up to 500 Students</div>
                </th>
                <th style={{ padding: '20px 24px', fontSize: 13, fontWeight: 800, color: '#8b5cf6', textTransform: 'uppercase', textAlign: 'center', width: '23%', background: '#faf5ff' }}>
                  <div>PROFESSIONAL</div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: '#64748b', textTransform: 'none', marginTop: 2 }}>500 - 2,000 Students</div>
                  <span style={{ fontSize: 9, fontWeight: 700, background: '#8b5cf6', color: '#fff', padding: '2px 8px', borderRadius: 10, display: 'inline-block', marginTop: 4 }}>RECOMMENDED</span>
                </th>
                <th style={{ padding: '20px 24px', fontSize: 13, fontWeight: 800, color: '#334155', textTransform: 'uppercase', textAlign: 'center', width: '21%' }}>
                  <div>ENTERPRISE</div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: '#64748b', textTransform: 'none', marginTop: 2 }}>2,000+ Students</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {MODULE_ROWS.map((mod, i) => {
                const Icon = mod.icon;
                return (
                  <tr key={mod.id} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafbfd' }}>
                    <td style={{ padding: '14px 24px', fontSize: 14, fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 26, height: 26, borderRadius: 6, background: '#f8fafc', border: '1px solid #e2e8f0', color: mod.c, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={14} />
                      </div>
                      <span>{mod.name}</span>
                    </td>
                    <td style={{ padding: '14px 24px', textAlign: 'center' }}>
                      {mod.starter ? <Check size={18} color="#10b981" style={{ margin: '0 auto' }} /> : <Minus size={18} color="#cbd5e1" style={{ margin: '0 auto' }} />}
                    </td>
                    <td style={{ padding: '14px 24px', textAlign: 'center', background: i % 2 === 0 ? '#faf5ff' : '#f5f0ff' }}>
                      {mod.prof ? <Check size={18} color="#10b981" style={{ margin: '0 auto' }} /> : <Minus size={18} color="#cbd5e1" style={{ margin: '0 auto' }} />}
                    </td>
                    <td style={{ padding: '14px 24px', textAlign: 'center' }}>
                      {mod.ent ? <Check size={18} color="#10b981" style={{ margin: '0 auto' }} /> : <Minus size={18} color="#cbd5e1" style={{ margin: '0 auto' }} />}
                    </td>
                  </tr>
                );
              })}

              {/* Extra Specs Rows */}
              <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 800, color: '#0f172a' }}>Max Users</td>
                <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#2563eb' }}>50</td>
                <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#6d28d9', background: '#f3e8ff' }}>200</td>
                <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#047857' }}>Unlimited</td>
              </tr>

              <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 800, color: '#0f172a' }}>Storage</td>
                <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#2563eb' }}>10 GB</td>
                <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#6d28d9', background: '#f3e8ff' }}>50 GB</td>
                <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#047857' }}>Unlimited</td>
              </tr>

              <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 800, color: '#0f172a' }}>Analytics</td>
                <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: 13, fontWeight: 600, color: '#334155' }}>Basic</td>
                <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: 13, fontWeight: 600, color: '#6d28d9', background: '#f3e8ff' }}>Advanced</td>
                <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: 13, fontWeight: 600, color: '#047857' }}>Enterprise</td>
              </tr>

              <tr style={{ background: '#f8fafc' }}>
                <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 800, color: '#0f172a' }}>Support</td>
                <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: 12, color: '#475569' }}>Email Support<br/><span style={{ fontSize: 11, color: '#94a3b8' }}>(Business Hours)</span></td>
                <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: 12, color: '#6d28d9', background: '#f3e8ff', fontWeight: 600 }}>Priority Email + Phone<br/><span style={{ fontSize: 11, color: '#8b5cf6' }}>(Extended Hours)</span></td>
                <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: 12, color: '#047857', fontWeight: 600 }}>Dedicated Account Manager<br/><span style={{ fontSize: 11, color: '#10b981' }}>+ 24/7 Support</span></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
