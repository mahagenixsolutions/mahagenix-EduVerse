import { useState, useEffect } from 'react';
import { attendanceService } from '../services/attendance.service';
import type { AttendanceRecord } from '@/mock-server/MockServer';
import { EventBus } from '@/mock-server/EventBus';

export const useAttendance = () => {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMarking, setIsMarking] = useState(false);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const data = await attendanceService.getAttendanceList();
      setAttendance(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load attendance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();

    const unsub = EventBus.subscribe('ATTENDANCE_PUBLISHED', () => {
      fetchAttendance();
    });

    return () => {
      unsub();
    };
  }, []);

  const markAttendance = async (records: AttendanceRecord[]) => {
    try {
      setIsMarking(true);
      const result = await attendanceService.markAttendance(records);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to publish attendance');
      throw err;
    } finally {
      setIsMarking(false);
    }
  };

  return {
    attendance,
    loading,
    error,
    isMarking,
    markAttendance,
    refetch: fetchAttendance
  };
};
