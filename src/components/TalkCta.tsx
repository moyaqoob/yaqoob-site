import type { FC } from 'react';
import { PROFILE } from '../content/site';

const TalkCta: FC = () => (
  <section id="talk" className="talk-section">
    <h2 className="talk-title">Hey, you scrolled this far, let&apos;s talk.</h2>
    <a className="text-link talk-mail" href={`mailto:${PROFILE.email}`}>
      {PROFILE.email}
    </a>
    <ul className="proof-inline">
      <li>400+ LeetCode problems solved</li>
      <li>14+ contests · rating +65%</li>
    </ul>
  </section>
);

export default TalkCta;
