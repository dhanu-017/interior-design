import React from 'react';
import { Link } from 'react-router-dom';
import SmartImage from '../ui/SmartImage';
import ProjectMeta from './ProjectMeta';

/**
 * UIverse "card" pattern with a micro-interaction hover state,
 * restyled into the INTERIORA border language.
 */
export default function ProjectCard({ project, onOpen, index }) {
  const interactive = typeof onOpen === 'function';

  const body = (
    <>
      <div className="card__media">
        <SmartImage src={project.image} alt={project.alt} fallbackLabel={project.title} />
        <span className="card__sheen" aria-hidden="true" />
      </div>
      <div className="card__body">
        <ProjectMeta project={project} index={index} />
        <h3 className="t-h3 card__title">{project.title}</h3>
        <p className="t-body muted card__excerpt">{project.excerpt}</p>
        <span className="card__link t-micro">
          {interactive ? 'View project' : 'Read more'} <i aria-hidden="true">→</i>
        </span>
      </div>
    </>
  );

  return interactive ? (
    <button type="button" className="card card--button" onClick={() => onOpen(project)}>
      {body}
    </button>
  ) : (
    <Link to="/portfolio" className="card">
      {body}
    </Link>
  );
}
