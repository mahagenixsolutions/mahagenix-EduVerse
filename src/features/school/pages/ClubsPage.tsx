import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/navigation/PageHeader';
import { schoolClubs as initialClubs } from '@/mock/community';
import { Search, Plus, Users, Award, Check, AlertCircle, X } from 'lucide-react';
import styles from './school.module.css';

interface Club {
  id: number;
  name: string;
  members: number;
  icon: string;
  color: string;
  description: string;
  category?: string;
  joined?: boolean;
}

export const ClubsPage: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form states for creating a club
  const [newClubName, setNewClubName] = useState('');
  const [newClubDesc, setNewClubDesc] = useState('');
  const [newClubIcon, setNewClubIcon] = useState('🚀');
  const [newClubColor, setNewClubColor] = useState('#5FAF88');
  const [newClubCat, setNewClubCat] = useState('Science');

  useEffect(() => {
    const savedClubs = localStorage.getItem('eduverse_clubs');
    if (savedClubs) {
      try {
        setClubs(JSON.parse(savedClubs));
        return;
      } catch (e) {
        // Fallback to default initial state if parsing fails
      }
    }
    // Seed initial clubs
    const seeded = initialClubs.map(c => ({
      ...c,
      category: c.id === 1 || c.id === 2 ? 'Science & IT' : c.id === 6 ? 'Academic' : 'Arts & Culture',
      joined: c.id === 2 // Default joined Coding Club
    }));
    setClubs(seeded);
    localStorage.setItem('eduverse_clubs', JSON.stringify(seeded));
  }, []);

  const saveClubs = (updated: Club[]) => {
    setClubs(updated);
    localStorage.setItem('eduverse_clubs', JSON.stringify(updated));
  };

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleToggleJoin = (clubId: number) => {
    const updated = clubs.map(c => {
      if (c.id === clubId) {
        const nextJoined = !c.joined;
        showFeedback('success', nextJoined ? `Joined "${c.name}" successfully!` : `Left "${c.name}" club.`);
        return {
          ...c,
          joined: nextJoined,
          members: nextJoined ? c.members + 1 : c.members - 1
        };
      }
      return c;
    });
    saveClubs(updated);
  };

  const handleCreateClub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClubName || !newClubDesc) {
      showFeedback('error', 'Please fill in all required fields.');
      return;
    }

    const newClub: Club = {
      id: Date.now(),
      name: newClubName,
      description: newClubDesc,
      icon: newClubIcon,
      color: newClubColor,
      category: newClubCat,
      members: 1,
      joined: true
    };

    const updated = [...clubs, newClub];
    saveClubs(updated);
    
    // Reset fields
    setNewClubName('');
    setNewClubDesc('');
    setNewClubIcon('🚀');
    setNewClubColor('#5FAF88');
    setNewClubCat('Science');
    setShowCreateModal(false);
    showFeedback('success', `"${newClub.name}" club has been created and joined!`);
  };

  const filtered = clubs.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Science & IT', 'Academic', 'Arts & Culture'];

  return (
    <div style={{ paddingBottom: '40px' }}>
      <PageHeader 
        title="School Clubs" 
        subtitle="Discover student organizations, meet peers, and pursue extracurricular activities"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'School', path: '/school' }, { label: 'Clubs' }]}
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

      {/* Controls: Search and Categories */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginTop: '24px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '16px', flex: 1, maxWidth: '600px' }}>
          <div style={{
            position: 'relative', display: 'flex', alignItems: 'center', flex: 1,
            border: '1px solid var(--border-color)', borderRadius: '16px', background: 'var(--surface-color)', padding: '0 16px'
          }}>
            <Search size={18} color="var(--text-muted)" style={{ marginRight: '8px' }} />
            <input 
              type="text" 
              placeholder="Search clubs by name or description..." 
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

        <Button variant="primary" onClick={() => setShowCreateModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> Propose Club
        </Button>
      </div>

      {/* Clubs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', marginTop: '24px' }}>
        {filtered.map(club => (
          <Card key={club.id} hoverable style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: `${club.color}15`, color: club.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'
              }}>
                {club.icon}
              </div>
              <Badge variant={club.joined ? 'success' : 'default'}>
                {club.joined ? 'Member' : 'Not Joined'}
              </Badge>
            </div>

            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700 }}>{club.name}</h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>{club.category}</span>
              <p style={{ margin: '8px 0 0 0', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4, height: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {club.description}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={16} /> <strong>{club.members}</strong> members
              </span>
              <Button 
                variant={club.joined ? 'outline' : 'primary'} 
                size="sm"
                onClick={() => handleToggleJoin(club.id)}
              >
                {club.joined ? 'Leave Club' : 'Join Club'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Propose/Create Club Modal */}
      {showCreateModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)',
          zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Card style={{ width: '100%', maxWidth: '480px', padding: '28px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <button 
              onClick={() => setShowCreateModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Propose a New Club</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '-8px' }}>Propose an extracurricular group. Proposal grants automatic membership upon creation.</p>

            <form onSubmit={handleCreateClub} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Club Name</label>
                <input 
                  type="text" 
                  value={newClubName} 
                  onChange={e => setNewClubName(e.target.value)} 
                  placeholder="e.g. Astronomy Club"
                  style={{
                    padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-color)',
                    background: 'var(--surface-color)', color: 'var(--text-main)', fontSize: '0.875rem', fontFamily: 'inherit'
                  }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Category</label>
                  <select 
                    value={newClubCat} 
                    onChange={e => setNewClubCat(e.target.value)}
                    style={{
                      padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-color)',
                      background: 'var(--surface-color)', color: 'var(--text-main)', fontSize: '0.875rem', outline: 'none'
                    }}
                  >
                    <option value="Science & IT">Science & IT</option>
                    <option value="Academic">Academic</option>
                    <option value="Arts & Culture">Arts & Culture</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Choose Icon</label>
                  <select 
                    value={newClubIcon} 
                    onChange={e => setNewClubIcon(e.target.value)}
                    style={{
                      padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-color)',
                      background: 'var(--surface-color)', color: 'var(--text-main)', fontSize: '0.875rem', outline: 'none'
                    }}
                  >
                    <option value="🚀">🚀 Spaceship</option>
                    <option value="💻">💻 Laptop</option>
                    <option value="🔬">🔬 Microscope</option>
                    <option value="🎵">🎵 Note</option>
                    <option value="🎨">🎨 Palette</option>
                    <option value="🎭">🎭 Masks</option>
                    <option value="🗣️">🗣️ Speaking</option>
                    <option value="⚽">⚽ Soccer</option>
                    <option value="📚">📚 Books</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Theme Color</label>
                <input 
                  type="color" 
                  value={newClubColor} 
                  onChange={e => setNewClubColor(e.target.value)} 
                  style={{
                    padding: '2px 4px', borderRadius: '12px', border: '1px solid var(--border-color)',
                    background: 'var(--surface-color)', height: '40px', width: '100%', cursor: 'pointer'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Description</label>
                <textarea 
                  value={newClubDesc} 
                  onChange={e => setNewClubDesc(e.target.value)} 
                  placeholder="What is this club about?"
                  rows={3}
                  style={{
                    padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-color)',
                    background: 'var(--surface-color)', color: 'var(--text-main)', fontSize: '0.875rem', fontFamily: 'inherit', resize: 'none'
                  }}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <Button variant="outline" type="button" onClick={() => setShowCreateModal(false)} style={{ flex: 1 }}>Cancel</Button>
                <Button variant="primary" type="submit" style={{ flex: 1 }}>Propose & Join</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
