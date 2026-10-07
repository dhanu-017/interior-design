import React from 'react';
import CinematicScene from '../../components/cinematic/CinematicScene';
import ChapterOverlay from '../../components/typography/ChapterOverlay';
import NextChapter from '../../components/ui/NextChapter';
import { commercialChapter, commercialStates, commercialCategories } from '../../data/commercial';
import { processChapter } from '../../data/process';
import { IMG } from '../../data/images';
import { clamp, interpolate } from '../../lib/math';

/**
 * Signature moment: a floor-plan SVG whose strokes are drawn by scroll
 * progress, then dissolves as the built space takes over.
 */
function BlueprintOverlay({ progress }) {
  const draw = clamp(progress / 0.28);
  const opacity = interpolate(progress, [0, 0.06, 0.3, 0.46], [0, 0.9, 0.9, 0]);

  const stroke = (delay) => ({
    strokeDasharray: 1,
    strokeDashoffset: (1 - clamp((draw - delay) / 0.6)).toFixed(3)
  });

  return (
    <svg
      className="blueprint"
      viewBox="0 0 420 280"
      style={{ opacity: opacity.toFixed(3) }}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="square">
        <rect x="24" y="24" width="372" height="232" pathLength="1" style={stroke(0)} />
        <path d="M150 24 V256" pathLength="1" style={stroke(0.12)} />
        <path d="M288 24 V150" pathLength="1" style={stroke(0.2)} />
        <path d="M150 150 H404" pathLength="1" style={stroke(0.28)} />
        <path d="M24 196 H150" pathLength="1" style={stroke(0.36)} />
        <circle cx="219" cy="203" r="34" pathLength="1" style={stroke(0.44)} />
        <path d="M64 24 V44 M84 24 V44" pathLength="1" style={stroke(0.52)} />
        <path d="M330 150 V170 M350 150 V170" pathLength="1" style={stroke(0.58)} />
      </g>
      <g fill="currentColor" className="blueprint__marks" style={{ opacity: 0.06 }}>
        <text x="30" y="272" fontSize="7" letterSpacing="2">PLAN — LEVEL 01</text>
        <text x="330" y="272" fontSize="7" letterSpacing="2">SCALE 1:100</text>
      </g>
    </svg>
  );
}

export default function Commercial() {
  return (
    <>
      <CinematicScene
        states={commercialStates}
        chapter={commercialChapter}
        duration={380}
        label="Commercial sequence"
        variant="commercial"
      >
        {({ progress, activeIndex }) => (
          <>
            <BlueprintOverlay progress={progress} />
            <ChapterOverlay
              chapter={commercialChapter}
              progress={progress}
              headingRange={[0.13, 0.37]}
              textRange={[0.31, 0.51]}
              actionRange={[0.45, 0.61]}
              next={{ to: '/process', label: 'See our process' }}
            />
            <p className="scene-state-caption t-body">{commercialStates[activeIndex].caption}</p>
          </>
        )}
      </CinematicScene>

      <section className="section section--cream" aria-labelledby="commercial-cats">
        <div className="container">
          <header className="split">
            <div className="split__main stack stack-md">
              <p className="eyebrow">Sectors</p>
              <h2 className="t-h2" id="commercial-cats">
                Designed for real use
              </h2>
            </div>
            <div className="split__aside">
              <p className="t-body muted">
                A practice that moves between typologies without changing its method —
                proportion, light, and material provide a consistent design language.
              </p>
            </div>
          </header>

          <div className="category-grid">
            {commercialCategories.map((c) => (
              <article className="category" key={c.id}>
                <figure className="category__media">
                  <img src={c.image} alt={c.alt} loading="lazy" decoding="async" />
                </figure>
                <div className="category__body">
                  <p className="t-micro">{c.label}</p>
                  <p className="t-body muted">{c.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <NextChapter
        to="/process"
        label="Continue"
        title={processChapter.title}
        image={IMG.process.reveal}
        alt="Finished interior previewing the design process chapter"
      />
    </>
  );
}
