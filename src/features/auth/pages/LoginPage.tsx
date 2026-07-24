import React from "react";
import { useRole, type UserRole } from "@/contexts/RoleContext";
import { useSplashScreen } from "@/hooks/useSplashScreen";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/Avatar";
import { GraduationCap, Briefcase, Users, LogIn } from "lucide-react";
import styles from "./login.module.css";

export const LoginPage: React.FC = () => {
  const { login } = useRole();
  const { triggerLaunchExperience } = useSplashScreen();
  const navigate = useNavigate();

  const handleSelectRole = (role: UserRole) => {
    // 1. Authenticate user & load user profile/permissions
    login(role);

    // 2. Launch post-login splash video experience
    // Navigation to dashboard occurs only after the splash video finishes and fades out
    triggerLaunchExperience(role, () => {
      navigate("/");
    });
  };

  const identities = [
    {
      role: "student" as const,
      title: "Student Portal",
      description: "Sarah Doe — Class 10-A",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      icon: GraduationCap,
      color: "var(--primary-color)",
    },
    {
      role: "teacher" as const,
      title: "Teacher Workspace",
      description: "Mr. John Smith — Science Department",
      avatar: "https://i.pravatar.cc/150?u=smith",
      icon: Briefcase,
      color: "var(--warning)",
    },
    {
      role: "parent" as const,
      title: "Parent Dashboard",
      description: "Robert Doe — Sarah's Parent",
      avatar: "https://i.pravatar.cc/150?u=robert",
      icon: Users,
      color: "var(--success)",
    },
  ];

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginHeader}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <img
            src="/logo-icon.png"
            alt="Logo Icon"
            style={{ height: "10rem", objectFit: "contain", borderRadius: "50%" }}
          />
        </div>
        <p style={{ marginTop: "8px" }}>Select your workspace to log in</p>
      </div>

      <motion.div
        className={styles.identitiesGrid}
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
      >
        {identities.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.role}
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.96 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 100, damping: 15 },
                },
              }}
              style={{ display: "contents" }}
            >
              <Card
                className={`${styles.identityCard} hover-lift`}
                onClick={() => handleSelectRole(item.role)}
              >
                <div
                  className={styles.iconWrap}
                  style={{
                    backgroundColor: `${item.color}15`,
                    color: item.color,
                  }}
                >
                  <Icon size={24} />
                </div>
                <Avatar
                  src={item.avatar}
                  alt={item.title}
                  size="lg"
                  className={styles.identityAvatar}
                />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button className={styles.loginBtn}>
                  Enter Workspace <LogIn size={16} />
                </button>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
