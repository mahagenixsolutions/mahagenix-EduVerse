import { api } from "../api/axios";

export const getTeacherProfile = async () => {
  const { data } = await api.get("/teacher/profile");
  return data;
};

export const getTeacherClasses = async () => {
  const { data } = await api.get("/teacher/classes");
  return data;
};

export const getTeacherSchedule = async () => {
  const { data } = await api.get("/teacher/schedule");
  return data;
};

export const getTeacherAnnouncements = async () => {
  const { data } = await api.get("/teacher/announcements");
  return data;
};

export const getTeacherEvents = async () => {
  const { data } = await api.get("/teacher/events");
  return data;
};

export const getTeacherCourses = async () => {
  const { data } = await api.get("/teacher/courses");
  return data;
};

export const getTeacherStudents = async () => {
  const { data } = await api.get("/teacher/students");
  return data;
};
