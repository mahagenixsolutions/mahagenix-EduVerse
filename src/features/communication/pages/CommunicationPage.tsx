import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { chatList as initialChatList, chatMessages as initialMessages, noticeBoard as initialNotices } from '@/mock/messages';
import { useAnnouncements } from '@/features/announcements/hooks/useAnnouncements';
import { Search, Send, Paperclip, Smile, Pin, Bell, Megaphone, Hash, Info, User, ArrowLeft } from 'lucide-react';
import styles from './communication.module.css';

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isMine: boolean;
}

export const CommunicationPage: React.FC = () => {
  const { announcements } = useAnnouncements();
  const [activeTab, setActiveTab] = useState('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileShowChat, setMobileShowChat] = useState(false);
  
  // Chats State
  const [chats, setChats] = useState(initialChatList);
  const [selectedChat, setSelectedChat] = useState(initialChatList[0]);
  
  // Messages History State mapped by Chat ID
  const [chatThreads, setChatThreads] = useState<Record<number, Message[]>>({
    1: initialMessages,
    2: [
      { id: 101, sender: 'Priya', text: 'Does anyone have the physics notes from last Friday?', time: '09:12 AM', isMine: false },
      { id: 102, sender: 'Alex', text: 'Yeah, I can upload them here in a bit.', time: '09:15 AM', isMine: false },
      { id: 103, sender: 'You', text: 'Thanks Alex, that would be super helpful!', time: '09:20 AM', isMine: true },
    ],
    3: [
      { id: 201, sender: 'Mrs. Priya Davis', text: 'Priya, please make sure your physics practical file is up to date.', time: 'Yesterday', isMine: false },
      { id: 202, sender: 'You', text: 'Yes ma\'am, I am finishing the thermodynamics diagrams.', time: 'Yesterday', isMine: true },
    ]
  });

  // Notice board data with descriptions
  const notices = [
    { id: 1, title: 'Uniform Guidelines Reminder', date: 'Oct 10, 2026', department: 'Administration', content: 'Students must wear full formal uniforms on Mondays and Wednesdays. Physical Education tracksuits are allowed only on sports days.' },
    { id: 2, title: 'Library Return Deadline', date: 'Oct 12, 2026', department: 'Library', content: 'All borrowed books from the mid-term session must be returned before Oct 20 to avoid late fee penalties.' },
    { id: 3, title: 'Sports Equipment Distribution', date: 'Oct 14, 2026', department: 'Sports', content: 'New badminton rackets and table tennis bats are available for issue at the sports room between 2:00 PM and 4:00 PM.' },
  ];

  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(1);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<number | null>(null);

  // Message input composer state
  const [composeText, setComposeText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatThreads, selectedChat]);

  // Handle send message
  const handleSendMessage = () => {
    if (!composeText.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: 'You',
      text: composeText,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isMine: true
    };

    // Append to current chat thread
    const currentThread = chatThreads[selectedChat.id] || [];
    const updatedThread = [...currentThread, newMsg];
    setChatThreads(prev => ({
      ...prev,
      [selectedChat.id]: updatedThread
    }));

    // Update last message in chatList
    setChats(prev => prev.map(c => c.id === selectedChat.id ? { ...c, lastMessage: composeText, time: 'Just now' } : c));
    setComposeText('');

    // Trigger mock auto-reply
    setTimeout(() => {
      const replyMsg: Message = {
        id: Date.now() + 1,
        sender: selectedChat.name,
        text: `Hello! I received your message: "${composeText}". Let me get back to you shortly.`,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isMine: false
      };
      
      setChatThreads(prev => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), replyMsg]
      }));

      // Update last message again
      setChats(prev => prev.map(c => c.id === selectedChat.id ? { ...c, lastMessage: replyMsg.text, time: 'Just now' } : c));
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Filter lists based on search
  const filteredChats = chats.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredAnnouncements = announcements.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.content.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredNotices = notices.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase()));

  // Active chat details
  const activeMessages = chatThreads[selectedChat.id] || [];

  return (
    <div className={styles.commPage}>
      {/* Sidebar: Chat List */}
      <aside className={`${styles.chatSidebar} ${mobileShowChat ? styles.chatSidebarHidden : ''}`}>
        <div className={styles.chatSearch}>
          <Search size={18} color="var(--text-muted)" />
          <input 
            placeholder={`Search ${activeTab}...`} 
            className={styles.searchInput} 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div style={{ padding: '8px 12px 0 12px', borderBottom: '1px solid var(--border-color)' }}>
          <Tabs
            tabs={[
              { id: 'chats', label: 'Chats' },
              { id: 'announcements', label: 'Announcements' },
              { id: 'notices', label: 'Notices' }
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
        
        <div className={styles.conversationList}>
          {activeTab === 'chats' && (
            filteredChats.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.8rem' }}>No conversations found</div>
            ) : (
              filteredChats.map(chat => (
                <div key={chat.id} className={`${styles.chatItem} ${selectedChat.id === chat.id ? styles.chatItemActive : ''}`} onClick={() => { setSelectedChat(chat); setMobileShowChat(true); setChats(prev => prev.map(c => c.id === chat.id ? { ...c, unread: 0 } : c)); }}>
                  <div className={styles.chatAvatarWrap}>
                    {chat.avatar ? <Avatar src={chat.avatar} alt={chat.name} size="md" /> : <div className={styles.groupAvatar}><Hash size={18} /></div>}
                    {chat.online && <span className={styles.onlineDot} />}
                  </div>
                  <div className={styles.chatPreview}>
                    <div className={styles.chatNameRow}>
                      <p className={styles.chatNameTitle}>{chat.name}</p>
                      <span className={styles.chatTime}>{chat.time}</span>
                    </div>
                    <p>{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && <span className={styles.unreadBadge}>{chat.unread}</span>}
                </div>
              ))
            )
          )}

          {activeTab === 'announcements' && (
            filteredAnnouncements.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.8rem' }}>No announcements found</div>
            ) : (
              filteredAnnouncements.map(ann => (
                <div 
                  key={ann.id} 
                  className={`${styles.chatItem} ${selectedAnnouncementId === ann.id ? styles.chatItemActive : ''}`} 
                  onClick={() => { setSelectedAnnouncementId(ann.id); setMobileShowChat(true); }}
                  style={{ display: 'flex', gap: '12px', padding: '16px 14px' }}
                >
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(95, 175, 136, 0.1)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Megaphone size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ann.title}</strong>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>{ann.date}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ann.content}</p>
                  </div>
                </div>
              ))
            )
          )}

          {activeTab === 'notices' && (
            filteredNotices.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.8rem' }}>No notices found</div>
            ) : (
              filteredNotices.map(not => (
                <div 
                  key={not.id} 
                  className={`${styles.chatItem} ${selectedNoticeId === not.id ? styles.chatItemActive : ''}`} 
                  onClick={() => { setSelectedNoticeId(not.id); setMobileShowChat(true); }}
                  style={{ display: 'flex', gap: '12px', padding: '16px 14px' }}
                >
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Megaphone size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{not.title}</strong>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>{not.date}</span>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontWeight: 600 }}>{not.department}</span>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </aside>

      {/* Main Chat / Details Area */}
      <main className={`${styles.chatMain} ${mobileShowChat ? styles.chatMainActive : ''}`}>
        {activeTab === 'chats' && selectedChat && (
          <>
            <div className={styles.chatHeader}>
              <button className={styles.mobileBackBtn} onClick={() => setMobileShowChat(false)} title="Back to chats">
                <ArrowLeft size={20} />
              </button>
              {selectedChat.avatar ? (
                <Avatar src={selectedChat.avatar} alt={selectedChat.name} size="md" fallback={selectedChat.name[0]} />
              ) : (
                <div className={styles.groupAvatar} style={{ width: 40, height: 40 }}><Hash size={18} /></div>
              )}
              <div className={styles.chatHeaderInfo}>
                <p className={styles.chatHeaderTitle}>{selectedChat.name}</p>
                <span className={styles.chatStatus}>
                  {selectedChat.online ? 'Online' : selectedChat.type === 'group' ? 'Group conversation' : 'Offline'}
                </span>
              </div>
              <div className={styles.chatActions}>
                <button className={styles.iconBtn}><Pin size={18} /></button>
                <button className={styles.iconBtn}><Bell size={18} /></button>
              </div>
            </div>
            
            <div className={styles.messagesArea}>
              {activeMessages.length === 0 ? (
                <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)', fontSize: '0.85rem' }}>
                  No messages yet. Send a message to start conversation.
                </div>
              ) : (
                activeMessages.map(msg => (
                  <div key={msg.id} className={`${styles.msgBubble} ${msg.isMine ? styles.msgMine : styles.msgTheirs}`}>
                    <p>{msg.text}</p>
                    <span className={styles.msgTime}>{msg.time}</span>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className={styles.composerBar}>
              <button className={styles.iconBtn}><Paperclip size={20} /></button>
              <input 
                placeholder="Type a message..." 
                className={styles.composerInput} 
                value={composeText}
                onChange={e => setComposeText(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button className={styles.iconBtn}><Smile size={20} /></button>
              <button className={styles.sendBtn} onClick={handleSendMessage}><Send size={18} /></button>
            </div>
          </>
        )}

        {activeTab === 'announcements' && (
          <div style={{ padding: 'var(--space-3)', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', boxSizing: 'border-box' }}>
            {selectedAnnouncementId === null ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)', textAlign: 'center' }}>
                <Info size={40} style={{ color: 'var(--border-color)', marginBottom: '12px' }} />
                <h3>Select an Announcement</h3>
                <p>Choose an announcement from the sidebar list to view its complete description.</p>
              </div>
            ) : (
              (() => {
                const ann = announcements.find(a => a.id === selectedAnnouncementId);
                if (!ann) return null;
                return (
                  <Card style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button className={styles.mobileBackBtn} onClick={() => setMobileShowChat(false)} title="Back to announcements">
                        <ArrowLeft size={20} />
                      </button>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-color)', background: 'var(--primary-light)', padding: '4px 12px', borderRadius: '99px' }}>
                        SCHOOL ANNOUNCEMENT
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginLeft: 'auto' }}>{ann.date}</span>
                    </div>

                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{ann.title}</h2>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Published by: <strong>{ann.author}</strong></span>

                    <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.5, borderTop: '1px solid var(--border-color)', paddingTop: '16px', margin: 0 }}>
                      {ann.content}
                    </p>
                  </Card>
                );
              })()
            )}
          </div>
        )}

        {activeTab === 'notices' && (
          <div style={{ padding: 'var(--space-3)', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', boxSizing: 'border-box' }}>
            {selectedNoticeId === null ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)', textAlign: 'center' }}>
                <Info size={40} style={{ color: 'var(--border-color)', marginBottom: '12px' }} />
                <h3>Select a Notice</h3>
                <p>Choose a notice board topic from the sidebar list to view official details.</p>
              </div>
            ) : (
              (() => {
                const not = notices.find(n => n.id === selectedNoticeId);
                if (!not) return null;
                return (
                  <Card style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button className={styles.mobileBackBtn} onClick={() => setMobileShowChat(false)} title="Back to notices">
                        <ArrowLeft size={20} />
                      </button>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--warning)', background: 'rgba(245, 158, 11, 0.08)', padding: '4px 12px', borderRadius: '99px' }}>
                        {not.department} NOTICE
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginLeft: 'auto' }}>{not.date}</span>
                    </div>

                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{not.title}</h2>

                    <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.5, borderTop: '1px solid var(--border-color)', paddingTop: '16px', margin: 0 }}>
                      {not.content}
                    </p>
                  </Card>
                );
              })()
            )}
          </div>
        )}
      </main>
    </div>
  );
};
