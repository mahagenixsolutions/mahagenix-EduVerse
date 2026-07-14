import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { chatList, chatMessages, noticeBoard } from '@/mock/messages';
import { useAnnouncements } from '@/features/announcements/hooks/useAnnouncements';
import { Search, Send, Paperclip, Smile, Pin, Bell, Megaphone, Hash } from 'lucide-react';
import styles from './communication.module.css';

export const CommunicationPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(chatList[0]);
  const { announcements } = useAnnouncements();
  const [activeTab, setActiveTab] = useState('chats');

  return (
    <div className={styles.commPage}>
      {/* Sidebar: Chat List */}
      <aside className={styles.chatSidebar}>
        <div className={styles.chatSearch}>
          <Search size={18} color="var(--text-muted)" />
          <input placeholder="Search conversations..." className={styles.searchInput} />
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
          {chatList.map(chat => (
            <div key={chat.id} className={`${styles.chatItem} ${selectedChat.id === chat.id ? styles.chatItemActive : ''}`} onClick={() => setSelectedChat(chat)}>
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
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className={styles.chatMain}>
        <div className={styles.chatHeader}>
          <Avatar src={selectedChat.avatar} alt={selectedChat.name} size="md" fallback={selectedChat.name[0]} />
          <div className={styles.chatHeaderInfo}>
            <p className={styles.chatHeaderTitle}>{selectedChat.name}</p>
            <span className={styles.chatStatus}>{selectedChat.online ? 'Online' : selectedChat.type === 'group' ? `${Math.floor(Math.random() * 30 + 10)} members` : 'Last seen recently'}</span>
          </div>
          <div className={styles.chatActions}>
            <button className={styles.iconBtn}><Pin size={18} /></button>
            <button className={styles.iconBtn}><Bell size={18} /></button>
          </div>
        </div>
        <div className={styles.messagesArea}>
          {chatMessages.map(msg => (
            <div key={msg.id} className={`${styles.msgBubble} ${msg.isMine ? styles.msgMine : styles.msgTheirs}`}>
              <p>{msg.text}</p>
              <span className={styles.msgTime}>{msg.time}</span>
            </div>
          ))}
        </div>
        <div className={styles.composerBar}>
          <button className={styles.iconBtn}><Paperclip size={20} /></button>
          <input placeholder="Type a message..." className={styles.composerInput} />
          <button className={styles.iconBtn}><Smile size={20} /></button>
          <button className={styles.sendBtn}><Send size={18} /></button>
        </div>
      </main>
    </div>
  );
};
