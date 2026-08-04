import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Tabs } from '@/components/ui/Tabs';

interface EventSearchFilterProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  categories: string[];
  tabItems: Array<{ id: string; label: string; count?: number }>;
}

export const EventSearchFilter: React.FC<EventSearchFilterProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  tabItems,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        marginBottom: '20px',
      }}
    >
      {/* Category Tabs */}
      <Tabs tabs={tabItems} activeTab={activeTab} onChange={onTabChange} />

      {/* One Row Controls: Search Bar (Left) + Filter Dropdown (Right) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          width: '100%',
        }}
      >
        {/* Search Input Box */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '10px 16px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
            boxSizing: 'border-box',
          }}
        >
          <Search size={18} color="#94A3B8" style={{ flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search events by title or venue..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              width: '100%',
              fontSize: '0.875rem',
              color: '#0F172A',
            }}
          />
        </div>

        {/* Category Filter Dropdown */}
        <div
          style={{
            width: '240px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '10px 16px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
            boxSizing: 'border-box',
            flexShrink: 0,
          }}
        >
          <Filter size={16} color="#94A3B8" style={{ flexShrink: 0 }} />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              width: '100%',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer',
            }}
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
