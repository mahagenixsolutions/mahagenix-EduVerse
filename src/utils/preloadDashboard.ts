import type { UserRole } from "@/contexts/RoleContext";

/**
 * Preloader utility for EduVerse Dashboard resources.
 * Executes while the post-login splash screen video is playing.
 */
export async function preloadDashboardData(role: UserRole): Promise<void> {
  try {
    // 1. Preload Fonts
    if ("fonts" in document) {
      document.fonts.ready.catch(() => {
        /* Ignore font load errors */
      });
    }

    // 2. Preload Critical Brand & UI Images/Icons
    const imagesToPreload = [
      "/logo-icon.png",
      "/splash.mp4",
      "https://i.pravatar.cc/150?u=sarah",
      "https://i.pravatar.cc/150?u=smith",
      "https://i.pravatar.cc/150?u=robert",
    ];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // 3. Warm Up Mock Data & Caches according to role
    if (role === "student") {
      // Warm up Student Dashboard mock data endpoints / modules in parallel
      await Promise.allSettled([
        import("@/features/home/pages/HomePage"),
        import("@/features/home/components/HomeHero"),
        import("@/features/home/components/AnnouncementsSection"),
        import("@/features/home/components/SummaryCards"),
        import("@/features/home/components/ContinueLearning"),
        import("@/features/home/components/TodaySchedule"),
        import("@/features/home/components/LearningProgress"),
        import("@/features/home/components/PendingHomework"),
        import("@/features/home/components/UpcomingExams"),
        import("@/features/home/components/EventsPreview"),
        import("@/features/home/components/AchievementsPreview"),
        import("@/features/home/components/NewsPreview"),
        import("@/features/home/components/AITutorCard"),
        import("@/layouts/MainLayout"),
      ]);
    } else if (role === "teacher") {
      await Promise.allSettled([
        import("@/features/teacher"),
        import("@/layouts/MainLayout"),
      ]);
    } else if (role === "parent") {
      await Promise.allSettled([
        import("@/features/parent"),
        import("@/layouts/MainLayout"),
      ]);
    }
  } catch (err) {
    console.warn("Dashboard preloading encountered non-critical error:", err);
  }
}
