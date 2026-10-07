import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { useScrollFlag } from '../../hooks/useScrollProgress';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { navItems } from '../../app/routes';
import MagneticButton from '../ui/MagneticButton';
import { useTheme } from '../../hooks/useTheme';

/** Duplicate-label roll on hover — slides up, monochrome copy slides in. */
function Roll({ children }) {
  return (
    <span className="roll">
      <span className="roll__a">{children}</span>
      <span className="roll__b" aria-hidden="true">{children}</span>
    </span>
  );
}

export default function GlobalNavigation() {
  const location = useLocation();
  const condensed = useScrollFlag(0.1);
  const [open, setOpen] = useState(false);
  const { reduced } = useReducedMotion();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const isStudioOpen = (() => {
    try {
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay();
      return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
    } catch {
      return false;
    }
  })();

  return (
    <>
      <header className={`nav ${condensed ? 'is-condensed' : ''} ${open ? 'is-open' : ''}`}>
        <div className="nav__inner">
          <Link to="/" className="nav__brand" aria-label="INTERIORA — home">
            <span className="nav__mark" aria-hidden="true" />
            <span className="nav__word t-meta">
              <Roll>INTERIORA</Roll>
            </span>
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `nav__link t-meta ${isActive ? 'is-active' : ''}`}
              >
                <span className="nav__link-label">
                  <Roll>{item.label}</Roll>
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="nav__actions">
            <div className="nav__status" aria-live="polite">
              <span className={`nav__status-dot ${isStudioOpen ? 'is-live' : ''}`} aria-hidden="true" />
              <span className="nav__status-copy">{isStudioOpen ? 'Open now' : 'Booking soon'}</span>
            </div>
            <MagneticButton as={Link} to="/portfolio" variant="ghost" className="nav__cta">
              Start a project
            </MagneticButton>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              <span className="theme-toggle__icon" aria-hidden="true">{isDark ? '☼' : '☾'}</span>
              <span className="theme-toggle__label">{isDark ? 'Light' : 'Dark'}</span>
            </button>
            <button
              type="button"
              className="nav__toggle"
              aria-expanded={open}
              aria-controls="nav-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="nav__toggle-lines" aria-hidden="true">
                <i />
                <i />
              </span>
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="nav-menu"
        className={`nav-menu ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
        style={{ transitionDuration: reduced ? '1ms' : undefined }}
      >
        <nav aria-label="Mobile">
          <ol className="nav-menu__list">
            {navItems.map((item, i) => (
              <li
                key={item.path}
                className="nav-menu__item"
                style={{ transitionDelay: open && !reduced ? `${90 + i * 70}ms` : '0ms' }}
              >
                <NavLink to={item.path} end={item.path === '/'}>
                  <span className="nav-menu__title t-h2">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ol>
        </nav>
        <p className="nav-menu__meta t-micro">Studio for residential &amp; commercial interiors</p>
      </div>
    </>
  );
}
