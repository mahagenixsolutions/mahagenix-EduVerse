import { useState, useEffect } from 'react';
import { homeworkService } from '../services/homework.service';
import type { HomeworkItem } from '@/mock-server/MockServer';
import { EventBus } from '@/mock-server/EventBus';

export const useHomework = () => {
  const [homework, setHomework] = useState<HomeworkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchHomework = async () => {
    try {
      setLoading(true);
      const data = await homeworkService.getHomeworkList();
      setHomework(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load homework');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomework();

    // Subscribe to database changes
    const unsubCreated = EventBus.subscribe('HOMEWORK_CREATED', () => {
      fetchHomework();
    });
    const unsubSubmitted = EventBus.subscribe('HOMEWORK_SUBMITTED', () => {
      fetchHomework();
    });
    const unsubGraded = EventBus.subscribe('HOMEWORK_GRADED', () => {
      fetchHomework();
    });

    return () => {
      unsubCreated();
      unsubSubmitted();
      unsubGraded();
    };
  }, []);

  const publishHomework = async (hw: Omit<HomeworkItem, 'id' | 'status' | 'submissions' | 'attachments'>) => {
    try {
      setIsPublishing(true);
      const newItem = await homeworkService.publishHomework(hw);
      return newItem;
    } catch (err: any) {
      setError(err.message || 'Failed to publish homework');
      throw err;
    } finally {
      setIsPublishing(false);
    }
  };

  const submitHomework = async (id: number, content: string) => {
    try {
      setIsSubmitting(true);
      const updated = await homeworkService.submitHomework(id, content);
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to submit homework');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const gradeHomework = async (id: number, grade: string, feedback: string) => {
    try {
      setIsSubmitting(true);
      const updated = await homeworkService.gradeHomework(id, grade, feedback);
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to grade homework');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    homework,
    loading,
    error,
    isPublishing,
    isSubmitting,
    publishHomework,
    submitHomework,
    gradeHomework,
    refetch: fetchHomework
  };
};
