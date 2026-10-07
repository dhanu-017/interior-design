import React, { lazy } from 'react';

/**
 * Exactly five primary routes. Project details are handled client-side
 * (modals / expanded views) — never as extra routes.
 */
const Home = lazy(() => import('../pages/Home/Home'));
const Residential = lazy(() => import('../pages/Residential/Residential'));
const Commercial = lazy(() => import('../pages/Commercial/Commercial'));
const Process = lazy(() => import('../pages/Process/Process'));
const Portfolio = lazy(() => import('../pages/Portfolio/Portfolio'));

export const routeConfig = [
  { path: '/', element: <Home />, label: 'Home' },
  { path: '/residential', element: <Residential />, label: 'Residential' },
  { path: '/commercial', element: <Commercial />, label: 'Commercial' },
  { path: '/process', element: <Process />, label: 'Process' },
  { path: '/portfolio', element: <Portfolio />, label: 'Portfolio' }
];

export const navItems = routeConfig.map(({ path, label }) => ({ path, label }));
