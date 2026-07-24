import { useState, useEffect } from 'react';
import { notificationService } from '../services/notification.service';
import type { NotificationItem } from '@/mock-server/MockServer';
import { EventBus } from '@/mock-server/EventBus';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationService.getNotifications();
      setNotifications(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const unsub = EventBus.subscribe('NOTIFICATION_DISPATCHED', () => {
      fetchNotifications();
    });

    return () => {
      unsub();
    };
  }, []);

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllRead();
      fetchNotifications();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to mark read');
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    loading,
    error,
    unreadCount,
    markAllAsRead,
    refetch: fetchNotifications
  };
};
