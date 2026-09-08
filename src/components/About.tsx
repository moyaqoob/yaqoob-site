import type { FC } from 'react';
import { ABOUT } from '../content/site';

const About: FC = () => (
  <section id="about" className="block-section">
    <div>
      <p className="kicker">About</p>
      <h2 className="block-title">Me</h2>
    </div>
    <div className="about-card">
      <h3>{ABOUT.name}</h3>
      <p>{ABOUT.body}</p>
    </div>
  </section>
);

export default About;
