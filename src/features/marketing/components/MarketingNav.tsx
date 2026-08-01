import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Menu, X, Sun, Moon, LayoutDashboard } from 'lucide-react';
import { useRole } from '@/contexts/RoleContext';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Features', href: '#features' },
  { label: 'Solutions', href: '#platform' },
  { label: 'Modules', href: '#modules' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About Us', href: '#company' },
  { label: 'Contact', href: '#contact' },
];

export const MarketingNav: React.FC = () => {
  const { currentUser } = useRole();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  };

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`mkt-nav ${scrolled ? 'mkt-nav--scrolled' : ''}`} id="marketing-nav">
        <div className="mkt-nav__inner">
          {/* Logo */}
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }} className="mkt-nav__logo">
            <div className="mkt-nav__logo-icon">
              <GraduationCap size={20} />
            </div>
            EduVerse
          </a>

          {/* Desktop Links */}
          <ul className="mkt-nav__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="mkt-nav__link"
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="mkt-nav__actions">
            <button
              className="mkt-theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {currentUser ? (
              <Link to="/app" className="mkt-btn mkt-btn--primary mkt-btn--sm">
                <LayoutDashboard size={16} /> Go to Dashboard
              </Link>
            ) : (
              <>
                <a
                  href="#contact"
                  className="mkt-btn mkt-btn--ghost"
                  onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
                >
                  Book Demo
                </a>
                <Link to="/login" className="mkt-btn mkt-btn--outline mkt-btn--sm">
                  Login
                </Link>
                <Link to="/register" className="mkt-btn mkt-btn--primary mkt-btn--sm">
                  Start Free Trial
                </Link>
              </>
            )}

            <button
              className="mkt-nav__hamburger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mkt-nav__mobile-drawer ${mobileOpen ? 'mkt-nav__mobile-drawer--open' : ''}`}>
        <div className="mkt-nav__mobile-backdrop" onClick={() => setMobileOpen(false)} />
        <div className="mkt-nav__mobile-panel">
          <button className="mkt-nav__mobile-close" onClick={() => setMobileOpen(false)}>
            <X size={24} />
          </button>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mkt-nav__mobile-link"
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
            >
              {link.label}
            </a>
          ))}
          <div className="mkt-nav__mobile-actions">
            <Link to="/login" className="mkt-btn mkt-btn--outline mkt-btn--full" onClick={() => setMobileOpen(false)}>
              Login
            </Link>
            <Link to="/register" className="mkt-btn mkt-btn--primary mkt-btn--full" onClick={() => setMobileOpen(false)}>
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
