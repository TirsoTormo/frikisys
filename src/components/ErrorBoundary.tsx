import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '4rem',
            fontFamily: "'IBM Plex Mono', monospace",
            fontWeight: 700,
            color: '#2a2a2a',
            lineHeight: 1,
          }}>
            ERR
          </div>
          <h2 style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '1.125rem',
            color: '#e5e5e5',
          }}>
            Algo salió mal
          </h2>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.875rem',
            color: '#888888',
            maxWidth: '400px',
            lineHeight: 1.6,
          }}>
            {this.state.error?.message || 'Error desconocido'}
          </p>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.875rem',
              padding: '0.625rem 1.25rem',
              backgroundColor: '#1a1a1a',
              color: '#e5e5e5',
              border: '1px solid #2a2a2a',
              cursor: 'pointer',
              marginTop: '0.5rem',
            }}
          >
            ← Volver al inicio
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
