import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { MarketingNav } from '../components/MarketingNav';
import { HeroSection } from '../sections/HeroSection';
import { TrustBadgesSection } from '../sections/TrustBadgesSection';
import { WhyEduVerseSection } from '../sections/WhyEduVerseSection';
import { PlatformOverviewSection } from '../sections/PlatformOverviewSection';
import { CoreModulesSection } from '../sections/CoreModulesSection';
import { FeatureHighlightsSection } from '../sections/FeatureHighlightsSection';
import { LivePlanPreview } from '../sections/LivePlanPreview';
import { PricingSection } from '../sections/PricingSection';
import { PlanComparisonTable } from '../sections/PlanComparisonTable';
import { SecuritySection } from '../sections/SecuritySection';
import { ImplementationTimeline } from '../sections/ImplementationTimeline';
import { IntegrationsSection } from '../sections/IntegrationsSection';
import { CompanySection } from '../sections/CompanySection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { FAQSection } from '../sections/FAQSection';
import { ContactSection } from '../sections/ContactSection';
import { MarketingFooter } from '../sections/MarketingFooter';
import '../marketing.css';

export const MarketingPage: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="mkt-page">
      <MarketingNav />
      <HeroSection />
      <TrustBadgesSection />
      <WhyEduVerseSection />
      <PlatformOverviewSection />
      <CoreModulesSection />
      <FeatureHighlightsSection />
      <LivePlanPreview />
      <PricingSection />
      <PlanComparisonTable />
      <SecuritySection />
      <ImplementationTimeline />
      <IntegrationsSection />
      <CompanySection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <MarketingFooter />

      {/* Scroll to Top */}
      <button
        className={`mkt-scroll-top ${showScrollTop ? 'mkt-scroll-top--visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
};
