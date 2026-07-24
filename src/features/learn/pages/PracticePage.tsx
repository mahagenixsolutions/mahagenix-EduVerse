import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { practiceTests as initialTests } from '@/mock/learning';
import { ClipboardList, Clock, HelpCircle, X, CheckCircle, AlertTriangle, Check } from 'lucide-react';
import styles from './learn.module.css';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface TestItem {
  id: number;
  title: string;
  subject: string;
  questions: number;
  duration: string;
  attempts: number;
  bestScore: number | null;
}

export const PracticePage: React.FC = () => {
  const [tests, setTests] = useState<TestItem[]>([]);
  const [activeTest, setActiveTest] = useState<TestItem | null>(null);
  
  // Quiz Player State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizTimer, setQuizTimer] = useState(60); // 60 seconds countdown
  const [quizPhase, setQuizPhase] = useState<'idle' | 'playing' | 'result'>('idle');

  // Hardcoded mock questions for each test subject
  const quizQuestions: Record<string, QuizQuestion[]> = {
    'Mathematics': [
      { question: 'What is the limit of (sin x) / x as x approaches 0?', options: ['0', '1', 'Infinity', 'Undefined'], correctAnswer: 1 },
      { question: 'What is the derivative of e^(2x) with respect to x?', options: ['e^(2x)', '2 e^(2x)', 'e^x', '2x e^(2x-1)'], correctAnswer: 1 },
      { question: 'Solve for x: log_2(x) = 5.', options: ['10', '25', '32', '64'], correctAnswer: 2 }
    ],
    'Physics': [
      { question: 'What is the SI unit of power?', options: ['Joule', 'Newton', 'Pascal', 'Watt'], correctAnswer: 3 },
      { question: 'Which Newton\'s law of motion describes inertia?', options: ['First Law', 'Second Law', 'Third Law', 'Universal Law'], correctAnswer: 0 },
      { question: 'What is the acceleration due to gravity on Earth?', options: ['8.9 m/s²', '9.8 m/s²', '10.2 m/s²', '9.3 m/s²'], correctAnswer: 1 }
    ],
    'English': [
      { question: 'Choose the correct synonym for "Benevolent".', options: ['Cruel', 'Kind', 'Selfish', 'Clever'], correctAnswer: 1 },
      { question: 'Identify the conjunction in: "I went home because it was late."', options: ['went', 'home', 'because', 'was'], correctAnswer: 2 }
    ],
    'Chemistry': [
      { question: 'What is the chemical symbol for Gold?', options: ['Gd', 'Go', 'Ag', 'Au'], correctAnswer: 3 },
      { question: 'What is the pH level of pure distilled water?', options: ['5', '7', '9', '14'], correctAnswer: 1 }
    ]
  };

  useEffect(() => {
    const saved = localStorage.getItem('eduverse_practice_tests');
    if (saved) {
      try {
        setTests(JSON.parse(saved));
        return;
      } catch (e) {
        // Fallback to default initial state if parsing fails
      }
    }
    setTests(initialTests);
    localStorage.setItem('eduverse_practice_tests', JSON.stringify(initialTests));
  }, []);

  const saveTests = (updated: TestItem[]) => {
    setTests(updated);
    localStorage.setItem('eduverse_practice_tests', JSON.stringify(updated));
  };

  // Timer Countdown Effect
  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;
    if (quizPhase === 'playing') {
      timerId = setInterval(() => {
        setQuizTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerId);
            handleQuizFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [quizPhase, currentQuestionIndex]);

  const handleStartQuiz = (test: TestItem) => {
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizTimer(60);
    setQuizPhase('playing');
  };

  const currentQuestionsList = activeTest ? (quizQuestions[activeTest.subject] || quizQuestions['Mathematics']) : [];

  const handleNextQuestion = () => {
    if (selectedOption === null) return;
    
    // Check answer
    const currentQ = currentQuestionsList[currentQuestionIndex];
    if (selectedOption === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }

    if (currentQuestionIndex < currentQuestionsList.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      handleQuizFinish();
    }
  };

  const handleQuizFinish = () => {
    setQuizPhase('result');
  };

  const handleCloseQuiz = () => {
    if (activeTest) {
      // Calculate final score percentage
      const finalPercent = Math.round((score / currentQuestionsList.length) * 100);
      
      const updated = tests.map(t => {
        if (t.id === activeTest.id) {
          return {
            ...t,
            attempts: t.attempts + 1,
            bestScore: t.bestScore === null ? finalPercent : Math.max(t.bestScore, finalPercent)
          };
        }
        return t;
      });
      saveTests(updated);
    }
    
    setQuizPhase('idle');
    setActiveTest(null);
  };

  return (
    <div>
      <PageHeader title="Practice Tests" subtitle="Sharpen your skills with timed quizzes" breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Learn', path: '/learn' }, { label: 'Practice' }]} />
      
      <div className={styles.practiceGrid}>
        {tests.map(test => (
          <Card key={test.id} hoverable>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Badge variant={test.bestScore !== null ? 'success' : 'default'}>
                {test.bestScore !== null ? `Best: ${test.bestScore}%` : 'Not attempted'}
              </Badge>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{test.attempts} attempts</span>
            </div>
            <p className={styles.itemTitle}>{test.title}</p>
            <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)', marginTop: '4px' }}>{test.subject}</p>
            
            <div className={styles.testMeta}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><HelpCircle size={14} /> {test.questions} Qs</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {test.duration}</span>
            </div>

            <Button variant="outline" size="sm" fullWidth style={{ marginTop: '16px' }} onClick={() => handleStartQuiz(test)}>
              {test.bestScore !== null ? 'Retake' : 'Start Test'}
            </Button>
          </Card>
        ))}
      </div>

      {/* QUIZ PLAYER SCREEN (Playing / Score Report) */}
      {activeTest && quizPhase !== 'idle' && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(6px)',
          zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Card style={{ width: '100%', maxWidth: '520px', padding: '32px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <button 
              onClick={handleCloseQuiz}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}
            >
              <X size={20} />
            </button>

            {quizPhase === 'playing' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-color)', textTransform: 'uppercase' }}>{activeTest.subject}</span>
                    <h3 style={{ margin: '4px 0 0 0', fontSize: '1.1rem', fontWeight: 700 }}>{activeTest.title}</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: quizTimer <= 10 ? '#FFEBEE' : 'var(--bg-color)', color: quizTimer <= 10 ? '#EF4444' : 'var(--text-main)', padding: '6px 14px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 700 }}>
                    <Clock size={16} /> <span>{quizTimer}s</span>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 600 }}>Question {currentQuestionIndex + 1} of {currentQuestionsList.length}</span>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '8px', marginBottom: '20px', lineHeight: 1.4 }}>
                    {currentQuestionsList[currentQuestionIndex]?.question}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {currentQuestionsList[currentQuestionIndex]?.options.map((opt, oIdx) => {
                      const isSelected = selectedOption === oIdx;
                      return (
                        <div 
                          key={oIdx}
                          onClick={() => setSelectedOption(oIdx)}
                          style={{
                            padding: '12px 16px', borderRadius: '12px', border: '1px solid',
                            borderColor: isSelected ? 'var(--primary-color)' : 'var(--border-color)',
                            background: isSelected ? 'var(--nav-active)' : 'var(--surface-color)',
                            cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500, display: 'flex', gap: '12px', alignItems: 'center',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{
                            width: '20px', height: '20px', borderRadius: '50%', border: '2px solid',
                            borderColor: isSelected ? 'var(--primary-color)' : 'var(--text-light)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            {isSelected && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary-color)' }} />}
                          </div>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                  <Button 
                    variant="primary" 
                    disabled={selectedOption === null}
                    onClick={handleNextQuestion}
                  >
                    {currentQuestionIndex === currentQuestionsList.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  </Button>
                </div>
              </>
            )}

            {quizPhase === 'result' && (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '16px 0' }}>
                <CheckCircle size={56} color="var(--success)" />
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700 }}>Quiz Completed!</h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-light)' }}>Congratulations on finishing the practice test.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%', margin: '16px 0' }}>
                  <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--bg-color)', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Questions Correct</span>
                    <h4 style={{ margin: '4px 0 0 0', fontSize: '1.2rem', fontWeight: 700 }}>{score} / {currentQuestionsList.length}</h4>
                  </div>
                  <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--bg-color)', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Quiz Percentage</span>
                    <h4 style={{ margin: '4px 0 0 0', fontSize: '1.2rem', fontWeight: 700, color: 'var(--success)' }}>
                      {Math.round((score / currentQuestionsList.length) * 100)}%
                    </h4>
                  </div>
                </div>

                <Button variant="primary" onClick={handleCloseQuiz} style={{ width: '100%' }}>
                  Back to Practice Board
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};
