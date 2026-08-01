/* ============================================================
 * EduVerse SaaS — Subscription Feature Flags & Plan Configurations
 * ============================================================ */

export type FeatureFlag =
  // Basic Plan Academic Capabilities
  | 'dashboard'
  | 'my_classes'
  | 'my_students'
  | 'my_courses'
  | 'child_profile'
  | 'attendance'
  | 'homework'
  | 'assignments'
  | 'results'
  | 'fees'
  | 'announcements'
  | 'messages'
  | 'calendar'
  | 'profile'
  | 'settings'

  // Advanced & Add-On Feature Flags (Pro / Enterprise — Disabled in Basic)
  | 'curriculum_planner'
  | 'lesson_planner'
  | 'ai_lesson_planner'
  | 'ai_study_assistant'
  | 'ai_insights'
  | 'digital_library'
  | 'live_classes'
  | 'online_exams'
  | 'practice_tests'
  | 'advanced_reports'
  | 'learning_analytics'
  | 'department_management'
  | 'workflow_automation'
  | 'certificates'
  | 'downloads'
  | 'achievements'
  | 'transport_tracking'
  | 'hostel_management'
  | 'medical_records'
  | 'digital_documents'
  | 'behavior_tracking'
  | 'questions_bank'
  | 'resources_repository'
  | 'parent_meetings'
  | 'class_discussion';

export type SubscriptionPlanId = 'basic' | 'starter' | 'professional' | 'enterprise' | 'master';

export interface SubscriptionPlanConfig {
  id: SubscriptionPlanId;
  name: string;
  enabledFeatureFlags: FeatureFlag[];
}

export const BASIC_PLAN_FEATURE_FLAGS: FeatureFlag[] = [
  'dashboard',
  'my_classes',
  'my_students',
  'my_courses',
  'child_profile',
  'attendance',
  'homework',
  'assignments',
  'results',
  'fees',
  'announcements',
  'messages',
  'calendar',
  'profile',
  'settings',
];

export const ALL_FEATURE_FLAGS: FeatureFlag[] = [
  ...BASIC_PLAN_FEATURE_FLAGS,
  'curriculum_planner',
  'lesson_planner',
  'ai_lesson_planner',
  'ai_study_assistant',
  'ai_insights',
  'digital_library',
  'live_classes',
  'online_exams',
  'practice_tests',
  'advanced_reports',
  'learning_analytics',
  'department_management',
  'workflow_automation',
  'certificates',
  'downloads',
  'achievements',
  'transport_tracking',
  'hostel_management',
  'medical_records',
  'digital_documents',
  'behavior_tracking',
  'questions_bank',
  'resources_repository',
  'parent_meetings',
  'class_discussion',
];

export const SUBSCRIPTION_PLANS: Record<SubscriptionPlanId, SubscriptionPlanConfig> = {
  basic: {
    id: 'basic',
    name: 'Basic Plan',
    enabledFeatureFlags: BASIC_PLAN_FEATURE_FLAGS,
  },
  starter: {
    id: 'starter',
    name: 'Starter Plan',
    enabledFeatureFlags: BASIC_PLAN_FEATURE_FLAGS,
  },
  professional: {
    id: 'professional',
    name: 'Professional Plan',
    enabledFeatureFlags: [
      ...BASIC_PLAN_FEATURE_FLAGS,
      'curriculum_planner',
      'lesson_planner',
      'digital_library',
      'transport_tracking',
      'advanced_reports',
      'achievements',
      'resources_repository',
      'class_discussion',
    ],
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise Plan',
    enabledFeatureFlags: ALL_FEATURE_FLAGS,
  },
  master: {
    id: 'master',
    name: 'Master Plan',
    enabledFeatureFlags: ALL_FEATURE_FLAGS,
  },
};
