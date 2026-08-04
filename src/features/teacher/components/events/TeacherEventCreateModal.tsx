import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import styles from '../../pages/teacher.module.css';

interface TeacherEventCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    category: string;
    date: string;
    time: string;
    location: string;
    organizer: string;
    fee: number;
    description: string;
  }) => void;
}

export const TeacherEventCreateModal: React.FC<TeacherEventCreateModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Academic');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [fee, setFee] = useState(0);
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !location) return;
    onSubmit({
      title,
      category,
      date,
      time,
      location,
      organizer: 'Mr. Smith',
      fee: Number(fee),
      description,
    });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle}>Create New School Event</h3>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label>Event Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Annual Science Exhibition 2026"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Academic">Academic</option>
                <option value="Sports">Sports</option>
                <option value="Arts">Arts</option>
                <option value="Tech">Tech</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Fee (₹)</label>
              <input
                type="number"
                value={fee}
                onChange={(e) => setFee(Number(e.target.value))}
                placeholder="0 for Free"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Date</label>
              <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className={styles.formGroup}>
              <label>Time</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Location / Venue</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Main Auditorium Gate A"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event summary and instructions for participants..."
            />
          </div>

          <div className={styles.modalActions}>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Publish Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
