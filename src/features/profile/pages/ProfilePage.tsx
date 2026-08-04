import React from "react";
import { useRole } from "@/contexts/RoleContext";
import { TeacherProfilePage } from "@/features/teacher";
import { ParentProfileView } from "../components/ParentProfileView";
import { StudentProfileView } from "../components/StudentProfileView";

export const ProfilePage: React.FC = () => {
  const { currentUser } = useRole();

  if (!currentUser) return null;

  switch (currentUser.role) {
    case "teacher":
      return <TeacherProfilePage />;
    case "parent":
      return <ParentProfileView />;
    case "student":
    default:
      return <StudentProfileView />;
  }
};
