import { useState, useEffect } from 'react';
import { announcementService } from '../services/announcement.service';
import type { AnnouncementItem } from '@/mock-server/MockServer';
import { EventBus } from '@/mock-server/EventBus';

export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await announcementService.getAnnouncements();
      setAnnouncements(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();

    const unsub = EventBus.subscribe('ANNOUNCEMENT_PUBLISHED', () => {
      fetchAnnouncements();
    });

    return () => {
      unsub();
    };
  }, []);

  const publishAnnouncement = async (ann: Omit<AnnouncementItem, 'id' | 'date'>) => {
    try {
      setIsPublishing(true);
      const result = await announcementService.publishAnnouncement(ann);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to publish announcement');
      throw err;
    } finally {
      setIsPublishing(false);
    }
  };

  return {
    announcements,
    loading,
    error,
    isPublishing,
    publishAnnouncement,
    refetch: fetchAnnouncements
  };
};
