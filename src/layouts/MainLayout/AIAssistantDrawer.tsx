import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, Bot, User } from 'lucide-react';
import styles from './layout.module.css';

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
}

export const AIAssistantDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am your EduVerse AI Assistant. How can I help you today? You can ask me about your homework, attendance, outstanding fees, or upcoming events!'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let botResponseText = '';
      const query = text.toLowerCase();

      if (query.includes('homework') || query.includes('assignment') || query.includes('task') || query.includes('lesson')) {
        botResponseText = 'You have **3 pending** homework tasks:\n\n• **Mathematics**: Calculus Exercises 1-20 (due Today, 11:59 PM)\n• **English**: Read Chapters 4 & 5, Write Summary (due Wednesday)\n• **Chemistry**: Balance Redox Reactions Worksheet (due Thursday)\n\nYou also have **1 overdue** task:\n• **Computer Science**: Implement Stack Data Structure (due Last Friday)\n\nWould you like help with any of these topics?';
      } else if (query.includes('attendance') || query.includes('present') || query.includes('absent')) {
        botResponseText = 'Your overall attendance is currently at **92.4%**.\n\nYou have checked in for **24 out of 26** school days this term, putting you safely above the minimum 75% requirement. Keep up the great attendance!';
      } else if (query.includes('fee') || query.includes('payment') || query.includes('due') || query.includes('rupee') || query.includes('money')) {
        botResponseText = 'You have **₹12,500 due** in Fee Payments (Action Needed).\n\nYou can pay this online from the **Services** module. Let me know if you would like me to help you navigate there.';
      } else if (query.includes('event') || query.includes('calendar') || query.includes('trip') || query.includes('announcement') || query.includes('schedule')) {
        botResponseText = 'Here are the upcoming events on your schedule:\n\n• **Today**: Chemistry Lab Report submission (4:00 PM) & Basketball Finals (Arena)\n• **This Friday (Oct 18)**: Science Excursion Trip to Ooty, Tamil Nadu\n\nAll details can be found under the **School > Events** section.';
      } else if (query.includes('counselling') || query.includes('appointment') || query.includes('medical') || query.includes('health') || query.includes('help desk') || query.includes('support')) {
        botResponseText = 'You can request administrative or support services under the **Services** page:\n\n• **Counselling**: Book appointments with school counselors.\n• **Medical Room**: View visit records and logs.\n• **Help Desk**: Submit a ticket for support.';
      } else if (query.includes('hi') || query.includes('hello') || query.includes('hey') || query.includes('help') || query.includes('greet')) {
        botResponseText = 'Hi there! I am your EduVerse Copilot. How can I help you today? Feel free to click one of the suggestions below or ask any school-related question.';
      } else {
        botResponseText = "I'm sorry, I don't have direct info on that topic. I can tell you about your **homework**, **attendance** statistics, outstanding **fees**, or upcoming **events**. Try asking: 'What homework do I have due?'";
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponseText
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const suggestions = [
    'What is my pending homework?',
    'Show my attendance summary',
    'What is my outstanding fee?',
    'What is the next school event?'
  ];

  return (
    <div className={styles.aiDrawerBackdrop} onClick={onClose}>
      <div className={styles.aiDrawer} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.aiDrawerHeader}>
          <div className={styles.aiDrawerHeaderTitle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                color: '#fff',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={18} />
              </div>
              <div>
                <h3>AI Assistant</h3>
                <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-light)' }}>EduVerse Learning Copilot</p>
              </div>
            </div>
          </div>
          <button className={styles.aiDrawerClose} onClick={onClose} title="Close Assistant">
            <X size={20} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className={styles.aiDrawerChat}>
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`${styles.aiMessageWrap} ${msg.sender === 'user' ? styles.aiMessageUser : styles.aiMessageBot}`}
            >
              <div className={`${styles.aiAvatar} ${msg.sender === 'user' ? styles.aiAvatarUser : styles.aiAvatarBot}`}>
                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`${styles.aiBubble} ${msg.sender === 'user' ? styles.aiBubbleUser : styles.aiBubbleBot}`}>
                {msg.text.split('\n').map((line, i) => {
                  // Basic markdown replacement for bold text (**text**)
                  let formatted = line;
                  const boldRegex = /\*\*(.*?)\*\*/g;
                  const parts = [];
                  let lastIndex = 0;
                  let match;

                  while ((match = boldRegex.exec(line)) !== null) {
                    if (match.index > lastIndex) {
                      parts.push(line.substring(lastIndex, match.index));
                    }
                    parts.push(<strong key={match.index}>{match[1]}</strong>);
                    lastIndex = boldRegex.lastIndex;
                  }
                  
                  if (lastIndex < line.length) {
                    parts.push(line.substring(lastIndex));
                  }

                  return (
                    <div key={i} style={{ marginBottom: i < msg.text.split('\n').length - 1 ? '6px' : 0 }}>
                      {parts.length > 0 ? parts : line}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className={`${styles.aiMessageWrap} ${styles.aiMessageBot}`}>
              <div className={`${styles.aiAvatar} ${styles.aiAvatarBot}`}>
                <Bot size={16} />
              </div>
              <div className={`${styles.aiBubble} ${styles.aiBubbleBot}`}>
                <div className={styles.aiTypingIndicator}>
                  <span className={styles.aiTypingDot} />
                  <span className={styles.aiTypingDot} />
                  <span className={styles.aiTypingDot} />
                </div>
              </div>
            </div>
          )}

          {/* Suggestion list */}
          {messages.length === 1 && !isTyping && (
            <div className={styles.aiSuggestions}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600, marginLeft: '4px', marginBottom: '4px' }}>
                QUICK SUGGESTIONS
              </span>
              {suggestions.map(s => (
                <button 
                  key={s} 
                  className={styles.aiSuggestionBtn}
                  onClick={() => handleSendMessage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Footer Input */}
        <div className={styles.aiDrawerFooter}>
          <form 
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className={styles.aiInputWrap}
          >
            <input
              type="text"
              className={styles.aiInput}
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" className={styles.aiSendBtn} disabled={isTyping || !inputValue.trim()}>
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
