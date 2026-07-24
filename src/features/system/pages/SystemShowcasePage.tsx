import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { 
  EmptyState, 
  SystemIllustration, 
  LoadingState, 
  SuccessPage, 
  RetryCard, 
  DataState,
  EMPTY_STATE_PRESETS,
  type IllustrationVariant 
} from '@/components/feedback';
import { 
  PackageOpen, Sparkles, Layers, RefreshCw, 
  CheckCircle2, AlertTriangle, Eye, ShieldAlert 
} from 'lucide-react';

export const SystemShowcasePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('empty');
  const [selectedEmptyKey, setSelectedEmptyKey] = useState('homework');
  const [loadingVariant, setLoadingVariant] = useState<any>('dashboard');
  const [illustrationVariant, setIllustrationVariant] = useState<IllustrationVariant>('not-found');
  const [demoDataState, setDemoDataState] = useState<'loading' | 'error' | 'empty' | 'success'>('empty');

  const mainTabs = [
    { id: 'empty', label: 'Empty States Gallery' },
    { id: 'illustrations', label: 'SVG Illustrations (10)' },
    { id: 'loading', label: 'Loading Skeletons' },
    { id: 'success', label: 'Success Screens' },
    { id: 'datastate', label: 'DataState Lifecycle' },
    { id: 'pages', label: 'System Pages Routes' }
  ];

  const emptyKeys = Object.keys(EMPTY_STATE_PRESETS);
  const currentEmptyPreset = EMPTY_STATE_PRESETS[selectedEmptyKey];

  return (
    <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      <PageHeader
        title="System States & Feedback Playground"
        subtitle="Interactive preview center for all empty states, loading skeletons, system error pages, success confirmations, and SVG illustrations"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'System Showcase' }]}
      />

      <div style={{ marginBottom: '24px' }}>
        <Tabs tabs={mainTabs} activeTab={activeCategory} onTabChange={setActiveCategory} />
      </div>

      {/* 1. EMPTY STATES GALLERY */}
      {activeCategory === 'empty' && (
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px' }}>
          {/* Preset Selector Menu */}
          <Card style={{ padding: '16px', borderRadius: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Select Module Preset ({emptyKeys.length})
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '480px', overflowY: 'auto' }}>
              {emptyKeys.map(key => (
                <button
                  key={key}
                  onClick={() => setSelectedEmptyKey(key)}
                  style={{
                    padding: '10px 14px', borderRadius: '10px', textTransform: 'capitalize',
                    textAlign: 'left', border: 'none', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600,
                    background: selectedEmptyKey === key ? 'var(--primary-color)' : 'var(--bg-color)',
                    color: selectedEmptyKey === key ? '#ffffff' : 'var(--text-main)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {key.replace('_', ' ')}
                </button>
              ))}
            </div>
          </Card>

          {/* Empty State Preview Area */}
          <Card style={{ padding: '40px 24px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
            <EmptyState
              icon={<PackageOpen size={48} style={{ color: 'var(--primary-color)' }} />}
              title={currentEmptyPreset.title}
              description={currentEmptyPreset.description}
              action={
                currentEmptyPreset.actionLabel ? (
                  <Button size="sm">
                    <Sparkles size={14} style={{ marginRight: '6px' }} />
                    {currentEmptyPreset.actionLabel}
                  </Button>
                ) : undefined
              }
            />
          </Card>
        </div>
      )}

      {/* 2. SVG ILLUSTRATIONS GALLERY */}
      {activeCategory === 'illustrations' && (
        <div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {(['not-found', 'server-error', 'maintenance', 'offline', 'empty', 'forbidden', 'unauthorized', 'success', 'failed', 'search-empty'] as IllustrationVariant[]).map(v => (
              <Button
                key={v}
                size="sm"
                variant={illustrationVariant === v ? 'primary' : 'outline'}
                onClick={() => setIllustrationVariant(v)}
              >
                {v}
              </Button>
            ))}
          </div>

          <Card style={{ padding: '40px', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <SystemIllustration variant={illustrationVariant} size={280} />
            <h3 style={{ marginTop: '20px', fontSize: '1.2rem', textTransform: 'capitalize' }}>
              Variant: {illustrationVariant}
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pure SVG • Animated with Framer Motion • Dark Mode Aware</span>
          </Card>
        </div>
      )}

      {/* 3. LOADING SKELETONS PREVIEW */}
      {activeCategory === 'loading' && (
        <div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {['dashboard', 'cards', 'table', 'chart', 'form', 'profile', 'list', 'search', 'spinner'].map(v => (
              <Button
                key={v}
                size="sm"
                variant={loadingVariant === v ? 'primary' : 'outline'}
                onClick={() => setLoadingVariant(v as any)}
              >
                {v.toUpperCase()} SKELETON
              </Button>
            ))}
          </div>

          <Card style={{ padding: '24px', borderRadius: '18px' }}>
            <LoadingState variant={loadingVariant} message="Loading EduVerse data..." />
          </Card>
        </div>
      )}

      {/* 4. SUCCESS PAGES */}
      {activeCategory === 'success' && (
        <Card style={{ padding: '0', borderRadius: '18px', overflow: 'hidden' }}>
          <SuccessPage
            title="Fee Payment Completed Successfully!"
            message="Receipt #REC-2026-9841 has been generated and emailed to your registered guardian account."
            details={[
              { label: 'Payment Reference', value: 'TXN-99814012' },
              { label: 'Amount Paid', value: '₹18,500' },
              { label: 'Category', value: 'Term 2 Tuition Fee' },
              { label: 'Payment Method', value: 'UPI / HDFC Bank' }
            ]}
          />
        </Card>
      )}

      {/* 5. DATASTATE LIFECYCLE DEMO */}
      {activeCategory === 'datastate' && (
        <div>
          <Card style={{ padding: '20px', borderRadius: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Simulate Lifecycle State:</span>
            {(['loading', 'error', 'empty', 'success'] as const).map(state => (
              <Button
                key={state}
                size="sm"
                variant={demoDataState === state ? 'primary' : 'outline'}
                onClick={() => setDemoDataState(state)}
              >
                {state.toUpperCase()}
              </Button>
            ))}
          </Card>

          <Card style={{ padding: '24px', borderRadius: '18px' }}>
            <DataState
              loading={demoDataState === 'loading'}
              loadingVariant="cards"
              error={demoDataState === 'error' ? 'Network timeout while fetching course data.' : null}
              onRetry={() => setDemoDataState('success')}
              empty={demoDataState === 'empty'}
              emptyTitle="No Saved Documents"
              emptyDescription="You haven't bookmarked any research papers yet."
            >
              <div style={{ padding: '20px', background: '#ECFDF5', borderRadius: '14px', border: '1px solid #A7F3D0', color: '#059669', fontWeight: 700 }}>
                🎉 Success Data View Loaded! All API responses processed smoothly.
              </div>
            </DataState>
          </Card>
        </div>
      )}

      {/* 6. SYSTEM PAGES QUICK LINKS */}
      {activeCategory === 'pages' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {[
            { title: '404 Page Not Found', path: '/unknown-page-route', desc: 'Custom 404 page with search & quick links' },
            { title: '500 Server Error', path: '/system/500', desc: '500 error page with animated server rack & retry' },
            { title: '503 Maintenance', path: '/system/maintenance', desc: 'Scheduled maintenance notice with ETA' },
            { title: '401 Session Expired', path: '/system/unauthorized', desc: '401 unauthorized session expiry screen' },
            { title: '403 Forbidden', path: '/system/forbidden', desc: '403 permission denied request access page' },
            { title: 'Offline Mode', path: '/system/offline', desc: 'Full-page offline network reconnection' },
            { title: 'Live System Status', path: '/system/status', desc: 'Live operational health monitoring dashboard' }
          ].map((item, idx) => (
            <Card key={idx} hoverable style={{ padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }} onClick={() => window.open(item.path, '_blank')}>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 800 }}>{item.title}</h4>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{item.desc}</p>
              </div>
              <Button size="sm" variant="outline">
                <Eye size={14} style={{ marginRight: '6px' }} /> Launch Page
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
