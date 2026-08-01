import React from 'react';
import { Link } from 'react-router-dom';
import {
  Rocket, Sparkles, Play, CheckCircle2, Calendar, Zap, 
  TrendingUp, Users, CalendarCheck, MessageSquare,
  User, BookOpen, Shield, Brain, Smartphone, Headphones,
  GraduationCap, BarChart3, Bell, UserPlus, IndianRupee, Send, ArrowRight
} from 'lucide-react';

export const HeroSection: React.FC = () => (
  <section className="mkt-hero" id="hero">
    {/* Floating background decorative elements */}
    <div className="mkt-hero__bg-element mkt-hero__bg-element--users">
      <Users size={24} color="#f97316" />
    </div>
    <div className="mkt-hero__bg-element mkt-hero__bg-element--cap">
      <GraduationCap size={24} color="#3b82f6" />
    </div>
    <div className="mkt-hero__bg-element mkt-hero__bg-element--chart">
      <BarChart3 size={24} color="#ec4899" />
    </div>

    <div className="mkt-container mkt-container--wide">
      <div className="mkt-hero__grid">
        {/* ── Content ─────────────── */}
        <div className="mkt-hero__content">
          <div className="mkt-hero__badge">
            <Rocket size={14} color="#7c3aed" />
            <span>All-in-One School Management Platform</span>
          </div>

          <h1 className="mkt-hero__title">
            Transform Your School<br/>with <span className="mkt-hero__title-highlight">EduVerse</span>
            <div className="mkt-hero__title-underline"></div>
          </h1>

          <p className="mkt-hero__description">
            The complete School ERP &amp; Learning Management Platform that connects administrators, teachers, students, parents, and staff in one powerful ecosystem. Go paperless, automate workflows, streamline operations, and unlock AI-powered insights.
          </p>

          <div className="mkt-hero__actions">
            <Link to="/register" className="mkt-btn mkt-btn--gradient mkt-btn--lg">
              <Sparkles size={16} /> Start Free Trial &rarr;
            </Link>
            <a href="#contact" className="mkt-btn mkt-btn--white mkt-btn--lg" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <Play size={16} className="text-purple-600" /> Book Live Demo
            </a>
          </div>

          <div className="mkt-hero__trust-features">
            <div className="mkt-hero__trust-feature">
              <CheckCircle2 size={16} color="#22c55e" /> No Credit Card
            </div>
            <div className="mkt-hero__trust-feature">
              <Calendar size={16} color="#3b82f6" /> 14-Day Free Trial
            </div>
            <div className="mkt-hero__trust-feature">
              <Zap size={16} color="#f97316" /> Setup in 5 Minutes
            </div>
          </div>
        </div>

        {/* ── Visual (Dashboard Mockup) ──────────────── */}
        <div className="mkt-hero__visual">
          {/* Floating badges outside the dashboard */}
          <div className="mkt-hero__float mkt-hero__float--attendance">
            <div className="mkt-hero__float-icon mkt-hero__float-icon--green">
              <CalendarCheck size={16} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>98.5%</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Attendance Today</div>
            </div>
          </div>
          <div className="mkt-hero__float mkt-hero__float--messages">
            <div className="mkt-hero__float-icon mkt-hero__float-icon--blue">
              <MessageSquare size={16} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>12</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>New Messages</div>
            </div>
          </div>
          <div className="mkt-hero__float mkt-hero__float--students">
            <div className="mkt-hero__float-icon mkt-hero__float-icon--amber">
              <Users size={16} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>1,284</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Active Students</div>
            </div>
          </div>

          {/* Dashboard Window */}
          <div className="mkt-hero__dashboard">
            {/* Dashboard Header */}
            <div className="mkt-hero__dash-header">
              <div className="mkt-hero__dash-logo">
                <GraduationCap size={18} color="#7c3aed" />
                <strong>EduVerse</strong>
              </div>
              <div className="mkt-hero__dash-header-content">
                <div className="mkt-hero__dash-welcome">
                  <strong>Welcome back, Principal! 👋</strong>
                  <span>Here's what's happening in your school today.</span>
                </div>
                <div className="mkt-hero__dash-header-right">
                  <div className="mkt-hero__dash-date">
                    <Calendar size={14} /> May 20, 2025 <span style={{fontSize: '10px'}}>▼</span>
                  </div>
                  <div className="mkt-hero__dash-bell">
                    <Bell size={16} />
                    <span className="mkt-hero__dash-bell-dot">3</span>
                  </div>
                  <div className="mkt-hero__dash-avatar-main">
                    <img src="https://i.pravatar.cc/100?img=11" alt="Profile" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mkt-hero__dash-body">
              {/* Sidebar */}
              <div className="mkt-hero__dash-sidebar">
                <div className="mkt-hero__dash-nav-item mkt-hero__dash-nav-item--active">
                  <BarChart3 size={14} color="#7c3aed" /> Dashboard
                </div>
                <div className="mkt-hero__dash-nav-item"><Users size={14} /> Students</div>
                <div className="mkt-hero__dash-nav-item"><User size={14} /> Staff</div>
                <div className="mkt-hero__dash-nav-item"><CalendarCheck size={14} /> Attendance</div>
                <div className="mkt-hero__dash-nav-item"><IndianRupee size={14} /> Fees</div>
                <div className="mkt-hero__dash-nav-item"><CheckCircle2 size={14} /> Exams</div>
                <div className="mkt-hero__dash-nav-item"><Calendar size={14} /> Timetable</div>
                <div className="mkt-hero__dash-nav-item"><BarChart3 size={14} /> Reports</div>
                <div className="mkt-hero__dash-nav-item"><MessageSquare size={14} /> Communication</div>
                <div className="mkt-hero__dash-nav-item" style={{ marginTop: 'auto' }}><Zap size={14} /> Settings</div>
              </div>

              {/* Main Content Area */}
              <div className="mkt-hero__dash-main">
                <div className="mkt-hero__dash-grid">
                  <div className="mkt-hero__dash-card">
                    <div className="mkt-hero__dash-card-title">Total Students</div>
                    <div className="mkt-hero__dash-card-row">
                      <div className="mkt-hero__dash-card-value">1,284</div>
                      <div className="mkt-hero__dash-card-icon mkt-hero__dash-card-icon--orange"><User size={14}/></div>
                    </div>
                    <div className="mkt-hero__dash-card-change mkt-hero__dash-card-change--up">
                      <TrendingUp size={12} /> 12% this semester
                    </div>
                  </div>
                  <div className="mkt-hero__dash-card">
                    <div className="mkt-hero__dash-card-title">Attendance Rate</div>
                    <div className="mkt-hero__dash-card-row">
                      <div className="mkt-hero__dash-card-value">98.5%</div>
                      <div className="mkt-hero__dash-card-icon mkt-hero__dash-card-icon--green"><CalendarCheck size={14}/></div>
                    </div>
                    <div className="mkt-hero__dash-card-change mkt-hero__dash-card-change--up">
                      <TrendingUp size={12} /> 2.3% vs last month
                    </div>
                  </div>
                  <div className="mkt-hero__dash-card">
                    <div className="mkt-hero__dash-card-title">Fee Collection</div>
                    <div className="mkt-hero__dash-card-row">
                      <div className="mkt-hero__dash-card-value">₹18.5L</div>
                      <div className="mkt-hero__dash-card-icon mkt-hero__dash-card-icon--purple"><Shield size={14}/></div>
                    </div>
                    <div className="mkt-hero__dash-card-change mkt-hero__dash-card-change--neutral">
                      <TrendingUp size={12} /> 94% collected
                    </div>
                  </div>
                  <div className="mkt-hero__dash-card">
                    <div className="mkt-hero__dash-card-title">Active Teachers</div>
                    <div className="mkt-hero__dash-card-row">
                      <div className="mkt-hero__dash-card-value">86</div>
                      <div className="mkt-hero__dash-card-icon mkt-hero__dash-card-icon--blue"><Users size={14}/></div>
                    </div>
                    <div className="mkt-hero__dash-card-change mkt-hero__dash-card-change--blue">
                      All present today
                    </div>
                  </div>
                  <div className="mkt-hero__dash-card">
                    <div className="mkt-hero__dash-card-title">Total Parents</div>
                    <div className="mkt-hero__dash-card-row">
                      <div className="mkt-hero__dash-card-value">1,320</div>
                      <div className="mkt-hero__dash-card-icon mkt-hero__dash-card-icon--yellow"><Users size={14}/></div>
                    </div>
                    <div className="mkt-hero__dash-card-change mkt-hero__dash-card-change--neutral">
                      Connected
                    </div>
                  </div>
                  <div className="mkt-hero__dash-card">
                    <div className="mkt-hero__dash-card-title">Active Classes</div>
                    <div className="mkt-hero__dash-card-row">
                      <div className="mkt-hero__dash-card-value">128</div>
                      <div className="mkt-hero__dash-card-icon mkt-hero__dash-card-icon--red"><BookOpen size={14}/></div>
                    </div>
                    <div className="mkt-hero__dash-card-change mkt-hero__dash-card-change--red">
                      Running smoothly
                    </div>
                  </div>
                </div>

                <div className="mkt-hero__dash-bottom">
                  <div className="mkt-hero__dash-chart-card">
                    <div className="mkt-hero__dash-chart-header">
                      <div className="mkt-hero__dash-card-title">Attendance Trend</div>
                      <div className="mkt-hero__dash-chart-legend">
                        <span><span className="dot dot-blue"></span> This Week</span>
                        <span><span className="dot dot-gray"></span> Last Week</span>
                      </div>
                    </div>
                    {/* SVG Line Chart */}
                    <div className="mkt-hero__dash-chart">
                       <svg viewBox="0 0 400 120" preserveAspectRatio="none">
                         <defs>
                           <linearGradient id="gradientLine" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="0%" stopColor="rgba(124, 58, 237, 0.2)" />
                             <stop offset="100%" stopColor="rgba(124, 58, 237, 0)" />
                           </linearGradient>
                         </defs>
                         <path d="M0 120 L0 80 Q 40 100, 80 60 T 160 80 T 240 30 T 320 80 T 400 30 L400 120 Z" fill="url(#gradientLine)" />
                         <path d="M0 80 Q 40 100, 80 60 T 160 80 T 240 30 T 320 80 T 400 30" fill="none" stroke="#7c3aed" strokeWidth="2" />
                         <circle cx="80" cy="60" r="3" fill="#fff" stroke="#7c3aed" strokeWidth="2"/>
                         <circle cx="160" cy="80" r="3" fill="#fff" stroke="#7c3aed" strokeWidth="2"/>
                         <circle cx="240" cy="30" r="3" fill="#fff" stroke="#7c3aed" strokeWidth="2"/>
                         <circle cx="320" cy="80" r="3" fill="#fff" stroke="#7c3aed" strokeWidth="2"/>
                       </svg>
                       <div className="mkt-hero__dash-chart-y">
                         <span>100%</span>
                         <span>75%</span>
                         <span>50%</span>
                         <span>25%</span>
                         <span>0%</span>
                       </div>
                       <div className="mkt-hero__dash-chart-x">
                         <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                       </div>
                    </div>
                  </div>
                  
                  <div className="mkt-hero__dash-quick-actions">
                    <div className="mkt-hero__dash-card-title" style={{marginBottom: '12px'}}>Quick Actions</div>
                    <div className="mkt-hero__dash-qa-list">
                      <div className="mkt-hero__dash-qa-item">
                        <div className="mkt-hero__dash-qa-icon mkt-hero__dash-qa-icon--blue"><UserPlus size={12} color="#3b82f6" /></div>
                        <span>Add New Student</span>
                        <ArrowRight size={10} color="#9ca3af" />
                      </div>
                      <div className="mkt-hero__dash-qa-item">
                        <div className="mkt-hero__dash-qa-icon mkt-hero__dash-qa-icon--green"><CheckCircle2 size={12} color="#22c55e" /></div>
                        <span>Mark Attendance</span>
                        <ArrowRight size={10} color="#9ca3af" />
                      </div>
                      <div className="mkt-hero__dash-qa-item">
                        <div className="mkt-hero__dash-qa-icon mkt-hero__dash-qa-icon--orange"><IndianRupee size={12} color="#f97316" /></div>
                        <span>Collect Fees</span>
                        <ArrowRight size={10} color="#9ca3af" />
                      </div>
                      <div className="mkt-hero__dash-qa-item">
                        <div className="mkt-hero__dash-qa-icon mkt-hero__dash-qa-icon--pink"><Send size={12} color="#ec4899" /></div>
                        <span>Send Announcement</span>
                        <ArrowRight size={10} color="#9ca3af" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* ── Bottom Feature Bar ─────────────── */}
      <div className="mkt-hero__bottom-bar">
        <div className="mkt-hero__bottom-trust">
          <div className="mkt-hero__bottom-avatars">
            <img src="https://i.pravatar.cc/100?img=12" alt="Avatar" />
            <img src="https://i.pravatar.cc/100?img=42" alt="Avatar" />
            <img src="https://i.pravatar.cc/100?img=33" alt="Avatar" />
            <img src="https://i.pravatar.cc/100?img=14" alt="Avatar" />
          </div>
          <div className="mkt-hero__bottom-trust-text">
            <span>Trusted by</span>
            <strong>50+ Schools</strong>
            <small>to manage 25,000+<br/>students daily</small>
          </div>
        </div>
        
        <div className="mkt-hero__bottom-divider"></div>
        
        <div className="mkt-hero__bottom-features">
          <div className="mkt-hero__bottom-feature">
            <div className="mkt-hero__bottom-icon mkt-hero__bottom-icon--purple"><Shield size={24} color="#7c3aed" /></div>
            <div className="mkt-hero__bottom-feature-content">
              <strong>99.99%</strong>
              <span>Uptime &amp; Data<br/>Security</span>
            </div>
          </div>
          
          <div className="mkt-hero__bottom-divider"></div>
          
          <div className="mkt-hero__bottom-feature">
            <div className="mkt-hero__bottom-icon mkt-hero__bottom-icon--blue"><Brain size={24} color="#3b82f6" /></div>
            <div className="mkt-hero__bottom-feature-content">
              <strong>AI-Powered</strong>
              <span>Smart Insights &amp;<br/>Automations</span>
            </div>
          </div>
          
          <div className="mkt-hero__bottom-divider"></div>
          
          <div className="mkt-hero__bottom-feature">
            <div className="mkt-hero__bottom-icon mkt-hero__bottom-icon--yellow"><Smartphone size={24} color="#eab308" /></div>
            <div className="mkt-hero__bottom-feature-content">
              <strong>Mobile Friendly</strong>
              <span>Access Anytime,<br/>Anywhere</span>
            </div>
          </div>
          
          <div className="mkt-hero__bottom-divider"></div>
          
          <div className="mkt-hero__bottom-feature">
            <div className="mkt-hero__bottom-icon mkt-hero__bottom-icon--pink"><Headphones size={24} color="#ec4899" /></div>
            <div className="mkt-hero__bottom-feature-content">
              <strong>24/7 Support</strong>
              <span>We're here to help<br/>you anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
