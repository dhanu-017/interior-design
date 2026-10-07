import React from 'react';
import CinematicScene from '../../components/cinematic/CinematicScene';
import ChapterOverlay from '../../components/typography/ChapterOverlay';
import NextChapter from '../../components/ui/NextChapter';
import { processChapter, processStates, processSpecs } from '../../data/process';
import { portfolioChapter } from '../../data/portfolio';
import { IMG } from '../../data/images';
import { Rule } from '../../components/ui/Rule';

export default function Process() {
  return (
    <>
      <CinematicScene
        states={processStates}
        chapter={processChapter}
        duration={400}
        label="Process stages"
        variant="process"
      >
        {({ progress, activeIndex }) => (
          <>
            <ChapterOverlay
              chapter={processChapter}
              progress={progress}
              headingRange={[0.11, 0.33]}
              textRange={[0.27, 0.45]}
              actionRange={[0.4, 0.55]}
              next={{ to: '/portfolio', label: 'View the portfolio' }}
            />

            <p className="scene-state-caption t-body">{processStates[activeIndex].caption}</p>
          </>
        )}
      </CinematicScene>

      <section className="section section--cream" aria-labelledby="process-table">
        <div className="container">
          <header className="split">
            <div className="split__main stack stack-md">
              <p className="eyebrow">Engagement</p>
              <h2 className="t-h2" id="process-table">
                A process with purpose
              </h2>
            </div>
            <div className="split__aside">
              <p className="t-body muted">
                Clear stages and agreed deliverables keep decisions visible at every point.
                The approach is collaborative, practical, and tailored to the needs of each project.
              </p>
            </div>
          </header>

          <div className="stack stack-lg">
            {processSpecs.map((spec) => (
              <article className="spec-stage" key={spec.stage}>
                <div className="stack stack-sm">
                  <h3 className="t-h3">{spec.stage}</h3>
                  <p className="t-body">{spec.note}</p>
                </div>
                <Rule />
                <div className="spec-stage__meta">
                  <span className="t-micro muted">Timeline · <span className="t-meta">{spec.duration}</span></span>
                  <span className="t-micro muted">Deliverables · <span className="t-meta">{spec.deliverables}</span></span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <NextChapter
        to="/portfolio"
        label="Continue"
        title={portfolioChapter.title}
        image={IMG.portfolio.signature}
        alt="Signature interior previewing the portfolio and contact chapter"
      />
    </>
  );
}
