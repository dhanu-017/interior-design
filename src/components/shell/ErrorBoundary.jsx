import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error) {
    // Keep the failure visible instead of leaving the browser on a white page.
    console.error('INTERIORA runtime error:', error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="app-error" role="alert">
        <div className="app-error__inner">
          <p className="eyebrow">INTERIORA</p>
          <h1 className="t-h2">The space could not be rendered.</h1>
          <p className="t-body muted">
            A browser graphics/runtime error interrupted this view. The rest of the application is still available.
          </p>
          <button className="btn btn--primary" type="button" onClick={() => window.location.reload()}>
            Reload experience
          </button>
        </div>
      </div>
    );
  }
}
