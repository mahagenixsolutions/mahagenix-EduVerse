export const UserRole = {
  STUDENT: "student",
  TEACHER: "teacher",
  PARENT: "parent",
  ADMIN: "admin",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const ROLES_LIST = [
  UserRole.STUDENT,
  UserRole.TEACHER,
  UserRole.PARENT,
  UserRole.ADMIN,
] as const;

export const DEFAULT_ROLE_REDIRECT: Record<UserRole, string> = {
  [UserRole.STUDENT]: "/learn",
  [UserRole.TEACHER]: "/teacher/dashboard",
  [UserRole.PARENT]: "/parent/dashboard",
  [UserRole.ADMIN]: "/school",
};
