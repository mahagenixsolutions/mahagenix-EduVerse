import React, { useState } from 'react';
import { 
  Eye, LayoutDashboard, UserPlus, Users, GraduationCap, 
  MessageSquare, CalendarCheck, ClipboardList, FileText, 
  Award, CreditCard, Briefcase, PiggyBank, Package, 
  Library, Bus, Search, Bell, Calendar, ChevronDown, Headset,
  TrendingUp, CircleDollarSign, CheckSquare, Settings,
  Star, BarChart3, ChevronRight, Menu
} from 'lucide-react';

const PLAN_LIST = ['Starter', 'Professional', 'Enterprise'];

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: UserPlus, label: 'Admissions' },
  { icon: Users, label: 'Student Management' },
  { icon: GraduationCap, label: 'Teacher Management' },
  { icon: MessageSquare, label: 'Communication' },
  { icon: CalendarCheck, label: 'Attendance' },
  { icon: ClipboardList, label: 'Homework' },
  { icon: FileText, label: 'Assignments' },
  { icon: Award, label: 'Results & Grades' },
  { icon: CreditCard, label: 'Fee Management' },
  { icon: Briefcase, label: 'HR & Payroll' },
  { icon: PiggyBank, label: 'Finance & Accounting' },
  { icon: Package, label: 'Inventory' },
  { icon: Library, label: 'Library' },
  { icon: Bus, label: 'Transport' },
  { icon: BarChart3, label: 'Reports & Analytics' },
];

const MODULE_CARDS = [
  { title: 'Dashboard', desc: 'Overview & Insights', icon: LayoutDashboard, c: '#a855f7', bg: '#f3e8ff' },
  { title: 'Admissions', desc: 'Manage Applications', icon: UserPlus, c: '#10b981', bg: '#d1fae5' },
  { title: 'Student Management', desc: 'Students & Records', icon: Users, c: '#3b82f6', bg: '#eff6ff' },
  { title: 'Teacher Management', desc: 'Staff & Performance', icon: GraduationCap, c: '#ef4444', bg: '#fee2e2' },
  { title: 'Communication', desc: 'Messages & Notices', icon: MessageSquare, c: '#8b5cf6', bg: '#f3e8ff' },
  { title: 'Attendance', desc: 'Track Attendance', icon: CalendarCheck, c: '#10b981', bg: '#d1fae5' },
  { title: 'Homework', desc: 'Assign & Review', icon: ClipboardList, c: '#3b82f6', bg: '#eff6ff' },
  { title: 'Assignments', desc: 'Create & Evaluate', icon: FileText, c: '#ef4444', bg: '#fee2e2' },
  { title: 'Results & Grades', desc: 'Academic Reports', icon: Award, c: '#f59e0b', bg: '#fef3c7' },
  { title: 'Fee Management', desc: 'Fee Collection', icon: CreditCard, c: '#3b82f6', bg: '#eff6ff' },
  { title: 'HR & Payroll', desc: 'Manage Staff & Payroll', icon: Briefcase, c: '#f59e0b', bg: '#fef3c7' },
  { title: 'Finance & Accounting', desc: 'Budgets & Expenses', icon: PiggyBank, c: '#ec4899', bg: '#fce7f3' },
  { title: 'Inventory', desc: 'Manage Resources', icon: Package, c: '#10b981', bg: '#d1fae5' },
  { title: 'Library', desc: 'Books & Resources', icon: Library, c: '#10b981', bg: '#d1fae5' },
  { title: 'Transport', desc: 'Routes & Vehicles', icon: Bus, c: '#f59e0b', bg: '#fef3c7' },
];

const STATS = [
  { value: '1,284', label: 'Total Students', trend: '12%', icon: Users, c: '#a855f7', bg: '#f3e8ff' },
  { value: '86', label: 'Active Teachers', trend: '8%', icon: GraduationCap, c: '#10b981', bg: '#d1fae5' },
  { value: '98.5%', label: 'Attendance Rate', trend: '2.3%', icon: CheckSquare, c: '#3b82f6', bg: '#eff6ff' },
  { value: '₹18.5L', label: 'Fees Collected', trend: '15%', icon: CircleDollarSign, c: '#ea580c', bg: '#ffedd5' },
];

