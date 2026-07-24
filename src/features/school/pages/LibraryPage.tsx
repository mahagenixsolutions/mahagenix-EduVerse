import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/navigation/PageHeader';
import { MockServer } from '@/mock-server/MockServer';
import { Search, BookOpen, Clock, AlertTriangle, AlertCircle, ShieldCheck, Check, Info, X } from 'lucide-react';
import styles from './school.module.css';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  copies: number;
  location: string;
  coverColor: string;
}

interface ActiveCheckout {
  id: string;
  bookId: string;
  title: string;
  author: string;
  dueDate: string;
  daysRemaining: number;
  status: 'active' | 'overdue';
}

export const LibraryPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([
    { id: 'b1', title: 'Brief History of Time', author: 'Stephen Hawking', category: 'Science', copies: 3, location: 'Shelf A-4', coverColor: '#6366f1' },
    { id: 'b2', title: 'Introduction to Calculus', author: 'Gilbert Strang', category: 'Math', copies: 2, location: 'Shelf C-2', coverColor: '#3b82f6' },
    { id: 'b3', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Literature', copies: 5, location: 'Shelf D-1', coverColor: '#ec4899' },
    { id: 'b4', title: 'Principles of Physics', author: 'Halliday & Resnick', category: 'Science', copies: 0, location: 'Shelf A-2', coverColor: '#f59e0b' },
    { id: 'b5', title: 'Ancients & Empires', author: 'Peter Frankopan', category: 'History', copies: 4, location: 'Shelf E-3', coverColor: '#10b981' },
    { id: 'b6', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Literature', copies: 1, location: 'Shelf D-3', coverColor: '#8b5cf6' },
  ]);

  const [checkouts, setCheckouts] = useState<ActiveCheckout[]>([
    { id: 'c1', bookId: 'b1', title: 'Brief History of Time', author: 'Stephen Hawking', dueDate: 'Oct 25, 2026', daysRemaining: 5, status: 'active' },
    { id: 'c2', bookId: 'b2', title: 'Introduction to Calculus', author: 'Gilbert Strang', dueDate: 'Oct 18, 2026', daysRemaining: -2, status: 'overdue' },
  ]);

  const [libraryFine, setLibraryFine] = useState(150); // ₹150 fine due to overdue calculus book
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  
  const [confirmModal, setConfirmModal] = useState<{ type: 'borrow' | 'reserve'; book: Book } | null>(null);
  const [payFineModal, setPayFineModal] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleBorrowConfirm = () => {
    if (!confirmModal) return;
    const { book } = confirmModal;

    // Decrement copies
    setBooks(prev => prev.map(b => b.id === book.id ? { ...b, copies: b.copies - 1 } : b));
    
    // Add to checkout list
    const newCheckout: ActiveCheckout = {
      id: 'c' + Date.now(),
      bookId: book.id,
      title: book.title,
      author: book.author,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      daysRemaining: 14,
      status: 'active'
    };
    setCheckouts(prev => [newCheckout, ...prev]);
    setConfirmModal(null);
    showFeedback('success', `Borrowed "${book.title}" successfully! Due in 14 days.`);
    
    // Trigger notification
    MockServer.createNotification('📚 Book Borrowed', `You checked out "${book.title}". Return deadline is 14 days from today.`, 'homework');
  };

  const handleReserveConfirm = () => {
    if (!confirmModal) return;
    const { book } = confirmModal;
    setConfirmModal(null);
    showFeedback('success', `Reservation request submitted for "${book.title}". You will be notified when a copy is available.`);
  };

  const handleReturnBook = (checkoutId: string, bookId: string) => {
    const item = checkouts.find(c => c.id === checkoutId);
    if (!item) return;

    // Increment copies
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, copies: b.copies + 1 } : b));
    
    // Remove checkout
    setCheckouts(prev => prev.filter(c => c.id !== checkoutId));
    
    showFeedback('success', `Returned "${item.title}" to library keeper.`);
  };

  const handlePayFines = () => {
    setPayFineModal(false);
    setLibraryFine(0);
    showFeedback('success', 'Fines cleared successfully! Payment transaction ID generated.');
    
    // Trigger payment notifications
    MockServer.createNotification('💳 Library Payment', 'Library overdue fine of ₹150 cleared successfully.', 'payment_success');
  };

  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCat === 'All' || b.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const categories = ['All', 'Science', 'Math', 'Literature', 'History'];

  return (
    <div style={{ paddingBottom: '40px' }}>
      <PageHeader 
        title="Digital Library" 
        subtitle="Reserve books, track your borrow history, and review campus catalog collections"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'School', path: '/school' }, { label: 'Library' }]}
      />

      {feedback && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderRadius: '16px',
          marginBottom: '20px', border: '1px solid',
          background: feedback.type === 'success' ? '#E8F5E9' : '#FFEBEE',
          borderColor: feedback.type === 'success' ? '#A5D6A7' : '#EF9A9A',
          color: feedback.type === 'success' ? '#2E7D32' : '#C62828',
          fontSize: '0.9rem', fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          {feedback.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Top Library Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <Card style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(95, 175, 136, 0.1)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>Active Checkouts</span>
            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>{checkouts.length} Books</h4>
          </div>
        </Card>

        <Card style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: libraryFine > 0 ? 'pointer' : 'default' }} onClick={() => libraryFine > 0 && setPayFineModal(true)}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: libraryFine > 0 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
            color: libraryFine > 0 ? '#EF4444' : '#10B981',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>Library Fines</span>
            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: libraryFine > 0 ? '#EF4444' : 'var(--text-main)' }}>
              {libraryFine > 0 ? `₹${libraryFine} Due` : 'Clear'}
            </h4>
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1.3fr', gap: '32px' }}>
        {/* Book Catalog */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 700 }}>Book Catalog</h3>
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                position: 'relative', display: 'flex', alignItems: 'center', flex: 1,
                border: '1px solid var(--border-color)', borderRadius: '16px', background: 'var(--surface-color)', padding: '0 16px'
              }}>
                <Search size={18} color="var(--text-muted)" style={{ marginRight: '8px' }} />
                <input 
                  type="text" 
                  placeholder="Search catalog by title or author..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ border: 'none', background: 'none', outline: 'none', width: '100%', height: '40px', color: 'var(--text-main)', fontSize: '0.85rem' }}
                />
              </div>

              <select 
                value={selectedCat}
                onChange={e => setSelectedCat(e.target.value)}
                style={{
                  padding: '0 16px', borderRadius: '16px', border: '1px solid var(--border-color)',
                  background: 'var(--surface-color)', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 600, outline: 'none'
                }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredBooks.map(book => (
                <div 
                  key={book.id}
                  style={{
                    display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center',
                    padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)',
                    background: 'var(--bg-color)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{
                      width: '40px', height: '56px', borderRadius: '4px',
                      background: book.coverColor, color: '#FFF', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                    }}>
                      BOOK
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>{book.title}</h4>
                      <p style={{ margin: '2px 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{book.author} • <span style={{ textTransform: 'uppercase' }}>{book.category}</span></p>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>Location: {book.location}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <span style={{ fontSize: '0.75rem', color: book.copies > 0 ? 'var(--success)' : '#EF4444', fontWeight: 600 }}>
                      {book.copies > 0 ? `${book.copies} copies available` : 'Out of stock'}
                    </span>
                    <Button 
                      size="sm"
                      variant={book.copies > 0 ? 'primary' : 'outline'}
                      onClick={() => setConfirmModal({ type: book.copies > 0 ? 'borrow' : 'reserve', book })}
                    >
                      {book.copies > 0 ? 'Borrow' : 'Reserve'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* My Checked Out Books */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 700 }}>My Checked Out Books</h3>

            {checkouts.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.85rem' }}>
                <Info size={28} style={{ color: 'var(--border-color)', marginBottom: '8px' }} />
                <p>No checked out books currently.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {checkouts.map(c => {
                  const isOverdue = c.daysRemaining < 0;
                  return (
                    <div 
                      key={c.id}
                      style={{
                        padding: '16px', borderRadius: '16px', border: '1px solid',
                        borderColor: isOverdue ? 'rgba(239, 68, 68, 0.2)' : 'var(--border-color)',
                        background: isOverdue ? 'rgba(239, 68, 68, 0.02)' : 'var(--surface-color)',
                        display: 'flex', flexDirection: 'column', gap: '12px'
                      }}
                    >
                      <div>
                        <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>{c.title}</h4>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>{c.author}</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Due: <strong>{c.dueDate}</strong></span>
                          <span style={{ fontSize: '0.72rem', color: isOverdue ? '#EF4444' : 'var(--success)', fontWeight: 600 }}>
                            {isOverdue ? `${Math.abs(c.daysRemaining)} days OVERDUE` : `${c.daysRemaining} days remaining`}
                          </span>
                        </div>

                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleReturnBook(c.id, c.bookId)}
                        >
                          Return Book
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Borrow/Reserve Confirm Modal */}
      {confirmModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)',
          zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Card style={{ width: '100%', maxWidth: '440px', padding: '24px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button 
              onClick={() => setConfirmModal(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>
              {confirmModal.type === 'borrow' ? 'Confirm Book Checkout' : 'Confirm Book Reservation'}
            </h3>
            
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Are you sure you want to {confirmModal.type} <strong>"{confirmModal.book.title}"</strong> by {confirmModal.book.author}? 
              {confirmModal.type === 'borrow' ? ' Books are issued for a standard duration of 14 days.' : ' You will receive a system notification once this book is returned.'}
            </p>

            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <Button variant="outline" onClick={() => setConfirmModal(null)} style={{ flex: 1 }}>Cancel</Button>
              <Button 
                variant="primary" 
                onClick={confirmModal.type === 'borrow' ? handleBorrowConfirm : handleReserveConfirm} 
                style={{ flex: 1 }}
              >
                Confirm
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Pay Fines Modal */}
      {payFineModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)',
          zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Card style={{ width: '100%', maxWidth: '420px', padding: '24px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button 
              onClick={() => setPayFineModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>Pay Library Fines</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Overdue fine for "Introduction to Calculus" is outstanding.</p>

            <div style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Amount Due:</span>
              <strong style={{ fontSize: '1.25rem', color: '#EF4444' }}>₹150</strong>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <Button variant="outline" onClick={() => setPayFineModal(false)} style={{ flex: 1 }}>Cancel</Button>
              <Button variant="primary" onClick={handlePayFines} style={{ flex: 1 }}>
                Simulate UPI Payment
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
