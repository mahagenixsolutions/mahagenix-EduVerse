import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { 
  MessageSquare, Pin, Send, ThumbsUp, MessageCircle, 
  User, CheckCircle2, Search, Filter, Sparkles, Share2
} from 'lucide-react';
import styles from './communication.module.css';

interface PostItem {
  id: number;
  author: string;
  role: 'teacher' | 'student';
  avatar: string;
  pinned: boolean;
  time: string;
  topic: string;
  content: string;
  likes: number;
  replies: { author: string; role: string; content: string; time: string }[];
}

const mockPosts: PostItem[] = [
  {
    id: 1,
    author: 'Dr. Robert Vance',
    role: 'teacher',
    avatar: 'https://i.pravatar.cc/150?u=robert_vance',
    pinned: true,
    time: '2 hours ago',
    topic: 'Grade 10 Physics - Electromagnetic Induction Formula Sheet',
    content: 'Dear Students, I have uploaded the revised formula reference sheet for Faraday Law and Lenz Law in the Resources section. Please review problems #4 through #12 for tomorrow’s seminar.',
    likes: 18,
    replies: [
      { author: 'Sarah Doe', role: 'student', content: 'Thank you Sir! Will we have numerical questions on generator efficiency in the midterm?', time: '1 hour ago' },
      { author: 'Dr. Robert Vance', role: 'teacher', content: 'Yes Sarah, transformer efficiency calculations will be included in Section B.', time: '45 mins ago' }
    ]
  },
  {
    id: 2,
    author: 'Lucas Martin',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?u=lucas_m',
    pinned: false,
    time: 'Yesterday at 04:15 PM',
    topic: 'Math Homework - Completing the Square Question #7',
    content: 'Does anyone know why the constant term needs to be moved to the right side of the equation before dividing by `a`?',
    likes: 5,
    replies: [
      { author: 'Mrs. Clara Bennett', role: 'teacher', content: 'Hi Lucas! Moving the constant term simplifies balancing both sides of the equation when adding `(b/2)²`.', time: 'Yesterday at 05:00 PM' }
    ]
  }
];

export const ClassDiscussionPage: React.FC = () => {
  const [posts, setPosts] = useState<PostItem[]>(mockPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [replyInputMap, setReplyInputMap] = useState<Record<number, string>>({});
  const [toast, setToast] = useState<string | null>(null);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: PostItem = {
      id: Date.now(),
      author: 'Sarah Doe',
      role: 'student',
      avatar: 'https://i.pravatar.cc/150?u=sarah_doe',
      pinned: false,
      time: 'Just now',
      topic: 'Question regarding classroom topic',
      content: newPostContent,
      likes: 0,
      replies: []
    };

    setPosts(prev => [newPost, ...prev]);
    setNewPostContent('');
    setToast('Question posted to Class Feed! Teachers & classmates notified.');
    setTimeout(() => setToast(null), 3000);
  };

  const handleReplySubmit = (postId: number) => {
    const text = replyInputMap[postId];
    if (!text || !text.trim()) return;

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [...p.replies, { author: 'Sarah Doe', role: 'student', content: text, time: 'Just now' }]
        };
      }
      return p;
    }));

    setReplyInputMap(prev => ({ ...prev, [postId]: '' }));
  };

  const handleLikeToggle = (postId: number) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <div>
      <PageHeader
        title="Class Discussion Feed"
        subtitle="Ask academic questions, collaborate on class topics, and view pinned teacher announcements"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Messages', path: '/messages' }, { label: 'Class Discussion' }]}
      />

      {toast && (
        <div style={{
          padding: '12px 20px', background: '#ECFDF5', color: '#059669',
          borderRadius: '12px', border: '1px solid #A7F3D0', marginBottom: '20px',
          display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600
        }}>
          <CheckCircle2 size={20} />
          <span>{toast}</span>
        </div>
      )}

      {/* Ask Question Card */}
      <Card style={{ padding: '20px', borderRadius: '18px', marginBottom: '24px' }}>
        <p style={{ margin: '0 0 12px 0', fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>Ask a Question to the Class & Teacher</p>
        <form onSubmit={handlePostSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <textarea
            rows={3}
            value={newPostContent}
            onChange={e => setNewPostContent(e.target.value)}
            placeholder="Type your question or topic query here..."
            style={{
              width: '100%', padding: '12px', borderRadius: '12px',
              border: '1px solid var(--border-color)', background: 'var(--bg-color)',
              fontSize: '0.9rem', outline: 'none', resize: 'vertical'
            }}
            required
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button size="sm" type="submit">
              <Send size={15} style={{ marginRight: '6px' }} /> Post to Class Feed
            </Button>
          </div>
        </form>
      </Card>

      {/* Discussion Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {posts.map(post => (
          <Card key={post.id} style={{ padding: '20px', borderRadius: '18px' }}>
            {post.pinned && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: '10px' }}>
                <Pin size={14} /> PINNED TEACHER ANNOUNCEMENT
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <img src={post.avatar} alt={post.author} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>
                  {post.author} <Badge variant={post.role === 'teacher' ? 'info' : 'secondary'}>{post.role.toUpperCase()}</Badge>
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.time}</span>
              </div>
            </div>

            <p style={{ fontSize: '13.5px', fontWeight: 600, color: '#1E293B', margin: '0 0 6px 0', lineHeight: 1.3 }}>
              {post.topic}
            </p>

            <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.4, margin: '0 0 14px 0' }}>
              {post.content}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginBottom: '14px' }}>
              <button 
                onClick={() => handleLikeToggle(post.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}
              >
                <ThumbsUp size={16} /> {post.likes} Helpful
              </button>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <MessageCircle size={16} style={{ display: 'inline', marginRight: '4px' }} /> {post.replies.length} Replies
              </span>
            </div>

            {/* Replies Thread */}
            {post.replies.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--bg-color)', padding: '14px', borderRadius: '14px', marginBottom: '12px' }}>
                {post.replies.map((r, idx) => (
                  <div key={idx} style={{ borderBottom: idx !== post.replies.length - 1 ? '1px solid var(--border-color)' : 'none', paddingBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '2px' }}>
                      <span style={{ color: 'var(--text-main)' }}>{r.author} ({r.role})</span>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{r.time}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>{r.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Input */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Write a reply..."
                value={replyInputMap[post.id] || ''}
                onChange={e => setReplyInputMap({ ...replyInputMap, [post.id]: e.target.value })}
                style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem' }}
                onKeyDown={e => { if (e.key === 'Enter') handleReplySubmit(post.id); }}
              />
              <Button size="sm" onClick={() => handleReplySubmit(post.id)}>Reply</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
