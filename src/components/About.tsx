import type { FC } from 'react';

const About: FC = () => (
  <section id="about">
    <div className="section-header">
      <div>
        <div className="section-label">About</div>
        <h2 className="section-title">Who I am</h2>
      </div>
    </div>
    <div className="about-grid">
      <div className="about-body">
        <p>
          I'm a full stack engineer based in Hyderabad. I think
          the most interesting problems live at the intersection of three things:{' '}
          <strong>mathematics</strong>, which gives you the tools to reason
          precisely; <strong>philosophy</strong>, which teaches you to ask the
          right questions; and <strong>technology</strong>, which lets you act
          on the answers.
        </p>
        <p>
          Most engineers pick one. I want all three — and I think the best
          systems thinking comes from refusing to separate them. When I read a
          paper on distributed consensus, I'm also asking what it means for
          truth to be emergent. When I design a retrieval pipeline, I'm thinking
          about what "relevance" actually means epistemically.
        </p>
        <p>
          I build things to understand them. I write to sharpen what I've built.
          I'm fascinated by systems at the boundary of their limits — where the
          math gets hard, the philosophy gets practical, and the engineering
          gets interesting.
        </p>
        <ul className="interests-list">
          <li>
            <span className="interest-icon">∑</span>
            <div className="interest-content">
              <h4>Mathematics</h4>
              <p>
                Linear algebra, probability theory, information theory. The
                substrate everything else is built on.
              </p>
            </div>
          </li>
          <li>
            <span className="interest-icon">∴</span>
            <div className="interest-content">
              <h4>Philosophy of Mind & Knowledge</h4>
              <p>
                Epistemology, philosophy of language, what it means for a
                machine to understand something.
              </p>
            </div>
          </li>
          <li>
            <span className="interest-icon">⌬</span>
            <div className="interest-content">
              <h4>Systems Engineering</h4>
              <p>
                Distributed systems, retrieval architectures, the theory of
                constraints. How complex things hold together — and why they
                don't.
              </p>
            </div>
          </li>
          <li>
            <span className="interest-icon">↯</span>
            <div className="interest-content">
              <h4>Reading</h4>
              <p>
                AI Engineering, System Design vol 1. Books that change how you see problems.
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className="about-sidebar">
        <div className="sidebar-block">
          <div className="sidebar-label">Currently</div>
          <p style={{ fontSize: 15, color: 'var(--ink2)', lineHeight: 1.7 }}>
            Building RAG systems, reading AI Engineering and System Design vol 1,
            thinking about what knowledge representation actually means.
          </p>
        </div>
        <div className="sidebar-block">
          <div className="sidebar-label">Links</div>
          <ul className="sidebar-links">
            <li>
              <a href="https://github.com/moyaqoob" target="_blank">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/yaqoob" target="_blank">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:yaqoob@example.com">Email</a>
            </li>
          </ul>
        </div>
        <div className="sidebar-block">
          <div className="sidebar-label">Stack</div>
          <p
            style={{
              fontSize: 13,
              color: 'var(--ink3)',
              fontFamily: 'var(--mono)',
              lineHeight: 1.9,
            }}
          >
            Python · TypeScript · PostgreSQL
            <br />
            FastAPI · Next.js · Redis
            <br />
            Supabase · Railway · Vercel
            <br />
            pgvector · Docker · Git
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
