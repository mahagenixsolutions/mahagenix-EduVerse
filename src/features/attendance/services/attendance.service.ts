import { MockServer, type AttendanceRecord } from '@/mock-server/MockServer';

export const attendanceService = {
  getAttendanceList: () => MockServer.getAttendance(),
  markAttendance: (records: AttendanceRecord[]) => MockServer.markAttendance(records)
};

export const AttendanceService = attendanceService;