export const LivePlanPreview: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('Professional');

  return (
    <section className="mkt-section" id="preview" style={{ padding: '80px 0', background: 'linear-gradient(180deg, #f0fdf4 0%, #f8fafc 30%, #fff 100%)' }}>
      <div className="mkt-container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 30, background: '#d1fae5', color: '#10b981', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
            <Eye size={14} /> Interactive Preview
          </div>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            See <span style={{ color: '#10b981' }}>Exactly</span> What You Get
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            Toggle between plans to instantly preview the sidebar, dashboard, and modules your staff will see.
          </p>
        </div>

        {/* Plan Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 36, background: '#e2e8f0', borderRadius: 30, padding: 4, width: 'fit-content', margin: '0 auto 36px' }}>
          {PLAN_LIST.map((plan) => (
            <button
              key={plan}
              onClick={() => setSelectedPlan(plan)}
              style={{
                padding: '10px 28px',
                borderRadius: 30,
                border: 'none',
                background: selectedPlan === plan ? '#10b981' : 'transparent',
                color: selectedPlan === plan ? '#fff' : '#475569',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                boxShadow: selectedPlan === plan ? '0 2px 10px rgba(16, 185, 129, 0.35)' : 'none',
                fontFamily: 'inherit'
              }}
            >
              {plan}
              {plan === 'Professional' && <Star size={12} style={{ marginLeft: 6 }} fill="currentColor" />}
            </button>
          ))}
        </div>

        {/* Dashboard Mockup */}
        <div style={{ display: 'flex', flexDirection: 'row', background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 48px rgba(0, 0, 0, 0.1)', border: '1px solid #cbd5e1', height: 680 }}>
          
          {/* Sidebar */}
          <div style={{ width: 230, flexShrink: 0, background: '#1f2937', display: 'flex', flexDirection: 'column', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '20px 16px', fontSize: 17, fontWeight: 700, borderBottom: '1px solid #374151' }}>
              <div style={{ width: 30, height: 30, background: '#10b981', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Package size={16} />
              </div>
              <span>EduVerse</span>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px 8px' }}>
              {SIDEBAR_ITEMS.map((item, i) => (
                <div 
                  key={i} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '9px 12px',
                    color: item.active ? '#fff' : '#9ca3af',
                    background: item.active ? '#10b981' : 'transparent',
                    fontSize: 13,
                    fontWeight: 500,
                    borderRadius: 8,
                    marginBottom: 3,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <item.icon size={16} /> <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: 12, borderTop: '1px solid #374151' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 8 }}>
                <Headset size={18} color="#10b981" />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>Need Help?</div>
                  <div style={{ fontSize: 10, color: '#9ca3af', lineHeight: 1.2 }}>24/7 Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8fafc', minWidth: 0 }}>
            
            {/* Topbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', background: '#fff', borderBottom: '1px solid #e2e8f0', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Menu size={18} color="#64748b" />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f1f5f9', padding: '8px 16px', borderRadius: 8, minWidth: 220 }}>
                  <Search size={14} color="#94a3b8" />
                  <span style={{ fontSize: 13, color: '#94a3b8' }}>Search anything...</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ position: 'relative', cursor: 'pointer', padding: 4 }}>
                  <Bell size={18} color="#475569" />
                  <span style={{ position: 'absolute', top: -2, right: -2, background: '#ef4444', color: '#fff', fontSize: 9, fontWeight: 'bold', width: 15, height: 15, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>3</span>
                </div>
                <div style={{ cursor: 'pointer', padding: 4 }}>
                  <Calendar size={18} color="#475569" />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <strong style={{ fontSize: 13, color: '#0f172a', lineHeight: 1.2 }}>Principal</strong>
                    <span style={{ fontSize: 11, color: '#64748b', lineHeight: 1.2 }}>Greenfield School</span>
                  </div>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <Users size={14} color="#fff"/>
                  </div>
                  <ChevronDown size={14} color="#64748b" />
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div style={{ padding: 24, flex: 1, overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px', color: '#0f172a' }}>Welcome back, Principal! 👋</h3>
                  <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Here's what's happening at Greenfield School today.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#334155', whiteSpace: 'nowrap' }}>
                  <Calendar size={14} color="#64748b" /> 
                  <span>May 20, 2025</span>
                  <ChevronDown size={14} color="#64748b" />
                </div>
              </div>

              {/* Modules Grid — 5 columns matching screenshot */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 24 }}>
                {MODULE_CARDS.map((mod, i) => (
                  <div 
                    key={i} 
                    style={{
                      background: '#fff',
                      borderRadius: 10,
                      padding: 12,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      border: '1px solid #e2e8f0',
                      position: 'relative',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: mod.bg, color: mod.c, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <mod.icon size={18} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ fontSize: 12, color: '#0f172a', fontWeight: 700, marginBottom: 2 }}>{mod.title}</strong>
                      <span style={{ fontSize: 10, color: '#64748b' }}>{mod.desc}</span>
                    </div>
                    <ChevronRight size={14} color="#cbd5e1" style={{ position: 'absolute', top: 12, right: 10 }} />
                  </div>
                ))}
              </div>

              {/* Bottom Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
                {STATS.map((stat, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>{stat.value}</strong>
                      <span style={{ fontSize: 11, color: '#64748b', marginBottom: 6 }}>{stat.label}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: '#10b981' }}>
                        <TrendingUp size={12}/> {stat.trend} this month
                      </div>
                    </div>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: stat.bg, color: stat.c, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <stat.icon size={18}/>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customize button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)' }}>
                  <Settings size={14} /> Customize Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
