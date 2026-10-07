import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GlobalNavigation from '../navigation/GlobalNavigation';
import Footer from './Footer';
import { invalidate } from '../../lib/scrollStore';

function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    invalidate();
  }, [location.pathname]);
  return null;
}

export default function AppShell({ children }) {
  return (
    <>
      <a className="skip-link t-meta" href="#main">Skip to content</a>
      <GlobalNavigation />
      <main id="main" className="page">{children}</main>
      <Footer />
      <ScrollManager />
    </>
  );
}
