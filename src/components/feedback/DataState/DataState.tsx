import React from 'react';
import { EmptyState } from '../EmptyState/EmptyState';
import { LoadingState } from '../LoadingState';
import { RetryCard } from '../RetryCard';
import { PackageOpen } from 'lucide-react';

interface DataStateProps {
  loading?: boolean;
  loadingVariant?: 'cards' | 'table' | 'chart' | 'dashboard' | 'form' | 'profile' | 'list' | 'search' | 'spinner';
  loadingMessage?: string;
  error?: string | null;
  onRetry?: () => void | Promise<void>;
  empty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: React.ReactNode;
  emptyAction?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * DataState — A universal wrapper component that handles the complete data lifecycle:
 *
 * Loading → Error → Empty → Success (children)
 *
 * Usage:
 * ```tsx
 * <DataState loading={isLoading} error={error} empty={data.length === 0} onRetry={refetch}>
 *   <MyDataView data={data} />
 * </DataState>
 * ```
 */
export const DataState: React.FC<DataStateProps> = ({
  loading = false,
  loadingVariant = 'spinner',
  loadingMessage,
  error = null,
  onRetry,
  empty = false,
  emptyTitle = 'No data found',
  emptyDescription = 'There is nothing here yet.',
  emptyIcon,
  emptyAction,
  children,
}) => {
  if (loading) {
    return <LoadingState variant={loadingVariant} message={loadingMessage} />;
  }

  if (error) {
    return (
      <RetryCard
        title="Failed to load data"
        message={error}
        onRetry={onRetry || (() => window.location.reload())}
      />
    );
  }

  if (empty) {
    return (
      <EmptyState
        icon={emptyIcon || <PackageOpen size={40} />}
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    );
  }

  return <>{children}</>;
};
