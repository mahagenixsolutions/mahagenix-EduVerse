import React from 'react';
import { 
  Building2, Eye, Target, Award, Layers, Sparkles, Code2, Check 
} from 'lucide-react';

const TECH_TAGS = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'GraphQL',
  'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker', 'Kubernetes'
];

export const CompanySection: React.FC = () => (
  <section className="mkt-section" id="company" style={{ padding: '80px 0', background: 'linear-gradient(180deg, #f8fafc 0%, #fff 100%)' }}>
    <div className="mkt-container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 30, background: '#d1fae5', color: '#10b981', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
          <Building2 size={14} /> About EduVerse
        </div>
        <h2 style={{ fontSize: 38, fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
          Built by <span style={{ color: '#10b981' }}>Educators</span>, for Educators
        </h2>
        <p style={{ fontSize: 16, color: '#64748b', margin: 0, lineHeight: 1.6 }}>
          We understand the daily challenges of running a school because we've lived them.
        </p>
      </div>

      {/* 2-Column Grid: Vision/Mission/Why Us on Left, Tech Stack/AI/Dev Process on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 28, alignItems: 'stretch' }}>
        
        {/* Left Card */}
        <div style={{ background: '#fff', borderRadius: 24, padding: 36, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: 28 }}>
          
          {/* Vision */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f3e8ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Eye size={22} strokeWidth={2} />
            </div>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>Our Vision</h3>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                To empower every educational institution in the world with intelligent technology that transforms how schools operate, teachers teach, and students learn.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#d1fae5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Target size={22} strokeWidth={2} />
            </div>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>Our Mission</h3>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                We build intuitive, AI-powered school management solutions that eliminate administrative burdens, enhance learning outcomes, and connect every stakeholder in the education ecosystem.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Award size={22} strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', margin: '0 0 10px' }}>Why Choose Us</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  'Built by educators, for educators — we understand your challenges',
                  'AI-driven platform that replaces manual work and eliminates data silos',
                  'Modern, intuitive interface that requires minimal training',
                  'Trusted by 50+ schools and 25,000+ students across the country',
                  'Dedicated customer success team that treats your school like our own'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: '#334155', lineHeight: 1.5 }}>
                    <Check size={14} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Right Card */}
        <div style={{ background: '#fff', borderRadius: 24, padding: 36, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: 28 }}>
          
          {/* Tech Stack */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f3e8ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Layers size={22} strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>Technology Stack</h3>
              <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 12px' }}>Built with modern, battle-tested technologies for performance and reliability.</p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {TECH_TAGS.map((tag) => (
                  <span key={tag} style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 6, background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Innovation & AI */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={22} strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', margin: '0 0 10px' }}>Innovation & AI</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  'AI-powered predictive analytics for student performance',
                  'Natural language processing for intelligent chatbot assistance',
                  'Computer vision for automated attendance and security',
                  'Machine learning for personalized learning path recommendations',
                  'Blockchain-ready for tamper-proof certificate verification'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: '#334155', lineHeight: 1.5 }}>
                    <Check size={14} color="#3b82f6" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Development Process */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#ffedd5', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Code2 size={22} strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', margin: '0 0 10px' }}>Development Process</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  'Agile methodology with 2-week sprint cycles for rapid feature delivery',
                  'Continuous integration and deployment ensuring zero-downtime updates',
                  'User feedback loop — every feature is validated with real schools before release',
                  'Rigorous automated testing with 95%+ code coverage',
                  'Security-first development with regular third-party penetration testing'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: '#334155', lineHeight: 1.5 }}>
                    <Check size={14} color="#ea580c" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>

    </div>
  </section>
);
