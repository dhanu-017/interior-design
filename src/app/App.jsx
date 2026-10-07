import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from '../components/shell/AppShell';
import ErrorBoundary from '../components/shell/ErrorBoundary';
import { routeConfig } from './routes';

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      <span className="meta">Preparing the space</span>
      <span className="route-fallback__bar" />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppShell>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {routeConfig.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      </AppShell>
    </ErrorBoundary>
  );
}
