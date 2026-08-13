import type { FC } from 'react';

const Now: FC = () => (
  <section id="now">
    <div className="section-header">
      <div>
        <div className="section-label">Now</div>
        <h2 className="section-title">What I&apos;m doing</h2>
      </div>
    </div>
    <p className="now-body">
      Building Meridian (agentic PR review with retrieval + streamed pipeline
      visibility) and sharpening distributed-systems fundamentals. Looking for
      founding / early engineer roles at lean AI startups where backend depth
      and system legibility matter more than feature velocity theater.
    </p>
  </section>
);

export default Now;
