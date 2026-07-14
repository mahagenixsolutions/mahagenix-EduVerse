import { MockServer, type AnnouncementItem } from '@/mock-server/MockServer';

export const announcementService = {
  getAnnouncements: () => MockServer.getAnnouncements(),
  publishAnnouncement: (ann: Omit<AnnouncementItem, 'id' | 'date'>) => MockServer.publishAnnouncement(ann)
};
