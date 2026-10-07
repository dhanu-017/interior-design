import React from 'react';
import { interpolate, easeOutCubic } from '../../lib/math';
import AnimatedHeading from './AnimatedHeading';
import AnimatedText from './AnimatedText';
import MagneticButton from '../ui/MagneticButton';
import { Link } from 'react-router-dom';

export default function ChapterOverlay({
  chapter,
  progress,
  headingRange = [0.12, 0.38],
  textRange = [0.3, 0.5],
  actionRange = [0.42, 0.58],
  next
}) {
  const actionP = easeOutCubic(interpolate(progress, actionRange, [0, 1]));

  return (
    <div className="chapter-overlay">
      <p className="eyebrow chapter-overlay__eyebrow">
        {chapter.label}
      </p>

      <AnimatedHeading
        lines={chapter.display}
        progress={progress}
        range={headingRange}
        className="chapter-overlay__title"
      />

      <AnimatedText
        text={chapter.summary}
        progress={progress}
        range={textRange}
        className="t-lead chapter-overlay__lead"
      />

      {next ? (
        <div
          className="chapter-overlay__actions cluster"
          style={{
            opacity: actionP.toFixed(3),
            transform: `translate3d(0, ${((1 - actionP) * 26).toFixed(2)}px, 0)`
          }}
        >
          <MagneticButton as={Link} to={next.to} variant="primary">
            {next.label}
          </MagneticButton>
        </div>
      ) : null}
    </div>
  );
}
