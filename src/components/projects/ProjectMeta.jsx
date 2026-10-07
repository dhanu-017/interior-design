import React from 'react';

export default function ProjectMeta({ project }) {
  return (
    <div className="project-meta">
      <span className="t-micro">{project.category}</span>
      <span className="t-micro muted">{project.location}</span>
      <span className="t-micro muted">{project.year}</span>
    </div>
  );
}
