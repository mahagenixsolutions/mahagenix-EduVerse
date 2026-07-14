import { MockServer } from '@/mock-server/MockServer';

export const notificationService = {
  getNotifications: () => MockServer.getNotifications(),
  markAllRead: () => MockServer.markNotificationsRead()
};
