import type { FC } from 'react';
import { PROFILE } from '../content/site';

const TalkCta: FC = () => (
  <section id="talk" className="talk-section">
    <h2 className="talk-title">Hey, you scrolled this far, let&apos;s talk.</h2>
    <a className="text-link talk-mail" href={`mailto:${PROFILE.email}`}>
      {PROFILE.email}
    </a>
    <ul className="proof-inline">
      <li>350+ DSA problems · LeetCode / HackerRank</li>
      <li>14+ contests · rating +65%</li>
      <li>Stalwart.ae intern · ~40% fewer failed payment transactions</li>
    </ul>
  </section>
);

export default TalkCta;
