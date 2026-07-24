import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { SystemIllustration } from '../SystemIllustration';
import { Button } from '@/components/ui/Button';
import { RefreshCw, Bug, Home } from 'lucide-react';
import styles from './GlobalErrorBoundary.module.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    // Future: Send to error reporting service
    console.error('[EduVerse Error Boundary]', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleTryAgain = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SystemIllustration variant="server-error" size={200} />

            <h1 className={styles.title}>Something went wrong</h1>
            <p className={styles.message}>
              An unexpected error occurred in the application.
              Our team has been notified automatically.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <details className={styles.errorDetails}>
                <summary className={styles.errorSummary}>
                  <Bug size={14} />
                  Error details (dev mode)
                </summary>
                <pre className={styles.errorStack}>
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className={styles.actions}>
              <Button onClick={this.handleTryAgain}>
                <RefreshCw size={16} />
                <span style={{ marginLeft: '6px' }}>Try Again</span>
              </Button>
              <Button variant="outline" onClick={this.handleGoHome}>
                <Home size={16} />
                <span style={{ marginLeft: '6px' }}>Go Home</span>
              </Button>
            </div>

            <button className={styles.reportLink} onClick={this.handleReload}>
              Reload Application
            </button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
