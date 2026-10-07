import React, { useRef, useState } from 'react';
import CinematicScene from '../../components/cinematic/CinematicScene';
import ChapterOverlay from '../../components/typography/ChapterOverlay';
import ProjectModal from '../../components/projects/ProjectModal';
import ContactForm from '../../components/forms/ContactForm';
import { portfolioChapter, portfolioProjects } from '../../data/portfolio';
import { useElementProgress } from '../../hooks/useScrollProgress';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { easeOutCubic, interpolate } from '../../lib/math';

/** Gallery stage: each project's frame expands continuously as it travels. */
function GalleryItem({ project, index, onOpen }) {
  const ref = useRef(null);
  const { reduced } = useReducedMotion();
  const progress = useElementProgress(ref, { start: 0.98, end: 0.18, disabled: reduced });
  const p = reduced ? 1 : easeOutCubic(progress);

  return (
    <article ref={ref} className={`gallery-item ${index % 2 ? 'gallery-item--reverse' : ''}`}>
      <button type="button" className="gallery-item__media" onClick={() => onOpen(project)}>
        <img
          src={project.image}
          alt={project.alt}
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          style={{
            transform: `scale(${interpolate(p, [0, 1], [1.22, 1.02]).toFixed(4)})`,
            clipPath: `inset(${interpolate(p, [0, 1], [10, 0]).toFixed(2)}% 0%)`
          }}
        />
        <span className="gallery-item__sheen" aria-hidden="true" />
        <span className="gallery-item__cta t-micro">Expand project</span>
      </button>

      <div className="gallery-item__text stack stack-sm">
        <p className="t-micro muted">{project.category}</p>
        <h3 className="t-h2">{project.title}</h3>
        <p className="t-lead muted">{project.excerpt}</p>
        <dl className="gallery-item__facts">
          <div>
            <dt className="t-micro muted">Location</dt>
            <dd className="t-meta">{project.location}</dd>
          </div>
          <div>
            <dt className="t-micro muted">Year</dt>
            <dd className="t-meta">{project.year}</dd>
          </div>
        </dl>
        <button type="button" className="link-underline t-meta" onClick={() => onOpen(project)}>
          View project details →
        </button>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState(null);

  return (
    <>
      <CinematicScene
        states={portfolioProjects.map((project, i) => ({
          id: project.id,
          label: project.category,
          title: project.title,
          image: project.image,
          alt: project.alt,
          range: [i / portfolioProjects.length, (i + 1) / portfolioProjects.length],
          zoom: [1.03 + i * 0.01, 1.12 + i * 0.012],
          drift: [i % 2 ? 1.4 : -1.4, i % 2 ? -0.6 : 0.6],
          caption: project.excerpt
        }))}
        chapter={portfolioChapter}
        duration={400}
        label="Project gallery"
        variant="portfolio"
      >
        {({ progress }) => (
          <ChapterOverlay
            chapter={portfolioChapter}
            progress={progress}
            headingRange={[0.12, 0.36]}
            textRange={[0.3, 0.5]}
            actionRange={[0.44, 0.6]}
          />
        )}
      </CinematicScene>

      <section className="section" aria-labelledby="gallery-heading">
        <div className="container">
          <header className="split">
            <div className="split__main stack stack-md">
              <p className="eyebrow">Selected work</p>
              <h2 className="t-h2" id="gallery-heading">
                Different briefs, considered responses
              </h2>
            </div>
            <div className="split__aside">
              <p className="t-body muted">
                A selection of residential and commercial work. Each project responds to its own
                context, with a consistent focus on clarity, useful planning, and enduring detail.
              </p>
            </div>
          </header>
        </div>

        <div className="gallery">
          {portfolioProjects.map((project, i) => (
            <GalleryItem key={project.id} project={project} index={i} onOpen={setActive} />
          ))}
        </div>

      </section>

      <section className="section section--cream contact" aria-labelledby="contact-heading">
        <div className="container split">
          <div className="split__main stack stack-lg">
            <p className="eyebrow">Studio consultation</p>
            <h2 className="t-h1" id="contact-heading">
              Let’s make your next space count.
            </h2>
            <p className="t-lead lead">
              Tell us about the place, what you need it to do, and what matters most to you.
              We’ll help define a clear direction and the right next steps for your project.
            </p>
            <div className="contact__details">
              <p className="t-meta">hello@interiora.studio</p>
              <p className="t-meta muted">By appointment · Worldwide projects</p>
              <p className="t-meta muted">Studio hours · Mon — Fri, 09:00 — 18:00</p>
            </div>
          </div>
          <div className="split__aside">
            <ContactForm />
          </div>
        </div>
      </section>

      {active ? <ProjectModal project={active} onClose={() => setActive(null)} /> : null}
    </>
  );
}
