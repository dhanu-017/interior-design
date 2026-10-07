import React from 'react';
import CinematicScene from '../../components/cinematic/CinematicScene';
import ChapterOverlay from '../../components/typography/ChapterOverlay';
import NextChapter from '../../components/ui/NextChapter';
import ProjectMeta from '../../components/projects/ProjectMeta';
import { residentialChapter, residentialStates, residentialProjects } from '../../data/residential';
import { commercialChapter } from '../../data/commercial';
import { IMG } from '../../data/images';

export default function Residential() {
  return (
    <>
      <CinematicScene
        states={residentialStates}
        chapter={residentialChapter}
        duration={380}
        label="Residential transformation"
        variant="residential"
        withExplorers
      >
        {({ progress, activeIndex }) => (
          <>
            <ChapterOverlay
              chapter={residentialChapter}
              progress={progress}
              headingRange={[0.12, 0.36]}
              textRange={[0.3, 0.5]}
              actionRange={[0.44, 0.6]}
              next={{ to: '/commercial', label: 'Explore commercial' }}
            />
            <p className="scene-state-caption t-body">
              {residentialStates[activeIndex].caption}
            </p>
          </>
        )}
      </CinematicScene>

      <section className="section" aria-labelledby="res-projects">
        <div className="container stack stack-xl">
          <header className="split">
            <div className="split__main stack stack-md">
              <p className="eyebrow">Selected residences</p>
              <h2 className="t-h2" id="res-projects">
                Places to call your own
              </h2>
            </div>
            <div className="split__aside">
              <p className="t-body muted">
                No two homes ask for the same response. We work from the character of each
                building and the habits of the people who live there, shaping spaces that feel
                natural, specific, and made to last.
              </p>
            </div>
          </header>

          {residentialProjects.map((project, i) => (
            <article className={`split ${i % 2 ? 'split--reverse' : ''}`} key={project.id}>
              <div className="split__main">
                <figure className="project-media">
                  <img
                    src={project.image}
                    alt={project.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </div>
              <div className="split__aside stack stack-md">
                <ProjectMeta project={project} />
                <h3 className="t-h3">{project.title}</h3>
                <p className="t-body muted">{project.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <NextChapter
        to="/commercial"
        label="Continue"
        title={commercialChapter.title}
        image={IMG.commercial.finished}
        alt="Finished commercial interior previewing the business chapter"
      />
    </>
  );
}
