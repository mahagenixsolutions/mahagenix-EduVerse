import { useQuery } from "@tanstack/react-query";
import {
  getTeacherProfile,
  getTeacherClasses,
  getTeacherAnnouncements,
  getTeacherCourses,
  getTeacherEvents,
  getTeacherSchedule,
  getTeacherStudents,
} from "../services/teacher.service";

export const useTeacherProfile = () => {
  return useQuery({
    queryKey: ["teacher-profile"],
    queryFn: getTeacherProfile,
  });
};

export const useTeacherClasses = () => {
  return useQuery({
    queryKey: ["teacher-classes"],
    queryFn: getTeacherClasses,
  });
};

export const useTeacherSchedule = () => {
  return useQuery({
    queryKey: ["teacher-schedule"],
    queryFn: getTeacherSchedule,
  });
};

export const useTeacherAnnouncements = () => {
  return useQuery({
    queryKey: ["teacher-announcements"],
    queryFn: getTeacherAnnouncements,
  });
};

export const useTeacherEvents = () => {
  return useQuery({
    queryKey: ["teacher-events"],
    queryFn: getTeacherEvents,
  });
};

export const useTeacherCourses = () => {
  return useQuery({
    queryKey: ["teacher-courses"],
    queryFn: getTeacherCourses,
  });
};

export const useTeacherStudents = () => {
  return useQuery({
    queryKey: ["teacher-students"],
    queryFn: getTeacherStudents,
  });
};
