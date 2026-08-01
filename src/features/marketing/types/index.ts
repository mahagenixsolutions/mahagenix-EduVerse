/* ============================================
 * EduVerse Marketing Website — Type Definitions
 * ============================================ */

// ─── Plan Tiers ─────────────────────────────
export type PlanTierId = 'starter' | 'professional' | 'enterprise';

// ─── Role System ────────────────────────────
export type RoleId =
  | 'teacher'
  | 'student'
  | 'parent'
  | 'principal'
  | 'hr'
  | 'finance'
  | 'reception'
  | 'library'
  | 'transport'
  | 'hostel'
  | 'security';

export interface Role {
  id: RoleId;
  name: string;
  description: string;
  icon: string;
  platform: 'learning' | 'erp';
}

// ─── Module System ──────────────────────────
export type ModuleCategory = 'core' | 'academic' | 'administration' | 'services' | 'advanced';

export interface Module {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: ModuleCategory;
  icon: string;
  availableIn: PlanTierId[];
  roles: RoleId[];
}

// ─── Plan / Pricing ─────────────────────────
export type AnalyticsLevel = 'basic' | 'advanced' | 'enterprise';

export interface PlanTier {
  id: PlanTierId;
  name: string;
  tagline: string;
  description: string;
  targetAudience: string;
  schoolSize: string;
  modules: string[];      // Module IDs
  roles: RoleId[];
  features: string[];
  highlightedFeatures: string[];
  maxUsers: number | null; // null = unlimited
  storage: string;
  analytics: AnalyticsLevel;
  support: string;
  price: {
    monthly: number;
    annual: number;
  };
  isRecommended: boolean;
  badge?: string;
}

// ─── Benefits ───────────────────────────────
export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// ─── Feature Highlights ─────────────────────
export interface FeatureHighlight {
  id: string;
  title: string;
  description: string;
  icon: string;
  bullets: string[];
}

// ─── Testimonials ───────────────────────────
export type TestimonialRole = 'school' | 'principal' | 'teacher' | 'parent' | 'student';

export interface Testimonial {
  id: string;
  name: string;
  role: TestimonialRole;
  title: string;
  institution: string;
  quote: string;
  rating: number;
  avatar?: string;
}

// ─── FAQ ────────────────────────────────────
export type FAQCategory = 'pricing' | 'implementation' | 'support' | 'security' | 'migration' | 'customization';

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
}

// ─── Company ────────────────────────────────
export interface CompanyInfo {
  vision: string;
  mission: string;
  whyChooseUs: string[];
  developmentProcess: string[];
  techStack: TechItem[];
  innovation: string[];
}

export interface TechItem {
  name: string;
  category: string;
  icon?: string;
}

// ─── Industries ─────────────────────────────
export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// ─── Integrations ───────────────────────────
export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

// ─── Contact ────────────────────────────────
export type ContactCategory = 'sales' | 'support' | 'technical' | 'partner' | 'career';

export interface ContactInfo {
  category: ContactCategory;
  label: string;
  email: string;
  phone?: string;
  description: string;
}

// ─── Stats / Counters ───────────────────────
export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

// ─── Registration ───────────────────────────
export interface RegistrationPayload {
  plan: PlanTierId;
  organization: {
    name: string;
    type: string;
    board: string;
    size: string;
    location: string;
    website?: string;
  };
  administrator: {
    name: string;
    email: string;
    phone: string;
    password: string;
  };
}
