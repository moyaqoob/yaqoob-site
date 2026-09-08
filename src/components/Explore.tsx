import type { FC } from 'react';
import { EXPLORE } from '../content/site';

const Explore: FC = () => (
  <section className="explore-grid">
    {EXPLORE.map((col) => (
      <div key={col.title}>
        <p className="kicker">{col.kicker}</p>
        <h2 className="block-title">{col.title}</h2>
        <div className="explore-cards">
          {col.items.map((item) => (
            <a key={item.name} href={item.href} className="explore-card">
              <h3>{item.name}</h3>
              <p>{item.note}</p>
            </a>
          ))}
        </div>
      </div>
    ))}
  </section>
);

export default Explore;
