import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './logoutFeedbackModal.module.css';
import { X, ArrowLeft, LogOut } from 'lucide-react';
import { useRole } from '@/contexts/RoleContext';

interface LogoutFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmLogout: () => void;
}

export const LogoutFeedbackModal: React.FC<LogoutFeedbackModalProps> = ({
  isOpen,
  onClose,
  onConfirmLogout,
}) => {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState<number | null>(null);
  const { currentUser } = useRole();

  if (!isOpen) return null;

  const handleContinue = () => {
    setStep(2);
  };

  const handleFinalLogout = () => {
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
    return "Your experience was great!";
  };

  const getFeedbackSubtitle = () => {
    if (rating === null) return "Your feedback helps us continuously improve CampusOne.";
    if (rating <= 2) return "We will work hard to improve.";
    return "Thank you for being part of EduVerse Academy.";
  };

  const userName = currentUser?.name?.split(' ')[0] || 'there';

  return createPortal(
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999999,
        padding: '16px',
        boxSizing: 'border-box',
      }}
    >
      {/* Step 1: Confirmation Card (Matching Reference Screenshot 1) */}
      {step === 1 && (
        <div
          className={styles.modalContainer}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '480px',
            padding: '32px 36px',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.04)',
            position: 'relative',
            boxSizing: 'border-box',
          }}
        >
          <div
            className={styles.topHeaderRow}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              width: '100%',
            }}
          >
            <div
              className={styles.iconCircle}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#EAF6EF',
                color: '#5FAF88',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LogOut size={22} color="#5FAF88" />
            </div>
            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close modal"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#F1F5F9',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748B',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>
          </div>

          <h2
            className={styles.title}
            style={{
              fontSize: '1.65rem',
              fontWeight: 700,
              color: '#0F172A',
              margin: '0 0 10px 0',
              lineHeight: 1.25,
              textAlign: 'left',
              letterSpacing: '-0.02em',
            }}
          >
            Are you sure you want to log out?
          </h2>
          <p
            className={styles.subtitle}
            style={{
              fontSize: '0.95rem',
              color: '#64748B',
              margin: '0 0 24px 0',
              lineHeight: 1.5,
              textAlign: 'left',
            }}
          >
            You will be signed out of your account session.
          </p>

          <div
            className={styles.divider}
            style={{
              height: '1px',
              backgroundColor: '#F1F5F9',
              width: '100%',
              marginBottom: '24px',
            }}
          />

          <div
            className={styles.actionsRight}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              width: '100%',
            }}
          >
            <button
              className={styles.cancelBtn}
              onClick={onClose}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 22px',
                borderRadius: '12px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#334155',
                fontSize: '0.925rem',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <X size={16} /> Cancel
            </button>
            <button
              className={styles.brandLogOutBtn}
              onClick={handleContinue}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 24px',
                borderRadius: '12px',
                border: 'none',
                background: '#5FAF88',
                color: '#FFFFFF',
                fontSize: '0.925rem',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(95, 175, 136, 0.3)',
              }}
            >
              <LogOut size={16} /> Log Out
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Feedback Rating Card (Matching Reference Screenshot 2) */}
      {step === 2 && (
        <div
          className={styles.modalContainerFeedback}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#ffffff',
            borderRadius: '28px',
            width: '100%',
            maxWidth: '400px',
            padding: '28px 24px 32px 24px',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.18)',
            position: 'relative',
            boxSizing: 'border-box',
            textAlign: 'center',
          }}
        >
          <div
            className={styles.feedbackHeaderBar}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              width: '100%',
            }}
          >
            <button
              className={styles.backBtn}
              onClick={() => setStep(1)}
              aria-label="Go back"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748B',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowLeft size={20} />
            </button>
            <span
              className={styles.headerLabel}
              style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#64748B',
              }}
            >
              App Experience
            </span>
            <span
              className={styles.stepIndicator}
              style={{
                fontSize: '0.85rem',
                color: '#94A3B8',
                fontWeight: 500,
              }}
            >
              1 of 2
            </span>
          </div>

          <h2
            className={styles.feedbackTitle}
            style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              color: '#0F172A',
              margin: '0 0 20px 0',
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
            }}
          >
            Hi {userName}, how was your experience today?
          </h2>

          <div
            className={styles.bigEmojiCircle}
            style={{
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              background: '#FEF3C7',
              border: '6px solid #FFFBEB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
            }}
          >
            <span
              className={styles.bigEmojiText}
              style={{
                fontSize: '3.6rem',
                lineHeight: 1,
              }}
            >
              {getLargeEmoji()}
            </span>
          </div>

          <h4
            className={styles.emojiHeading}
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#0F172A',
              margin: '0 0 4px 0',
            }}
          >
            {getFeedbackTitle()}
          </h4>
          <p
            className={styles.emojiSubtext}
            style={{
              fontSize: '0.85rem',
              color: '#64748B',
              margin: '0 0 24px 0',
            }}
          >
            {getFeedbackSubtitle()}
          </p>

          <div
            className={styles.ratingRowContainer}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '8px',
              width: '100%',
              marginBottom: '28px',
            }}
          >
            {[
              { val: 1, label: 'Terrible', emoji: '😠' },
              { val: 2, label: 'Bad', emoji: '😞' },
              { val: 3, label: 'Okay', emoji: '😐' },
              { val: 4, label: 'Good', emoji: '😊' },
              { val: 5, label: 'Great', emoji: '😍' },
            ].map((item) => {
              const isSelected = rating === item.val;
              return (
                <button
                  key={item.val}
                  className={`${styles.radioRatingTile} ${
                    isSelected ? styles.radioRatingTileActive : ''
                  }`}
                  onClick={() => setRating(item.val)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 2px',
                    borderRadius: '14px',
                    border: isSelected
                      ? '1px solid rgba(95, 175, 136, 0.5)'
                      : '1px solid transparent',
                    background: isSelected ? '#EAF6EF' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    className={`${styles.radioDot} ${
                      isSelected ? styles.radioDotActive : ''
                    }`}
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: isSelected ? '2px solid #5FAF88' : '2px solid #CBD5E1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#FFFFFF',
                    }}
                  >
                    {isSelected && (
                      <div
                        className={styles.radioDotInner}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#5FAF88',
                        }}
                      />
                    )}
                  </div>
                  <span
                    className={styles.tileEmojiIcon}
                    style={{ fontSize: '1.5rem', lineHeight: 1 }}
                  >
                    {item.emoji}
                  </span>
                  <span
                    className={styles.tileLabelText}
                    style={{
                      fontSize: '0.725rem',
                      fontWeight: 600,
                      color: isSelected ? '#5FAF88' : '#64748B',
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            className={styles.brandSubmitPillBtn}
            onClick={handleFinalLogout}
            disabled={rating === null}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '9999px',
              border: 'none',
              background: rating === null ? '#CBD5E1' : '#5FAF88',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: rating === null ? 'not-allowed' : 'pointer',
              boxShadow: rating === null ? 'none' : '0 4px 14px rgba(95, 175, 136, 0.3)',
            }}
          >
            Continue & Log Out
          </button>
        </div>
      )}
    </div>,
    document.body
  );
};
