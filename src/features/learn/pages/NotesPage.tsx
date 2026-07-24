import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { notes as initialNotes } from '@/mock/learning';
import { FileText, Bookmark, Plus, X, Check, AlertCircle } from 'lucide-react';
import styles from './learn.module.css';

interface NoteItem {
  id: number;
  subject: string;
  title: string;
  pages: number;
  updatedAt: string;
  bookmarked: boolean;
}

export const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<NoteItem[]>(initialNotes);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Create Note Form States
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Mathematics');
  const [newPages, setNewPages] = useState(4);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleToggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotes(prev => prev.map(note => {
      if (note.id === id) {
        const nextState = !note.bookmarked;
        showFeedback('success', nextState ? `Note "${note.title}" bookmarked!` : `Removed bookmark for "${note.title}".`);
        return { ...note, bookmarked: nextState };
      }
      return note;
    }));
  };

  const handleCreateNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) {
      showFeedback('error', 'Please provide a note title.');
      return;
    }

    const newNote: NoteItem = {
      id: Date.now(),
      title: newTitle,
      subject: newSubject,
      pages: newPages,
      updatedAt: 'Just now',
      bookmarked: false
    };

    setNotes(prev => [newNote, ...prev]);
    setNewTitle('');
    setNewSubject('Mathematics');
    setNewPages(4);
    setShowCreateModal(false);
    showFeedback('success', `Study note "${newNote.title}" uploaded!`);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <PageHeader title="Notes" subtitle="Your digital notes and study materials" breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Learn', path: '/learn' }, { label: 'Notes' }]} />
        <Button variant="primary" onClick={() => setShowCreateModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <Plus size={16} /> Create Note
        </Button>
      </div>

      {feedback && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 18px', borderRadius: '12px',
          marginBottom: '20px', border: '1px solid',
          background: feedback.type === 'success' ? '#E8F5E9' : '#FFEBEE',
          borderColor: feedback.type === 'success' ? '#A5D6A7' : '#EF9A9A',
          color: feedback.type === 'success' ? '#2E7D32' : '#C62828',
          fontSize: '0.85rem', fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
        }}>
          {feedback.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
          <span>{feedback.message}</span>
        </div>
      )}

      <div className={styles.notesGrid}>
        {notes.map(note => (
          <Card key={note.id} hoverable className={styles.noteCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)' }}>
                <FileText size={20} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{note.subject}</span>
              </div>
              <button 
                onClick={(e) => handleToggleBookmark(note.id, e)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}
              >
                <Bookmark 
                  size={16} 
                  fill={note.bookmarked ? "var(--warning)" : "none"} 
                  color={note.bookmarked ? "var(--warning)" : "var(--text-light)"} 
                />
              </button>
            </div>
            <p className={styles.itemTitle} style={{ marginTop: '12px' }}>{note.title}</p>
            <div className={styles.noteMeta}>
              <span>{note.pages} pages</span>
              <span>{note.updatedAt}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Note Modal */}
      {showCreateModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)',
          zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Card style={{ width: '100%', maxWidth: '420px', padding: '24px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button 
              onClick={() => setShowCreateModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>Create New Note</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '-8px' }}>Log a new study resource or digital textbook reference.</p>

            <form onSubmit={handleCreateNoteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Note Title</label>
                <input 
                  type="text" 
                  value={newTitle} 
                  onChange={e => setNewTitle(e.target.value)} 
                  placeholder="e.g. Chemical Bonding Basics"
                  style={{
                    padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-color)',
                    background: 'var(--surface-color)', color: 'var(--text-main)', fontSize: '0.875rem', fontFamily: 'inherit'
                  }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Subject</label>
                  <select 
                    value={newSubject} 
                    onChange={e => setNewSubject(e.target.value)}
                    style={{
                      padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-color)',
                      background: 'var(--surface-color)', color: 'var(--text-main)', fontSize: '0.875rem', outline: 'none'
                    }}
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="English">English</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Pages</label>
                  <input 
                    type="number" 
                    value={newPages} 
                    onChange={e => setNewPages(parseInt(e.target.value) || 1)} 
                    min={1}
                    style={{
                      padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-color)',
                      background: 'var(--surface-color)', color: 'var(--text-main)', fontSize: '0.875rem', fontFamily: 'inherit'
                    }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <Button variant="outline" type="button" onClick={() => setShowCreateModal(false)} style={{ flex: 1 }}>Cancel</Button>
                <Button variant="primary" type="submit" style={{ flex: 1 }}>Save Note</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
