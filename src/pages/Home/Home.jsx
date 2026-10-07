import React, { useRef } from 'react';
import CinematicScene from '../../components/cinematic/CinematicScene';
import ChapterOverlay from '../../components/typography/ChapterOverlay';
import ImageReveal from '../../components/ui/ImageReveal';
import NextChapter from '../../components/ui/NextChapter';
import { Rule } from '../../components/ui/Rule';
import { homeChapter, homeStates, homeStudio } from '../../data/home';
import { residentialChapter } from '../../data/residential';
import { IMG } from '../../data/images';
import { chapterIndex } from './chapterIndex';
import { useElementProgress } from '../../hooks/useScrollProgress';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { interpolate, easeOutCubic } from '../../lib/math';
import { Link } from 'react-router-dom';

function StudioSection() {
  const ref = useRef(null);
  const { reduced } = useReducedMotion();
  const progress = useElementProgress(ref, { start: 0.92, end: 0.3, disabled: reduced });
  const p = reduced ? 1 : easeOutCubic(progress);

  return (
    <section ref={ref} className="section section--cream" aria-labelledby="studio-heading">
      <div className="container split">
        <div className="split__main stack stack-lg">
          <p className="eyebrow">{homeStudio.eyebrow}</p>
          <h2 className="t-h2" id="studio-heading">
            {homeStudio.heading.map((line, i) => (
              <span key={line} style={{ display: 'block' }}>
                <span
                  style={{
                    display: 'block',
                    transform: `translate3d(0, ${((1 - Math.min(1, Math.max(0, (p - i * 0.12) / 0.7))) * 60).toFixed(2)}px, 0)`,
                    opacity: Math.min(1, Math.max(0, (p - i * 0.12) / 0.7)).toFixed(3)
                  }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <p className="t-lead lead" style={{ opacity: interpolate(p, [0.15, 0.8], [0, 1]) }}>
            {homeStudio.body}
          </p>

          <p className="t-body muted">
            From early spatial studies to the final installation, we bring the same care to
            every scale of work: thoughtful planning, clear communication, and close attention
            to the detail that makes a place feel complete.
          </p>
        </div>

        <div className="split__aside">
          <ImageReveal
            src={homeStudio.image}
            alt={homeStudio.alt}
            caption="Studio study — space, proportion, material"
            ratio="4 / 5"
          />
        </div>
      </div>
    </section>
  );
}

function ChapterIndex() {
  return (
    <section className="section" aria-labelledby="chapters-heading">
      <div className="container">
        <header className="chapters__head">
          <p className="eyebrow">The five chapters</p>
          <h2 className="t-h2" id="chapters-heading">
            A practice across five chapters
          </h2>
        </header>
        <Rule />
        <ol className="chapters">
          {chapterIndex.map((item) => (
            <li key={item.to} className="chapter-row">
              <Link to={item.to} className="chapter-row__link">
                <span className="chapter-row__title t-h3">{item.title}</span>
                <span className="chapter-row__meta t-micro muted">{item.meta}</span>
                <span className="chapter-row__line" aria-hidden="true" />
                <span className="chapter-row__arrow t-meta" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <CinematicScene states={homeStates} chapter={homeChapter} duration={380} label="Home sequence" variant="home" withExplorers>
        {({ progress }) => (
          <ChapterOverlay
            chapter={homeChapter}
            progress={progress}
            headingRange={[0.14, 0.38]}
            textRange={[0.32, 0.52]}
            actionRange={[0.44, 0.6]}
            next={{ to: '/residential', label: 'Explore residential' }}
          />
        )}
      </CinematicScene>

      <StudioSection />
      <ChapterIndex />

      <NextChapter
        to="/residential"
        label="Continue"
        title={residentialChapter.title}
        image={IMG.residential.finished}
        alt="Finished monochrome-toned residential interior previewing the homes chapter"
      />
    </>
  );
}
