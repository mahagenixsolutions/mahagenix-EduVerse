import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { BookOpen, RefreshCw, Eye, AlertTriangle, BookMarked, Check, Clock } from 'lucide-react';

interface LibraryModuleProps {
  onBack: () => void;
}

export const LibraryModule: React.FC<LibraryModuleProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'issued' | 'reserved' | 'recommend'>('issued');
  const [readingBook, setReadingBook] = useState<string | null>(null);
  const [reportDamageBook, setReportDamageBook] = useState<string | null>(null);
  const [damageDescription, setDamageDescription] = useState('');
  const [damageReported, setDamageReported] = useState(false);

  // Core Mock States for Issued Books
  const [issuedBooks, setIssuedBooks] = useState([
    {
      id: 1,
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      isbn: '978-0262033848',
      issueDate: '25 Jun 2026',
      dueDate: '25 Jul 2026',
      fine: 0,
      renewals: 0,
      cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=200'
    },
    {
      id: 2,
      title: 'University Physics with Modern Physics',
      author: 'Hugh D. Young',
      isbn: '978-0133969290',
      issueDate: '01 Jul 2026',
      dueDate: '15 Jul 2026',
      fine: 0,
      renewals: 1,
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=200'
    }
  ]);

  const [reservedBooks, setReservedBooks] = useState([
    { id: 11, title: 'Calculus: Early Transcendentals', author: 'James Stewart', date: '08 Jul 2026', queue: '#2', status: 'Pending' }
  ]);

  const [returnedHistory] = useState([
    { id: 201, title: 'A Brief History of Time', author: 'Stephen Hawking', returnDate: '15 Jun 2026', finePaid: '₹0', status: 'Completed' },
    { id: 202, title: 'Principles of Electrodynamics', author: 'David J. Griffiths', returnDate: '02 Jun 2026', finePaid: '₹10', status: 'Completed' }
  ]);

  const handleRenew = (id: number) => {
    setIssuedBooks(prev => prev.map(book => {
      if (book.id === id) {
        if (book.renewals >= 2) {
          alert('Maximum renewal limit (2 times) reached for this book. Please return to physical library counter.');
          return book;
        }
        // Advance due date by 14 days
        const parts = book.dueDate.split(' ');
        const day = parseInt(parts[0]) + 14;
        const newDue = `${day > 31 ? day - 30 : day} ${day > 31 ? 'Nov' : parts[1]} ${parts[2]}`;
        alert(`Successfully renewed "${book.title}"! New due date: ${newDue}`);
        return {
          ...book,
          dueDate: newDue,
          renewals: book.renewals + 1
        };
      }
      return book;
    }));
  };

  const handleReserve = (title: string, author: string) => {
    const isAlready = reservedBooks.some(b => b.title === title);
    if (isAlready) {
      alert('This book is already in your reservation queue.');
      return;
    }
    const id = Math.floor(Math.random() * 100);
    setReservedBooks(prev => [
      ...prev,
      { id, title, author, date: 'Today', queue: '#3', status: 'Pending' }
    ]);
    alert(`Successfully reserved "${title}"! Queue position: #3`);
  };

  const handleCancelReserve = (id: number) => {
    setReservedBooks(prev => prev.filter(b => b.id !== id));
    alert('Reservation cancelled.');
  };

  const submitDamageReport = () => {
    setDamageReported(true);
    setTimeout(() => {
      setReportDamageBook(null);
      setDamageDescription('');
      setDamageReported(false);
      alert('Damage report submitted. Our librarian will evaluate the details and update your notifications.');
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header system */}
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
          Digital School Library
        </h2>
      </div>

      {/* Stats Board */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        <Card style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '6px', background: 'var(--surface-color)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>Issued Books</span>
          <strong style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>{issuedBooks.length} Active</strong>
        </Card>
        <Card style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '6px', background: 'var(--surface-color)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>Reserved Books</span>
          <strong style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>{reservedBooks.length} Queue</strong>
        </Card>
        <Card style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '6px', background: 'var(--surface-color)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>Overdue Alerts</span>
          <strong style={{ fontSize: '1.5rem', color: '#10B981' }}>0 Books</strong>
        </Card>
        <Card style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '6px', background: 'var(--surface-color)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>Accumulated Fines</span>
          <strong style={{ fontSize: '1.5rem', color: '#10B981' }}>₹0</strong>
        </Card>
      </div>

      {/* Tabs list */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
        <button 
          onClick={() => setActiveTab('issued')}
          style={{
            padding: '8px 16px', border: 'none', background: 'none', fontSize: '0.85rem', fontWeight: 700,
            borderBottom: activeTab === 'issued' ? '2.5px solid #10B981' : 'none',
            color: activeTab === 'issued' ? '#10B981' : 'var(--text-light)', cursor: 'pointer'
          }}
        >
          Issued Books ({issuedBooks.length})
        </button>
        <button 
          onClick={() => setActiveTab('reserved')}
          style={{
            padding: '8px 16px', border: 'none', background: 'none', fontSize: '0.85rem', fontWeight: 700,
            borderBottom: activeTab === 'reserved' ? '2.5px solid #10B981' : 'none',
            color: activeTab === 'reserved' ? '#10B981' : 'var(--text-light)', cursor: 'pointer'
          }}
        >
          My Reservations ({reservedBooks.length})
        </button>
        <button 
          onClick={() => setActiveTab('recommend')}
          style={{
            padding: '8px 16px', border: 'none', background: 'none', fontSize: '0.85rem', fontWeight: 700,
            borderBottom: activeTab === 'recommend' ? '2.5px solid #10B981' : 'none',
            color: activeTab === 'recommend' ? '#10B981' : 'var(--text-light)', cursor: 'pointer'
          }}
        >
          Recommended Books
        </button>
      </div>

      {/* Tab Area */}
      {activeTab === 'issued' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '20px' }}>
          {/* Issued List */}
          <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Currently Checked Out</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {issuedBooks.map(book => (
                <div key={book.id} style={{
                  display: 'flex', gap: '16px', padding: '16px', borderRadius: '16px',
                  border: '1px solid var(--border-color)', background: 'var(--surface-color)'
                }}>
                  <img src={book.cover} alt={book.title} style={{ width: '70px', height: '95px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>{book.title}</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>By {book.author} • ISBN: {book.isbn}</span>
                    
                    {/* Dates block */}
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '4px' }}>
                      <span>Issued: <strong>{book.issueDate}</strong></span>
                      <span>Due: <strong style={{ color: '#EF4444' }}>{book.dueDate}</strong></span>
                      <span>Renewals: {book.renewals}/2</span>
                    </div>

                    {/* Action buttons row */}
                    <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                      <button 
                        onClick={() => handleRenew(book.id)}
                        style={{
                          background: 'none', border: '1px solid var(--border-color)', borderRadius: '8px',
                          padding: '6px 12px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-main)'
                        }}
                      >
                        <RefreshCw size={12} /> Renew
                      </button>
                      <button 
                        onClick={() => setReadingBook(book.title)}
                        style={{
                          background: 'none', border: '1px solid var(--border-color)', borderRadius: '8px',
                          padding: '6px 12px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: '4px', color: '#10B981', borderColor: 'rgba(16,185,129,0.2)'
                        }}
                      >
                        <Eye size={12} /> Read eBook
                      </button>
                      <button 
                        onClick={() => setReportDamageBook(book.title)}
                        style={{
                          background: 'none', border: 'none', color: '#EF4444', fontSize: '0.75rem', fontWeight: 700,
                          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
                        }}
                      >
                        <AlertTriangle size={12} /> Report Damage
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Returned history column */}
          <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Returned History</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {returnedHistory.map(log => (
                <div key={log.id} style={{
                  padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)',
                  background: 'rgba(16, 185, 129, 0.01)'
                }}>
                  <h4 style={{ margin: '0 0 2px 0', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{log.title}</h4>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', display: 'block' }}>Returned: {log.returnDate}</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.7rem' }}>
                    <span style={{ color: 'var(--text-light)' }}>Fine: <strong>{log.finePaid}</strong></span>
                    <span style={{ color: '#10B981', fontWeight: 700 }}>● {log.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'reserved' && (
        <Card style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 700 }}>Reserved Queue Status</h3>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-light)' }}>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Book Title</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Author</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Reserved Date</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Queue Spot</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservedBooks.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 8px', fontWeight: 700, color: 'var(--text-main)' }}>{item.title}</td>
                  <td style={{ padding: '14px 8px', color: 'var(--text-light)' }}>{item.author}</td>
                  <td style={{ padding: '14px 8px', color: 'var(--text-muted)' }}>{item.date}</td>
                  <td style={{ padding: '14px 8px', fontWeight: 700, color: '#F59E0B' }}>{item.queue}</td>
                  <td style={{ padding: '14px 8px' }}>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(245, 158, 11, 0.08)', color: '#D97706', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 8px', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleCancelReserve(item.id)}
                      style={{ background: 'none', border: 'none', color: '#EF4444', fontWeight: 600, cursor: 'pointer', fontSize: '0.78rem' }}
                    >
                      Cancel Reservation
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {activeTab === 'recommend' && (
        <Card style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 700 }}>Recommended Books for Your Course</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { title: 'Clean Code', author: 'Robert C. Martin', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=200' },
              { title: 'Design Patterns', author: 'Erich Gamma', cover: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=200' },
              { title: 'Feynman Lectures on Physics', author: 'Richard Feynman', cover: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=200' }
            ].map(rec => (
              <div key={rec.title} style={{
                display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', border: '1px solid var(--border-color)',
                borderRadius: '16px', background: 'var(--surface-color)', textAlign: 'center'
              }}>
                <img src={rec.cover} alt={rec.title} style={{ height: '140px', borderRadius: '8px', objectFit: 'cover', marginBottom: '8px' }} />
                <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rec.title}</h4>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', display: 'block', marginBottom: '6px' }}>{rec.author}</span>
                <button 
                  onClick={() => handleReserve(rec.title, rec.author)}
                  style={{
                    background: '#10B981', color: 'white', border: 'none', borderRadius: '8px',
                    padding: '8px 0', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                  }}
                >
                  <BookMarked size={12} /> Reserve Copy
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Reader Modal Overlay */}
      {readingBook && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999999
        }}>
          <Card style={{ width: '600px', height: '80vh', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', borderRadius: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>📖 Reading: {readingBook}</h3>
              <button onClick={() => setReadingBook(null)} style={{ background: 'none', border: 'none', color: 'var(--text-light)', fontSize: '1.1rem', cursor: 'pointer' }}>✕</button>
            </div>
            
            {/* Mock eBook pages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', background: '#FAF9F6', borderRadius: '12px', border: '1px solid var(--border-color)', color: '#333', fontFamily: 'serif', fontSize: '0.95rem', lineHeight: 1.6 }}>
              <h4 style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>CHAPTER 1: Introduction & Analysis</h4>
              <p>
                Algorithms are the core foundations of computer systems engineering. An algorithm is any well-defined computational procedure that takes some value, or set of values, as input and produces some value, or set of values, as output.
              </p>
              <p>
                We can think of an algorithm as a tool for solving a well-specified computational problem. The statement of the problem specifies in general terms the desired input/output relationship. The algorithm describes a specific computational procedure for achieving that input/output relationship.
              </p>
              <p>
                For example, one might need to sort a sequence of numbers into non-decreasing order. This problem arises frequently in practice and provides fertile ground for introducing many standard design paradigms and analysis techniques.
              </p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-light)' }}>
              <span>Page 1 of 422</span>
              <span>Mock eBook Reader Powered by EduVerse</span>
            </div>
          </Card>
        </div>
      )}

      {/* Damage Report Modal Overlay */}
      {reportDamageBook && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999999
        }}>
          <Card style={{ width: '400px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', borderRadius: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Report damage: {reportDamageBook}</h3>
              <button onClick={() => setReportDamageBook(null)} style={{ background: 'none', border: 'none', color: 'var(--text-light)', fontSize: '1.1rem', cursor: 'pointer' }}>✕</button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Damage Description</label>
              <textarea 
                placeholder="Describe details, e.g., torn pages on Chapter 2, binding damage..."
                rows={4}
                value={damageDescription}
                onChange={e => setDamageDescription(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none', resize: 'none' }}
              />
            </div>

            <button 
              onClick={submitDamageReport}
              disabled={!damageDescription.trim()}
              style={{
                background: '#EF4444', color: 'white', border: 'none', borderRadius: '12px',
                padding: '10px 0', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
                opacity: damageDescription.trim() ? 1 : 0.5
              }}
            >
              Submit Report
            </button>
          </Card>
        </div>
      )}
    </div>
  );
};
