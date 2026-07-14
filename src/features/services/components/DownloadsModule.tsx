import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Download, Search, Heart, Share2, Eye, File } from 'lucide-react';

interface DownloadsModuleProps {
  onBack: () => void;
}

interface DownloadFile {
  id: number;
  name: string;
  category: 'Circulars' | 'Study Materials' | 'Hall Tickets' | 'Question Papers';
  description: string;
  size: string;
  date: string;
  isFav: boolean;
}

export const DownloadsModule: React.FC<DownloadsModuleProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavsOnly, setShowFavsOnly] = useState(false);

  const [files, setFiles] = useState<DownloadFile[]>([
    {
      id: 501,
      name: 'Semester 2 Exam Hall Ticket',
      category: 'Hall Tickets',
      description: 'Official admit card for the final term exams. Required at the examination hall.',
      size: '1.2 MB',
      date: '08 Jul 2026',
      isFav: true
    },
    {
      id: 502,
      name: 'Advanced Calculus Syllabus & Assignments',
      category: 'Study Materials',
      description: 'Syllabus guidelines, textbook references, and homework assignment details.',
      size: '850 KB',
      date: '02 Jul 2026',
      isFav: false
    },
    {
      id: 503,
      name: 'Independence Day Holiday Notice Circular',
      category: 'Circulars',
      description: 'Official institutional circular regarding independence day parade and timings.',
      size: '410 KB',
      date: '10 Aug 2025',
      isFav: false
    },
    {
      id: 504,
      name: 'Chemistry Final Term Exam Paper 2025',
      category: 'Question Papers',
      description: 'Previous year Chemistry exam question paper for revision and practice.',
      size: '1.5 MB',
      date: '25 May 2025',
      isFav: true
    }
  ]);

  const categories = ['All', 'Circulars', 'Study Materials', 'Hall Tickets', 'Question Papers'];

  const toggleFav = (id: number) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, isFav: !f.isFav } : f));
  };

  const filtered = files.filter(f => {
    const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFav = !showFavsOnly || f.isFav;
    return matchesCategory && matchesSearch && matchesFav;
  });

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
            Digital Document Locker & Downloads
          </h2>
        </div>

        {/* Filter Favorites */}
        <button 
          onClick={() => setShowFavsOnly(!showFavsOnly)}
          style={{
            background: showFavsOnly ? 'rgba(236,72,153,0.08)' : 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '8px 16px',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: showFavsOnly ? '#EC4899' : 'var(--text-main)',
            borderColor: showFavsOnly ? 'rgba(236,72,153,0.3)' : 'var(--border-color)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Heart size={14} fill={showFavsOnly ? '#EC4899' : 'none'} /> Favourites Only
        </button>
      </div>

      {/* Search Input bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--surface-color)',
        border: '1px solid var(--border-color)', borderRadius: '14px', padding: '10px 16px'
      }}>
        <Search size={18} color="var(--text-light)" />
        <input 
          type="text" 
          placeholder="Search documents by name or keyword..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ border: 'none', background: 'transparent', flex: 1, outline: 'none', fontSize: '0.88rem' }}
        />
      </div>

      {/* Categories Tabs Scroll */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 16px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600,
              border: '1px solid var(--border-color)', cursor: 'pointer',
              background: activeCategory === cat ? 'var(--primary-color)' : 'var(--surface-color)',
              color: activeCategory === cat ? 'white' : 'var(--text-muted)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Files directory list */}
      <Card style={{ padding: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 700 }}>Available Locker Files</h3>
        
        {filtered.length === 0 ? (
          <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.88rem' }}>
            No documents match the active search filters.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            {filtered.map((file, idx) => (
              <div 
                key={file.id} 
                className="hover-lift"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 0', borderBottom: idx === filtered.length - 1 ? 'none' : '1px solid var(--border-color)'
                }}
              >
                {/* File Icon & info */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flex: 1, minWidth: 0 }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(59,130,246,0.08)',
                    color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <File size={20} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>{file.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block' }}>
                      Category: <strong>{file.category}</strong> • Size: {file.size} • Date: {file.date}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block', marginTop: '2px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                      {file.description}
                    </span>
                  </div>
                </div>

                {/* Actions row */}
                <div style={{ display: 'flex', gap: '12px', marginLeft: '16px' }}>
                  <button 
                    onClick={() => toggleFav(file.id)}
                    style={{ background: 'none', border: 'none', color: file.isFav ? '#EC4899' : 'var(--text-light)', cursor: 'pointer', padding: '4px' }}
                    title="Toggle Favorite"
                  >
                    <Heart size={16} fill={file.isFav ? '#EC4899' : 'none'} />
                  </button>
                  <button 
                    onClick={() => alert(`Sharing file link: ${file.name}`)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', padding: '4px' }}
                    title="Share File Link"
                  >
                    <Share2 size={16} />
                  </button>
                  <button 
                    onClick={() => alert(`Downloading File: ${file.name}`)}
                    style={{
                      background: 'none', border: '1px solid var(--border-color)', borderRadius: '8px',
                      padding: '6px 12px', fontSize: '0.75rem', fontWeight: 700, color: '#10B981',
                      borderColor: 'rgba(16,185,129,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
                    }}
                  >
                    <Download size={14} /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
