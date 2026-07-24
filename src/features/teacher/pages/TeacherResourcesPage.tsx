import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { 
  FolderGit2, FileText, Video, Download, Upload, 
  Search, Plus, CheckCircle2, Eye, Share2, HelpCircle
} from 'lucide-react';
import styles from './teacher.module.css';

interface ResourceItem {
  id: number;
  title: string;
  type: 'pdf' | 'video' | 'worksheet' | 'question_bank' | 'document';
  subject: string;
  className: string;
  size: string;
  downloads: number;
  uploadedAt: string;
  url: string;
}

const mockResources: ResourceItem[] = [
  {
    id: 1,
    title: 'Faraday Law & Electromagnetic Induction Notes',
    type: 'pdf',
    subject: 'Physics',
    className: 'Grade 10 - A',
    size: '3.4 MB',
    downloads: 142,
    uploadedAt: 'Apr 05, 2026',
    url: '#'
  },
  {
    id: 2,
    title: 'Quadratic Equations Practice Worksheet Set 4',
    type: 'worksheet',
    subject: 'Mathematics',
    className: 'Grade 9 - B',
    size: '1.2 MB',
    downloads: 98,
    uploadedAt: 'Apr 04, 2026',
    url: '#'
  },
  {
    id: 3,
    title: 'Photoelectric Effect Virtual Experiment Demo Video',
    type: 'video',
    subject: 'Physics',
    className: 'Grade 11 - A',
    size: '45.0 MB',
    downloads: 76,
    uploadedAt: 'Apr 02, 2026',
    url: '#'
  },
  {
    id: 4,
    title: 'Grade 10 Physics Midterm Question Bank (50 MCQs + 10 Numericals)',
    type: 'question_bank',
    subject: 'Physics',
    className: 'Grade 10 - All',
    size: '2.1 MB',
    downloads: 210,
    uploadedAt: 'Mar 28, 2026',
    url: '#'
  }
];

export const TeacherResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [resources, setResources] = useState<ResourceItem[]>(mockResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tabs = [
    { id: 'all', label: 'All Resources', count: resources.length },
    { id: 'documents', label: 'Documents & PDFs' },
    { id: 'worksheets', label: 'Worksheets' },
    { id: 'videos', label: 'Videos' },
    { id: 'question_bank', label: 'Question Bank' }
  ];

  const handleUpload = () => {
    const newRes: ResourceItem = {
      id: Date.now(),
      title: 'New Chapter Supplement Material.pdf',
      type: 'pdf',
      subject: 'Physics',
      className: 'Grade 10 - A',
      size: '2.5 MB',
      downloads: 0,
      uploadedAt: 'Just now',
      url: '#'
    };
    setResources(prev => [newRes, ...prev]);
    setToastMessage('Resource uploaded & shared to Student Learning Library!');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.subject.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === 'documents') return matchesSearch && (r.type === 'pdf' || r.type === 'document');
    if (activeTab === 'worksheets') return matchesSearch && r.type === 'worksheet';
    if (activeTab === 'videos') return matchesSearch && r.type === 'video';
    if (activeTab === 'question_bank') return matchesSearch && r.type === 'question_bank';
    return matchesSearch;
  });

  return (
    <div className={styles.container}>
      <PageHeader
        title="Teaching Resources & Materials"
        subtitle="Manage lecture documents, PDFs, videos, worksheets, and question banks for your classes"
        actions={
          <Button size="sm" onClick={handleUpload}>
            <Upload size={16} style={{ marginRight: '6px' }} />
            Upload New Resource
          </Button>
        }
      />

      {toastMessage && (
        <div style={{
          padding: '12px 20px',
          background: 'var(--success-bg, #ECFDF5)',
          color: 'var(--success, #059669)',
          borderRadius: '12px',
          border: '1px solid #A7F3D0',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 600
        }}>
          <CheckCircle2 size={20} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <Card style={{ padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(13, 124, 102, 0.1)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FolderGit2 size={20} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Files</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>148 Files</h3>
          </div>
        </Card>

        <Card style={{ padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Download size={20} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Student Downloads</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>1,240 Downloads</h3>
          </div>
        </Card>

        <Card style={{ padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HelpCircle size={20} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Question Bank Items</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>520 Items</h3>
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--surface-color)', padding: '6px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', width: '240px' }}>
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search resource..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.85rem', width: '100%' }}
          />
        </div>
      </div>

      {/* Grid of Files */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {filteredResources.map(res => (
          <Card key={res.id} style={{ padding: '18px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <Badge variant={res.type === 'pdf' ? 'info' : res.type === 'video' ? 'warning' : 'success'}>
                  {res.type.replace('_', ' ').toUpperCase()}
                </Badge>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{res.size}</span>
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 8px 0', lineHeight: 1.35 }}>
                {res.title}
              </h4>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                {res.subject} • {res.className}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {res.downloads} downloads
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button size="sm" variant="outline">
                  <Eye size={14} style={{ marginRight: '4px' }} /> Preview
                </Button>
                <Button size="sm">
                  <Download size={14} style={{ marginRight: '4px' }} /> Download
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
