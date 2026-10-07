import React, { useEffect, useRef } from 'react';
import SmartImage from '../ui/SmartImage';
import ProjectMeta from './ProjectMeta';

/** Client-side project detail — deliberately not a route. */
export default function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    if (panelRef.current) panelRef.current.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button type="button" className="modal__scrim" onClick={onClose} aria-label="Close project details" />
      <div className="modal__panel" ref={panelRef} tabIndex={-1}>
        <header className="modal__head">
          <ProjectMeta project={project} />
          <h2 id="modal-title" className="t-h2">
            {project.title}
          </h2>
          <button type="button" className="modal__close t-micro" onClick={onClose}>
            Close ✕
          </button>
        </header>

        <figure className="modal__hero">
          <SmartImage src={project.image} alt={project.alt} fallbackLabel={project.title} loading="eager" />
        </figure>

        <div className="modal__body split">
          <div className="split__main stack stack-md">
            <p className="t-lead">{project.description}</p>
            <p className="t-body muted">{project.detail}</p>
          </div>
          <aside className="split__aside">
            <dl className="detail-list">
              {(project.specs || []).map((spec) => (
                <div key={spec.label} className="detail-list__row">
                  <dt className="t-micro muted">{spec.label}</dt>
                  <dd className="t-meta">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </div>
  );
}
