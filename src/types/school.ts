export interface Announcement {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  publisher: string;
  priority: 'high' | 'medium' | 'low';
  content: string;
  audience?: 'all' | 'students' | 'teachers' | 'parents';
}

export interface NoticeItem {
  id: number;
  title: string;
  date: string;
  priority: string;
}

export interface ClubItem {
  id: number;
  name: string;
  mentor: string;
  membersCount: number;
  meetingSchedule: string;
  description: string;
}

export const Announcement = {} as any;
export const NoticeItem = {} as any;
export const ClubItem = {} as any;
