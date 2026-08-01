import React, { useState } from 'react';
import styles from './logoutFeedbackModal.module.css';
import { X, ArrowLeft, LogOut } from 'lucide-react';

interface LogoutFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmLogout: () => void;
}

export const LogoutFeedbackModal: React.FC<LogoutFeedbackModalProps> = ({ isOpen, onClose, onConfirmLogout }) => {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleContinue = () => {
    setStep(2);
  };

  const handleFinalLogout = () => {
    // We could submit the rating to an API here.
    // For now, we simply log out.
    onConfirmLogout();
  };

  const getLargeEmoji = () => {
    if (rating === null) return '🙂';
    return ['😠', '😞', '😐', '😊', '😍'][rating - 1];
  };

  const getFeedbackTitle = () => {
    if (rating === null) return "How was your experience?";
    if (rating <= 2) return "We're sorry to hear that!";
    if (rating === 3) return "Thanks for the feedback!";
    return "Glad you liked it!";
  };

  const getFeedbackSubtitle = () => {
    if (rating === null) return "Your feedback helps us improve EduVerse.";
    if (rating <= 2) return "We will work hard to improve.";
    return "We appreciate your support!";
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        {/* Step 1: Confirmation */}
        {step === 1 && (
          <div className={styles.stepContent}>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
            <div className={styles.iconCircle}>
              <LogOut size={32} color="#EF4444" />
            </div>
            <h2 className={styles.title}>Are you sure you want to log out?</h2>
            <p className={styles.subtitle}>You will need to log back in to access your dashboard.</p>
            
            <div className={styles.actionButtons}>
              <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
              <button className={styles.continueBtn} onClick={handleContinue}>Continue</button>
            </div>
          </div>
        )}

        {/* Step 2: Feedback */}
        {step === 2 && (
          <div className={styles.stepContent}>
            <button className={styles.backBtn} onClick={() => setStep(1)} aria-label="Go back">
              <ArrowLeft size={20} />
            </button>
            
            <div className={styles.feedbackIconWrap}>
              <div className={styles.largeEmoji}>
                 {getLargeEmoji()}
              </div>
            </div>

            <h2 className={styles.title}>{getFeedbackTitle()}</h2>
            <p className={styles.subtitle}>{getFeedbackSubtitle()}</p>
            
            <div className={styles.ratingRow}>
              {[
                { val: 1, label: 'Terrible', emoji: '😠' },
                { val: 2, label: 'Bad', emoji: '😞' },
                { val: 3, label: 'Okay', emoji: '😐' },
                { val: 4, label: 'Good', emoji: '😊' },
                { val: 5, label: 'Great', emoji: '😍' }
              ].map(item => (
                <button 
                  key={item.val}
                  className={`${styles.ratingBtn} ${rating === item.val ? styles.ratingBtnActive : ''}`}
                  onClick={() => setRating(item.val)}
                >
                  <span className={styles.emoji}>{item.emoji}</span>
                  <span className={styles.ratingLabel}>{item.label}</span>
                </button>
              ))}
            </div>

            <button 
              className={styles.submitBtn} 
              onClick={handleFinalLogout}
              disabled={rating === null}
            >
              Submit & Log Out
            </button>
            <button className={styles.laterBtn} onClick={handleFinalLogout}>
              I will do it later
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
