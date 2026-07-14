import { http, HttpResponse } from "msw";
import { teacherProfileData } from "../data/teacher/profile";
import { performanceAlerts } from "../data/teacher/alerts";
import { teacherAnnouncements } from "../data/teacher/announcements";
import { teacherClasses } from "../data/teacher/classes";
import { teacherCourses } from "../data/teacher/courses";
import { teacherRecentActivity } from "../data/teacher/recentActivity";
import { teacherSchedule } from "../data/teacher/schedule";
import { studentDirectory } from "../data/teacher/students";
import { MockServer } from "../../mock-server/MockServer";

export const teacherHandlers = [
  http.get("/api/teacher/profile", () => {
    return HttpResponse.json(teacherProfileData);
  }),
  http.get("/api/teacher/alerts", () => {
    return HttpResponse.json(performanceAlerts);
  }),
  http.get("/api/teacher/announcements", () => {
    return HttpResponse.json(teacherAnnouncements);
  }),
  http.get("/api/teacher/classes", () => {
    return HttpResponse.json(teacherClasses);
  }),
  http.get("/api/teacher/courses", () => {
    return HttpResponse.json(teacherCourses);
  }),
  http.get("/api/teacher/events", async () => {
    const events = await MockServer.getEvents();
    return HttpResponse.json(events);
  }),
  http.get("/api/teacher/recent-activity", () => {
    return HttpResponse.json(teacherRecentActivity);
  }),
  http.get("/api/teacher/schedule", () => {
    return HttpResponse.json(teacherSchedule);
  }),
  http.get("/api/teacher/students", () => {
    return HttpResponse.json(studentDirectory);
  }),
];
