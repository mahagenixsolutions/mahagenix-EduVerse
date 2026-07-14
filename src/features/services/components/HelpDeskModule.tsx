import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { MessageSquare, Send, Check, ShieldAlert, Award, FileText } from 'lucide-react';

interface HelpDeskModuleProps {
  onBack: () => void;
}

interface ChatMessage {
  sender: 'student' | 'agent';
  text: string;
  time: string;
}

interface SupportTicket {
  id: string;
  title: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'open' | 'resolved';
  date: string;
  chat: ChatMessage[];
}

export const HelpDeskModule: React.FC<HelpDeskModuleProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'raise'>('tickets');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  
  // Ticket forms
  const [category, setCategory] = useState('IT Support');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Chat window state
  const [chatInput, setChatInput] = useState('');

  // Core Mock States
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TKT-001',
      title: 'Bus route change request',
      category: 'Transport',
      priority: 'Medium',
      status: 'open',
      date: 'Oct 8',
      chat: [
        { sender: 'student', text: 'I would like to change my bus stop from Sector 4 to Metro Crossing.', time: 'Oct 8, 10:00 AM' },
        { sender: 'agent', text: 'Hi Sarah. We are verifying if Bus 12 has vacant seats on the Metro Crossing route. We will update you shortly.', time: 'Oct 8, 11:30 AM' }
      ]
    },
    {
      id: 'TKT-002',
      title: 'ID card replacement request',
      category: 'Accounts',
      priority: 'Low',
      status: 'resolved',
      date: 'Oct 2',
      chat: [
        { sender: 'student', text: 'I misplaced my ID card on the playground. Requesting a duplicate card.', time: 'Oct 2, 09:00 AM' },
        { sender: 'agent', text: 'Duplicate card printing approved. Your ledger has been billed. Card is ready at the admin counter.', time: 'Oct 2, 04:00 PM' }
      ]
    }
  ]);

  const handleRaiseTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const idNum = Math.floor(Math.random() * 900) + 100;
    const ticketId = `TKT-${idNum}`;
    const newTicket: SupportTicket = {
      id: ticketId,
      title,
      category,
      priority,
      status: 'open',
      date: 'Today',
      chat: [
        { sender: 'student', text: description, time: 'Today' }
      ]
    };

    setTickets(prev => [newTicket, ...prev]);
    setTitle('');
    setDescription('');
    setActiveTab('tickets');
    alert(`Support ticket raised successfully! ID: ${ticketId}`);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim() || !selectedTicket) return;

    const userMessage: ChatMessage = {
      sender: 'student',
      text: chatInput,
      time: 'Just Now'
    };

    // Update local chat
    const updatedTickets = tickets.map(t => {
      if (t.id === selectedTicket.id) {
        const nextChat = [...t.chat, userMessage];
        // Simulate response
        setTimeout(() => {
          const agentResponse: ChatMessage = {
            sender: 'agent',
            text: `Thank you for the update. We have logged this details inside ticket reference ${t.id}. Our officer is investigating.`,
            time: 'Just Now'
          };
          setTickets(prev => prev.map(pt => pt.id === t.id ? { ...pt, chat: [...pt.chat, agentResponse] } : pt));
          
          // Sync selected view if active
          setSelectedTicket(prev => {
            if (prev?.id === t.id) {
              return { ...prev, chat: [...prev.chat, agentResponse] };
            }
            return prev;
          });
        }, 1500);

        return { ...t, chat: nextChat };
      }
      return t;
    });

    setTickets(updatedTickets);
    setSelectedTicket(prev => prev ? { ...prev, chat: [...prev.chat, userMessage] } : null);
    setChatInput('');
  };

  const toggleTicketStatus = (id: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'open' ? 'resolved' as const : 'open' as const;
        alert(`Ticket status updated to: ${nextStatus.toUpperCase()}`);
        return { ...t, status: nextStatus };
      }
      return t;
    }));

    setSelectedTicket(prev => {
      if (prev?.id === id) {
        return { ...prev, status: prev.status === 'open' ? 'resolved' : 'open' };
      }
      return prev;
    });
  };

  const getPriorityColor = (p: string) => {
    if (p === 'Critical') return '#EF4444';
    if (p === 'High') return '#F59E0B';
    if (p === 'Medium') return '#3B82F6';
    return '#6B7280';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <button 
            onClick={onBack} 
            style={{ 
              background: 'none', border: 'none', color: '#10B981', fontWeight: 600, 
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0, marginBottom: '8px'
            }}
          >
            ← Back to Services
          </button>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Help Desk & Grievance Workspace
          </h2>
        </div>

        {/* Tab switch */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '12px' }}>
          <button 
            onClick={() => setActiveTab('tickets')}
            style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '0.82rem', fontWeight: 600,
              background: activeTab === 'tickets' ? 'var(--surface-color)' : 'transparent',
              color: activeTab === 'tickets' ? 'var(--text-main)' : 'var(--text-light)',
              cursor: 'pointer'
            }}
          >
            Active Tickets ({tickets.length})
          </button>
          <button 
            onClick={() => setActiveTab('raise')}
            style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '0.82rem', fontWeight: 600,
              background: activeTab === 'raise' ? 'var(--surface-color)' : 'transparent',
              color: activeTab === 'raise' ? 'var(--text-main)' : 'var(--text-light)',
              cursor: 'pointer'
            }}
          >
            Raise Ticket
          </button>
        </div>
      </div>

      {activeTab === 'tickets' ? (
        /* List and chat layout */
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '20px', alignItems: 'stretch' }}>
          {/* Tickets list */}
          <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '400px' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Ticket Directory</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {tickets.map(t => (
                <div 
                  key={t.id}
                  onClick={() => setSelectedTicket(t)}
                  style={{
                    padding: '12px 14px', borderRadius: '14px', border: '1px solid var(--border-color)',
                    background: selectedTicket?.id === t.id ? 'rgba(16,185,129,0.02)' : 'var(--surface-color)',
                    borderColor: selectedTicket?.id === t.id ? '#10B981' : 'var(--border-color)',
                    cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px',
                    transition: 'all 150ms'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', background: 'var(--bg-secondary)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-light)', fontWeight: 600 }}>{t.id}</span>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px',
                      background: t.status === 'open' ? 'rgba(245,158,11,0.08)' : 'rgba(16,185,129,0.08)',
                      color: t.status === 'open' ? '#D97706' : '#10B981'
                    }}>{t.status.toUpperCase()}</span>
                  </div>
                  <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{t.title}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '4px' }}>
                    <span>Category: {t.category}</span>
                    <span style={{ color: getPriorityColor(t.priority), fontWeight: 700 }}>{t.priority} Priority</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Chat Window */}
          {selectedTicket ? (
            <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '400px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>{selectedTicket.title}</h3>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>Category: {selectedTicket.category} • Priority: {selectedTicket.priority}</span>
                </div>
                <button 
                  onClick={() => toggleTicketStatus(selectedTicket.id)}
                  style={{
                    background: 'none', border: '1px solid var(--border-color)', borderRadius: '8px',
                    padding: '6px 12px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer',
                    color: selectedTicket.status === 'open' ? '#10B981' : '#EF4444'
                  }}
                >
                  {selectedTicket.status === 'open' ? 'Mark Resolved' : 'Reopen Ticket'}
                </button>
              </div>

              {/* Chat timeline messages list */}
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', padding: '10px 0', minHeight: '200px' }}>
                {selectedTicket.chat.map((msg, index) => {
                  const isUser = msg.sender === 'student';
                  return (
                    <div 
                      key={index}
                      style={{
                        alignSelf: isUser ? 'flex-end' : 'flex-start',
                        maxWidth: '75%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        alignItems: isUser ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <div style={{
                        background: isUser ? '#10B981' : 'var(--bg-secondary)',
                        color: isUser ? 'white' : 'var(--text-main)',
                        padding: '10px 14px',
                        borderRadius: isUser ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                        fontSize: '0.85rem',
                        lineHeight: 1.4
                      }}>
                        {msg.text}
                      </div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-light)' }}>{msg.time}</span>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input */}
              {selectedTicket.status === 'open' ? (
                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                  <input 
                    type="text" 
                    placeholder="Type message to support desk..."
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                    style={{
                      flex: 1, padding: '10px 16px', borderRadius: '10px',
                      border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none'
                    }}
                  />
                  <button 
                    onClick={handleSendMessage}
                    style={{
                      background: '#10B981', color: 'white', border: 'none', borderRadius: '10px',
                      width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Send size={16} />
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-light)', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '12px' }}>
                  This ticket has been marked resolved. Reopen to chat with support desk.
                </div>
              )}
            </Card>
          ) : (
            <Card style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)', fontSize: '0.85rem' }}>
              Select a ticket from directory folder to view timelines and messages.
            </Card>
          )}
        </div>
      ) : (
        /* Raise Form View */
        <Card style={{ padding: '24px', maxWidth: '560px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 700 }}>Raise Support Ticket</h3>
          
          <form onSubmit={handleRaiseTicket} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Category</label>
                <select 
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', background: 'white' }}
                >
                  <option>IT Support</option>
                  <option>Transport Desk</option>
                  <option>Library Desk</option>
                  <option>Accounts Department</option>
                  <option>Academic Office</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Priority</label>
                <select 
                  value={priority}
                  onChange={e => setPriority(e.target.value as any)}
                  style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', background: 'white' }}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Ticket Title / Subject</label>
              <input 
                type="text" 
                placeholder="e.g., Cannot connect to campus wifi in library" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none' }}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Detailed Message</label>
              <textarea 
                placeholder="Describe your issue, including room/bus numbers or dates..."
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none', resize: 'none' }}
                required
              />
            </div>

            <button 
              type="submit"
              style={{
                background: '#10B981', color: 'white', border: 'none', borderRadius: '12px',
                padding: '12px 0', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(16,185,129,0.1)'
              }}
            >
              Raise Support Ticket
            </button>
          </form>
        </Card>
      )}
    </div>
  );
};
