import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/navigation/PageHeader';
import { galleryImages as initialImages } from '@/mock/community';
import { Search, Plus, Download, ChevronLeft, ChevronRight, X, Check, AlertCircle, Image as ImageIcon } from 'lucide-react';
import styles from './school.module.css';

interface GalleryImage {
  id: number;
  src: string;
  caption: string;
  category: string;
  uploadedBy?: string;
}

export const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Slider/Carousel modal states
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Upload modal states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newCaption, setNewCaption] = useState('');
  const [newCategory, setNewCategory] = useState('Events');
  const [newSrc, setNewSrc] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('eduverse_gallery');
    if (saved) {
      try {
        setImages(JSON.parse(saved));
        return;
      } catch (e) {
        // Fallback to default initial state if parsing fails
      }
    }
    setImages(initialImages);
    localStorage.setItem('eduverse_gallery', JSON.stringify(initialImages));
  }, []);

  const saveImages = (updated: GalleryImage[]) => {
    setImages(updated);
    localStorage.setItem('eduverse_gallery', JSON.stringify(updated));
  };

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaption || !newSrc) {
      showFeedback('error', 'Caption and Image Link are required.');
      return;
    }

    setIsUploading(true);
    setTimeout(() => {
      const newImg: GalleryImage = {
        id: Date.now(),
        src: newSrc,
        caption: newCaption,
        category: newCategory,
        uploadedBy: 'Sarah Doe'
      };
      
      const updated = [newImg, ...images];
      saveImages(updated);
      setIsUploading(false);
      setShowUploadModal(false);
      
      // Reset fields
      setNewCaption('');
      setNewSrc('');
      setNewCategory('Events');
      showFeedback('success', 'Image uploaded to campus gallery successfully!');
    }, 1500);
  };

  // Navigating carousel
  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(prev => (prev === 0 ? filtered.length - 1 : prev! - 1));
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(prev => (prev === filtered.length - 1 ? 0 : prev! + 1));
  };

  const filtered = images.filter(img => {
    const matchesSearch = img.caption.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || img.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Events', 'Sports', 'Campus', 'Academic', 'Cultural', 'Faculty'];

  return (
    <div style={{ paddingBottom: '40px' }}>
      <PageHeader 
        title="Campus Gallery" 
        subtitle="Browse and share visual moments of classroom projects, academic events, and sports meets"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'School', path: '/school' }, { label: 'Gallery' }]}
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

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginTop: '24px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '16px', flex: 1, maxWidth: '600px' }}>
          <div style={{
            position: 'relative', display: 'flex', alignItems: 'center', flex: 1,
            border: '1px solid var(--border-color)', borderRadius: '16px', background: 'var(--surface-color)', padding: '0 16px'
          }}>
            <Search size={18} color="var(--text-muted)" style={{ marginRight: '8px' }} />
            <input 
              type="text" 
              placeholder="Search campus images..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ border: 'none', background: 'none', outline: 'none', width: '100%', height: '44px', color: 'var(--text-main)', fontSize: '0.9rem' }}
            />
          </div>

          <select 
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
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

        <Button variant="primary" onClick={() => setShowUploadModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> Upload Photo
        </Button>
      </div>

      {/* Gallery Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', marginTop: '24px' }}>
        {filtered.map((img, idx) => (
          <div 
            key={img.id}
            onClick={() => setSelectedIndex(idx)}
            className="hover-lift"
            style={{
              position: 'relative', borderRadius: '18px', overflow: 'hidden', height: '220px',
              cursor: 'pointer', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)'
            }}
          >
            <img 
              src={img.src} 
              alt={img.caption} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
              padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', color: '#FFF'
            }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary-color)' }}>{img.category}</span>
              <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>{img.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CAROUSEL MODAL OVERLAY */}
      {selectedIndex !== null && filtered.length > 0 && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.92)', backdropFilter: 'blur(8px)',
          zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <button 
            onClick={() => setSelectedIndex(null)}
            style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', cursor: 'pointer', color: '#FFF' }}
          >
            <X size={24} />
          </button>

          {/* Left Arrow */}
          <button 
            onClick={handlePrev}
            style={{
              position: 'absolute', left: '24px', background: 'rgba(255,255,255,0.1)', border: 'none',
              borderRadius: '50%', width: '48px', height: '48px', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: '#FFF', transition: 'background 0.15s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Center Image Content */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', maxWidth: '80%', maxHeight: '80%' }}>
            <img 
              src={filtered[selectedIndex].src} 
              alt={filtered[selectedIndex].caption}
              style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '12px', boxShadow: 'var(--shadow-lg)' }}
            />
            <div style={{ textAlign: 'center', color: '#FFF' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-color)', textTransform: 'uppercase' }}>
                {filtered[selectedIndex].category}
              </span>
              <h3 style={{ margin: '4px 0 0 0', fontSize: '1.25rem', fontWeight: 700, color: '#FFF' }}>{filtered[selectedIndex].caption}</h3>
              {filtered[selectedIndex].uploadedBy && (
                <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Uploaded by: {filtered[selectedIndex].uploadedBy}</p>
              )}
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={handleNext}
            style={{
              position: 'absolute', right: '24px', background: 'rgba(255,255,255,0.1)', border: 'none',
              borderRadius: '50%', width: '48px', height: '48px', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: '#FFF', transition: 'background 0.15s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* UPLOAD PHOTO MODAL */}
      {showUploadModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)',
          zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Card style={{ width: '100%', maxWidth: '460px', padding: '28px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <button 
              onClick={() => setShowUploadModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Upload Campus Memory</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '-8px' }}>Share photos from recent academic exhibitions, sports days, or class events.</p>

            <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Image URL Link</label>
                <input 
                  type="text" 
                  value={newSrc} 
                  onChange={e => setNewSrc(e.target.value)} 
                  placeholder="https://images.unsplash.com/photo-..."
                  style={{
                    padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-color)',
                    background: 'var(--surface-color)', color: 'var(--text-main)', fontSize: '0.875rem', fontFamily: 'inherit'
                  }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Caption / Title</label>
                  <input 
                    type="text" 
                    value={newCaption} 
                    onChange={e => setNewCaption(e.target.value)} 
                    placeholder="e.g. Science Lab Project"
                    style={{
                      padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-color)',
                      background: 'var(--surface-color)', color: 'var(--text-main)', fontSize: '0.875rem', fontFamily: 'inherit'
                    }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Category</label>
                  <select 
                    value={newCategory} 
                    onChange={e => setNewCategory(e.target.value)}
                    style={{
                      padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-color)',
                      background: 'var(--surface-color)', color: 'var(--text-main)', fontSize: '0.875rem', outline: 'none'
                    }}
                  >
                    <option value="Events">Events</option>
                    <option value="Sports">Sports</option>
                    <option value="Campus">Campus</option>
                    <option value="Academic">Academic</option>
                    <option value="Cultural">Cultural</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <Button variant="outline" type="button" onClick={() => setShowUploadModal(false)} style={{ flex: 1 }}>Cancel</Button>
                <Button variant="primary" type="submit" disabled={isUploading} style={{ flex: 1 }}>
                  {isUploading ? 'Uploading...' : 'Publish Image'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
