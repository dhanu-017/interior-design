import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../../app/routes';
import { useTheme } from '../../hooks/useTheme';

export default function Footer() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top split">
          <div className="split__main">
            <p className="eyebrow">Selected work &amp; contact</p>
            <h2 className="t-h1 footer__brand">
              INTERIORA
              <span className="footer__tagline t-lead muted">Form · Function · Feeling</span>
            </h2>
          </div>
          <div className="split__aside">
            <p className="t-body muted">
              Independent interior architecture for homes and commercial spaces, guided by clarity, considered materials, and lasting purpose.
            </p>
          </div>
        </div>
        <div className="rule" />
        <div className="footer__cols">
          <nav aria-label="Footer">
            <p className="t-micro muted footer__col-title">Navigation</p>
            <ul className="footer__list">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="t-meta link-underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="t-micro muted footer__col-title">Services</p>
            <ul className="footer__list">
              <li><span className="t-meta muted">Residential interiors</span></li>
              <li><span className="t-meta muted">Commercial environments</span></li>
              <li><span className="t-meta muted">Spatial planning &amp; visualisation</span></li>
              <li><span className="t-meta muted">Lighting &amp; material specification</span></li>
            </ul>
          </div>
          <div>
            <p className="t-micro muted footer__col-title">Contact</p>
            <a className="t-meta link-underline" href="mailto:hello@interiora.studio">
              hello@interiora.studio
            </a>
          </div>
        </div>
        <div className="footer__bottom">
          <button type="button" className="theme-toggle theme-toggle--footer" onClick={toggleTheme}>
            <span className="theme-toggle__icon" aria-hidden="true">{isDark ? '☼' : '☾'}</span>
            <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
          </button>
          <span className="t-micro muted">© {new Date().getFullYear()} INTERIORA</span>
          <span className="t-micro muted">Interior architecture · By appointment</span>
        </div>
      </div>
    </footer>
  );
}
